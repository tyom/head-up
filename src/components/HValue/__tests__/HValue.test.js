import { shallowMount } from '@vue/test-utils';
import { tween } from 'femtotween';
import HValue from '../HValue';

jest.mock('femtotween', () => ({
  tween: jest.fn((oldVal, newVal, cb) => cb(newVal)),
}));

test('render default', () => {
  const wrapper = shallowMount(HValue);
  expect(wrapper).toMatchSnapshot();
});

test('render with label and value', () => {
  const wrapper = shallowMount(HValue, {
    propsData: {
      label: 'Strength',
      value: 100,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render with value from scoped slot', () => {
  const wrapper = shallowMount(HValue, {
    propsData: {
      label: 'Strength',
      value: 100,
    },
    scopedSlots: {
      value: '<h1 slot-scope="{value}">{{ value }}%</h1>',
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render with pre- and post-value slots', () => {
  const wrapper = shallowMount(HValue, {
    propsData: {
      label: 'Strength',
      value: 100,
    },
    slots: {
      'pre-value': '<h1>before value</h1>',
      'post-value': '<h1>after value</h1>',
    },
  });
  expect(wrapper).toMatchSnapshot();
});

describe('tweened value', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(HValue, {
      propsData: {
        label: 'Strength',
        value: 100,
      },
    });
  });

  test('calls tween function', async () => {
    wrapper.setProps({
      value: 120,
    });

    await wrapper.vm.$nextTick();
    expect(tween).toHaveBeenCalledWith(100, 120, expect.any(Function));
  });

  test('sets tweenedValue data property', async () => {
    wrapper.setProps({
      value: 123.456789,
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.tweenedValue).toEqual('123.46');

    wrapper.setProps({
      value: 'purple',
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.tweenedValue).toEqual('purple');
  });
});
