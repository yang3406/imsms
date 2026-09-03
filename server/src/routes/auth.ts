import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../db.js';
import { authenticate, createToken } from '../middleware/auth.js';
import { addAudit } from '../services/bookingService.js';
import { HttpError } from '../utils/http.js';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const input = z.object({ username: z.string().min(1), password: z.string().min(1) }).parse(req.body);
  const user = await prisma.user.findUnique({ where: { username: input.username }, include: { department: true } });
  if (!user || !user.active || !(await bcrypt.compare(input.password, user.passwordHash))) {
    throw new HttpError(401, '用户名或密码错误');
  }
  const profile = { id: user.id, username: user.username, name: user.name, email: user.email, role: user.role, department: user.department?.name ?? '' };
  await addAudit(user.id, 'LOGIN', 'USER', String(user.id), '用户登录系统');
  res.json({ token: createToken({ id: user.id, username: user.username, name: user.name, role: user.role }), user: profile });
});

authRouter.get('/me', authenticate, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id }, include: { department: true } });
  if (!user) throw new HttpError(404, '用户不存在');
  res.json({ id: user.id, username: user.username, name: user.name, email: user.email, role: user.role, department: user.department?.name ?? '' });
});
