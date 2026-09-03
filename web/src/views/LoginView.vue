<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { Calendar, Lock, User } from '@element-plus/icons-vue';

const router = useRouter(); const auth = useAuthStore(); const loading = ref(false);
const form = reactive({ username: 'employee', password: 'Demo@123' });
async function submit() { loading.value = true; try { await auth.login(form.username, form.password); router.push('/dashboard'); } finally { loading.value = false; } }
function fill(role: 'admin' | 'employee') { form.username = role; form.password = 'Demo@123'; }
</script>
<template>
  <div class="login-page">
    <section class="intro">
      <div class="logo"><Calendar /> 智会预约</div>
      <div class="intro-copy"><span>SMART MEETING</span><h1>让每一次会议<br />都有序发生</h1><p>会议室智能匹配、冲突检测、在线审批与全流程追踪，为企业会议资源提供清晰可靠的管理体验。</p></div>
      <div class="feature-row"><div><strong>规则驱动</strong><small>精准匹配会议空间</small></div><div><strong>全程可追溯</strong><small>预约状态透明流转</small></div><div><strong>本地化部署</strong><small>数据安全可控</small></div></div>
    </section>
    <main class="login-card">
      <div class="form-wrap"><p class="eyebrow">WELCOME BACK</p><h2>登录管理系统</h2><p class="tip">请输入您的账号信息继续</p>
        <el-form :model="form" size="large" @submit.prevent="submit">
          <el-form-item><el-input v-model="form.username" placeholder="用户名" :prefix-icon="User" /></el-form-item>
          <el-form-item><el-input v-model="form.password" type="password" show-password placeholder="密码" :prefix-icon="Lock" @keyup.enter="submit" /></el-form-item>
          <el-button type="primary" class="login-btn" :loading="loading" @click="submit">登录系统</el-button>
        </el-form>
        <div class="demo"><span>演示账号</span><button @click="fill('employee')">员工 employee</button><button @click="fill('admin')">管理员 admin</button><small>统一密码：Demo@123</small></div>
        <footer>智能会议预约管理系统 V1.0</footer>
      </div>
    </main>
  </div>
</template>
<style scoped>
.login-page{min-height:100vh;display:grid;grid-template-columns:58% 42%;background:#fff}.intro{position:relative;overflow:hidden;padding:46px 62px;color:#fff;background:radial-gradient(circle at 80% 18%,rgba(86,160,255,.25),transparent 32%),linear-gradient(145deg,#0d2144,#163b73 62%,#1f5594)}.intro::after{content:'';position:absolute;width:520px;height:520px;border:1px solid rgba(255,255,255,.08);border-radius:50%;right:-160px;bottom:-210px;box-shadow:0 0 0 70px rgba(255,255,255,.03),0 0 0 140px rgba(255,255,255,.025)}.logo{display:flex;gap:11px;align-items:center;font-size:20px;font-weight:700}.logo svg{width:32px}.intro-copy{position:absolute;top:31%;max-width:580px}.intro-copy span{font-size:12px;letter-spacing:4px;color:#71d6cd}.intro-copy h1{font-size:54px;line-height:1.2;margin:18px 0 24px}.intro-copy p{max-width:520px;color:#bed0e8;line-height:1.9}.feature-row{position:absolute;left:62px;right:62px;bottom:58px;display:flex;gap:54px;z-index:2}.feature-row strong,.feature-row small{display:block}.feature-row small{color:#89a6ca;margin-top:8px;font-size:12px}.login-card{display:grid;place-items:center;padding:70px}.form-wrap{width:390px}.eyebrow{color:#3974e8;font-size:12px;font-weight:700;letter-spacing:2px}.form-wrap h2{font-size:32px;margin:12px 0 8px}.tip{color:#8b96a8;margin:0 0 34px}.login-btn{width:100%;height:46px;margin-top:8px;background:#2867db}.demo{margin-top:28px;padding:16px;border-radius:10px;background:#f5f8fc;color:#69758a;font-size:12px}.demo span,.demo small{display:block;margin-bottom:9px}.demo button{border:0;background:#e5edfa;color:#315c9a;padding:7px 10px;margin:0 8px 9px 0;border-radius:6px;cursor:pointer}.form-wrap footer{text-align:center;color:#a1a9b6;font-size:11px;margin-top:42px}
</style>
