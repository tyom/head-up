import { shallowMount } from '@vue/test-utils';
import store from '../../../store';
import SettingsScreen from '../SettingsScreen';

store.dispatch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test('render default', () => {
  store.replaceState({
    settings: {
      myFavouriteSetting: {
        value: true,
        label: 'Setting I prefer',
      },
    },
  });

  const wrapper = shallowMount(SettingsScreen, {
    stubs: ['VSwitchToggle'],
  });
  expect(wrapper).toMatchSnapshot();
});

test('dispatches action to save settings', () => {
  const initialSettings = {
    myFavouriteSetting: {
      value: true,
      label: 'Setting I prefer',
    },
  };

  const newSettings = {
    myFavouriteSetting: {
      value: false,
      label: 'Setting I prefer',
    },
  };

  store.replaceState({
    settings: initialSettings,
  });

  const wrapper = shallowMount(SettingsScreen, {
    stubs: ['VSwitchToggle'],
  });

  wrapper.vm.settings = newSettings;

  expect(store.dispatch).toHaveBeenCalledWith('UPDATE_SETTINGS', newSettings);
});

test('dispatches action to reset app state', () => {
  const wrapper = shallowMount(SettingsScreen, {
    stubs: ['VSwitchToggle'],
  });

  wrapper.find('.reset-button').trigger('click');
  expect(store.dispatch).toHaveBeenCalledWith('RESET_STATE');
});
