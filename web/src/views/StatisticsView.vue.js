import { computed, onMounted, ref } from 'vue';
import { http } from '../api/http';
const data = ref({ roomUsage: [], statusDistribution: [] });
const maxRoom = computed(() => Math.max(1, ...data.value.roomUsage.map(x => x.count)));
const labels = { PENDING: '待审批', APPROVED: '已批准', REJECTED: '已驳回', CHECKED_IN: '已签到', IN_PROGRESS: '进行中', COMPLETED: '已完成', CANCELLED: '已取消', NO_SHOW: '已失约' };
const total = computed(() => data.value.statusDistribution.reduce((n, x) => n + x.count, 0));
onMounted(async () => data.value = (await http.get('/statistics')).data);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['bar-row']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-row']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-row']} */ ;
/** @type {__VLS_StyleScopedClasses['status-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['status-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['status-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['status-grid']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page-header" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "metric-grid" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "metric-card" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "value" },
});
(__VLS_ctx.total);
// @ts-ignore
[total,];
__VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "metric-card" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "value" },
});
(__VLS_ctx.data.roomUsage.length);
// @ts-ignore
[data,];
__VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "metric-card" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "value" },
});
(__VLS_ctx.data.statusDistribution.find(x => x.status === 'COMPLETED')?.count || 0);
// @ts-ignore
[data,];
__VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "metric-card" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "value" },
});
(__VLS_ctx.data.statusDistribution.find(x => x.status === 'CANCELLED')?.count || 0);
// @ts-ignore
[data,];
__VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "two-column" },
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "panel" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "section-title" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
for (const [room] of __VLS_getVForSourceType((__VLS_ctx.data.roomUsage))) {
    // @ts-ignore
    [data,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (room.name),
        ...{ class: "bar-row" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (room.name);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.i, __VLS_elements.i)({
        ...{ style: ({ width: `${room.count / __VLS_ctx.maxRoom * 100}%` }) },
    });
    // @ts-ignore
    [maxRoom,];
    __VLS_asFunctionalElement(__VLS_elements.b, __VLS_elements.b)({});
    (room.count);
}
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "panel" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "section-title" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "status-grid" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.data.statusDistribution))) {
    // @ts-ignore
    [data,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (item.status),
    });
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (item.count);
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (__VLS_ctx.labels[item.status] || item.status);
    // @ts-ignore
    [labels,];
    __VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
    (__VLS_ctx.total ? Math.round(item.count / __VLS_ctx.total * 100) : 0);
    // @ts-ignore
    [total, total,];
}
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-card']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-card']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-card']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-card']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['two-column']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-row']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-grid']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
