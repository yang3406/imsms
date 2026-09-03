import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { http } from '../api/http';
import StatusTag from '../components/StatusTag.vue';
const router = useRouter();
const bookings = ref([]);
const status = ref('');
async function load() { bookings.value = (await http.get('/bookings', { params: { status: status.value || undefined } })).data; }
async function exportCsv() { const response = await http.get('/bookings/export/csv', { responseType: 'blob' }); const url = URL.createObjectURL(response.data); const anchor = document.createElement('a'); anchor.href = url; anchor.download = '会议预约记录.csv'; anchor.click(); URL.revokeObjectURL(url); ElMessage.success('预约记录已导出'); }
async function cancel(row) { await ElMessageBox.confirm(`确定取消“${row.title}”吗？`, '取消预约', { type: 'warning' }); await http.post(`/bookings/${row.id}/cancel`); ElMessage.success('预约已取消，会议室时段已释放'); load(); }
onMounted(load);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page-header" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.exportCsv) });
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[exportCsv,];
var __VLS_3;
const __VLS_8 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
const __VLS_14 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.router.push('/booking/create');
            // @ts-ignore
            [router,];
        } });
const { default: __VLS_15 } = __VLS_11.slots;
var __VLS_11;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "panel" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "toolbar" },
});
const __VLS_16 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
ElSelect;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.status),
    placeholder: "全部状态",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_18 = __VLS_17({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.status),
    placeholder: "全部状态",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
const __VLS_22 = ({ change: {} },
    { onChange: (__VLS_ctx.load) });
const { default: __VLS_23 } = __VLS_19.slots;
// @ts-ignore
[status, load,];
const __VLS_24 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
ElOption;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    label: "待审批",
    value: "PENDING",
}));
const __VLS_26 = __VLS_25({
    label: "待审批",
    value: "PENDING",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_29 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
ElOption;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    label: "已批准",
    value: "APPROVED",
}));
const __VLS_31 = __VLS_30({
    label: "已批准",
    value: "APPROVED",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const __VLS_34 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
ElOption;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    label: "进行中",
    value: "IN_PROGRESS",
}));
const __VLS_36 = __VLS_35({
    label: "进行中",
    value: "IN_PROGRESS",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const __VLS_39 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
ElOption;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    label: "已完成",
    value: "COMPLETED",
}));
const __VLS_41 = __VLS_40({
    label: "已完成",
    value: "COMPLETED",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const __VLS_44 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
ElOption;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    label: "已取消",
    value: "CANCELLED",
}));
const __VLS_46 = __VLS_45({
    label: "已取消",
    value: "CANCELLED",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
var __VLS_19;
const __VLS_49 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    ...{ 'onClick': {} },
}));
const __VLS_51 = __VLS_50({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
let __VLS_53;
let __VLS_54;
const __VLS_55 = ({ click: {} },
    { onClick: (__VLS_ctx.load) });
const { default: __VLS_56 } = __VLS_52.slots;
// @ts-ignore
[load,];
var __VLS_52;
const __VLS_57 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
ElTable;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    data: (__VLS_ctx.bookings),
    stripe: true,
    emptyText: "暂无预约记录",
}));
const __VLS_59 = __VLS_58({
    data: (__VLS_ctx.bookings),
    stripe: true,
    emptyText: "暂无预约记录",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const { default: __VLS_61 } = __VLS_60.slots;
// @ts-ignore
[bookings,];
const __VLS_62 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
    prop: "code",
    label: "预约编号",
    width: "185",
}));
const __VLS_64 = __VLS_63({
    prop: "code",
    label: "预约编号",
    width: "185",
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
const __VLS_67 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
    prop: "title",
    label: "会议主题",
    minWidth: "180",
}));
const __VLS_69 = __VLS_68({
    prop: "title",
    label: "会议主题",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
const __VLS_72 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    prop: "room.name",
    label: "会议室",
    width: "130",
}));
const __VLS_74 = __VLS_73({
    prop: "room.name",
    label: "会议室",
    width: "130",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const __VLS_77 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
    label: "会议时间",
    width: "205",
}));
const __VLS_79 = __VLS_78({
    label: "会议时间",
    width: "205",
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
const { default: __VLS_81 } = __VLS_80.slots;
{
    const { default: __VLS_82 } = __VLS_80.slots;
    const [s] = __VLS_getSlotParameters(__VLS_82);
    (__VLS_ctx.dayjs(s.row.startTime).format('MM-DD HH:mm'));
    (__VLS_ctx.dayjs(s.row.endTime).format('HH:mm'));
    // @ts-ignore
    [dayjs, dayjs,];
}
var __VLS_80;
const __VLS_83 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
    prop: "attendeeCount",
    label: "人数",
    width: "70",
}));
const __VLS_85 = __VLS_84({
    prop: "attendeeCount",
    label: "人数",
    width: "70",
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
const __VLS_88 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    label: "状态",
    width: "95",
}));
const __VLS_90 = __VLS_89({
    label: "状态",
    width: "95",
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
const { default: __VLS_92 } = __VLS_91.slots;
{
    const { default: __VLS_93 } = __VLS_91.slots;
    const [s] = __VLS_getSlotParameters(__VLS_93);
    /** @type {[typeof StatusTag, ]} */ ;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(StatusTag, new StatusTag({
        status: (s.row.status),
    }));
    const __VLS_95 = __VLS_94({
        status: (s.row.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
}
var __VLS_91;
const __VLS_98 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    label: "操作",
    width: "155",
    fixed: "right",
}));
const __VLS_100 = __VLS_99({
    label: "操作",
    width: "155",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
const { default: __VLS_102 } = __VLS_101.slots;
{
    const { default: __VLS_103 } = __VLS_101.slots;
    const [s] = __VLS_getSlotParameters(__VLS_103);
    const __VLS_104 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
    }));
    const __VLS_106 = __VLS_105({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_105));
    let __VLS_108;
    let __VLS_109;
    const __VLS_110 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.router.push(`/bookings/${s.row.id}`);
                // @ts-ignore
                [router,];
            } });
    const { default: __VLS_111 } = __VLS_107.slots;
    var __VLS_107;
    if (['PENDING', 'APPROVED'].includes(s.row.status)) {
        const __VLS_112 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({
            ...{ 'onClick': {} },
            link: true,
            type: "danger",
        }));
        const __VLS_114 = __VLS_113({
            ...{ 'onClick': {} },
            link: true,
            type: "danger",
        }, ...__VLS_functionalComponentArgsRest(__VLS_113));
        let __VLS_116;
        let __VLS_117;
        const __VLS_118 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(['PENDING', 'APPROVED'].includes(s.row.status)))
                        return;
                    __VLS_ctx.cancel(s.row);
                    // @ts-ignore
                    [cancel,];
                } });
        const { default: __VLS_119 } = __VLS_115.slots;
        var __VLS_115;
    }
}
var __VLS_101;
var __VLS_60;
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
