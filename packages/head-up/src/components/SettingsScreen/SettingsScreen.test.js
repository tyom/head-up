import { shallowMount } from '@vue/test-utils';
import SettingsScreen from './SettingsScreen';

test('render default', () => {
  const wrapper = shallowMount(SettingsScreen, {
    propsData: {
      settings: {
        myFavouriteSetting: {
          value: true,
          label: 'Setting I prefer',
        },
      },
    },
    stubs: ['VSwitchToggle'],
  });
  expect(wrapper).toMatchSnapshot();
});

test('emits save event', () => {
  const wrapper = shallowMount(SettingsScreen, {
    propsData: {
      settings: {
        myFavouriteSetting: {
          value: true,
          label: 'Setting I prefer',
        },
      },
    },
    stubs: ['VSwitchToggle'],
  });

  wrapper.vm.settingsState.myFavouriteSetting.value = false;
  expect(wrapper.emitted('save')[0][0]).toHaveProperty(
    'myFavouriteSetting.value',
    false,
  );
});
