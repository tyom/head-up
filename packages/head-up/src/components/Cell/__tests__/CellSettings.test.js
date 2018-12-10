import { shallowMount } from '@vue/test-utils';
import CellSettings from '../CellSettings';

test('default render', () => {
  const wrapper = shallowMount(CellSettings);
  expect(wrapper).toMatchSnapshot();
});
