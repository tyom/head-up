import { shallowMount } from '@vue/test-utils';
import SidebarBoards from './SidebarBoards';

const boardsMock = [
  {
    title: 'Board #1',
    cells: [{ title: 'Cell #1' }, { title: 'Cell #2' }],
  },
  {
    title: 'Board #2',
    id: '1',
    editable: true,
    cells: [{ title: 'Cell #1' }, { title: 'Cell #2' }],
  },
];

const provideMock = {
  isEditing: () => false,
  getBoards: () => [],
  getActiveBoardIdx: () => 0,
};

test('render default', () => {
  const wrapper = shallowMount(SidebarBoards, {
    provide: provideMock,
  });
  expect(wrapper).toMatchSnapshot();
});

test('render with boards', () => {
  const wrapper = shallowMount(SidebarBoards, {
    provide: {
      ...provideMock,
      getBoards: () => boardsMock,
    },
  });

  expect(wrapper).toMatchSnapshot();
});

test('render with active board index', () => {
  const wrapper = shallowMount(SidebarBoards, {
    provide: {
      ...provideMock,
      getBoards: () => boardsMock,
      getActiveBoardIdx: () => 1,
    },
  });

  expect(wrapper).toMatchSnapshot();
});

test('responds to remove board actions', () => {
  const wrapper = shallowMount(SidebarBoards, {
    provide: {
      ...provideMock,
      isEditing: () => true,
      getBoards: () => boardsMock,
    },
  });

  const removeButton = wrapper.find('.remove-button');
  removeButton.trigger('click');
  expect(wrapper.emitted('remove')[0]).toEqual(['1']);
});

test('responds to board activation', () => {
  const wrapper = shallowMount(SidebarBoards, {
    provide: {
      ...provideMock,
      getBoards: () => boardsMock,
    },
  });

  const boards = wrapper.findAll('.board');
  boards.at(0).trigger('click');
  expect(wrapper.emitted('activate')[0]).toEqual([0]);
  boards.at(1).trigger('click');
  expect(wrapper.emitted('activate')[1]).toEqual([1]);
});
