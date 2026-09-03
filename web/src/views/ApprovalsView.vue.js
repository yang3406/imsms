import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { http } from '../api/http';
const rows = ref([]);
async function load() { rows.value = (await http.get('/admin/approvals')).data; }
async function decide(row, action) { let comment = ''; if (action === 'REJECT')
    comment = await ElMessageBox.prompt('请填写驳回原因', '驳回预约', { inputValidator: v => !!v || '必须填写原因' }).then(r => r.value);
else
    await ElMessageBox.confirm(`确认批准“${row.title}”吗？系统将再次校验冲突。`, '批准预约', { type: 'success' }); await http.post(`/admin/approvals/${row.id}`, { action, comment }); ElMessage.success(action === 'APPROVE' ? '预约已批准' : '预约已驳回'); load(); }
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
const __VLS_0 = {}.ElTag;
/** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
// @ts-ignore
ElTag;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    type: "warning",
    size: "large",
}));
const __VLS_2 = __VLS_1({
    type: "warning",
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
(__VLS_ctx.rows.length);
// @ts-ignore
[rows,];
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "panel" },
});
const __VLS_5 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
ElTable;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    data: (__VLS_ctx.rows),
    emptyText: "当前没有待审批申请",
}));
const __VLS_7 = __VLS_6({
    data: (__VLS_ctx.rows),
    emptyText: "当前没有待审批申请",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
// @ts-ignore
[rows,];
const __VLS_10 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    prop: "code",
    label: "预约编号",
    width: "155",
}));
const __VLS_12 = __VLS_11({
    prop: "code",
    label: "预约编号",
    width: "155",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const __VLS_15 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    prop: "title",
    label: "会议主题",
    minWidth: "180",
}));
const __VLS_17 = __VLS_16({
    prop: "title",
    label: "会议主题",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "申请人",
    width: "130",
}));
const __VLS_22 = __VLS_21({
    label: "申请人",
    width: "130",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_24 } = __VLS_23.slots;
{
    const { default: __VLS_25 } = __VLS_23.slots;
    const [s] = __VLS_getSlotParameters(__VLS_25);
    (s.row.creator.name);
    __VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({
        ...{ class: "dept" },
    });
    (s.row.creator.department?.name);
}
var __VLS_23;
const __VLS_26 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    prop: "room.name",
    label: "会议室",
    width: "125",
}));
const __VLS_28 = __VLS_27({
    prop: "room.name",
    label: "会议室",
    width: "125",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
const __VLS_31 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    label: "时间",
    width: "195",
}));
const __VLS_33 = __VLS_32({
    label: "时间",
    width: "195",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
const { default: __VLS_35 } = __VLS_34.slots;
{
    const { default: __VLS_36 } = __VLS_34.slots;
    const [s] = __VLS_getSlotParameters(__VLS_36);
    (__VLS_ctx.dayjs(s.row.startTime).format('MM-DD HH:mm'));
    (__VLS_ctx.dayjs(s.row.endTime).format('HH:mm'));
    // @ts-ignore
    [dayjs, dayjs,];
}
var __VLS_34;
const __VLS_37 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    prop: "attendeeCount",
    label: "人数",
    width: "65",
}));
const __VLS_39 = __VLS_38({
    prop: "attendeeCount",
    label: "人数",
    width: "65",
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
const __VLS_42 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    label: "操作",
    width: "155",
    fixed: "right",
}));
const __VLS_44 = __VLS_43({
    label: "操作",
    width: "155",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
const { default: __VLS_46 } = __VLS_45.slots;
{
    const { default: __VLS_47 } = __VLS_45.slots;
    const [s] = __VLS_getSlotParameters(__VLS_47);
    const __VLS_48 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        ...{ 'onClick': {} },
        type: "success",
        link: true,
    }));
    const __VLS_50 = __VLS_49({
        ...{ 'onClick': {} },
        type: "success",
        link: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_52;
    let __VLS_53;
    const __VLS_54 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.decide(s.row, 'APPROVE');
                // @ts-ignore
                [decide,];
            } });
    const { default: __VLS_55 } = __VLS_51.slots;
    var __VLS_51;
    const __VLS_56 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        ...{ 'onClick': {} },
        type: "danger",
        link: true,
    }));
    const __VLS_58 = __VLS_57({
        ...{ 'onClick': {} },
        type: "danger",
        link: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    let __VLS_60;
    let __VLS_61;
    const __VLS_62 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.decide(s.row, 'REJECT');
                // @ts-ignore
                [decide,];
            } });
    const { default: __VLS_63 } = __VLS_59.slots;
    var __VLS_59;
}
var __VLS_45;
var __VLS_8;
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['dept']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
