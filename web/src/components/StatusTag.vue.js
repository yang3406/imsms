const __VLS_props = defineProps();
const labels = { PENDING: '待审批', APPROVED: '已批准', REJECTED: '已驳回', CHECKED_IN: '已签到', IN_PROGRESS: '进行中', COMPLETED: '已完成', CANCELLED: '已取消', NO_SHOW: '已失约' };
const types = { PENDING: 'warning', APPROVED: 'success', REJECTED: 'danger', CHECKED_IN: 'primary', IN_PROGRESS: 'primary', COMPLETED: 'info', CANCELLED: 'info', NO_SHOW: 'danger' };
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ElTag;
/** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
// @ts-ignore
ElTag;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "status-tag" },
    type: (__VLS_ctx.types[__VLS_ctx.status]),
    effect: "light",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "status-tag" },
    type: (__VLS_ctx.types[__VLS_ctx.status]),
    effect: "light",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[types, status,];
(__VLS_ctx.labels[__VLS_ctx.status]);
// @ts-ignore
[status, labels,];
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['status-tag']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
