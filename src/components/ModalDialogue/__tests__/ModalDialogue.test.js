import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import ShortKey from 'vue-shortkey';
import ModalDialogue from '../ModalDialogue';

const localVue = createLocalVue();

localVue.use(ShortKey);

test('render default', () => {
  const wrapper = shallowMount(ModalDialogue, {
    localVue,
  });
  expect(wrapper).toMatchSnapshot();
});

test('render help modal', () => {
  const wrapper = shallowMount(ModalDialogue, {
    localVue,
    propsData: {
      content: {
        name: 'help',
        heading: 'Help is here',
      },
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render settings modal', () => {
  const wrapper = shallowMount(ModalDialogue, {
    localVue,
    propsData: {
      content: {
        name: 'settings',
        heading: 'Settings is here',
      },
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('closes dialogue on backdrop click', () => {
  const wrapper = shallowMount(ModalDialogue, {
    localVue,
    propsData: {
      content: {
        name: 'settings',
      },
    },
  });

  wrapper.find('.backdrop').trigger('click');
  expect(wrapper.emitted('close')).toBeTruthy();
});

test('closes dialogue on escape key', () => {
  const wrapper = mount(ModalDialogue, {
    attachToDocument: true,
    localVue,
    propsData: {
      content: {
        name: 'settings',
      },
    },
  });

  wrapper.trigger('keydown.esc', {
    key: 'Escape',
  });
  expect(wrapper.emitted('close')).toBeTruthy();
});
