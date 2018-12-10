import { shallowMount } from '@vue/test-utils';
import SidebarBoardActions from '../SidebarBoardActions';

test('render default', () => {
  const wrapper = shallowMount(SidebarBoardActions);
  expect(wrapper).toMatchSnapshot();
});

test('render edit-toggled', () => {
  const wrapper = shallowMount(SidebarBoardActions, {
    propsData: {
      editMode: true,
    },
  });

  expect(wrapper).toMatchSnapshot();
});

test('respond to actions', () => {
  const wrapper = shallowMount(SidebarBoardActions, {
    propsData: {
      editMode: true,
    },
  });

  wrapper.find('.add-button').vm.$emit('click');
  wrapper.find('.edit-button').vm.$emit('click');

  expect(wrapper.emitted('add-board')[0]).toBeTruthy();
  expect(wrapper.emitted('toggle-edit')[0]).toBeTruthy();
});
