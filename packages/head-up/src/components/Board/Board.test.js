import { shallowMount } from '@vue/test-utils';
import Board from './Board';

const commonSettings = {
  provide: {
    isEditing: () => false,
  },
  stubs: ['Cell', 'BoardToolbar'],
};

test('render empty', () => {
  const wrapper = shallowMount(Board, {
    ...commonSettings,
  });
  expect(wrapper).toMatchSnapshot();
});

test('render normal', () => {
  const wrapper = shallowMount(Board, {
    ...commonSettings,
    propsData: {
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
  const wrapper = shallowMount(Board, {
    ...commonSettings,
    propsData: {
      title: 'Board title',
      editable: true,
    },
    provide: {
      isEditing: () => true,
    },
    slots: {
      default: '<Cell/><Cell/>',
    },
  });
  expect(wrapper).toMatchSnapshot();
});
