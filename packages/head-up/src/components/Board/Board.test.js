import { shallowMount } from '@vue/test-utils';
import Board from './Board';
import store from '../../store';

const commonSettings = {
  stubs: ['Cell', 'BoardToolbar'],
};

beforeEach(() => {
  jest.resetAllMocks();
});

test('render empty', () => {
  const wrapper = shallowMount(Board, {
    ...commonSettings,
    propsData: {
      id: '1',
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render normal', () => {
  const wrapper = shallowMount(Board, {
    ...commonSettings,
    propsData: {
      id: '1',
      title: 'Board title',
    },
    slots: {
      default: '<Cell/><Cell/>',
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render as thumbnail', () => {
  const wrapper = shallowMount(Board, {
    ...commonSettings,
    propsData: {
      id: '1',
      title: 'Board title',
      isThumb: true,
    },
    slots: {
      default: '<Cell/><Cell/>',
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render in edit mode', () => {
  store.replaceState({
    editMode: true,
  });
  const wrapper = shallowMount(Board, {
    ...commonSettings,
    propsData: {
      id: '1',
      title: 'Board title',
      editable: true,
    },
    slots: {
      default: '<Cell/><Cell/>',
    },
  });
  expect(wrapper).toMatchSnapshot();
});
