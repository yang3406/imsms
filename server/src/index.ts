import 'dotenv/config';
import { createApp } from './app.js';
import { prisma } from './db.js';

const port = Number(process.env.PORT ?? 3000);
const server = createApp().listen(port, () => console.log(`智能会议预约管理系统 API 已启动：http://localhost:${port}`));

async function shutdown() {
  server.close();
  await prisma.$disconnect();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
