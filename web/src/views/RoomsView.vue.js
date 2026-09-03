import { onMounted, reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { http } from '../api/http';
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore();
const rooms = ref([]);
const dialog = ref(false);
const maintenanceDialog = ref(false);
const editingId = ref();
const roomForm = reactive({ name: '', location: '', capacity: 8, equipment: ['投影仪'], openTime: '08:00', closeTime: '20:00', description: '', active: true });
const maintenance = reactive({ roomId: 0, startTime: [], reason: '' });
async function load() { rooms.value = (await http.get('/rooms')).data; }
function edit(room) { editingId.value = room?.id; Object.assign(roomForm, room ? { ...room, equipment: room.equipment.split(',') } : { name: '', location: '', capacity: 8, equipment: ['投影仪'], openTime: '08:00', closeTime: '20:00', description: '', active: true }); dialog.value = true; }
async function save() { if (editingId.value)
    await http.put(`/rooms/${editingId.value}`, roomForm);
else
    await http.post('/rooms', roomForm); ElMessage.success('会议室信息已保存'); dialog.value = false; load(); }
function openMaintenance(room) { maintenance.roomId = room.id; maintenance.startTime = []; maintenance.reason = ''; maintenanceDialog.value = true; }
async function saveMaintenance() { await http.post(`/rooms/${maintenance.roomId}/maintenance`, { startTime: maintenance.startTime[0], endTime: maintenance.startTime[1], reason: maintenance.reason }); ElMessage.success('维护时段已添加'); maintenanceDialog.value = false; load(); }
onMounted(load);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['room-top']} */ ;
/** @type {__VLS_StyleScopedClasses['room-card']} */ ;
/** @type {__VLS_StyleScopedClasses['room-card']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page-header" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
if (__VLS_ctx.auth.isAdmin) {
    // @ts-ignore
    [auth,];
    const __VLS_0 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.auth.isAdmin))
                    return;
                __VLS_ctx.edit();
                // @ts-ignore
                [edit,];
            } });
    const { default: __VLS_7 } = __VLS_3.slots;
    var __VLS_3;
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "room-grid" },
});
for (const [room] of __VLS_getVForSourceType((__VLS_ctx.rooms))) {
    // @ts-ignore
    [rooms,];
    __VLS_asFunctionalElement(__VLS_elements.article, __VLS_elements.article)({
        key: (room.id),
        ...{ class: "room-card" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "room-top" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: (room.active ? 'open' : 'closed') },
    });
    (room.active ? '正常开放' : '已停用');
    __VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
    (room.location);
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
    (room.name);
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    (room.description || '暂无说明');
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "meta" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    __VLS_asFunctionalElement(__VLS_elements.b, __VLS_elements.b)({});
    (room.capacity);
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (room.openTime);
    (room.closeTime);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "equipment" },
    });
    for (const [item] of __VLS_getVForSourceType((room.equipment.split(',')))) {
        const __VLS_8 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        ElTag;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
            key: (item),
            size: "small",
            effect: "plain",
        }));
        const __VLS_10 = __VLS_9({
            key: (item),
            size: "small",
            effect: "plain",
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        const { default: __VLS_12 } = __VLS_11.slots;
        (item);
        var __VLS_11;
    }
    if (room.maintenance?.length) {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "maintenance" },
        });
        (__VLS_ctx.dayjs(room.maintenance[0].startTime).format('MM-DD HH:mm'));
        (room.maintenance[0].reason);
        // @ts-ignore
        [dayjs,];
    }
    if (__VLS_ctx.auth.isAdmin) {
        // @ts-ignore
        [auth,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "actions" },
        });
        const __VLS_13 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
            ...{ 'onClick': {} },
            link: true,
            type: "primary",
        }));
        const __VLS_15 = __VLS_14({
            ...{ 'onClick': {} },
            link: true,
            type: "primary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        let __VLS_17;
        let __VLS_18;
        const __VLS_19 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.auth.isAdmin))
                        return;
                    __VLS_ctx.edit(room);
                    // @ts-ignore
                    [edit,];
                } });
        const { default: __VLS_20 } = __VLS_16.slots;
        var __VLS_16;
        const __VLS_21 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
            ...{ 'onClick': {} },
            link: true,
        }));
        const __VLS_23 = __VLS_22({
            ...{ 'onClick': {} },
            link: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        let __VLS_25;
        let __VLS_26;
        const __VLS_27 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.auth.isAdmin))
                        return;
                    __VLS_ctx.openMaintenance(room);
                    // @ts-ignore
                    [openMaintenance,];
                } });
        const { default: __VLS_28 } = __VLS_24.slots;
        var __VLS_24;
    }
}
const __VLS_29 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
ElDialog;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    modelValue: (__VLS_ctx.dialog),
    title: (__VLS_ctx.editingId ? '编辑会议室' : '新增会议室'),
    width: "570px",
}));
const __VLS_31 = __VLS_30({
    modelValue: (__VLS_ctx.dialog),
    title: (__VLS_ctx.editingId ? '编辑会议室' : '新增会议室'),
    width: "570px",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const { default: __VLS_33 } = __VLS_32.slots;
// @ts-ignore
[dialog, editingId,];
const __VLS_34 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    model: (__VLS_ctx.roomForm),
    labelWidth: "90px",
}));
const __VLS_36 = __VLS_35({
    model: (__VLS_ctx.roomForm),
    labelWidth: "90px",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const { default: __VLS_38 } = __VLS_37.slots;
// @ts-ignore
[roomForm,];
const __VLS_39 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    label: "会议室名称",
    required: true,
}));
const __VLS_41 = __VLS_40({
    label: "会议室名称",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const { default: __VLS_43 } = __VLS_42.slots;
const __VLS_44 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    modelValue: (__VLS_ctx.roomForm.name),
}));
const __VLS_46 = __VLS_45({
    modelValue: (__VLS_ctx.roomForm.name),
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
// @ts-ignore
[roomForm,];
var __VLS_42;
const __VLS_49 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    label: "所在位置",
    required: true,
}));
const __VLS_51 = __VLS_50({
    label: "所在位置",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
const { default: __VLS_53 } = __VLS_52.slots;
const __VLS_54 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    modelValue: (__VLS_ctx.roomForm.location),
}));
const __VLS_56 = __VLS_55({
    modelValue: (__VLS_ctx.roomForm.location),
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
// @ts-ignore
[roomForm,];
var __VLS_52;
const __VLS_59 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
    label: "容纳人数",
}));
const __VLS_61 = __VLS_60({
    label: "容纳人数",
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
const { default: __VLS_63 } = __VLS_62.slots;
const __VLS_64 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
ElInputNumber;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    modelValue: (__VLS_ctx.roomForm.capacity),
    min: (1),
    max: (500),
}));
const __VLS_66 = __VLS_65({
    modelValue: (__VLS_ctx.roomForm.capacity),
    min: (1),
    max: (500),
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
// @ts-ignore
[roomForm,];
var __VLS_62;
const __VLS_69 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
    label: "配套设备",
}));
const __VLS_71 = __VLS_70({
    label: "配套设备",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_73 } = __VLS_72.slots;
const __VLS_74 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
ElSelect;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
    modelValue: (__VLS_ctx.roomForm.equipment),
    multiple: true,
    allowCreate: true,
    filterable: true,
    ...{ style: {} },
}));
const __VLS_76 = __VLS_75({
    modelValue: (__VLS_ctx.roomForm.equipment),
    multiple: true,
    allowCreate: true,
    filterable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
const { default: __VLS_78 } = __VLS_77.slots;
// @ts-ignore
[roomForm,];
for (const [item] of __VLS_getVForSourceType((['投影仪', '显示屏', '白板', '视频会议', '音响', '无线麦克风']))) {
    const __VLS_79 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    ElOption;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
        key: (item),
        label: (item),
        value: (item),
    }));
    const __VLS_81 = __VLS_80({
        key: (item),
        label: (item),
        value: (item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
}
var __VLS_77;
var __VLS_72;
const __VLS_84 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    label: "开放时间",
}));
const __VLS_86 = __VLS_85({
    label: "开放时间",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
const { default: __VLS_88 } = __VLS_87.slots;
const __VLS_89 = {}.ElTimeSelect;
/** @type {[typeof __VLS_components.ElTimeSelect, typeof __VLS_components.elTimeSelect, ]} */ ;
// @ts-ignore
ElTimeSelect;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
    modelValue: (__VLS_ctx.roomForm.openTime),
    start: "06:00",
    step: "00:30",
    end: "22:00",
    ...{ style: {} },
}));
const __VLS_91 = __VLS_90({
    modelValue: (__VLS_ctx.roomForm.openTime),
    start: "06:00",
    step: "00:30",
    end: "22:00",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
// @ts-ignore
[roomForm,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ style: {} },
});
const __VLS_94 = {}.ElTimeSelect;
/** @type {[typeof __VLS_components.ElTimeSelect, typeof __VLS_components.elTimeSelect, ]} */ ;
// @ts-ignore
ElTimeSelect;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    modelValue: (__VLS_ctx.roomForm.closeTime),
    start: "06:30",
    step: "00:30",
    end: "23:00",
    ...{ style: {} },
}));
const __VLS_96 = __VLS_95({
    modelValue: (__VLS_ctx.roomForm.closeTime),
    start: "06:30",
    step: "00:30",
    end: "23:00",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
// @ts-ignore
[roomForm,];
var __VLS_87;
const __VLS_99 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({
    label: "说明",
}));
const __VLS_101 = __VLS_100({
    label: "说明",
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
const { default: __VLS_103 } = __VLS_102.slots;
const __VLS_104 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
    modelValue: (__VLS_ctx.roomForm.description),
    type: "textarea",
}));
const __VLS_106 = __VLS_105({
    modelValue: (__VLS_ctx.roomForm.description),
    type: "textarea",
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
// @ts-ignore
[roomForm,];
var __VLS_102;
const __VLS_109 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
    label: "状态",
}));
const __VLS_111 = __VLS_110({
    label: "状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_110));
const { default: __VLS_113 } = __VLS_112.slots;
const __VLS_114 = {}.ElSwitch;
/** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
// @ts-ignore
ElSwitch;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
    modelValue: (__VLS_ctx.roomForm.active),
    activeText: "启用",
    inactiveText: "停用",
}));
const __VLS_116 = __VLS_115({
    modelValue: (__VLS_ctx.roomForm.active),
    activeText: "启用",
    inactiveText: "停用",
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
// @ts-ignore
[roomForm,];
var __VLS_112;
var __VLS_37;
{
    const { footer: __VLS_119 } = __VLS_32.slots;
    const __VLS_120 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
        ...{ 'onClick': {} },
    }));
    const __VLS_122 = __VLS_121({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_121));
    let __VLS_124;
    let __VLS_125;
    const __VLS_126 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.dialog = false;
                // @ts-ignore
                [dialog,];
            } });
    const { default: __VLS_127 } = __VLS_123.slots;
    var __VLS_123;
    const __VLS_128 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_130 = __VLS_129({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_129));
    let __VLS_132;
    let __VLS_133;
    const __VLS_134 = ({ click: {} },
        { onClick: (__VLS_ctx.save) });
    const { default: __VLS_135 } = __VLS_131.slots;
    // @ts-ignore
    [save,];
    var __VLS_131;
}
var __VLS_32;
const __VLS_136 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
ElDialog;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
    modelValue: (__VLS_ctx.maintenanceDialog),
    title: "添加维护时段",
    width: "520px",
}));
const __VLS_138 = __VLS_137({
    modelValue: (__VLS_ctx.maintenanceDialog),
    title: "添加维护时段",
    width: "520px",
}, ...__VLS_functionalComponentArgsRest(__VLS_137));
const { default: __VLS_140 } = __VLS_139.slots;
// @ts-ignore
[maintenanceDialog,];
const __VLS_141 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({
    labelWidth: "80px",
}));
const __VLS_143 = __VLS_142({
    labelWidth: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_142));
const { default: __VLS_145 } = __VLS_144.slots;
const __VLS_146 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
    label: "维护时间",
    required: true,
}));
const __VLS_148 = __VLS_147({
    label: "维护时间",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
const { default: __VLS_150 } = __VLS_149.slots;
const __VLS_151 = {}.ElDatePicker;
/** @type {[typeof __VLS_components.ElDatePicker, typeof __VLS_components.elDatePicker, ]} */ ;
// @ts-ignore
ElDatePicker;
// @ts-ignore
const __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({
    modelValue: (__VLS_ctx.maintenance.startTime),
    type: "datetimerange",
    startPlaceholder: "开始时间",
    endPlaceholder: "结束时间",
    ...{ style: {} },
}));
const __VLS_153 = __VLS_152({
    modelValue: (__VLS_ctx.maintenance.startTime),
    type: "datetimerange",
    startPlaceholder: "开始时间",
    endPlaceholder: "结束时间",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_152));
// @ts-ignore
[maintenance,];
var __VLS_149;
const __VLS_156 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({
    label: "维护原因",
    required: true,
}));
const __VLS_158 = __VLS_157({
    label: "维护原因",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_157));
const { default: __VLS_160 } = __VLS_159.slots;
const __VLS_161 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
    modelValue: (__VLS_ctx.maintenance.reason),
    type: "textarea",
}));
const __VLS_163 = __VLS_162({
    modelValue: (__VLS_ctx.maintenance.reason),
    type: "textarea",
}, ...__VLS_functionalComponentArgsRest(__VLS_162));
// @ts-ignore
[maintenance,];
var __VLS_159;
var __VLS_144;
{
    const { footer: __VLS_166 } = __VLS_139.slots;
    const __VLS_167 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_168 = __VLS_asFunctionalComponent(__VLS_167, new __VLS_167({
        ...{ 'onClick': {} },
    }));
    const __VLS_169 = __VLS_168({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_168));
    let __VLS_171;
    let __VLS_172;
    const __VLS_173 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.maintenanceDialog = false;
                // @ts-ignore
                [maintenanceDialog,];
            } });
    const { default: __VLS_174 } = __VLS_170.slots;
    var __VLS_170;
    const __VLS_175 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_176 = __VLS_asFunctionalComponent(__VLS_175, new __VLS_175({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_177 = __VLS_176({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_176));
    let __VLS_179;
    let __VLS_180;
    const __VLS_181 = ({ click: {} },
        { onClick: (__VLS_ctx.saveMaintenance) });
    const { default: __VLS_182 } = __VLS_178.slots;
    // @ts-ignore
    [saveMaintenance,];
    var __VLS_178;
}
var __VLS_139;
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['room-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['room-card']} */ ;
/** @type {__VLS_StyleScopedClasses['room-top']} */ ;
/** @type {__VLS_StyleScopedClasses['meta']} */ ;
/** @type {__VLS_StyleScopedClasses['equipment']} */ ;
/** @type {__VLS_StyleScopedClasses['maintenance']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
