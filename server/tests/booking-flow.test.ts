import 'dotenv/config';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { prisma } from '../src/db.js';

const app = createApp();
let employeeToken = '';
let adminToken = '';
let roomId = 0;
let bookingId = 0;
const extraBookingIds: number[] = [];
let templateId = 0;

function future(dayOffset: number, hour: number) {
  const value = new Date();
  value.setDate(value.getDate() + dayOffset);
  value.setHours(hour, 0, 0, 0);
  return value;
}

beforeAll(async () => {
  const stale = await prisma.booking.findMany({ where: { title: { in: ['自动化核心流程验证会议', '冲突验证会议', '周期预约自动化验证'] } }, select: { id: true } });
  const staleIds = stale.map((item) => item.id);
  if (staleIds.length) {
    await prisma.auditLog.deleteMany({ where: { bookingId: { in: staleIds } } });
    await prisma.booking.deleteMany({ where: { id: { in: staleIds } } });
  }
  await prisma.meetingTemplate.deleteMany({ where: { name: '自动化测试模板' } });
  const employee = await request(app).post('/api/auth/login').send({ username: 'employee', password: 'Demo@123' });
  const admin = await request(app).post('/api/auth/login').send({ username: 'admin', password: 'Demo@123' });
  employeeToken = employee.body.token;
  adminToken = admin.body.token;
  roomId = (await prisma.room.findFirstOrThrow({ where: { name: '海纳会议室' } })).id;
});

afterAll(async () => {
  const ids = [bookingId, ...extraBookingIds].filter(Boolean);
  if (ids.length) {
    await prisma.auditLog.deleteMany({ where: { bookingId: { in: ids } } });
    await prisma.booking.deleteMany({ where: { id: { in: ids } } });
  }
  if (templateId) await prisma.meetingTemplate.deleteMany({ where: { id: templateId } });
  await prisma.$disconnect();
});

describe('核心预约业务闭环', () => {
  it('员工可以获得符合条件的会议室推荐', async () => {
    const response = await request(app).get('/api/rooms/recommend').set('Authorization', `Bearer ${employeeToken}`).query({
      startTime: future(10, 10).toISOString(), endTime: future(10, 11).toISOString(), attendeeCount: 4, equipment: '投影仪,白板'
    });
    expect(response.status).toBe(200);
    expect(response.body.some((room: { name: string }) => room.name === '海纳会议室')).toBe(true);
    expect(response.body[0]).toHaveProperty('score');
  });

  it('员工可以提交真实预约申请', async () => {
    const response = await request(app).post('/api/bookings').set('Authorization', `Bearer ${employeeToken}`).send({
      title: '自动化核心流程验证会议', description: '由测试创建并在测试结束后清理', roomId, attendeeNames: ['示例员工', '测试成员'], attendeeCount: 2,
      startTime: future(10, 10).toISOString(), endTime: future(10, 11).toISOString()
    });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('PENDING');
    bookingId = response.body.id;
  });

  it('系统拒绝同一会议室的重叠预约', async () => {
    const response = await request(app).post('/api/bookings').set('Authorization', `Bearer ${employeeToken}`).send({
      title: '冲突验证会议', roomId, attendeeNames: ['示例员工'], attendeeCount: 1,
      startTime: future(10, 10).toISOString(), endTime: future(10, 11).toISOString()
    });
    expect(response.status).toBe(409);
    expect(response.body.message).toContain('冲突');
  });

  it('普通员工不能访问审批列表', async () => {
    const response = await request(app).get('/api/admin/approvals').set('Authorization', `Bearer ${employeeToken}`);
    expect(response.status).toBe(403);
  });

  it('管理员审批时再次校验并批准预约', async () => {
    const response = await request(app).post(`/api/admin/approvals/${bookingId}`).set('Authorization', `Bearer ${adminToken}`).send({ action: 'APPROVE', comment: '测试审批通过' });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('APPROVED');
  });

  it('已批准会议可以完成签到、开始和结束状态闭环', async () => {
    const now = new Date();
    await prisma.booking.update({ where:{ id:bookingId }, data:{ startTime:new Date(now.getTime()+5*60000), endTime:new Date(now.getTime()+60*60000) } });
    const checkedIn = await request(app).post(`/api/bookings/${bookingId}/check-in`).set('Authorization', `Bearer ${employeeToken}`);
    expect(checkedIn.body.status).toBe('CHECKED_IN');
    const started = await request(app).post(`/api/bookings/${bookingId}/start`).set('Authorization', `Bearer ${employeeToken}`);
    expect(started.body.status).toBe('IN_PROGRESS');
    const completed = await request(app).post(`/api/bookings/${bookingId}/complete`).set('Authorization', `Bearer ${employeeToken}`);
    expect(completed.body.status).toBe('COMPLETED');
    expect(completed.body.audits.some((item: { action:string }) => item.action === 'COMPLETE')).toBe(true);
  });

  it('员工可以保存会议模板并导出预约 CSV', async () => {
    const saved = await request(app).post('/api/bookings/templates').set('Authorization', `Bearer ${employeeToken}`).send({ name:'自动化测试模板', title:'测试例会', description:'测试后清理', attendeeNames:['示例员工'], attendeeCount:1, equipment:['白板'] });
    expect(saved.status).toBe(201);
    templateId = saved.body.id;
    const exported = await request(app).get('/api/bookings/export/csv').set('Authorization', `Bearer ${employeeToken}`);
    expect(exported.status).toBe(200);
    expect(exported.headers['content-type']).toContain('text/csv');
    expect(exported.text).toContain('预约编号');
  });

  it('周期预约会创建具有同一系列编号的多场会议', async () => {
    const response = await request(app).post('/api/bookings').set('Authorization', `Bearer ${employeeToken}`).send({ title:'周期预约自动化验证', roomId, attendeeNames:['示例员工'], attendeeCount:1, startTime:future(20,15).toISOString(), endTime:future(20,16).toISOString(), repeatWeeks:2 });
    expect(response.status).toBe(201);
    expect(response.body.createdCount).toBe(2);
    expect(response.body.seriesCode).toBeTruthy();
    const rows = await prisma.booking.findMany({ where: { seriesCode:response.body.seriesCode } });
    expect(rows).toHaveLength(2);
    extraBookingIds.push(...rows.map((row) => row.id));
  });
});
