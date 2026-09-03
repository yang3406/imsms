import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.js';
import { roomRouter } from './routes/rooms.js';
import { bookingRouter } from './routes/bookings.js';
import { adminRouter } from './routes/admin.js';
import { overviewRouter } from './routes/overview.js';
import { errorHandler, notFound } from './utils/http.js';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.get('/api/health', (_req, res) => res.json({ status: 'ok', name: '智能会议预约管理系统', version: 'V1.0' }));
  app.use('/api/auth', authRouter);
  app.use('/api/rooms', roomRouter);
  app.use('/api/bookings', bookingRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api', overviewRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
