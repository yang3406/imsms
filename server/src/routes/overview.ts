import { Router } from 'express';
import { prisma } from '../db.js';
import { authenticate } from '../middleware/auth.js';

export const overviewRouter = Router();
overviewRouter.use(authenticate);

overviewRouter.get('/dashboard', async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const ownWhere = req.user!.role === 'ADMIN' ? {} : { creatorId: req.user!.id };
  const [rooms, todayMeetings, pending, completed, cancelled, recent] = await Promise.all([
    prisma.room.count({ where: { active: true } }),
    prisma.booking.count({ where: { ...ownWhere, startTime: { gte: today, lt: tomorrow } } }),
    prisma.booking.count({ where: { ...ownWhere, status: 'PENDING' } }),
    prisma.booking.count({ where: { ...ownWhere, status: 'COMPLETED' } }),
    prisma.booking.count({ where: { ...ownWhere, status: 'CANCELLED' } }),
    prisma.booking.findMany({ where: ownWhere, include: { room: true }, orderBy: { startTime: 'desc' }, take: 6 })
  ]);
  res.json({ rooms, todayMeetings, pending, completed, cancelled, recent });
});

overviewRouter.get('/statistics', async (_req, res) => {
  const [rooms, statusGroups] = await Promise.all([
    prisma.room.findMany({ include: { bookings: { where: { status: { not: 'REJECTED' } } } } }),
    prisma.booking.groupBy({ by: ['status'], _count: { _all: true } })
  ]);
  res.json({
    roomUsage: rooms.map((room) => ({ name: room.name, count: room.bookings.length })),
    statusDistribution: statusGroups.map((item) => ({ status: item.status, count: item._count._all }))
  });
});

overviewRouter.get('/calendar', async (req, res) => {
  const from = req.query.from ? new Date(String(req.query.from)) : new Date(Date.now() - 7 * 86400000);
  const to = req.query.to ? new Date(String(req.query.to)) : new Date(Date.now() + 30 * 86400000);
  res.json(await prisma.booking.findMany({ where: { startTime: { lt: to }, endTime: { gt: from }, status: { notIn: ['REJECTED', 'CANCELLED'] } }, include: { room: true, creator: { select: { name: true } } }, orderBy: { startTime: 'asc' } }));
});

overviewRouter.get('/notifications', async (req, res) => res.json(await prisma.notification.findMany({ where: { userId: req.user!.id }, orderBy: { createdAt: 'desc' } })));
overviewRouter.post('/notifications/:id/read', async (req, res) => res.json(await prisma.notification.update({ where: { id: Number(req.params.id), userId: req.user!.id }, data: { read: true } })));
