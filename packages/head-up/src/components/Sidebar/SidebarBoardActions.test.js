import { shallowMount } from '@vue/test-utils';
import SidebarBoardActions from './SidebarBoardActions';

const provideMock = {
  isEditing: () => false,
};

test('render default', () => {
  const wrapper = shallowMount(SidebarBoardActions, {
    provide: provideMock,
  });
  expect(wrapper).toMatchSnapshot();
});

test('render edit-toggled', () => {
  const wrapper = shallowMount(SidebarBoardActions, {
    provide: {
      isEditing: () => true,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('respond to actions', () => {
  const wrapper = shallowMount(SidebarBoardActions, {
    provide: provideMock,
  });

  wrapper.find('.add-button').vm.$emit('click');
  wrapper.find('.edit-button').vm.$emit('click');

  expect(wrapper.emitted('add-board')[0]).toBeTruthy();
  expect(wrapper.emitted('toggle-edit')[0]).toBeTruthy();
});
