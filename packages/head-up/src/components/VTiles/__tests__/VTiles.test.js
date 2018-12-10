import { shallowMount } from '@vue/test-utils';
import VTiles from '../VTiles';

test('render default', () => {
  const wrapper = shallowMount(VTiles);
  expect(wrapper).toMatchSnapshot();
});

test('render with items', () => {
  const wrapper = shallowMount(VTiles, {
    propsData: {
      items: [{ label: 'One' }, { label: 'Two' }],
    },
    scopedSlots: {
      default: '<div slot-scope="{data}">{{ data.label }}</div>',
    },
  });
  expect(wrapper).toMatchSnapshot();
});
