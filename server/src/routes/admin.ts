import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { addAudit, validateRoomAvailability } from '../services/bookingService.js';
import { HttpError } from '../utils/http.js';

export const adminRouter = Router();
adminRouter.use(authenticate, requireAdmin);

adminRouter.get('/approvals', async (_req, res) => {
  res.json(await prisma.booking.findMany({
    where: { status: 'PENDING' }, include: { room: true, creator: { include: { department: true } } }, orderBy: { createdAt: 'asc' }
  }));
});

adminRouter.post('/approvals/:id', async (req, res) => {
  const id = Number(req.params.id);
  const input = z.object({ action: z.enum(['APPROVE', 'REJECT']), comment: z.string().max(200).default('') }).parse(req.body);
  const booking = await prisma.booking.findUnique({ where: { id }, include: { room: true, creator: true } });
  if (!booking) throw new HttpError(404, '预约不存在');
  if (booking.status !== 'PENDING') throw new HttpError(409, '该预约已经处理');
  if (input.action === 'APPROVE') {
    await validateRoomAvailability({ roomId: booking.roomId, startTime: booking.startTime, endTime: booking.endTime, attendeeCount: booking.attendeeCount, excludeBookingId: id });
  } else if (!input.comment.trim()) {
    throw new HttpError(400, '驳回预约时必须填写原因');
  }
  const status = input.action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
  const updated = await prisma.booking.update({
    where: { id }, data: { status, approverId: req.user!.id, approvalComment: input.comment, approvedAt: new Date() }, include: { room: true, creator: true, approver: true }
  });
  await addAudit(req.user!.id, input.action, 'BOOKING', String(id), `${status === 'APPROVED' ? '批准' : '驳回'}预约：${input.comment || '同意'}`, id);
  await prisma.notification.create({ data: { userId: booking.creatorId, title: `预约${status === 'APPROVED' ? '已批准' : '已驳回'}`, content: `${booking.code}：${input.comment || '审批通过'}` } });
  res.json(updated);
});

adminRouter.get('/departments', async (_req, res) => res.json(await prisma.department.findMany({ include: { _count: { select: { users: true } } } })));
adminRouter.post('/departments', async (req, res) => {
  const { name } = z.object({ name: z.string().min(2).max(30) }).parse(req.body);
  res.status(201).json(await prisma.department.create({ data: { name } }));
});

adminRouter.get('/users', async (_req, res) => res.json(await prisma.user.findMany({ select: { id: true, username: true, name: true, email: true, role: true, active: true, department: true, createdAt: true } })));
adminRouter.post('/users', async (req, res) => {
  const input = z.object({ username: z.string().min(3), password: z.string().min(6), name: z.string().min(2), email: z.string().email(), role: z.enum(['ADMIN', 'EMPLOYEE']), departmentId: z.number().int().nullable() }).parse(req.body);
  const { password, ...profile } = input;
  res.status(201).json(await prisma.user.create({ data: { ...profile, passwordHash: await bcrypt.hash(password, 10) }, select: { id: true, username: true, name: true, email: true, role: true, active: true } }));
});

adminRouter.get('/rules', async (_req, res) => res.json(await prisma.bookingRule.findUnique({ where: { id: 1 } })));
adminRouter.put('/rules', async (req, res) => {
  const input = z.object({ minAdvanceMinutes: z.coerce.number().int().min(0), maxDurationMinutes: z.coerce.number().int().min(30).max(1440), checkInEarlyMinutes: z.coerce.number().int().min(0).max(120), noShowMinutes: z.coerce.number().int().min(5).max(240) }).parse(req.body);
  res.json(await prisma.bookingRule.upsert({ where: { id: 1 }, update: input, create: { id: 1, ...input } }));
});

adminRouter.get('/logs', async (_req, res) => res.json(await prisma.auditLog.findMany({ include: { user: { select: { name: true } } }, orderBy: { createdAt: 'desc' }, take: 200 })));
