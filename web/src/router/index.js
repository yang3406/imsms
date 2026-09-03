import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
const routes = [
    { path: '/login', component: () => import('../views/LoginView.vue'), meta: { public: true } },
    { path: '/', component: () => import('../layouts/MainLayout.vue'), redirect: '/dashboard', children: [
            { path: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { title: '工作台' } },
            { path: 'rooms', component: () => import('../views/RoomsView.vue'), meta: { title: '会议室资源' } },
            { path: 'booking/create', component: () => import('../views/CreateBookingView.vue'), meta: { title: '智能预约' } },
            { path: 'bookings', component: () => import('../views/BookingsView.vue'), meta: { title: '我的预约' } },
            { path: 'bookings/:id', component: () => import('../views/BookingDetailView.vue'), meta: { title: '预约详情' } },
            { path: 'calendar', component: () => import('../views/CalendarView.vue'), meta: { title: '预约日历' } },
            { path: 'approvals', component: () => import('../views/ApprovalsView.vue'), meta: { title: '预约审批', admin: true } },
            { path: 'statistics', component: () => import('../views/StatisticsView.vue'), meta: { title: '统计分析', admin: true } },
            { path: 'notifications', component: () => import('../views/NotificationsView.vue'), meta: { title: '站内通知' } },
            { path: 'system', component: () => import('../views/SystemView.vue'), meta: { title: '系统管理', admin: true } }
        ] },
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
];
const router = createRouter({ history: createWebHistory(), routes });
router.beforeEach((to) => {
    const auth = useAuthStore();
    if (!to.meta.public && !auth.user)
        return '/login';
    if (to.meta.admin && !auth.isAdmin)
        return '/dashboard';
    if (to.path === '/login' && auth.user)
        return '/dashboard';
    document.title = `${String(to.meta.title ?? '登录')} - 智能会议预约管理系统 V1.0`;
});
export default router;
