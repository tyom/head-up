import { shallowMount } from '@vue/test-utils';
import SidebarToggle from './SidebarToggle';

test('render untoggled', () => {
  const wrapper = shallowMount(SidebarToggle, {
    propsData: {
      toggled: false,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render toggled', () => {
  const wrapper = shallowMount(SidebarToggle, {
    propsData: {
      toggled: true,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('responds to actions', () => {
  const wrapper = shallowMount(SidebarToggle);

  wrapper.find('button').trigger('click');
  expect(wrapper.emitted('toggle')[0]).toBeTruthy();
});
