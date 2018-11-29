import { shallowMount } from '@vue/test-utils';
import VSwitchToggle from './VSwitchToggle';

test('render default', () => {
  const wrapper = shallowMount(VSwitchToggle, {
    propsData: {
      label: 'Check it',
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('change on input click', () => {
  const wrapper = shallowMount(VSwitchToggle, {
    propsData: {
      label: 'Check it',
    },
  });

  const input = wrapper.find('input');

  expect(wrapper.vm.toggled).toEqual(false);

  input.trigger('click');

  expect(wrapper.vm.toggled).toEqual(true);
});

test('change on label click', () => {
  const wrapper = shallowMount(VSwitchToggle, {
    propsData: {
      label: 'Check it',
    },
  });

  const label = wrapper.find('label');

  expect(wrapper.vm.toggled).toEqual(false);

  label.trigger('click');

  expect(wrapper.vm.toggled).toEqual(true);
});

test('emits input event', () => {
  const wrapper = shallowMount(VSwitchToggle, {
    propsData: {
      label: 'Check it',
    },
  });

  const input = wrapper.find('input');
  input.trigger('click');

  expect(wrapper.emitted('input')[0]).toEqual([true]);
});
