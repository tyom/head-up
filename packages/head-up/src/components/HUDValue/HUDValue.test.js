import { shallowMount } from '@vue/test-utils';
import { tween } from 'femtotween';
import HUDValue from './HUDValue';

jest.mock('femtotween', () => ({
  tween: jest.fn(),
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

    wrapper.setData({
      value: 120,
    });
  });

  test('calls tween function', () => {
    expect(tween).toHaveBeenCalledWith(100, 120, expect.any(Function));
  });

  test('sets tweenedValue data property', () => {
    const [, , cb] = tween.mock.calls[0];

    cb(123.456789);

    expect(wrapper.vm.tweenedValue).toEqual('123.457');

    cb('purple');

    expect(wrapper.vm.tweenedValue).toEqual('purple');
  });
});
