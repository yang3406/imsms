import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ElementPlus from 'element-plus';
import StatusTag from './StatusTag.vue';
describe('StatusTag', () => {
    it('将预约状态转换为中文标签', () => {
        const wrapper = mount(StatusTag, { props: { status: 'APPROVED' }, global: { plugins: [ElementPlus] } });
        expect(wrapper.text()).toContain('已批准');
    });
});
