import { shallowMount } from '@vue/test-utils';
import store from '../../store';
import Sidebar from './Sidebar';
import SidebarToggle from './SidebarToggle';
import SidebarBoards from './SidebarBoards';
import SidebarBoardActions from './SidebarBoardActions';
import SidebarActions from './SidebarActions';

jest.spyOn(store, 'dispatch');

beforeEach(() => {
  jest.clearAllMocks();
});

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

describe('respond to interactions', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Sidebar);
  });

  test('toggle sidebar', () => {
    wrapper.find(SidebarToggle).vm.$emit('toggle');
    expect(store.dispatch).toHaveBeenCalledWith('TOGGLE_SIDEBAR');
  });

  test('add board', () => {
    wrapper.find(SidebarBoardActions).vm.$emit('add-board');
    expect(store.dispatch).toHaveBeenCalledWith('ADD_BOARD');
  });

  test('edit mode', () => {
    wrapper.find(SidebarBoardActions).vm.$emit('toggle-edit');
    expect(store.dispatch).toHaveBeenCalledWith('TOGGLE_EDIT_MODE');
  });

  test('activate board', () => {
    wrapper.find(SidebarBoards).vm.$emit('activate', 'my-board');
    expect(store.dispatch).toHaveBeenCalledWith('ACTIVATE_BOARD', 'my-board');
  });

  test('remove board', () => {
    wrapper.find(SidebarBoards).vm.$emit('remove', 'my-board');
    expect(store.dispatch).toHaveBeenCalledWith('REMOVE_BOARD', 'my-board');
  });

  test('toggle help overlay', () => {
    wrapper.find(SidebarActions).vm.$emit('help');
    expect(wrapper.emitted('toggle:help')[0]).toBeTruthy();
  });

  test('toggle settings overlay', () => {
    wrapper.find(SidebarActions).vm.$emit('settings');
    expect(wrapper.emitted('toggle:settings')[0]).toBeTruthy();
  });
});
