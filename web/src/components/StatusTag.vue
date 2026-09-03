<script setup lang="ts">
import type { BookingStatus } from '../types';
defineProps<{ status: BookingStatus }>();
const labels: Record<BookingStatus, string> = { PENDING: '待审批', APPROVED: '已批准', REJECTED: '已驳回', CHECKED_IN: '已签到', IN_PROGRESS: '进行中', COMPLETED: '已完成', CANCELLED: '已取消', NO_SHOW: '已失约' };
const types: Record<BookingStatus, '' | 'success' | 'warning' | 'info' | 'danger' | 'primary'> = { PENDING: 'warning', APPROVED: 'success', REJECTED: 'danger', CHECKED_IN: 'primary', IN_PROGRESS: 'primary', COMPLETED: 'info', CANCELLED: 'info', NO_SHOW: 'danger' };
</script>
<template><el-tag class="status-tag" :type="types[status]" effect="light">{{ labels[status] }}</el-tag></template>
