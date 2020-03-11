import { shallowMount } from '@vue/test-utils';
import VList from '../VList';

test('render default', () => {
  const wrapper = shallowMount(VList);
  expect(wrapper).toMatchSnapshot();
});

test('render with items', () => {
  const wrapper = shallowMount(VList, {
    propsData: {
      items: [{ label: 'One' }, { label: 'Two' }],
    },
    scopedSlots: {
      default: '<div slot-scope="{item}">{{ item.label }}</div>',
    },
  });
  expect(wrapper).toMatchSnapshot();
});
