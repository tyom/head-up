import { merge } from 'lodash';
import ally from 'ally.js';
import ShortKey from 'vue-shortkey';
import Chance from 'chance';
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import Board from '../Board';
import Cell from '../Cell';
import Sidebar from '../Sidebar';
import ModalDialogue from '../ModalDialogue';
import SettingsScreen from '../SettingsScreen';
import VSwitchToggle from '../VSwitchToggle';
import HeadUp from './HeadUp';
import HeadUpBoards from './HeadUpBoards';

jest.mock('ally.js');

const localVue = createLocalVue();
localVue.use(ShortKey);
localVue.component('VSwitchToggle', VSwitchToggle);

const scrollIntoViewSpy = jest.fn();

function mountHeadUp(options = {}) {
  return shallowMount(HeadUp, {
    localVue,
    ...options,
  });
}

function mountWithSlot(options = {}) {
  return mountHeadUp(
    merge(
      {
        localVue,
        slots: {
          default: '<Board id="b1"><Cell title="Cell #1"/></Board>',
        },
        stubs: {
          Cell,
          Board,
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
              cells: [{ title: 'Cell #1' }, { title: 'Cell #2' }],
            },
            {
              id: '2',
              cells: [{ title: 'Cell #3' }],
            },
            {
              id: '3',
              cells: [{ title: 'Cell #4' }],
            },
          ],
        },
        stubs: {
          Cell,
          Board,
          HeadUpBoards,
        },
      },
      options,
    ),
  );
}

beforeEach(() => {
  jest.resetAllMocks();
  Element.prototype.scrollIntoView = scrollIntoViewSpy;
  Chance.prototype.sentence = jest.fn(() => 'New board.');
});

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

  wrapper.setData({
    state: {
      editMode: true,
    },
  });

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

test('scroll to activeBoard', () => {
  const wrapper = mountWithProps();

  wrapper.setData({
    state: {
      activeBoardId: '2',
    },
  });

  expect(scrollIntoViewSpy).toHaveBeenCalled();
});

test('add board in sidebar', () => {
  const wrapper = mountWithProps();
  const sidebar = wrapper.find(Sidebar);

  expect(wrapper.vm.state.boards.length).toEqual(3);
  sidebar.vm.$emit('board:add');

  expect(wrapper.vm.state.boards.length).toEqual(4);
  expect(wrapper.vm.state.boards[0].title).toEqual('new board');
  expect(wrapper.vm.state.boards[0].id).toEqual('new-board');
});

describe('remove board in sidebar', () => {
  test('remove active board', () => {
    const wrapper = mountWithProps();
    const sidebar = wrapper.find(Sidebar);

    expect(wrapper.vm.state.boards.length).toEqual(3);
    sidebar.vm.$emit('board:remove', '1');

    expect(wrapper.vm.state.boards.length).toEqual(2);

    process.nextTick(() => {
      expect(wrapper.vm.state.activeBoardId).toEqual('2');
      expect(wrapper.vm.activeBoardIndex).toEqual(0);
    });
  });

  test('remove last board in the list', () => {
    const wrapper = mountWithProps();
    const sidebar = wrapper.find(Sidebar);

    wrapper.setData({
      state: {
        activeBoardId: '3',
      },
    });
    expect(wrapper.vm.state.boards.length).toEqual(3);
    sidebar.vm.$emit('board:remove', '3');

    expect(wrapper.vm.state.boards.length).toEqual(2);
    process.nextTick(() => {
      expect(wrapper.vm.state.activeBoardId).toEqual('2');
      expect(wrapper.vm.activeBoardIndex).toEqual(1);
    });
  });

  test('remove board preceding the active one', () => {
    const wrapper = mountWithProps();
    const sidebar = wrapper.find(Sidebar);

    wrapper.setData({
      state: {
        activeBoardId: '2',
      },
    });
    expect(wrapper.vm.state.boards.length).toEqual(3);
    expect(wrapper.vm.activeBoardIndex).toEqual(1);
    sidebar.vm.$emit('board:remove', '1');

    expect(wrapper.vm.state.boards.length).toEqual(2);
    expect(wrapper.vm.activeBoardIndex).toEqual(0);
  });
});

describe('respond to board edits', () => {
  let wrapper;

  const newBoardData = {
    id: '1',
    title: 'Updated board',
  };

  beforeEach(() => {
    wrapper = mountWithProps();
  });

  test('save edit', () => {
    wrapper.vm.handleEditSave(newBoardData);
    expect(wrapper.vm.state.boards.find(x => x.id === '1')).toEqual(
      newBoardData,
    );
  });

  test('finish edit', () => {
    wrapper.vm.handleEditDone(newBoardData);
    expect(wrapper.vm.state.boards.find(x => x.id === '1')).toEqual(
      newBoardData,
    );
    expect(wrapper.vm.state.editMode).toBe(false);
  });
});

describe('modal dialogues', () => {
  let wrapper;
  let sidebar;

  beforeEach(() => {
    wrapper = mountWithSlot();
    sidebar = wrapper.find(Sidebar);
  });

  test('help', () => {
    expect(wrapper.vm.modal).toBeNull();
    sidebar.vm.$emit('modal:help');
    expect(wrapper.vm.modal.name).toEqual('help');
    expect(wrapper).toMatchSnapshot();

    sidebar.vm.$emit('modal:help');
    expect(wrapper.vm.modal).toBeNull();
  });

  test('settings', () => {
    expect(wrapper.vm.modal).toBeNull();
    sidebar.vm.$emit('modal:settings');
    expect(wrapper.vm.modal.name).toEqual('settings');
    expect(wrapper).toMatchSnapshot();

    wrapper.find(ModalDialogue).vm.$emit('close');
    expect(wrapper.vm.modal).toBeNull();
  });
});

test('save settings', () => {
  const wrapper = mount(HeadUp, {
    localVue,
    stubs: ['v-icon'],
  });
  const sidebar = wrapper.find(Sidebar);

  sidebar.vm.$emit('modal:settings');
  const settings = wrapper.find(SettingsScreen);

  expect(wrapper.vm.state.settings.smoothScrolling.value).toBe(true);
  settings.find('[name="smoothScrolling"]').trigger('click');
  expect(wrapper.vm.state.settings.smoothScrolling.value).toBe(false);
});

describe('persist changes', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithProps();
  });

  test('restore state from local storage', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('headUp');
  });

  test('enabled persistence', () => {
    wrapper.setData({
      state: {
        activeBoardId: '2',
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'headUp',
      JSON.stringify(wrapper.vm.state),
    );
  });

  test('disabled persistence', () => {
    wrapper.setData({
      persistedState: JSON.stringify(wrapper.vm.state),
      state: {
        settings: {
          persistState: {
            value: false,
          },
        },
      },
    });
    wrapper.setData({
      state: {
        activeBoardId: '2',
      },
    });

    const expectedState = merge(JSON.parse(wrapper.vm.persistedState), {
      settings: {
        persistState: {
          value: false,
        },
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'headUp',
      JSON.stringify(expectedState),
    );
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
    expect(wrapper.vm.state.boards.length).toEqual(3);
    wrapper.trigger('keydown', {
      key: 'a',
    });
    expect(wrapper.vm.state.boards.length).toEqual(4);
  });

  //  TODO: Keystroke combinations
});

test('focus trap', () => {
  const wrapper = mountWithSlot();

  wrapper.setData({
    state: {
      editMode: true,
    },
  });

  expect(ally.maintain.tabFocus).toHaveBeenCalled();
});
