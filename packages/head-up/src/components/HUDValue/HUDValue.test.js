import { shallowMount } from '@vue/test-utils';
import HUDValue from './HUDValue';

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
