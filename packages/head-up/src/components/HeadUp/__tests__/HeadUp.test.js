import { merge } from 'lodash';
import Vuex from 'vuex';
import ally from 'ally.js';
import ShortKey from 'vue-shortkey';
import Chance from 'chance';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import store, { initialState } from '../../../store';
import Board from '../../Board';
import Cell from '../../Cell';
import Sidebar from '../../Sidebar';
import ModalDialogue from '../../ModalDialogue';
import VSwitchToggle from '../../VSwitchToggle';
import HeadUp from '../HeadUp';
import HeadUpBoards from '../HeadUpBoards';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ShortKey);
localVue.component('VSwitchToggle', VSwitchToggle);

function mountHeadUp(options = {}) {
  return shallowMount(HeadUp, {
    localVue,
    ...options,
    stubs: {
      Cell,
      Board,
      HeadUpBoards,
    },
  });
}

function mountWithSlot(options = {}) {
  return mountHeadUp(
    merge(
      {
        localVue,
        slots: {
          default: `
            <Board id="b1" title="Slot board">
              <Cell title="Cell #1"/>
            </Board>
          `,
        },
      },
      options,
    ),
  );
}

function mountWithProps(options = {}) {
  return mountHeadUp(
    merge(
      {
        localVue,
        propsData: {
          boards: [
            {
              id: '1',
              title: 'Prop Board #1',
              editable: true,
              cells: [{ title: 'Cell #1' }, { title: 'Cell #2' }],
            },
            {
              id: '2',
              title: 'Prop Board #2',
              editable: true,
              cells: [{ title: 'Cell #3' }],
            },
            {
              id: '3',
              title: 'Prop Board #3',
              editable: true,
              cells: [{ title: 'Cell #4' }],
            },
          ],
        },
      },
      options,
    ),
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  store.replaceState({ ...initialState });
  Element.prototype.scrollIntoView = jest.fn();
  Chance.prototype.sentence = jest.fn(() => 'New board.');
});

describe('rendering', () => {
  test('render default', () => {
    const wrapper = mountHeadUp();
    expect(wrapper).toMatchSnapshot();
  });

  test('render without sidebar', () => {
    const wrapper = mountHeadUp({
      propsData: {
        hideSidebar: true,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  test('render in edit mode', () => {
    const wrapper = mountHeadUp();

    store.state.editMode = true;

    expect(wrapper).toMatchSnapshot();
  });

  test('render with slot', () => {
    const wrapper = mountWithSlot();

    expect(wrapper).toMatchSnapshot();
  });

  test('render with props', () => {
    const wrapper = mountWithProps();

    expect(wrapper).toMatchSnapshot();
  });
});

describe('scrolling', () => {
  beforeEach(() => {
    mountWithProps();
  });

  test('initial scroll on mount', () => {
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({});
  });

  test('scroll on activation', () => {
    store.dispatch('ACTIVATE_BOARD', '2');

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(2);
    expect(Element.prototype.scrollIntoView.mock.calls[1][0]).toEqual({
      behavior: 'smooth',
    });
  });

  test('invalid board id', () => {
    Element.prototype.scrollIntoView.mockClear();

    store.dispatch('ACTIVATE_BOARD', 'fake');

    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });
});

describe('focus trap', () => {
  ally.maintain.tabFocus = jest.fn(() => ({
    disengage: jest.fn(),
  }));

  let wrapper;

  beforeEach(() => {
    wrapper = mountWithProps();
  });

  test('trap focus', () => {
    expect(wrapper.vm.focusTrap).toBeNull();

    store.dispatch('TOGGLE_EDIT_MODE');

    expect(ally.maintain.tabFocus).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.focusTrap).toBeTruthy();
  });

  test('untrap focus', () => {
    store.dispatch('TOGGLE_EDIT_MODE');
    store.dispatch('TOGGLE_EDIT_MODE');

    expect(wrapper.vm.focusTrap.disengage).toHaveBeenCalledTimes(1);
  });
});

describe('manipulations', () => {
  test('add board', () => {
    const wrapper = mountWithProps();

    expect(wrapper.vm.state.serializedBoards.length).toEqual(3);

    store.dispatch('ADD_BOARD');

    expect(store.state.serializedBoards.length).toEqual(4);
    expect(store.state.serializedBoards[0].title).toEqual('new board');
    expect(store.state.serializedBoards[0].id).toEqual('new-board');

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({});
  });

  test('remove active board', () => {
    const wrapper = mountWithProps();

    expect(store.state.serializedBoards.length).toEqual(3);
    expect(wrapper.vm.state.activeBoardId).toEqual('1');

    localVue.nextTick(() => {
      store.dispatch('REMOVE_BOARD', '1');

      expect(store.state.serializedBoards.length).toEqual(2);
      expect(wrapper.vm.state.activeBoardId).toEqual('2');
      expect(wrapper.vm.activeBoardIndex).toEqual(0);

      expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      });
    });
  });

  test('remove board preceding the active one', () => {
    const wrapper = mountWithProps();

    localVue.nextTick(() => {
      wrapper.vm.state.activeBoardId = '2';

      expect(store.state.serializedBoards.length).toEqual(3);
      expect(wrapper.vm.state.activeBoardId).toEqual('2');

      store.dispatch('REMOVE_BOARD', '1');

      expect(store.state.serializedBoards.length).toEqual(2);
      expect(wrapper.vm.state.activeBoardId).toEqual('2');
      expect(wrapper.vm.activeBoardIndex).toEqual(0);

      expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      });
    });
  });

  test('remove last active board in the list', () => {
    const wrapper = mountWithProps();

    localVue.nextTick(() => {
      wrapper.vm.state.activeBoardId = '3';

      expect(store.state.serializedBoards.length).toEqual(3);
      expect(wrapper.vm.state.activeBoardId).toEqual('3');

      store.dispatch('REMOVE_BOARD', '3');

      expect(store.state.serializedBoards.length).toEqual(2);
      expect(wrapper.vm.state.activeBoardId).toEqual('2');
      expect(wrapper.vm.activeBoardIndex).toEqual(1);

      expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      });
    });
  });
});

describe('board editing', () => {
  const newBoardData = {
    id: '1',
    title: 'Updated board',
  };

  beforeEach(() => {
    mountWithProps();
  });

  test('apply edits', () => {
    store.dispatch('UPDATE_BOARD', {
      boardId: '1',
      payload: newBoardData,
    });

    const editedBoard = store.state.serializedBoards.find(x => x.id === '1');
    expect(editedBoard).toHaveProperty('title', newBoardData.title);
  });
});

describe('modal dialogues', () => {
  let wrapper;
  let sidebar;

  beforeEach(() => {
    wrapper = mountWithSlot();
    sidebar = wrapper.find(Sidebar);
  });

  test('open modal', () => {
    sidebar.vm.$emit('toggle:help');
    expect(wrapper.vm.modal.name).toEqual('help');
    expect(wrapper).toMatchSnapshot();

    sidebar.vm.$emit('toggle:help');
    expect(wrapper.vm.modal).toBeNull();
  });

  test('settings', () => {
    sidebar.vm.$emit('toggle:settings');
    expect(wrapper.vm.modal.name).toEqual('settings');
    expect(wrapper).toMatchSnapshot();

    wrapper.find(ModalDialogue).vm.$emit('close');
    expect(wrapper.vm.modal).toBeNull();
  });
});

describe('respond to keystrokes', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithProps({
      attachToDocument: true,
    });
  });

  test('next board', () => {
    expect(wrapper.vm.state.activeBoardId).toEqual('1');
    wrapper.trigger('keydown', {
      key: 'j',
    });
    expect(wrapper.vm.state.activeBoardId).toEqual('2');
    wrapper.trigger('keydown', {
      key: 'j',
    });
    wrapper.trigger('keydown', {
      key: 'j',
    });
    expect(wrapper.vm.state.activeBoardId).toEqual('1');
  });

  test('previous board', () => {
    wrapper.trigger('keydown', {
      key: 'k',
    });
    expect(wrapper.vm.state.activeBoardId).toEqual('3');

    wrapper.trigger('keydown', {
      key: 'k',
    });
    expect(wrapper.vm.state.activeBoardId).toEqual('2');
  });

  test('toggle sidebar', () => {
    expect(wrapper.vm.state.showSidebar).toEqual(true);
    wrapper.trigger('keydown', {
      key: 's',
    });
    expect(wrapper.vm.state.showSidebar).toEqual(false);
  });

  test('toggle edit', () => {
    expect(wrapper.vm.state.editMode).toEqual(false);
    wrapper.trigger('keydown', {
      key: 'e',
    });
    expect(wrapper.vm.state.editMode).toEqual(true);
  });

  test('add board', () => {
    expect(wrapper.vm.state.serializedBoards.length).toEqual(3);
    wrapper.trigger('keydown', {
      key: 'a',
    });
    expect(wrapper.vm.state.serializedBoards.length).toEqual(4);
  });

  //  TODO: Keystroke combinations
});

test('reactivate board on window resize', () => {
  const wrapper = mountWithSlot({
    attachToDocument: true,
  });
  jest.spyOn(wrapper.vm, 'activateBoard');

  const resizeEvent = new Event('resize');
  global.dispatchEvent(resizeEvent);

  expect(wrapper.vm.activateBoard).toHaveBeenCalledWith('b1', false);
});
