import { shallowMount } from '@vue/test-utils';
import store from '../../../store';
import Sidebar from '../Sidebar';
import Toggle from '../Toggle';
import Boards from '../Boards';

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
    wrapper.find(Toggle).vm.$emit('toggle');
    expect(store.dispatch).toHaveBeenCalledWith('TOGGLE_SIDEBAR');
  });

  test('add board', () => {
    wrapper.find('.add-button').vm.$emit('click');
    expect(store.dispatch).toHaveBeenCalledWith('ADD_BOARD');
  });

  test('edit mode', () => {
    wrapper.find('.edit-button').vm.$emit('click');
    expect(store.dispatch).toHaveBeenCalledWith('TOGGLE_EDIT_MODE');
  });

  test('activate board', () => {
    wrapper.find(Boards).vm.$emit('activate', 'my-board');
    expect(store.dispatch).toHaveBeenCalledWith('ACTIVATE_BOARD', 'my-board');
  });

  test('remove board', () => {
    wrapper.find(Boards).vm.$emit('remove', 'my-board');
    expect(store.dispatch).toHaveBeenCalledWith('REMOVE_BOARD', 'my-board');
  });

  test('toggle help overlay', () => {
    wrapper.find('.help-button').vm.$emit('click');
    expect(wrapper.emitted('toggle:help')[0]).toBeTruthy();
  });

  test('toggle settings overlay', () => {
    wrapper.find('.settings-button').vm.$emit('click');
    expect(wrapper.emitted('toggle:settings')[0]).toBeTruthy();
  });
});
