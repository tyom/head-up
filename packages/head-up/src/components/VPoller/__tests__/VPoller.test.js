import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VPoller from '../VPoller';

jest.mock('axios');
jest.useFakeTimers();

const localVue = createLocalVue();
localVue.use(VueAxios, axios);

axios.get.mockResolvedValue({
  data: {
    foo: 'bar',
  },
});

let wrapper;

beforeEach(() => {
  jest.clearAllMocks();

  wrapper = shallowMount(VPoller, {
    localVue,
    propsData: {
      endpoint: 'http://localhost/',
      interval: '10s',
    },
  });
});

test('default render', () => {
  expect(wrapper).toMatchSnapshot();
  wrapper.destroy();
});

test('calls endpoint after each interval', () => {
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenCalledTimes(1);

  jest.runOnlyPendingTimers();

  expect(axios.get).toHaveBeenCalledTimes(2);
  expect(setInterval).toHaveBeenCalledTimes(1);

  jest.runOnlyPendingTimers();

  expect(axios.get).toHaveBeenCalledTimes(3);
  expect(setInterval).toHaveBeenCalledTimes(1);
});

test('removes interval before destroy', () => {
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(clearInterval).not.toHaveBeenCalled();

  wrapper.destroy();

  expect(clearInterval).toHaveBeenCalledTimes(1);
});
