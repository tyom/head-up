import { shallowMount } from '@vue/test-utils';
import Sidebar from './Sidebar';
import SidebarToggle from './SidebarToggle';
import SidebarBoards from './SidebarBoards';
import SidebarBoardActions from './SidebarBoardActions';
import SidebarActions from './SidebarActions';

test('render opened', () => {
  const wrapper = shallowMount(Sidebar, {
    propsData: {
      visible: true,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render closed', () => {
  const wrapper = shallowMount(Sidebar, {
    propsData: {
      visible: false,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('respond to toggle', () => {
  const wrapper = shallowMount(Sidebar);

  wrapper.find(SidebarToggle).vm.$emit('toggle');
  expect(wrapper.emitted('toggle')[0]).toEqual([true]);
});

test('respond to board control actions', () => {
  const wrapper = shallowMount(Sidebar);

  wrapper.find(SidebarBoardActions).vm.$emit('add-board');
  wrapper.find(SidebarBoardActions).vm.$emit('toggle-edit');
  expect(wrapper.emitted('board:add')[0]).toBeTruthy();
  expect(wrapper.emitted('board:edit')[0]).toBeTruthy();
});

test('respond to board thumb actions', () => {
  const wrapper = shallowMount(Sidebar);

  wrapper.find(SidebarBoards).vm.$emit('activate', 2);
  wrapper.find(SidebarBoards).vm.$emit('remove', '1');
  expect(wrapper.emitted('board:activate')[0]).toEqual([2]);
  expect(wrapper.emitted('board:remove')[0]).toEqual(['1']);
});

test('respond to sidebar actions', () => {
  const wrapper = shallowMount(Sidebar);

  wrapper.find(SidebarActions).vm.$emit('help');
  wrapper.find(SidebarActions).vm.$emit('settings');
  expect(wrapper.emitted('modal:help')[0]).toBeTruthy();
  expect(wrapper.emitted('modal:settings')[0]).toBeTruthy();
});
