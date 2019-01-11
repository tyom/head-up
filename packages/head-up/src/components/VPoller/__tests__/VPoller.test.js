import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VPoller from '../VPoller';

const nextTick = () => new Promise(res => process.nextTick(res));

jest.mock('axios');
jest.useFakeTimers();

const localVue = createLocalVue();
localVue.use(VueAxios, axios);

beforeEach(() => {
  jest.clearAllMocks();
});

test('render default', () => {
  const wrapper = shallowMount(VPoller, {
    propsData: {
      endpoint: 'http://localhost/',
      interval: '10s',
    },
  });
  expect(wrapper).toMatchSnapshot();
});

describe('timers', () => {
  const responseMock = {
    data: {
      foo: 'bar',
    },
  };

  test('calls endpoint after each interval', async () => {
    axios.get.mockResolvedValue(responseMock);

    shallowMount(VPoller, {
      localVue,
      propsData: {
        endpoint: 'http://localhost/',
        interval: '10s',
      },
    });

    await nextTick();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    await nextTick();

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(setInterval).toHaveBeenCalledTimes(2);
  });

  test('removes timer on each update and when destroyed', async () => {
    axios.get.mockResolvedValue(responseMock);

    const wrapper = shallowMount(VPoller, {
      localVue,
      propsData: {
        endpoint: 'http://localhost/',
        interval: '10s',
      },
    });

    await nextTick();

    const timerId = wrapper.vm.timer;
    expect(clearInterval).toHaveBeenCalledTimes(1);

    wrapper.destroy();

    expect(clearInterval).toHaveBeenCalledTimes(2);
    expect(clearInterval).toHaveBeenCalledWith(timerId);
  });
});
