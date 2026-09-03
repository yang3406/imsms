import { Router } from 'express';
import { z } from 'zod';
import type { BookingStatus } from '@prisma/client';
import { prisma } from '../db.js';
import { authenticate } from '../middleware/auth.js';
import { addAudit, validateRoomAvailability } from '../services/bookingService.js';
import { HttpError } from '../utils/http.js';

export const bookingRouter = Router();
bookingRouter.use(authenticate);

const includeDetails = {
  room: true,
  creator: { select: { id: true, name: true, department: { select: { name: true } } } },
  approver: { select: { id: true, name: true } },
  audits: { include: { user: { select: { name: true } } }, orderBy: { createdAt: 'asc' as const } }
};

bookingRouter.get('/', async (req, res) => {
  const status = req.query.status ? String(req.query.status) as BookingStatus : undefined;
  const all = req.query.scope === 'all' && req.user!.role === 'ADMIN';
  res.json(await prisma.booking.findMany({
    where: { ...(all ? {} : { creatorId: req.user!.id }), ...(status ? { status } : {}) },
    include: includeDetails,
    orderBy: { startTime: 'desc' }
  }));
});

bookingRouter.get('/export/csv', async (req, res) => {
  const all = req.query.scope === 'all' && req.user!.role === 'ADMIN';
  const rows = await prisma.booking.findMany({ where: all ? {} : { creatorId: req.user!.id }, include: { room: true, creator: true }, orderBy: { startTime: 'desc' } });
  const quote = (value: unknown) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const lines = [['预约编号','系列编号','会议主题','会议室','发起人','开始时间','结束时间','参会人数','状态'].map(quote).join(',')];
  for (const row of rows) lines.push([row.code,row.seriesCode,row.title,row.room.name,row.creator.name,row.startTime.toISOString(),row.endTime.toISOString(),row.attendeeCount,row.status].map(quote).join(','));
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="meeting-bookings.csv"');
  res.send(`\uFEFF${lines.join('\n')}`);
});

bookingRouter.get('/templates/list', async (req, res) => {
  res.json(await prisma.meetingTemplate.findMany({ where: { userId: req.user!.id }, orderBy: { createdAt: 'desc' } }));
});

bookingRouter.post('/templates', async (req, res) => {
  const input = z.object({ name:z.string().min(2).max(30), title:z.string().min(2).max(80), description:z.string().max(500).default(''), attendeeNames:z.array(z.string()).min(1), attendeeCount:z.coerce.number().int().positive(), equipment:z.array(z.string()).default([]) }).parse(req.body);
  res.status(201).json(await prisma.meetingTemplate.upsert({ where: { userId_name: { userId:req.user!.id, name:input.name } }, update: { ...input, attendeeNames:input.attendeeNames.join(','), equipment:input.equipment.join(',') }, create: { ...input, userId:req.user!.id, attendeeNames:input.attendeeNames.join(','), equipment:input.equipment.join(',') } }));
});

bookingRouter.get('/:id', async (req, res) => {
  const booking = await prisma.booking.findUnique({ where: { id: Number(req.params.id) }, include: includeDetails });
  if (!booking) throw new HttpError(404, '预约不存在');
  if (booking.creatorId !== req.user!.id && req.user!.role !== 'ADMIN') throw new HttpError(403, '无权查看该预约');
  res.json(booking);
});

bookingRouter.post('/', async (req, res) => {
  const input = z.object({
    title: z.string().min(2).max(80), description: z.string().max(500).default(''), roomId: z.coerce.number().int().positive(),
    attendeeNames: z.array(z.string().min(1)).min(1), attendeeCount: z.coerce.number().int().positive(),
    startTime: z.coerce.date(), endTime: z.coerce.date(), repeatWeeks: z.coerce.number().int().min(1).max(12).default(1)
  }).parse(req.body);
  const occurrences = Array.from({ length: input.repeatWeeks }, (_, index) => ({ startTime:new Date(input.startTime.getTime()+index*7*86400000), endTime:new Date(input.endTime.getTime()+index*7*86400000) }));
  for (const occurrence of occurrences) await validateRoomAvailability({ ...input, ...occurrence });
  const seriesCode = input.repeatWeeks > 1 ? `MS${Date.now().toString(36).toUpperCase()}` : null;
  const created = [];
  for (const [index, occurrence] of occurrences.entries()) {
    const day = new Date().toISOString().slice(0, 10).replaceAll('-', '');
    const uniquePart = `${Date.now().toString().slice(-6)}${index}${Math.floor(Math.random()*1000).toString().padStart(3,'0')}`;
    const code = `MR${day}${uniquePart}`;
    const booking = await prisma.booking.create({ data: { title:input.title, description:input.description, roomId:input.roomId, attendeeNames:input.attendeeNames.join(','), attendeeCount:input.attendeeCount, creatorId:req.user!.id, code, seriesCode, ...occurrence }, include:includeDetails });
    await addAudit(req.user!.id, 'CREATE', 'BOOKING', String(booking.id), `提交预约 ${code}${seriesCode ? `（系列 ${seriesCode}）` : ''}`, booking.id);
    created.push(booking);
  }
  const booking = created[0];
  await prisma.notification.create({ data: { userId: req.user!.id, title: '预约已提交', content: `${booking.code}${created.length > 1 ? ` 等 ${created.length} 场周期会议` : ''} 已进入审批队列` } });
  res.status(201).json({ ...booking, createdCount: created.length, seriesCode });
});

async function ownedBooking(id: number, userId: number) {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) throw new HttpError(404, '预约不存在');
  if (booking.creatorId !== userId) throw new HttpError(403, '只能操作自己的预约');
  return booking;
}

bookingRouter.post('/:id/cancel', async (req, res) => {
  const id = Number(req.params.id);
  const booking = await ownedBooking(id, req.user!.id);
  if (!['PENDING', 'APPROVED'].includes(booking.status)) throw new HttpError(409, '当前状态不能取消');
  if (booking.startTime <= new Date()) throw new HttpError(409, '会议开始后不能取消');
  await prisma.booking.update({ where: { id }, data: { status: 'CANCELLED', cancelledAt: new Date() } });
  await addAudit(req.user!.id, 'CANCEL', 'BOOKING', String(id), '用户取消预约', id);
  res.json(await prisma.booking.findUnique({ where:{ id }, include:includeDetails }));
});

bookingRouter.post('/:id/check-in', async (req, res) => {
  const id = Number(req.params.id);
  const booking = await ownedBooking(id, req.user!.id);
  if (booking.status !== 'APPROVED') throw new HttpError(409, '只有已批准的会议可以签到');
  const rule = await prisma.bookingRule.findUnique({ where: { id: 1 } });
  const now = new Date();
  if (now < new Date(booking.startTime.getTime() - (rule?.checkInEarlyMinutes ?? 15) * 60000)) throw new HttpError(409, '尚未到允许签到时间');
  if (now > booking.endTime) throw new HttpError(409, '会议已经结束，不能签到');
  await prisma.booking.update({ where: { id }, data: { status: 'CHECKED_IN', checkedInAt: now } });
  await addAudit(req.user!.id, 'CHECK_IN', 'BOOKING', String(id), '参会人已签到', id);
  res.json(await prisma.booking.findUnique({ where:{ id }, include:includeDetails }));
});

bookingRouter.post('/:id/start', async (req, res) => {
  const id = Number(req.params.id);
  const booking = await ownedBooking(id, req.user!.id);
  if (booking.status !== 'CHECKED_IN') throw new HttpError(409, '请先签到再开始会议');
  await prisma.booking.update({ where: { id }, data: { status: 'IN_PROGRESS', startedAt: new Date() } });
  await addAudit(req.user!.id, 'START', 'BOOKING', String(id), '会议开始', id);
  res.json(await prisma.booking.findUnique({ where:{ id }, include:includeDetails }));
});

bookingRouter.post('/:id/complete', async (req, res) => {
  const id = Number(req.params.id);
  const booking = await ownedBooking(id, req.user!.id);
  if (booking.status !== 'IN_PROGRESS') throw new HttpError(409, '只有进行中的会议可以结束');
  await prisma.booking.update({ where: { id }, data: { status: 'COMPLETED', completedAt: new Date() } });
  await addAudit(req.user!.id, 'COMPLETE', 'BOOKING', String(id), '会议已完成', id);
  res.json(await prisma.booking.findUnique({ where:{ id }, include:includeDetails }));
});
