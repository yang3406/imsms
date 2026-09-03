import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { calculateRoomScore, equipmentList, validateRoomAvailability } from '../services/bookingService.js';
import { HttpError } from '../utils/http.js';

export const roomRouter = Router();
roomRouter.use(authenticate);

roomRouter.get('/', async (_req, res) => {
  res.json(await prisma.room.findMany({ include: { maintenance: { orderBy: { startTime: 'asc' } } }, orderBy: { name: 'asc' } }));
});

roomRouter.get('/recommend', async (req, res) => {
  const input = z.object({
    startTime: z.coerce.date(), endTime: z.coerce.date(), attendeeCount: z.coerce.number().int().positive(), equipment: z.string().default('')
  }).parse(req.query);
  const required = equipmentList(input.equipment);
  const rooms = await prisma.room.findMany({ where: { active: true } });
  const recommendations = [];
  for (const room of rooms) {
    if (required.some((item) => !equipmentList(room.equipment).includes(item))) continue;
    try {
      await validateRoomAvailability({ roomId: room.id, startTime: input.startTime, endTime: input.endTime, attendeeCount: input.attendeeCount });
      const score = calculateRoomScore(room, input.attendeeCount, required);
      recommendations.push({ ...room, score, reason: `容量满足 ${input.attendeeCount} 人；${required.length ? `设备 ${required.join('、')} 均可用` : '无额外设备要求'}；当前时段无冲突` });
    } catch {
      // 不可用会议室不进入推荐结果。
    }
  }
  res.json(recommendations.sort((a, b) => b.score - a.score));
});

const roomSchema = z.object({
  name: z.string().min(2).max(30), location: z.string().min(2).max(50), capacity: z.coerce.number().int().min(1).max(500),
  equipment: z.array(z.string()).or(z.string()), openTime: z.string().regex(/^\d{2}:\d{2}$/), closeTime: z.string().regex(/^\d{2}:\d{2}$/),
  description: z.string().max(200).default(''), active: z.boolean().default(true)
});

roomRouter.post('/', requireAdmin, async (req, res) => {
  const input = roomSchema.parse(req.body);
  const equipment = Array.isArray(input.equipment) ? input.equipment.join(',') : input.equipment;
  res.status(201).json(await prisma.room.create({ data: { ...input, equipment } }));
});

roomRouter.put('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const input = roomSchema.parse(req.body);
  const equipment = Array.isArray(input.equipment) ? input.equipment.join(',') : input.equipment;
  res.json(await prisma.room.update({ where: { id }, data: { ...input, equipment } }));
});

roomRouter.post('/:id/maintenance', requireAdmin, async (req, res) => {
  const roomId = Number(req.params.id);
  const input = z.object({ startTime: z.coerce.date(), endTime: z.coerce.date(), reason: z.string().min(2).max(100) }).parse(req.body);
  if (input.endTime <= input.startTime) throw new HttpError(400, '维护结束时间必须晚于开始时间');
  res.status(201).json(await prisma.maintenanceWindow.create({ data: { roomId, ...input } }));
});
