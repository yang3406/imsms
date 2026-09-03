<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { Calendar, DataAnalysis, House, List, OfficeBuilding, Setting, Bell, CirclePlus, Check, SwitchButton } from '@element-plus/icons-vue';

const route = useRoute(); const router = useRouter(); const auth = useAuthStore();
function logout() { auth.logout(); router.push('/login'); }
</script>
<template>
  <el-container class="shell">
    <el-aside width="232px" class="sidebar">
      <div class="brand"><div class="brand-mark">智</div><div><strong>智会预约</strong><small>V1.0</small></div></div>
      <el-menu router :default-active="route.path" class="nav">
        <el-menu-item index="/dashboard"><el-icon><House /></el-icon><span>工作台</span></el-menu-item>
        <el-menu-item index="/booking/create"><el-icon><CirclePlus /></el-icon><span>智能预约</span></el-menu-item>
        <el-menu-item index="/bookings"><el-icon><List /></el-icon><span>我的预约</span></el-menu-item>
        <el-menu-item index="/calendar"><el-icon><Calendar /></el-icon><span>预约日历</span></el-menu-item>
        <el-menu-item index="/rooms"><el-icon><OfficeBuilding /></el-icon><span>会议室资源</span></el-menu-item>
        <template v-if="auth.isAdmin">
          <div class="menu-label">管理中心</div>
          <el-menu-item index="/approvals"><el-icon><Check /></el-icon><span>预约审批</span></el-menu-item>
          <el-menu-item index="/statistics"><el-icon><DataAnalysis /></el-icon><span>统计分析</span></el-menu-item>
          <el-menu-item index="/system"><el-icon><Setting /></el-icon><span>系统管理</span></el-menu-item>
        </template>
      </el-menu>
      <div class="sidebar-footer">智能会议预约管理系统<br />© 2026 V1.0</div>
    </el-aside>
    <el-container>
      <el-header class="topbar">
        <div><span class="crumb">{{ route.meta.title }}</span></div>
        <div class="user-area">
          <el-button text circle @click="router.push('/notifications')"><el-icon size="20"><Bell /></el-icon></el-button>
          <div class="avatar">{{ auth.user?.name.slice(0, 1) }}</div>
          <div><strong>{{ auth.user?.name }}</strong><small>{{ auth.user?.department }} · {{ auth.isAdmin ? '管理员' : '员工' }}</small></div>
          <el-button text type="danger" @click="logout"><el-icon><SwitchButton /></el-icon>退出</el-button>
        </div>
      </el-header>
      <el-main class="content"><router-view /></el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
.shell { min-height: 100vh; }
.sidebar { position: fixed; inset: 0 auto 0 0; background: #10213f; color: #fff; z-index: 10; }
.brand { height: 82px; display: flex; align-items: center; gap: 12px; padding: 0 22px; border-bottom: 1px solid rgba(255,255,255,.08); }
.brand-mark { width: 38px; height: 38px; display:grid; place-items:center; border-radius: 11px; background: linear-gradient(135deg,#4e8cff,#65d6c0); font-weight: 800; font-size: 20px; }
.brand strong { display:block; font-size:18px; }.brand small { display:block; margin-top:3px;color:#8fa4c6;font-size:11px;letter-spacing:1px; }
.nav { border: 0; background: transparent; padding: 14px 10px; }.nav :deep(.el-menu-item) { color:#b6c3d9;border-radius:9px;margin:3px 0;height:46px; }.nav :deep(.el-menu-item:hover) { background:#172d52;color:#fff; }.nav :deep(.el-menu-item.is-active) { color:#fff;background:linear-gradient(90deg,#2867db,#3c82f0); }
.menu-label { padding: 19px 12px 7px; color:#6980a5;font-size:11px;text-transform:uppercase;letter-spacing:1.4px; }
.sidebar-footer { position:absolute;bottom:18px;left:20px;color:#61779a;font-size:11px;line-height:1.8; }
.topbar { margin-left:232px;height:72px;background:#fff;border-bottom:1px solid #e7ebf2;display:flex;align-items:center;justify-content:space-between;padding:0 26px; }
.crumb { font-size:18px;font-weight:700; }.user-area{display:flex;align-items:center;gap:11px}.user-area small{display:block;color:#8b96a8;font-size:11px;margin-top:3px}.avatar{width:36px;height:36px;display:grid;place-items:center;border-radius:10px;background:#e8f1ff;color:#2867db;font-weight:700}
.content { margin-left:232px;padding:0;background:#f3f6fa; }
</style>
