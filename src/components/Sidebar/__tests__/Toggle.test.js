import { shallowMount } from '@vue/test-utils';
import Toggle from '../Toggle';

test('render untoggled', () => {
  const wrapper = shallowMount(Toggle, {
    propsData: {
      toggled: false,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render toggled', () => {
  const wrapper = shallowMount(Toggle, {
    propsData: {
      toggled: true,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('responds to actions', () => {
  const wrapper = shallowMount(Toggle);

  wrapper.find('button').trigger('click');
  expect(wrapper.emitted('toggle')[0]).toBeTruthy();
});
