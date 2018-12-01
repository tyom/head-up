import { shallowMount } from '@vue/test-utils';
import Cell from './Cell';
import CellSettings from './CellSettings';

const mockProvideNotEditing = {
  isEditing: () => false,
};

const mockProvideEditing = {
  isEditing: () => true,
};

test('default render', () => {
  const wrapper = shallowMount(Cell, {
    provide: mockProvideNotEditing,
  });
  expect(wrapper).toMatchSnapshot();
});

test('with title', () => {
  const wrapper = shallowMount(Cell, {
    propsData: {
      title: 'Important section',
    },
    provide: mockProvideNotEditing,
  });
  expect(wrapper).toMatchSnapshot();
});

test('with content in slots', () => {
  const wrapper = shallowMount(Cell, {
    provide: mockProvideNotEditing,
    slots: {
      default: '<div>1</div><div>2</div><div>3</div>',
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('with content in props', () => {
  const wrapper = shallowMount(Cell, {
    propsData: {
      content: [
        { type: 'CustomComponent', props: { foo: 'custom-prop' } },
        { type: 'CustomComponent', props: { bar: 2 } },
      ],
    },
    stubs: ['CustomComponent'],
    provide: mockProvideNotEditing,
  });
  expect(wrapper).toMatchSnapshot();
});

test('editable', () => {
  const wrapper = shallowMount(Cell, {
    propsData: {
      title: 'Important section',
      editable: true,
    },
    provide: mockProvideEditing,
  });
  expect(wrapper).toMatchSnapshot();
});

test('toggle settings', () => {
  const wrapper = shallowMount(Cell, {
    propsData: {
      title: 'Important section',
      editable: true,
    },
    provide: mockProvideEditing,
  });

  expect(wrapper.find(CellSettings).exists()).toBe(false);
  wrapper.find('.header-button').trigger('click');
  expect(wrapper).toMatchSnapshot();
});
