import type { BookingStatus, Room } from '@prisma/client';
import { prisma } from '../db.js';
import { HttpError } from '../utils/http.js';

const blockingStatuses: BookingStatus[] = ['PENDING', 'APPROVED', 'CHECKED_IN', 'IN_PROGRESS'];

export function equipmentList(value: string) {
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

export async function validateRoomAvailability(input: {
  roomId: number;
  startTime: Date;
  endTime: Date;
  attendeeCount: number;
  excludeBookingId?: number;
}) {
  const room = await prisma.room.findUnique({ where: { id: input.roomId } });
  if (!room || !room.active) throw new HttpError(400, '会议室不存在或已停用');
  if (input.attendeeCount > room.capacity) throw new HttpError(400, `参会人数超过会议室容量 ${room.capacity}`);
  if (input.endTime <= input.startTime) throw new HttpError(400, '结束时间必须晚于开始时间');

  const localStart = `${String(input.startTime.getHours()).padStart(2, '0')}:${String(input.startTime.getMinutes()).padStart(2, '0')}`;
  const localEnd = `${String(input.endTime.getHours()).padStart(2, '0')}:${String(input.endTime.getMinutes()).padStart(2, '0')}`;
  if (localStart < room.openTime || localEnd > room.closeTime) {
    throw new HttpError(400, `预约时间须在会议室开放时间 ${room.openTime}-${room.closeTime} 内`);
  }

  const rule = await prisma.bookingRule.findUnique({ where: { id: 1 } });
  const durationMinutes = (input.endTime.getTime() - input.startTime.getTime()) / 60000;
  if (rule && durationMinutes > rule.maxDurationMinutes) throw new HttpError(400, `会议时长不能超过 ${rule.maxDurationMinutes} 分钟`);
  if (rule && input.startTime.getTime() < Date.now() + rule.minAdvanceMinutes * 60000) {
    throw new HttpError(400, `会议至少需要提前 ${rule.minAdvanceMinutes} 分钟预约`);
  }

  const overlapping = await prisma.booking.findFirst({
    where: {
      roomId: input.roomId,
      status: { in: blockingStatuses },
      startTime: { lt: input.endTime },
      endTime: { gt: input.startTime },
      ...(input.excludeBookingId ? { id: { not: input.excludeBookingId } } : {})
    }
  });
  if (overlapping) throw new HttpError(409, `该时段与预约 ${overlapping.code} 冲突`);

  const maintenance = await prisma.maintenanceWindow.findFirst({
    where: { roomId: input.roomId, startTime: { lt: input.endTime }, endTime: { gt: input.startTime } }
  });
  if (maintenance) throw new HttpError(409, `该时段会议室正在维护：${maintenance.reason}`);
  return room;
}

export function calculateRoomScore(room: Room, attendees: number, required: string[]) {
  const available = new Set(equipmentList(room.equipment));
  const matched = required.filter((item) => available.has(item)).length;
  const equipmentScore = required.length ? (matched / required.length) * 50 : 50;
  const capacityScore = Math.max(0, 40 - ((room.capacity - attendees) / room.capacity) * 25);
  return Math.round(equipmentScore + capacityScore + 10);
}

export async function addAudit(userId: number, action: 'CREATE' | 'UPDATE' | 'APPROVE' | 'REJECT' | 'CANCEL' | 'CHECK_IN' | 'START' | 'COMPLETE' | 'LOGIN', entityType: string, entityId: string, detail: string, bookingId?: number) {
  return prisma.auditLog.create({ data: { userId, action, entityType, entityId, detail, bookingId } });
}
