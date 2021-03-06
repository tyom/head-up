import { shallowMount } from '@vue/test-utils';
import Board from '../../Board';
import Cell from '../../Cell';
import HeadUpBoards from '../HeadUpBoards';

const slotContents = `
  <Board title="Slot board #1" id="b1">
    <Cell title="Cell #1"/>
  </Board>
`;

const boardsMock = [
  {
    id: '1',
    title: 'Prop board #1',
    cells: [
      {
        title: 'Cell #1',
      },
      {
        title: 'Cell #2',
      },
    ],
  },
];

test('render with slots', () => {
  const wrapper = shallowMount(HeadUpBoards, {
    slots: {
      default: slotContents,
    },
    stubs: {
      Board,
      Cell,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render with props', () => {
  const wrapper = shallowMount(HeadUpBoards, {
    propsData: {
      boards: boardsMock,
    },
    stubs: {
      Board,
      Cell,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render with slot and props', () => {
  const wrapper = shallowMount(HeadUpBoards, {
    propsData: {
      boards: boardsMock,
    },
    slots: {
      default: slotContents,
    },
    stubs: {
      Board,
      Cell,
    },
  });
  expect(wrapper).toMatchSnapshot();
});
