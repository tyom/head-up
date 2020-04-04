import { shallowMount } from '@vue/test-utils';
import Boards from '../Boards';

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

test('render default', () => {
  const wrapper = shallowMount(Boards);
  expect(wrapper).toMatchSnapshot();
});

test('render with boards', () => {
  const wrapper = shallowMount(Boards, {
    propsData: {
      boards: boardsMock,
    },
  });

  expect(wrapper).toMatchSnapshot();
});

test('render with active board', () => {
  const wrapper = shallowMount(Boards, {
    propsData: {
      boards: boardsMock,
      activeId: '1',
    },
  });

  expect(wrapper).toMatchSnapshot();
});

test('render in edit mode', () => {
  const wrapper = shallowMount(Boards, {
    propsData: {
      boards: boardsMock,
      editMode: true,
    },
  });

  expect(wrapper).toMatchSnapshot();
});

test('respond to board removal', () => {
  const wrapper = shallowMount(Boards, {
    propsData: {
      boards: boardsMock,
      editMode: true,
    },
  });

  const removeButton = wrapper.find('.remove-button');
  removeButton.trigger('click');
  expect(wrapper.emitted('remove')[0]).toEqual(['2']);
});

test('respond to board activation', () => {
  const wrapper = shallowMount(Boards, {
    propsData: {
      boards: boardsMock,
      activeId: '1',
    },
  });

  const boards = wrapper.findAll('.board');
  boards.at(1).trigger('click');
  expect(wrapper.emitted('activate')[0]).toEqual(['2']);
  boards.at(0).trigger('click');
  expect(wrapper.emitted('activate')[1]).toEqual(['1']);
});
