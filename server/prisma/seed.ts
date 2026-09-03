import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function atDayOffset(offset: number, hour: number, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  date.setHours(hour, minute, 0, 0);
  return date;
}

async function main() {
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.meetingTemplate.deleteMany();
  await prisma.maintenanceWindow.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();
  await prisma.bookingRule.deleteMany();

  const [technology, operations, administration] = await Promise.all([
    prisma.department.create({ data: { name: '技术研发部' } }),
    prisma.department.create({ data: { name: '运营中心' } }),
    prisma.department.create({ data: { name: '行政管理部' } })
  ]);
  const passwordHash = await bcrypt.hash('Demo@123', 10);
  const admin = await prisma.user.create({ data: { username: 'admin', passwordHash, name: '系统管理员', email: 'admin@example.local', role: 'ADMIN', departmentId: administration.id } });
  const employee = await prisma.user.create({ data: { username: 'employee', passwordHash, name: '示例员工', email: 'employee@example.local', role: 'EMPLOYEE', departmentId: technology.id } });
  await prisma.user.create({ data: { username: 'operator', passwordHash, name: '运营专员', email: 'operator@example.local', role: 'EMPLOYEE', departmentId: operations.id } });

  const ocean = await prisma.room.create({ data: { name: '海纳会议室', location: 'A座 3层', capacity: 12, equipment: '投影仪,白板,视频会议', openTime: '08:00', closeTime: '20:00', description: '适合项目评审和远程视频会议' } });
  const cloud = await prisma.room.create({ data: { name: '云帆会议室', location: 'A座 5层', capacity: 6, equipment: '显示屏,白板', openTime: '09:00', closeTime: '18:00', description: '适合小组讨论和每日站会' } });
  const star = await prisma.room.create({ data: { name: '星河报告厅', location: 'B座 1层', capacity: 60, equipment: '投影仪,音响,无线麦克风,视频会议', openTime: '08:00', closeTime: '21:00', description: '适合培训、宣讲和大型会议' } });
  await prisma.maintenanceWindow.create({ data: { roomId: star.id, startTime: atDayOffset(3, 12), endTime: atDayOffset(3, 14), reason: '音响设备例行维护' } });
  await prisma.bookingRule.create({ data: { id: 1, minAdvanceMinutes: 0, maxDurationMinutes: 480, checkInEarlyMinutes: 15, noShowMinutes: 30 } });

  const approved = await prisma.booking.create({ data: {
    code: 'MR-DEMO-0001', title: '产品迭代评审会', description: '评审下一阶段产品迭代计划', roomId: ocean.id, creatorId: employee.id,
    attendeeNames: '示例员工,运营专员,系统管理员', attendeeCount: 3, startTime: atDayOffset(1, 10), endTime: atDayOffset(1, 11, 30),
    status: 'APPROVED', approverId: admin.id, approvalComment: '时间与资源符合要求', approvedAt: new Date()
  } });
  const pending = await prisma.booking.create({ data: {
    code: 'MR-DEMO-0002', title: '研发周例会', description: '同步研发进度和风险', roomId: cloud.id, creatorId: employee.id,
    attendeeNames: '示例员工,运营专员', attendeeCount: 2, startTime: atDayOffset(2, 14), endTime: atDayOffset(2, 15), status: 'PENDING'
  } });
  await prisma.auditLog.createMany({ data: [
    { userId: employee.id, bookingId: approved.id, action: 'CREATE', entityType: 'BOOKING', entityId: String(approved.id), detail: '提交预约 MR-DEMO-0001' },
    { userId: admin.id, bookingId: approved.id, action: 'APPROVE', entityType: 'BOOKING', entityId: String(approved.id), detail: '批准预约：时间与资源符合要求' },
    { userId: employee.id, bookingId: pending.id, action: 'CREATE', entityType: 'BOOKING', entityId: String(pending.id), detail: '提交预约 MR-DEMO-0002' }
  ] });
  await prisma.notification.createMany({ data: [
    { userId: employee.id, title: '预约已批准', content: 'MR-DEMO-0001 产品迭代评审会已批准' },
    { userId: employee.id, title: '预约已提交', content: 'MR-DEMO-0002 研发周例会正在等待审批' }
  ] });
  await prisma.meetingTemplate.create({ data: { userId:employee.id, name:'研发周例会模板', title:'研发周例会', description:'同步研发进度、风险和下一步计划', attendeeNames:'示例员工,运营专员', attendeeCount:2, equipment:'显示屏,白板' } });
}

main().then(() => console.log('演示数据初始化完成')).finally(() => prisma.$disconnect());
