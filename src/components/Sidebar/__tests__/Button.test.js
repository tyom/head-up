import { shallowMount } from '@vue/test-utils';
import Button from '../Button';

test('render default', () => {
  const wrapper = shallowMount(Button, {
    slots: {
      default: 'Clicky',
    },
  });
  expect(wrapper).toMatchSnapshot();
});
