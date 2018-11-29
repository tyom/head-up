import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import ShortKey from 'vue-shortkey';
import ModalDialogue from './ModalDialogue';

const localVue = createLocalVue();

localVue.use(ShortKey);

test('render default', () => {
  const wrapper = shallowMount(ModalDialogue, {
    localVue,
  });
  expect(wrapper).toMatchSnapshot();
});

test('render with heading and contents', () => {
  const wrapper = shallowMount(ModalDialogue, {
    localVue,
    propsData: {
      heading: 'I’m floating',
    },
    slots: {
      default: '<p>I’m standing</p>',
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('closes dialogue on backdrop click', () => {
  const wrapper = shallowMount(ModalDialogue, {
    localVue,
  });

  wrapper.find('.backdrop').trigger('click');
  expect(wrapper.emitted('close')).toBeTruthy();
});

test('closes dialogue on escape key', () => {
  const wrapper = mount(ModalDialogue, {
    attachToDocument: true,
    localVue,
  });

  wrapper.trigger('keydown.esc', {
    key: 'Escape',
  });
  expect(wrapper.emitted('close')).toBeTruthy();
});
