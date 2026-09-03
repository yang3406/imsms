<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { http } from '../api/http';
import StatusTag from '../components/StatusTag.vue';
import type { Booking } from '../types';
const router=useRouter();const bookings=ref<Booking[]>([]);const status=ref('');
async function load(){bookings.value=(await http.get('/bookings',{params:{status:status.value||undefined}})).data}
async function exportCsv(){const response=await http.get('/bookings/export/csv',{responseType:'blob'});const url=URL.createObjectURL(response.data);const anchor=document.createElement('a');anchor.href=url;anchor.download='会议预约记录.csv';anchor.click();URL.revokeObjectURL(url);ElMessage.success('预约记录已导出')}
async function cancel(row:Booking){await ElMessageBox.confirm(`确定取消“${row.title}”吗？`,'取消预约',{type:'warning'});await http.post(`/bookings/${row.id}/cancel`);ElMessage.success('预约已取消，会议室时段已释放');load()}
onMounted(load);
</script>
<template><div class="page"><div class="page-header"><div><h2>我的预约</h2><p>查看预约状态并完成签到、开始、结束或取消操作</p></div><div><el-button @click="exportCsv">导出 CSV</el-button><el-button type="primary" @click="router.push('/booking/create')">+ 新建预约</el-button></div></div><section class="panel"><div class="toolbar"><el-select v-model="status" placeholder="全部状态" clearable style="width:160px" @change="load"><el-option label="待审批" value="PENDING"/><el-option label="已批准" value="APPROVED"/><el-option label="进行中" value="IN_PROGRESS"/><el-option label="已完成" value="COMPLETED"/><el-option label="已取消" value="CANCELLED"/></el-select><el-button @click="load">刷新</el-button></div><el-table :data="bookings" stripe empty-text="暂无预约记录"><el-table-column prop="code" label="预约编号" width="185"/><el-table-column prop="title" label="会议主题" min-width="180"/><el-table-column prop="room.name" label="会议室" width="130"/><el-table-column label="会议时间" width="205"><template #default="s">{{dayjs(s.row.startTime).format('MM-DD HH:mm')}} - {{dayjs(s.row.endTime).format('HH:mm')}}</template></el-table-column><el-table-column prop="attendeeCount" label="人数" width="70"/><el-table-column label="状态" width="95"><template #default="s"><StatusTag :status="s.row.status"/></template></el-table-column><el-table-column label="操作" width="155" fixed="right"><template #default="s"><el-button link type="primary" @click="router.push(`/bookings/${s.row.id}`)">详情</el-button><el-button v-if="['PENDING','APPROVED'].includes(s.row.status)" link type="danger" @click="cancel(s.row)">取消</el-button></template></el-table-column></el-table></section></div></template>
