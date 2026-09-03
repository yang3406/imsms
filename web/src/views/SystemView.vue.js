import { onMounted, reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { http } from '../api/http';
const active = ref('users');
const users = ref([]);
const departments = ref([]);
const logs = ref([]);
const rule = reactive({ minAdvanceMinutes: 0, maxDurationMinutes: 480, checkInEarlyMinutes: 15, noShowMinutes: 30 });
const userDialog = ref(false);
const deptName = ref('');
const userForm = reactive({ username: '', password: 'Demo@123', name: '', email: '', role: 'EMPLOYEE', departmentId: null });
async function load() { const [u, d, l, r] = await Promise.all([http.get('/admin/users'), http.get('/admin/departments'), http.get('/admin/logs'), http.get('/admin/rules')]); users.value = u.data; departments.value = d.data; logs.value = l.data; Object.assign(rule, r.data); }
async function saveRule() { await http.put('/admin/rules', rule); ElMessage.success('预约规则已保存'); }
async function addDept() { await http.post('/admin/departments', { name: deptName.value }); deptName.value = ''; ElMessage.success('部门已添加'); load(); }
async function addUser() { await http.post('/admin/users', userForm); userDialog.value = false; ElMessage.success('用户已创建'); load(); }
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
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "panel" },
});
const __VLS_0 = {}.ElTabs;
/** @type {[typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, ]} */ ;
// @ts-ignore
ElTabs;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.active),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.active),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
// @ts-ignore
[active,];
const __VLS_5 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
ElTabPane;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    label: "用户管理",
    name: "users",
}));
const __VLS_7 = __VLS_6({
    label: "用户管理",
    name: "users",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "toolbar" },
});
const __VLS_10 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_12 = __VLS_11({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_14;
let __VLS_15;
const __VLS_16 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.userDialog = true;
            // @ts-ignore
            [userDialog,];
        } });
const { default: __VLS_17 } = __VLS_13.slots;
var __VLS_13;
const __VLS_18 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
ElTable;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    data: (__VLS_ctx.users),
}));
const __VLS_20 = __VLS_19({
    data: (__VLS_ctx.users),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_22 } = __VLS_21.slots;
// @ts-ignore
[users,];
const __VLS_23 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    prop: "username",
    label: "用户名",
}));
const __VLS_25 = __VLS_24({
    prop: "username",
    label: "用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    prop: "name",
    label: "姓名",
}));
const __VLS_30 = __VLS_29({
    prop: "name",
    label: "姓名",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const __VLS_33 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    prop: "department.name",
    label: "部门",
}));
const __VLS_35 = __VLS_34({
    prop: "department.name",
    label: "部门",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
const __VLS_38 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    prop: "email",
    label: "邮箱",
    minWidth: "180",
}));
const __VLS_40 = __VLS_39({
    prop: "email",
    label: "邮箱",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
const __VLS_43 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    label: "角色",
}));
const __VLS_45 = __VLS_44({
    label: "角色",
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
const { default: __VLS_47 } = __VLS_46.slots;
{
    const { default: __VLS_48 } = __VLS_46.slots;
    const [s] = __VLS_getSlotParameters(__VLS_48);
    const __VLS_49 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    ElTag;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({}));
    const __VLS_51 = __VLS_50({}, ...__VLS_functionalComponentArgsRest(__VLS_50));
    const { default: __VLS_53 } = __VLS_52.slots;
    (s.row.role === 'ADMIN' ? '管理员' : '员工');
    var __VLS_52;
}
var __VLS_46;
const __VLS_54 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    label: "状态",
}));
const __VLS_56 = __VLS_55({
    label: "状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_58 } = __VLS_57.slots;
{
    const { default: __VLS_59 } = __VLS_57.slots;
    const [s] = __VLS_getSlotParameters(__VLS_59);
    const __VLS_60 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    ElTag;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        type: (s.row.active ? 'success' : 'info'),
    }));
    const __VLS_62 = __VLS_61({
        type: (s.row.active ? 'success' : 'info'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    const { default: __VLS_64 } = __VLS_63.slots;
    (s.row.active ? '启用' : '停用');
    var __VLS_63;
}
var __VLS_57;
var __VLS_21;
var __VLS_8;
const __VLS_65 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
ElTabPane;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    label: "部门管理",
    name: "departments",
}));
const __VLS_67 = __VLS_66({
    label: "部门管理",
    name: "departments",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
const { default: __VLS_69 } = __VLS_68.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "toolbar" },
});
const __VLS_70 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
    modelValue: (__VLS_ctx.deptName),
    placeholder: "新部门名称",
    ...{ style: {} },
}));
const __VLS_72 = __VLS_71({
    modelValue: (__VLS_ctx.deptName),
    placeholder: "新部门名称",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
// @ts-ignore
[deptName,];
const __VLS_75 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_77 = __VLS_76({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
let __VLS_79;
let __VLS_80;
const __VLS_81 = ({ click: {} },
    { onClick: (__VLS_ctx.addDept) });
const { default: __VLS_82 } = __VLS_78.slots;
// @ts-ignore
[addDept,];
var __VLS_78;
const __VLS_83 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
ElTable;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
    data: (__VLS_ctx.departments),
}));
const __VLS_85 = __VLS_84({
    data: (__VLS_ctx.departments),
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
const { default: __VLS_87 } = __VLS_86.slots;
// @ts-ignore
[departments,];
const __VLS_88 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    prop: "name",
    label: "部门名称",
}));
const __VLS_90 = __VLS_89({
    prop: "name",
    label: "部门名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
const __VLS_93 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
    prop: "_count.users",
    label: "成员数量",
}));
const __VLS_95 = __VLS_94({
    prop: "_count.users",
    label: "成员数量",
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
const __VLS_98 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    prop: "id",
    label: "部门编号",
}));
const __VLS_100 = __VLS_99({
    prop: "id",
    label: "部门编号",
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
var __VLS_86;
var __VLS_68;
const __VLS_103 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
ElTabPane;
// @ts-ignore
const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({
    label: "预约规则",
    name: "rules",
}));
const __VLS_105 = __VLS_104({
    label: "预约规则",
    name: "rules",
}, ...__VLS_functionalComponentArgsRest(__VLS_104));
const { default: __VLS_107 } = __VLS_106.slots;
const __VLS_108 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
    model: (__VLS_ctx.rule),
    labelWidth: "160px",
    ...{ style: {} },
}));
const __VLS_110 = __VLS_109({
    model: (__VLS_ctx.rule),
    labelWidth: "160px",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
const { default: __VLS_112 } = __VLS_111.slots;
// @ts-ignore
[rule,];
const __VLS_113 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
    label: "最少提前预约",
}));
const __VLS_115 = __VLS_114({
    label: "最少提前预约",
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
const { default: __VLS_117 } = __VLS_116.slots;
const __VLS_118 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
ElInputNumber;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
    modelValue: (__VLS_ctx.rule.minAdvanceMinutes),
    min: (0),
}));
const __VLS_120 = __VLS_119({
    modelValue: (__VLS_ctx.rule.minAdvanceMinutes),
    min: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
// @ts-ignore
[rule,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "unit" },
});
var __VLS_116;
const __VLS_123 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123({
    label: "单次最长时长",
}));
const __VLS_125 = __VLS_124({
    label: "单次最长时长",
}, ...__VLS_functionalComponentArgsRest(__VLS_124));
const { default: __VLS_127 } = __VLS_126.slots;
const __VLS_128 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
ElInputNumber;
// @ts-ignore
const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
    modelValue: (__VLS_ctx.rule.maxDurationMinutes),
    min: (30),
}));
const __VLS_130 = __VLS_129({
    modelValue: (__VLS_ctx.rule.maxDurationMinutes),
    min: (30),
}, ...__VLS_functionalComponentArgsRest(__VLS_129));
// @ts-ignore
[rule,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "unit" },
});
var __VLS_126;
const __VLS_133 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133({
    label: "允许提前签到",
}));
const __VLS_135 = __VLS_134({
    label: "允许提前签到",
}, ...__VLS_functionalComponentArgsRest(__VLS_134));
const { default: __VLS_137 } = __VLS_136.slots;
const __VLS_138 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
ElInputNumber;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    modelValue: (__VLS_ctx.rule.checkInEarlyMinutes),
    min: (0),
}));
const __VLS_140 = __VLS_139({
    modelValue: (__VLS_ctx.rule.checkInEarlyMinutes),
    min: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
// @ts-ignore
[rule,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "unit" },
});
var __VLS_136;
const __VLS_143 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143({
    label: "超时未签到判定",
}));
const __VLS_145 = __VLS_144({
    label: "超时未签到判定",
}, ...__VLS_functionalComponentArgsRest(__VLS_144));
const { default: __VLS_147 } = __VLS_146.slots;
const __VLS_148 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
ElInputNumber;
// @ts-ignore
const __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148({
    modelValue: (__VLS_ctx.rule.noShowMinutes),
    min: (5),
}));
const __VLS_150 = __VLS_149({
    modelValue: (__VLS_ctx.rule.noShowMinutes),
    min: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_149));
// @ts-ignore
[rule,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "unit" },
});
var __VLS_146;
const __VLS_153 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({}));
const __VLS_155 = __VLS_154({}, ...__VLS_functionalComponentArgsRest(__VLS_154));
const { default: __VLS_157 } = __VLS_156.slots;
const __VLS_158 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_160 = __VLS_159({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_159));
let __VLS_162;
let __VLS_163;
const __VLS_164 = ({ click: {} },
    { onClick: (__VLS_ctx.saveRule) });
const { default: __VLS_165 } = __VLS_161.slots;
// @ts-ignore
[saveRule,];
var __VLS_161;
var __VLS_156;
var __VLS_111;
var __VLS_106;
const __VLS_166 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
ElTabPane;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
    label: "操作日志",
    name: "logs",
}));
const __VLS_168 = __VLS_167({
    label: "操作日志",
    name: "logs",
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
const { default: __VLS_170 } = __VLS_169.slots;
const __VLS_171 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
ElTable;
// @ts-ignore
const __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171({
    data: (__VLS_ctx.logs),
}));
const __VLS_173 = __VLS_172({
    data: (__VLS_ctx.logs),
}, ...__VLS_functionalComponentArgsRest(__VLS_172));
const { default: __VLS_175 } = __VLS_174.slots;
// @ts-ignore
[logs,];
const __VLS_176 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({
    label: "时间",
    width: "170",
}));
const __VLS_178 = __VLS_177({
    label: "时间",
    width: "170",
}, ...__VLS_functionalComponentArgsRest(__VLS_177));
const { default: __VLS_180 } = __VLS_179.slots;
{
    const { default: __VLS_181 } = __VLS_179.slots;
    const [s] = __VLS_getSlotParameters(__VLS_181);
    (__VLS_ctx.dayjs(s.row.createdAt).format('YYYY-MM-DD HH:mm'));
    // @ts-ignore
    [dayjs,];
}
var __VLS_179;
const __VLS_182 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_183 = __VLS_asFunctionalComponent(__VLS_182, new __VLS_182({
    prop: "user.name",
    label: "操作人",
    width: "120",
}));
const __VLS_184 = __VLS_183({
    prop: "user.name",
    label: "操作人",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_183));
const __VLS_187 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_188 = __VLS_asFunctionalComponent(__VLS_187, new __VLS_187({
    prop: "action",
    label: "动作",
    width: "110",
}));
const __VLS_189 = __VLS_188({
    prop: "action",
    label: "动作",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_188));
const __VLS_192 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_193 = __VLS_asFunctionalComponent(__VLS_192, new __VLS_192({
    prop: "entityType",
    label: "对象",
    width: "110",
}));
const __VLS_194 = __VLS_193({
    prop: "entityType",
    label: "对象",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_193));
const __VLS_197 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_198 = __VLS_asFunctionalComponent(__VLS_197, new __VLS_197({
    prop: "detail",
    label: "操作详情",
}));
const __VLS_199 = __VLS_198({
    prop: "detail",
    label: "操作详情",
}, ...__VLS_functionalComponentArgsRest(__VLS_198));
var __VLS_174;
var __VLS_169;
var __VLS_3;
const __VLS_202 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
ElDialog;
// @ts-ignore
const __VLS_203 = __VLS_asFunctionalComponent(__VLS_202, new __VLS_202({
    modelValue: (__VLS_ctx.userDialog),
    title: "新增系统用户",
    width: "520px",
}));
const __VLS_204 = __VLS_203({
    modelValue: (__VLS_ctx.userDialog),
    title: "新增系统用户",
    width: "520px",
}, ...__VLS_functionalComponentArgsRest(__VLS_203));
const { default: __VLS_206 } = __VLS_205.slots;
// @ts-ignore
[userDialog,];
const __VLS_207 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
const __VLS_208 = __VLS_asFunctionalComponent(__VLS_207, new __VLS_207({
    model: (__VLS_ctx.userForm),
    labelWidth: "80px",
}));
const __VLS_209 = __VLS_208({
    model: (__VLS_ctx.userForm),
    labelWidth: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_208));
const { default: __VLS_211 } = __VLS_210.slots;
// @ts-ignore
[userForm,];
const __VLS_212 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent(__VLS_212, new __VLS_212({
    label: "用户名",
}));
const __VLS_214 = __VLS_213({
    label: "用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_213));
const { default: __VLS_216 } = __VLS_215.slots;
const __VLS_217 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_218 = __VLS_asFunctionalComponent(__VLS_217, new __VLS_217({
    modelValue: (__VLS_ctx.userForm.username),
}));
const __VLS_219 = __VLS_218({
    modelValue: (__VLS_ctx.userForm.username),
}, ...__VLS_functionalComponentArgsRest(__VLS_218));
// @ts-ignore
[userForm,];
var __VLS_215;
const __VLS_222 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_223 = __VLS_asFunctionalComponent(__VLS_222, new __VLS_222({
    label: "姓名",
}));
const __VLS_224 = __VLS_223({
    label: "姓名",
}, ...__VLS_functionalComponentArgsRest(__VLS_223));
const { default: __VLS_226 } = __VLS_225.slots;
const __VLS_227 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_228 = __VLS_asFunctionalComponent(__VLS_227, new __VLS_227({
    modelValue: (__VLS_ctx.userForm.name),
}));
const __VLS_229 = __VLS_228({
    modelValue: (__VLS_ctx.userForm.name),
}, ...__VLS_functionalComponentArgsRest(__VLS_228));
// @ts-ignore
[userForm,];
var __VLS_225;
const __VLS_232 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_233 = __VLS_asFunctionalComponent(__VLS_232, new __VLS_232({
    label: "邮箱",
}));
const __VLS_234 = __VLS_233({
    label: "邮箱",
}, ...__VLS_functionalComponentArgsRest(__VLS_233));
const { default: __VLS_236 } = __VLS_235.slots;
const __VLS_237 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_238 = __VLS_asFunctionalComponent(__VLS_237, new __VLS_237({
    modelValue: (__VLS_ctx.userForm.email),
}));
const __VLS_239 = __VLS_238({
    modelValue: (__VLS_ctx.userForm.email),
}, ...__VLS_functionalComponentArgsRest(__VLS_238));
// @ts-ignore
[userForm,];
var __VLS_235;
const __VLS_242 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_243 = __VLS_asFunctionalComponent(__VLS_242, new __VLS_242({
    label: "初始密码",
}));
const __VLS_244 = __VLS_243({
    label: "初始密码",
}, ...__VLS_functionalComponentArgsRest(__VLS_243));
const { default: __VLS_246 } = __VLS_245.slots;
const __VLS_247 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_248 = __VLS_asFunctionalComponent(__VLS_247, new __VLS_247({
    modelValue: (__VLS_ctx.userForm.password),
    showPassword: true,
}));
const __VLS_249 = __VLS_248({
    modelValue: (__VLS_ctx.userForm.password),
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_248));
// @ts-ignore
[userForm,];
var __VLS_245;
const __VLS_252 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
    label: "部门",
}));
const __VLS_254 = __VLS_253({
    label: "部门",
}, ...__VLS_functionalComponentArgsRest(__VLS_253));
const { default: __VLS_256 } = __VLS_255.slots;
const __VLS_257 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
ElSelect;
// @ts-ignore
const __VLS_258 = __VLS_asFunctionalComponent(__VLS_257, new __VLS_257({
    modelValue: (__VLS_ctx.userForm.departmentId),
    ...{ style: {} },
}));
const __VLS_259 = __VLS_258({
    modelValue: (__VLS_ctx.userForm.departmentId),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_258));
const { default: __VLS_261 } = __VLS_260.slots;
// @ts-ignore
[userForm,];
for (const [d] of __VLS_getVForSourceType((__VLS_ctx.departments))) {
    // @ts-ignore
    [departments,];
    const __VLS_262 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    ElOption;
    // @ts-ignore
    const __VLS_263 = __VLS_asFunctionalComponent(__VLS_262, new __VLS_262({
        key: (d.id),
        label: (d.name),
        value: (d.id),
    }));
    const __VLS_264 = __VLS_263({
        key: (d.id),
        label: (d.name),
        value: (d.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_263));
}
var __VLS_260;
var __VLS_255;
const __VLS_267 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_268 = __VLS_asFunctionalComponent(__VLS_267, new __VLS_267({
    label: "角色",
}));
const __VLS_269 = __VLS_268({
    label: "角色",
}, ...__VLS_functionalComponentArgsRest(__VLS_268));
const { default: __VLS_271 } = __VLS_270.slots;
const __VLS_272 = {}.ElRadioGroup;
/** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
// @ts-ignore
ElRadioGroup;
// @ts-ignore
const __VLS_273 = __VLS_asFunctionalComponent(__VLS_272, new __VLS_272({
    modelValue: (__VLS_ctx.userForm.role),
}));
const __VLS_274 = __VLS_273({
    modelValue: (__VLS_ctx.userForm.role),
}, ...__VLS_functionalComponentArgsRest(__VLS_273));
const { default: __VLS_276 } = __VLS_275.slots;
// @ts-ignore
[userForm,];
const __VLS_277 = {}.ElRadio;
/** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
// @ts-ignore
ElRadio;
// @ts-ignore
const __VLS_278 = __VLS_asFunctionalComponent(__VLS_277, new __VLS_277({
    value: "EMPLOYEE",
}));
const __VLS_279 = __VLS_278({
    value: "EMPLOYEE",
}, ...__VLS_functionalComponentArgsRest(__VLS_278));
const { default: __VLS_281 } = __VLS_280.slots;
var __VLS_280;
const __VLS_282 = {}.ElRadio;
/** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
// @ts-ignore
ElRadio;
// @ts-ignore
const __VLS_283 = __VLS_asFunctionalComponent(__VLS_282, new __VLS_282({
    value: "ADMIN",
}));
const __VLS_284 = __VLS_283({
    value: "ADMIN",
}, ...__VLS_functionalComponentArgsRest(__VLS_283));
const { default: __VLS_286 } = __VLS_285.slots;
var __VLS_285;
var __VLS_275;
var __VLS_270;
var __VLS_210;
{
    const { footer: __VLS_287 } = __VLS_205.slots;
    const __VLS_288 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_289 = __VLS_asFunctionalComponent(__VLS_288, new __VLS_288({
        ...{ 'onClick': {} },
    }));
    const __VLS_290 = __VLS_289({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_289));
    let __VLS_292;
    let __VLS_293;
    const __VLS_294 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.userDialog = false;
                // @ts-ignore
                [userDialog,];
            } });
    const { default: __VLS_295 } = __VLS_291.slots;
    var __VLS_291;
    const __VLS_296 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_297 = __VLS_asFunctionalComponent(__VLS_296, new __VLS_296({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_298 = __VLS_297({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_297));
    let __VLS_300;
    let __VLS_301;
    const __VLS_302 = ({ click: {} },
        { onClick: (__VLS_ctx.addUser) });
    const { default: __VLS_303 } = __VLS_299.slots;
    // @ts-ignore
    [addUser,];
    var __VLS_299;
}
var __VLS_205;
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
