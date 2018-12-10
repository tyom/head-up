import { shallowMount } from '@vue/test-utils';
import store from '../../../store';
import Cell from '../Cell';
import CellSettings from '../CellSettings';

test('default render', () => {
  const wrapper = shallowMount(Cell);
  expect(wrapper).toMatchSnapshot();
});

test('with title', () => {
  const wrapper = shallowMount(Cell, {
    propsData: {
      title: 'Important section',
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('with content in slots', () => {
  const wrapper = shallowMount(Cell, {
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
  });
  expect(wrapper).toMatchSnapshot();
});

test('editable', () => {
  store.replaceState({
    editMode: true,
  });

  const wrapper = shallowMount(Cell, {
    propsData: {
      title: 'Important section',
      editable: true,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('toggle settings', () => {
  store.replaceState({
    editMode: true,
  });

  const wrapper = shallowMount(Cell, {
    propsData: {
      title: 'Important section',
      editable: true,
    },
  });

  expect(wrapper.find(CellSettings).exists()).toBe(false);
  wrapper.find('.header-button').trigger('click');
  expect(wrapper).toMatchSnapshot();
});
