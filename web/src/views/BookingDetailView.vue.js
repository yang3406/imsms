import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { http } from '../api/http';
import StatusTag from '../components/StatusTag.vue';
const route = useRoute();
const booking = ref();
async function load() { booking.value = (await http.get(`/bookings/${route.params.id}`)).data; }
async function action(name, label) { await http.post(`/bookings/${route.params.id}/${name}`); ElMessage.success(`${label}成功`); load(); }
onMounted(load);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['detail-head']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-head']} */ ;
if (__VLS_ctx.booking) {
    // @ts-ignore
    [booking,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "page" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "page-header" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    (__VLS_ctx.booking.code);
    // @ts-ignore
    [booking,];
    /** @type {[typeof StatusTag, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(StatusTag, new StatusTag({
        status: (__VLS_ctx.booking.status),
    }));
    const __VLS_1 = __VLS_0({
        status: (__VLS_ctx.booking.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    // @ts-ignore
    [booking,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "two-column" },
    });
    __VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
        ...{ class: "panel" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "detail-head" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
    (__VLS_ctx.booking.title);
    // @ts-ignore
    [booking,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    (__VLS_ctx.booking.description || '暂无会议说明');
    // @ts-ignore
    [booking,];
    const __VLS_4 = {}.ElDescriptions;
    /** @type {[typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, ]} */ ;
    // @ts-ignore
    ElDescriptions;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        column: (2),
        border: true,
    }));
    const __VLS_6 = __VLS_5({
        column: (2),
        border: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    const { default: __VLS_8 } = __VLS_7.slots;
    const __VLS_9 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    ElDescriptionsItem;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        label: "会议室",
    }));
    const __VLS_11 = __VLS_10({
        label: "会议室",
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    const { default: __VLS_13 } = __VLS_12.slots;
    (__VLS_ctx.booking.room.name);
    // @ts-ignore
    [booking,];
    var __VLS_12;
    const __VLS_14 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    ElDescriptionsItem;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
        label: "位置",
    }));
    const __VLS_16 = __VLS_15({
        label: "位置",
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    const { default: __VLS_18 } = __VLS_17.slots;
    (__VLS_ctx.booking.room.location);
    // @ts-ignore
    [booking,];
    var __VLS_17;
    const __VLS_19 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    ElDescriptionsItem;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        label: "开始时间",
    }));
    const __VLS_21 = __VLS_20({
        label: "开始时间",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_23 } = __VLS_22.slots;
    (__VLS_ctx.dayjs(__VLS_ctx.booking.startTime).format('YYYY-MM-DD HH:mm'));
    // @ts-ignore
    [booking, dayjs,];
    var __VLS_22;
    const __VLS_24 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    ElDescriptionsItem;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        label: "结束时间",
    }));
    const __VLS_26 = __VLS_25({
        label: "结束时间",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    const { default: __VLS_28 } = __VLS_27.slots;
    (__VLS_ctx.dayjs(__VLS_ctx.booking.endTime).format('YYYY-MM-DD HH:mm'));
    // @ts-ignore
    [booking, dayjs,];
    var __VLS_27;
    const __VLS_29 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    ElDescriptionsItem;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        label: "参会人数",
    }));
    const __VLS_31 = __VLS_30({
        label: "参会人数",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    const { default: __VLS_33 } = __VLS_32.slots;
    (__VLS_ctx.booking.attendeeCount);
    // @ts-ignore
    [booking,];
    var __VLS_32;
    const __VLS_34 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    ElDescriptionsItem;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
        label: "发起人",
    }));
    const __VLS_36 = __VLS_35({
        label: "发起人",
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    const { default: __VLS_38 } = __VLS_37.slots;
    (__VLS_ctx.booking.creator.name);
    // @ts-ignore
    [booking,];
    var __VLS_37;
    const __VLS_39 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    ElDescriptionsItem;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
        label: "参会人员",
        span: (2),
    }));
    const __VLS_41 = __VLS_40({
        label: "参会人员",
        span: (2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    const { default: __VLS_43 } = __VLS_42.slots;
    (__VLS_ctx.booking.attendeeNames);
    // @ts-ignore
    [booking,];
    var __VLS_42;
    const __VLS_44 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    ElDescriptionsItem;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        label: "审批意见",
        span: (2),
    }));
    const __VLS_46 = __VLS_45({
        label: "审批意见",
        span: (2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    const { default: __VLS_48 } = __VLS_47.slots;
    (__VLS_ctx.booking.approvalComment || '尚无审批意见');
    // @ts-ignore
    [booking,];
    var __VLS_47;
    var __VLS_7;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "action-bar" },
    });
    if (__VLS_ctx.booking.status === 'APPROVED') {
        // @ts-ignore
        [booking,];
        const __VLS_49 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
            ...{ 'onClick': {} },
            type: "primary",
        }));
        const __VLS_51 = __VLS_50({
            ...{ 'onClick': {} },
            type: "primary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_50));
        let __VLS_53;
        let __VLS_54;
        const __VLS_55 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.booking))
                        return;
                    if (!(__VLS_ctx.booking.status === 'APPROVED'))
                        return;
                    __VLS_ctx.action('check-in', '签到');
                    // @ts-ignore
                    [action,];
                } });
        const { default: __VLS_56 } = __VLS_52.slots;
        var __VLS_52;
    }
    if (__VLS_ctx.booking.status === 'CHECKED_IN') {
        // @ts-ignore
        [booking,];
        const __VLS_57 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
            ...{ 'onClick': {} },
            type: "success",
        }));
        const __VLS_59 = __VLS_58({
            ...{ 'onClick': {} },
            type: "success",
        }, ...__VLS_functionalComponentArgsRest(__VLS_58));
        let __VLS_61;
        let __VLS_62;
        const __VLS_63 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.booking))
                        return;
                    if (!(__VLS_ctx.booking.status === 'CHECKED_IN'))
                        return;
                    __VLS_ctx.action('start', '开始会议');
                    // @ts-ignore
                    [action,];
                } });
        const { default: __VLS_64 } = __VLS_60.slots;
        var __VLS_60;
    }
    if (__VLS_ctx.booking.status === 'IN_PROGRESS') {
        // @ts-ignore
        [booking,];
        const __VLS_65 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
            ...{ 'onClick': {} },
            type: "success",
        }));
        const __VLS_67 = __VLS_66({
            ...{ 'onClick': {} },
            type: "success",
        }, ...__VLS_functionalComponentArgsRest(__VLS_66));
        let __VLS_69;
        let __VLS_70;
        const __VLS_71 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.booking))
                        return;
                    if (!(__VLS_ctx.booking.status === 'IN_PROGRESS'))
                        return;
                    __VLS_ctx.action('complete', '结束会议');
                    // @ts-ignore
                    [action,];
                } });
        const { default: __VLS_72 } = __VLS_68.slots;
        var __VLS_68;
    }
    __VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
        ...{ class: "panel" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "section-title" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
    const __VLS_73 = {}.ElTimeline;
    /** @type {[typeof __VLS_components.ElTimeline, typeof __VLS_components.elTimeline, typeof __VLS_components.ElTimeline, typeof __VLS_components.elTimeline, ]} */ ;
    // @ts-ignore
    ElTimeline;
    // @ts-ignore
    const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({}));
    const __VLS_75 = __VLS_74({}, ...__VLS_functionalComponentArgsRest(__VLS_74));
    const { default: __VLS_77 } = __VLS_76.slots;
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.booking.audits))) {
        // @ts-ignore
        [booking,];
        const __VLS_78 = {}.ElTimelineItem;
        /** @type {[typeof __VLS_components.ElTimelineItem, typeof __VLS_components.elTimelineItem, typeof __VLS_components.ElTimelineItem, typeof __VLS_components.elTimelineItem, ]} */ ;
        // @ts-ignore
        ElTimelineItem;
        // @ts-ignore
        const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
            key: (item.id),
            timestamp: (__VLS_ctx.dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')),
            placement: "top",
        }));
        const __VLS_80 = __VLS_79({
            key: (item.id),
            timestamp: (__VLS_ctx.dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')),
            placement: "top",
        }, ...__VLS_functionalComponentArgsRest(__VLS_79));
        const { default: __VLS_82 } = __VLS_81.slots;
        // @ts-ignore
        [dayjs,];
        __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
        (item.user.name);
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
        (item.detail);
        var __VLS_81;
    }
    var __VLS_76;
}
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['two-column']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-head']} */ ;
/** @type {__VLS_StyleScopedClasses['action-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
