import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { http } from '../api/http';
import StatusTag from '../components/StatusTag.vue';
const date = ref(new Date());
const bookings = ref([]);
async function load() { bookings.value = (await http.get('/calendar')).data; }
function dayItems(value) { const key = dayjs(value).format('YYYY-MM-DD'); return bookings.value.filter(b => dayjs(b.startTime).format('YYYY-MM-DD') === key); }
onMounted(load);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['calendar-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['calendar-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['calendar-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['calendar-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['date-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['event']} */ ;
/** @type {__VLS_StyleScopedClasses['event']} */ ;
/** @type {__VLS_StyleScopedClasses['event']} */ ;
/** @type {__VLS_StyleScopedClasses['date-cell']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page-header" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "panel calendar-panel" },
});
const __VLS_0 = {}.ElCalendar;
/** @type {[typeof __VLS_components.ElCalendar, typeof __VLS_components.elCalendar, typeof __VLS_components.ElCalendar, typeof __VLS_components.elCalendar, ]} */ ;
// @ts-ignore
ElCalendar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.date),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.date),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
// @ts-ignore
[date,];
{
    const { 'date-cell': __VLS_5 } = __VLS_3.slots;
    const [{ data }] = __VLS_getSlotParameters(__VLS_5);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "date-cell" },
    });
    __VLS_asFunctionalElement(__VLS_elements.b, __VLS_elements.b)({});
    (data.day.split('-')[2]);
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.dayItems(data.date).slice(0, 3)))) {
        // @ts-ignore
        [dayItems,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            key: (item.id),
            ...{ class: "event" },
            ...{ class: (item.status.toLowerCase()) },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (__VLS_ctx.dayjs(item.startTime).format('HH:mm'));
        // @ts-ignore
        [dayjs,];
        (item.title);
    }
    if (__VLS_ctx.dayItems(data.date).length > 3) {
        // @ts-ignore
        [dayItems,];
        __VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
        (__VLS_ctx.dayItems(data.date).length - 3);
        // @ts-ignore
        [dayItems,];
    }
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.aside, __VLS_elements.aside)({});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
if (!__VLS_ctx.dayItems(__VLS_ctx.date).length) {
    // @ts-ignore
    [date, dayItems,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "empty-block" },
    });
}
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.dayItems(__VLS_ctx.date)))) {
    // @ts-ignore
    [date, dayItems,];
    __VLS_asFunctionalElement(__VLS_elements.article, __VLS_elements.article)({
        key: (item.id),
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (item.title);
    __VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
    (item.room.name);
    (__VLS_ctx.dayjs(item.startTime).format('HH:mm'));
    (__VLS_ctx.dayjs(item.endTime).format('HH:mm'));
    // @ts-ignore
    [dayjs, dayjs,];
    /** @type {[typeof StatusTag, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(StatusTag, new StatusTag({
        status: (item.status),
    }));
    const __VLS_7 = __VLS_6({
        status: (item.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['calendar-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['date-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['event']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-block']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
