import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { Role } from '@prisma/client';
import { HttpError } from '../utils/http.js';

type TokenPayload = { id: number; username: string; name: string; role: Role };

export function createToken(payload: TokenPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET ?? 'local-demo-secret', { expiresIn: '8h' });
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const value = req.headers.authorization;
  if (!value?.startsWith('Bearer ')) throw new HttpError(401, '请先登录');
  try {
    req.user = jwt.verify(value.slice(7), process.env.JWT_SECRET ?? 'local-demo-secret') as TokenPayload;
    next();
  } catch {
    throw new HttpError(401, '登录状态已失效，请重新登录');
  }
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (req.user?.role !== 'ADMIN') throw new HttpError(403, '当前账号无管理员权限');
  next();
}
