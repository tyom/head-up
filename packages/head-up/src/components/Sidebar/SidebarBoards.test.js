import { shallowMount } from '@vue/test-utils';
import SidebarBoards from './SidebarBoards';

const boardsMock = [
  {
    id: '1',
    title: 'Board #1',
    cells: [{ title: 'Cell #1' }, { title: 'Cell #2' }],
  },
  {
    id: '2',
    title: 'Board #2',
    editable: true,
    cells: [{ title: 'Cell #1' }, { title: 'Cell #2' }],
  },
];

const provideMock = {
  isEditing: () => false,
  getBoardSummary: () => [],
  getActiveBoardId: () => '1',
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
      getBoardSummary: () => boardsMock,
    },
  });

  expect(wrapper).toMatchSnapshot();
});

test('render to active board id', () => {
  const wrapper = shallowMount(SidebarBoards, {
    provide: {
      ...provideMock,
      getBoardSummary: () => boardsMock,
      getActiveBoardId: () => '2',
    },
  });

  expect(wrapper).toMatchSnapshot();
});

test('responds to remove board actions', () => {
  const wrapper = shallowMount(SidebarBoards, {
    provide: {
      ...provideMock,
      isEditing: () => true,
      getBoardSummary: () => boardsMock,
    },
  });

  const removeButton = wrapper.find('.remove-button');
  removeButton.trigger('click');
  expect(wrapper.emitted('remove')[0]).toEqual(['2']);
});

test('responds to board activation', () => {
  const wrapper = shallowMount(SidebarBoards, {
    provide: {
      ...provideMock,
      getBoardSummary: () => boardsMock,
    },
  });

  const boards = wrapper.findAll('.board');
  boards.at(0).trigger('click');
  expect(wrapper.emitted('activate')[0]).toEqual(['1']);
  boards.at(1).trigger('click');
  expect(wrapper.emitted('activate')[1]).toEqual(['2']);
});
