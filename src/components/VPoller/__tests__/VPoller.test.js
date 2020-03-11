import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VPoller from '../VPoller';

jest.mock('axios');
jest.useFakeTimers();
jest.spyOn(global.console, 'error');

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
});

describe('single request', () => {
  beforeEach(() => {
    wrapper = shallowMount(VPoller, {
      localVue,
      propsData: {
        endpoint: 'http://localhost/',
        query: { key: 'abc' },
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
    expect(axios.get).toHaveBeenCalledWith('http://localhost/', {
      params: { key: 'abc' },
    });
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

  test('handles request error', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('nope')));

    await wrapper.vm.update();

    expect(console.error).toHaveBeenCalledWith('nope');
  });
});

describe('multiple requests', () => {
  test('calls multiple endpoint requests - shorthand', () => {
    wrapper = shallowMount(VPoller, {
      localVue,
      propsData: {
        endpoint: 'http://localhost/',
        query: { key: 'abc' },
        requests: ['/one', '/two'],
        interval: '10s',
      },
    });

    expect(axios.get.mock.calls).toEqual([
      ['http://localhost/one', { params: { key: 'abc' } }],
      ['http://localhost/two', { params: { key: 'abc' } }],
    ]);
  });

  test('calls multiple endpoint requests - with queries', () => {
    wrapper = shallowMount(VPoller, {
      localVue,
      propsData: {
        endpoint: 'http://localhost/',
        query: { key: 'abc' },
        requests: [
          {
            path: '/one',
            query: { a: 'A' },
          },
          {
            path: '/two',
          },
          '/three',
          {
            query: { b: 'B' },
          },
        ],
        interval: '10s',
      },
    });

    expect(axios.get.mock.calls).toEqual([
      ['http://localhost/one', { params: { key: 'abc', a: 'A' } }],
      ['http://localhost/two', { params: { key: 'abc' } }],
      ['http://localhost/three', { params: { key: 'abc' } }],
      ['http://localhost', { params: { key: 'abc', b: 'B' } }],
    ]);
  });
});
