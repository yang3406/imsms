<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { http } from '../api/http';
import { useAuthStore } from '../stores/auth';
import StatusTag from '../components/StatusTag.vue';
import type { Booking } from '../types';

const auth = useAuthStore(); const router = useRouter();
const data = ref<{ rooms:number; todayMeetings:number; pending:number; completed:number; cancelled:number; recent:Booking[] }>({ rooms:0,todayMeetings:0,pending:0,completed:0,cancelled:0,recent:[] });
onMounted(async () => { data.value = (await http.get('/dashboard')).data; });
</script>
<template><div class="page">
  <div class="welcome"><div><p>{{ dayjs().format('YYYY年M月D日 dddd') }}</p><h2>{{ auth.user?.name }}，欢迎回来</h2><span>今天也要让会议安排清晰高效。</span></div><el-button type="primary" size="large" @click="router.push('/booking/create')">+ 发起智能预约</el-button></div>
  <div class="metric-grid">
    <div class="metric-card" style="--tint:#edf5ff"><div class="label">可用会议室</div><div class="value">{{ data.rooms }}</div><small>当前已启用资源</small></div>
    <div class="metric-card" style="--tint:#ecfbf6"><div class="label">今日会议</div><div class="value">{{ data.todayMeetings }}</div><small>今日安排总数</small></div>
    <div class="metric-card" style="--tint:#fff7e9"><div class="label">待审批</div><div class="value">{{ data.pending }}</div><small>等待处理的申请</small></div>
    <div class="metric-card" style="--tint:#f2efff"><div class="label">已完成</div><div class="value">{{ data.completed }}</div><small>累计顺利完成</small></div>
  </div>
  <div class="two-column"><section class="panel"><div class="section-title"><h3>近期预约</h3><el-button link type="primary" @click="router.push('/bookings')">查看全部</el-button></div>
    <el-table :data="data.recent" empty-text="暂无预约记录"><el-table-column prop="title" label="会议主题" min-width="180" /><el-table-column prop="room.name" label="会议室" width="130" /><el-table-column label="开始时间" width="170"><template #default="s">{{ dayjs(s.row.startTime).format('MM-DD HH:mm') }}</template></el-table-column><el-table-column label="状态" width="90"><template #default="s"><StatusTag :status="s.row.status" /></template></el-table-column></el-table>
  </section><section class="panel"><div class="section-title"><h3>快捷操作</h3></div><div class="quick"><button @click="router.push('/booking/create')"><b>01</b><span>智能预约<small>按时间与设备推荐空间</small></span></button><button @click="router.push('/calendar')"><b>02</b><span>查看日历<small>掌握会议室占用情况</small></span></button><button @click="router.push('/rooms')"><b>03</b><span>会议室资源<small>查看容量与配套设备</small></span></button></div></section></div>
</div></template>
<style scoped>.welcome{display:flex;align-items:center;justify-content:space-between;padding:28px 30px;margin-bottom:20px;border-radius:15px;color:#fff;background:linear-gradient(110deg,#163c73,#2868bd 70%,#4288d6)}.welcome p{margin:0 0 8px;color:#a8c7eb;font-size:13px}.welcome h2{margin:0 0 8px;font-size:25px}.welcome span{color:#c4d9ef;font-size:13px}.welcome .el-button{background:#fff;color:#2867db;border:0}.metric-card small{display:block;margin-top:6px;color:#a0a9b8}.quick{display:grid;gap:10px}.quick button{display:flex;gap:15px;align-items:center;width:100%;padding:15px;border:1px solid #e7ebf2;border-radius:10px;background:#fff;text-align:left;cursor:pointer}.quick button:hover{border-color:#3974e8;background:#f7faff}.quick b{width:36px;height:36px;display:grid;place-items:center;border-radius:9px;background:#eaf2ff;color:#3974e8}.quick span,.quick small{display:block}.quick small{color:#929cad;margin-top:4px}</style>
