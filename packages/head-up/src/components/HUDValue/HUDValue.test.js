import { shallowMount } from '@vue/test-utils';
import { tween } from 'femtotween';
import HUDValue from './HUDValue';

jest.mock('femtotween', () => ({
  tween: jest.fn((oldVal, newVal, cb) => cb(newVal)),
}));

test('render default', () => {
  const wrapper = shallowMount(HUDValue);
  expect(wrapper).toMatchSnapshot();
});

test('render with label and value', () => {
  const wrapper = shallowMount(HUDValue, {
    propsData: {
      label: 'Strength',
      value: 100,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render with up trend', () => {
  const wrapper = shallowMount(HUDValue, {
    propsData: {
      label: 'Strength',
      value: 100,
      increase: true,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render with down trend', () => {
  const wrapper = shallowMount(HUDValue, {
    propsData: {
      label: 'Strength',
      value: 100,
      decrease: true,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

describe('tweened value', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HUDValue, {
      propsData: {
        label: 'Strength',
        value: 100,
      },
    });
  });

  test('calls tween function', () => {
    wrapper.setProps({
      value: 120,
    });

    expect(tween).toHaveBeenCalledWith(100, 120, expect.any(Function));
  });

  test('sets tweenedValue data property', () => {
    wrapper.setProps({
      value: 123.456789,
    });

    expect(wrapper.vm.tweenedValue).toEqual('123.457');

    wrapper.setProps({
      value: 'purple',
    });

    expect(wrapper.vm.tweenedValue).toEqual('purple');
  });
});
