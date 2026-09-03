import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { http } from '../api/http';
const router = useRouter();
const loading = ref(false);
const recommendations = ref([]);
const selected = ref();
const templates = ref([]);
const templateName = ref('');
const form = reactive({ title: '', dateRange: [], attendeeCount: 4, equipment: [], attendeeNames: ['示例员工'], description: '', repeatWeeks: 1 });
const canSubmit = computed(() => selected.value && form.title && form.dateRange.length === 2 && form.attendeeNames.length > 0);
async function recommend() { if (form.dateRange.length !== 2)
    return ElMessage.warning('请先选择完整会议时间'); loading.value = true; try {
    recommendations.value = (await http.get('/rooms/recommend', { params: { startTime: form.dateRange[0].toISOString(), endTime: form.dateRange[1].toISOString(), attendeeCount: form.attendeeCount, equipment: form.equipment.join(',') } })).data;
    selected.value = recommendations.value[0];
    if (!recommendations.value.length)
        ElMessage.warning('当前条件下没有可用会议室');
}
finally {
    loading.value = false;
} }
async function submit() { const { data } = await http.post('/bookings', { title: form.title, description: form.description, roomId: selected.value.id, attendeeNames: form.attendeeNames, attendeeCount: form.attendeeCount, startTime: form.dateRange[0], endTime: form.dateRange[1], repeatWeeks: form.repeatWeeks }); ElMessage.success(data.createdCount > 1 ? `${data.createdCount} 场周期会议已提交审批` : '预约已提交，正在等待管理员审批'); router.push('/bookings'); }
function applyTemplate(id) { const item = templates.value.find(x => x.id === id); if (!item)
    return; form.title = item.title; form.description = item.description; form.attendeeNames = item.attendeeNames.split(','); form.attendeeCount = item.attendeeCount; form.equipment = item.equipment ? item.equipment.split(',') : []; }
async function saveTemplate() { if (!templateName.value)
    return ElMessage.warning('请输入模板名称'); await http.post('/bookings/templates', { name: templateName.value, title: form.title, description: form.description, attendeeNames: form.attendeeNames, attendeeCount: form.attendeeCount, equipment: form.equipment }); ElMessage.success('会议模板已保存'); templateName.value = ''; templates.value = (await http.get('/bookings/templates/list')).data; }
onMounted(async () => templates.value = (await http.get('/bookings/templates/list')).data);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['step-title']} */ ;
/** @type {__VLS_StyleScopedClasses['step-title']} */ ;
/** @type {__VLS_StyleScopedClasses['step-title']} */ ;
/** @type {__VLS_StyleScopedClasses['step-title']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['room-line']} */ ;
/** @type {__VLS_StyleScopedClasses['room-line']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page-header" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
const __VLS_0 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
ElSelect;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onChange': {} },
    placeholder: "使用会议模板",
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onChange': {} },
    placeholder: "使用会议模板",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ change: {} },
    { onChange: (__VLS_ctx.applyTemplate) });
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[applyTemplate,];
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.templates))) {
    // @ts-ignore
    [templates,];
    const __VLS_8 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    ElOption;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        key: (item.id),
        label: (item.name),
        value: (item.id),
    }));
    const __VLS_10 = __VLS_9({
        key: (item.id),
        label: (item.name),
        value: (item.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "booking-layout" },
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "panel" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "step-title" },
});
__VLS_asFunctionalElement(__VLS_elements.b, __VLS_elements.b)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
const __VLS_13 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    model: (__VLS_ctx.form),
    labelPosition: "top",
}));
const __VLS_15 = __VLS_14({
    model: (__VLS_ctx.form),
    labelPosition: "top",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_17 } = __VLS_16.slots;
// @ts-ignore
[form,];
const __VLS_18 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    label: "会议主题",
    required: true,
}));
const __VLS_20 = __VLS_19({
    label: "会议主题",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_22 } = __VLS_21.slots;
const __VLS_23 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    modelValue: (__VLS_ctx.form.title),
    maxlength: "80",
    showWordLimit: true,
    placeholder: "例如：第三季度产品路线评审",
}));
const __VLS_25 = __VLS_24({
    modelValue: (__VLS_ctx.form.title),
    maxlength: "80",
    showWordLimit: true,
    placeholder: "例如：第三季度产品路线评审",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
// @ts-ignore
[form,];
var __VLS_21;
const __VLS_28 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "会议时间",
    required: true,
}));
const __VLS_30 = __VLS_29({
    label: "会议时间",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const { default: __VLS_32 } = __VLS_31.slots;
const __VLS_33 = {}.ElDatePicker;
/** @type {[typeof __VLS_components.ElDatePicker, typeof __VLS_components.elDatePicker, ]} */ ;
// @ts-ignore
ElDatePicker;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    modelValue: (__VLS_ctx.form.dateRange),
    type: "datetimerange",
    startPlaceholder: "开始时间",
    endPlaceholder: "结束时间",
    defaultTime: ([new Date(2000, 0, 1, 9), new Date(2000, 0, 1, 10)]),
    ...{ style: {} },
}));
const __VLS_35 = __VLS_34({
    modelValue: (__VLS_ctx.form.dateRange),
    type: "datetimerange",
    startPlaceholder: "开始时间",
    endPlaceholder: "结束时间",
    defaultTime: ([new Date(2000, 0, 1, 9), new Date(2000, 0, 1, 10)]),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
// @ts-ignore
[form,];
var __VLS_31;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-row" },
});
const __VLS_38 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    label: "参会人数",
    required: true,
}));
const __VLS_40 = __VLS_39({
    label: "参会人数",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
const { default: __VLS_42 } = __VLS_41.slots;
const __VLS_43 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
ElInputNumber;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    modelValue: (__VLS_ctx.form.attendeeCount),
    min: (1),
    max: (500),
}));
const __VLS_45 = __VLS_44({
    modelValue: (__VLS_ctx.form.attendeeCount),
    min: (1),
    max: (500),
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
// @ts-ignore
[form,];
var __VLS_41;
const __VLS_48 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    label: "周期预约",
}));
const __VLS_50 = __VLS_49({
    label: "周期预约",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
const { default: __VLS_52 } = __VLS_51.slots;
const __VLS_53 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
ElSelect;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    modelValue: (__VLS_ctx.form.repeatWeeks),
}));
const __VLS_55 = __VLS_54({
    modelValue: (__VLS_ctx.form.repeatWeeks),
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
const { default: __VLS_57 } = __VLS_56.slots;
// @ts-ignore
[form,];
const __VLS_58 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
ElOption;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
    label: "仅本次",
    value: (1),
}));
const __VLS_60 = __VLS_59({
    label: "仅本次",
    value: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const __VLS_63 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
ElOption;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
    label: "连续 2 周",
    value: (2),
}));
const __VLS_65 = __VLS_64({
    label: "连续 2 周",
    value: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
const __VLS_68 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
ElOption;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    label: "连续 4 周",
    value: (4),
}));
const __VLS_70 = __VLS_69({
    label: "连续 4 周",
    value: (4),
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
const __VLS_73 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
ElOption;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    label: "连续 8 周",
    value: (8),
}));
const __VLS_75 = __VLS_74({
    label: "连续 8 周",
    value: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
var __VLS_56;
var __VLS_51;
const __VLS_78 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
    label: "所需设备",
}));
const __VLS_80 = __VLS_79({
    label: "所需设备",
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
const { default: __VLS_82 } = __VLS_81.slots;
const __VLS_83 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
ElSelect;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
    modelValue: (__VLS_ctx.form.equipment),
    multiple: true,
    placeholder: "可多选",
    ...{ style: {} },
}));
const __VLS_85 = __VLS_84({
    modelValue: (__VLS_ctx.form.equipment),
    multiple: true,
    placeholder: "可多选",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
const { default: __VLS_87 } = __VLS_86.slots;
// @ts-ignore
[form,];
for (const [item] of __VLS_getVForSourceType((['投影仪', '显示屏', '白板', '视频会议', '音响', '无线麦克风']))) {
    const __VLS_88 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    ElOption;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
        key: (item),
        value: (item),
    }));
    const __VLS_90 = __VLS_89({
        key: (item),
        value: (item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_89));
}
var __VLS_86;
var __VLS_81;
const __VLS_93 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
    label: "参会人员",
    required: true,
}));
const __VLS_95 = __VLS_94({
    label: "参会人员",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
const { default: __VLS_97 } = __VLS_96.slots;
const __VLS_98 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
ElSelect;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    modelValue: (__VLS_ctx.form.attendeeNames),
    multiple: true,
    filterable: true,
    allowCreate: true,
    defaultFirstOption: true,
    placeholder: "输入姓名后回车",
    ...{ style: {} },
}));
const __VLS_100 = __VLS_99({
    modelValue: (__VLS_ctx.form.attendeeNames),
    multiple: true,
    filterable: true,
    allowCreate: true,
    defaultFirstOption: true,
    placeholder: "输入姓名后回车",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
// @ts-ignore
[form,];
var __VLS_96;
const __VLS_103 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({
    label: "会议说明",
}));
const __VLS_105 = __VLS_104({
    label: "会议说明",
}, ...__VLS_functionalComponentArgsRest(__VLS_104));
const { default: __VLS_107 } = __VLS_106.slots;
const __VLS_108 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
    modelValue: (__VLS_ctx.form.description),
    type: "textarea",
    rows: (3),
    maxlength: "500",
    showWordLimit: true,
}));
const __VLS_110 = __VLS_109({
    modelValue: (__VLS_ctx.form.description),
    type: "textarea",
    rows: (3),
    maxlength: "500",
    showWordLimit: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
// @ts-ignore
[form,];
var __VLS_106;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "template-save" },
});
const __VLS_113 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
    modelValue: (__VLS_ctx.templateName),
    placeholder: "模板名称",
}));
const __VLS_115 = __VLS_114({
    modelValue: (__VLS_ctx.templateName),
    placeholder: "模板名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
// @ts-ignore
[templateName,];
const __VLS_118 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
    ...{ 'onClick': {} },
}));
const __VLS_120 = __VLS_119({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
let __VLS_122;
let __VLS_123;
const __VLS_124 = ({ click: {} },
    { onClick: (__VLS_ctx.saveTemplate) });
const { default: __VLS_125 } = __VLS_121.slots;
// @ts-ignore
[saveTemplate,];
var __VLS_121;
const __VLS_126 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    ...{ style: {} },
    loading: (__VLS_ctx.loading),
}));
const __VLS_128 = __VLS_127({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    ...{ style: {} },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
let __VLS_130;
let __VLS_131;
const __VLS_132 = ({ click: {} },
    { onClick: (__VLS_ctx.recommend) });
const { default: __VLS_133 } = __VLS_129.slots;
// @ts-ignore
[loading, recommend,];
var __VLS_129;
var __VLS_16;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "panel result" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "step-title" },
});
__VLS_asFunctionalElement(__VLS_elements.b, __VLS_elements.b)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
if (!__VLS_ctx.recommendations.length) {
    // @ts-ignore
    [recommendations,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "placeholder" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
}
else {
    for (const [room] of __VLS_getVForSourceType((__VLS_ctx.recommendations))) {
        // @ts-ignore
        [recommendations,];
        __VLS_asFunctionalElement(__VLS_elements.article, __VLS_elements.article)({
            ...{ onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.recommendations.length))
                        return;
                    __VLS_ctx.selected = room;
                    // @ts-ignore
                    [selected,];
                } },
            key: (room.id),
            ...{ class: "recommend-card" },
            ...{ class: ({ active: __VLS_ctx.selected?.id === room.id }) },
        });
        // @ts-ignore
        [selected,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "room-line" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
        (room.name);
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (room.location);
        (room.capacity);
        (room.openTime);
        (room.closeTime);
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "recommend-score" },
        });
        (room.score);
        __VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "tags" },
        });
        for (const [e] of __VLS_getVForSourceType((room.equipment.split(',')))) {
            const __VLS_134 = {}.ElTag;
            /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
            // @ts-ignore
            ElTag;
            // @ts-ignore
            const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
                key: (e),
                size: "small",
                effect: "plain",
            }));
            const __VLS_136 = __VLS_135({
                key: (e),
                size: "small",
                effect: "plain",
            }, ...__VLS_functionalComponentArgsRest(__VLS_135));
            const { default: __VLS_138 } = __VLS_137.slots;
            (e);
            var __VLS_137;
        }
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
        (room.reason);
    }
    const __VLS_139 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_140 = __VLS_asFunctionalComponent(__VLS_139, new __VLS_139({
        ...{ 'onClick': {} },
        type: "success",
        size: "large",
        ...{ style: {} },
        disabled: (!__VLS_ctx.canSubmit),
    }));
    const __VLS_141 = __VLS_140({
        ...{ 'onClick': {} },
        type: "success",
        size: "large",
        ...{ style: {} },
        disabled: (!__VLS_ctx.canSubmit),
    }, ...__VLS_functionalComponentArgsRest(__VLS_140));
    let __VLS_143;
    let __VLS_144;
    const __VLS_145 = ({ click: {} },
        { onClick: (__VLS_ctx.submit) });
    const { default: __VLS_146 } = __VLS_142.slots;
    // @ts-ignore
    [canSubmit, submit,];
    var __VLS_142;
}
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['booking-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['step-title']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['template-save']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['result']} */ ;
/** @type {__VLS_StyleScopedClasses['step-title']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['recommend-card']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['room-line']} */ ;
/** @type {__VLS_StyleScopedClasses['recommend-score']} */ ;
/** @type {__VLS_StyleScopedClasses['tags']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
