import { shallowMount } from '@vue/test-utils';
import SidebarActions from './SidebarActions';

test('render default', () => {
  const wrapper = shallowMount(SidebarActions);
  expect(wrapper).toMatchSnapshot();
});

test('respond to actions', () => {
  const wrapper = shallowMount(SidebarActions);

  wrapper.find('.settings-button').vm.$emit('click');
  wrapper.find('.help-button').vm.$emit('click');

  expect(wrapper.emitted('settings')[0]).toBeTruthy();
  expect(wrapper.emitted('help')[0]).toBeTruthy();
});
