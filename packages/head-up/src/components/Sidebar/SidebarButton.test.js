import { shallowMount } from '@vue/test-utils';
import SidebarButton from './SidebarButton';

test('render default', () => {
  const wrapper = shallowMount(SidebarButton, {
    slots: {
      default: 'Clicky',
    },
  });
  expect(wrapper).toMatchSnapshot();
});
