import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { http } from '../api/http';
const rows = ref([]);
async function load() { rows.value = (await http.get('/notifications')).data; }
async function read(row) { if (!row.read) {
    await http.post(`/notifications/${row.id}/read`);
    row.read = true;
} }
onMounted(load);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['notice-list']} */ ;
/** @type {__VLS_StyleScopedClasses['notice-list']} */ ;
/** @type {__VLS_StyleScopedClasses['notice-list']} */ ;
/** @type {__VLS_StyleScopedClasses['notice-list']} */ ;
/** @type {__VLS_StyleScopedClasses['notice-list']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page-header" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
const __VLS_0 = {}.ElTag;
/** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
// @ts-ignore
ElTag;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
(__VLS_ctx.rows.filter(x => !x.read).length);
// @ts-ignore
[rows,];
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "panel notice-list" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.rows))) {
    // @ts-ignore
    [rows,];
    __VLS_asFunctionalElement(__VLS_elements.article, __VLS_elements.article)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.read(item);
                // @ts-ignore
                [read,];
            } },
        key: (item.id),
        ...{ class: ({ unread: !item.read }) },
    });
    __VLS_asFunctionalElement(__VLS_elements.i, __VLS_elements.i)({});
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (item.title);
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    (item.content);
    __VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
    (__VLS_ctx.dayjs(item.createdAt).format('YYYY-MM-DD HH:mm'));
    // @ts-ignore
    [dayjs,];
    if (!item.read) {
        const __VLS_5 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        ElTag;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
            size: "small",
        }));
        const __VLS_7 = __VLS_6({
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        const { default: __VLS_9 } = __VLS_8.slots;
        var __VLS_8;
    }
}
if (!__VLS_ctx.rows.length) {
    // @ts-ignore
    [rows,];
    const __VLS_10 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    ElEmpty;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        description: "暂无通知",
    }));
    const __VLS_12 = __VLS_11({
        description: "暂无通知",
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['notice-list']} */ ;
/** @type {__VLS_StyleScopedClasses['unread']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
