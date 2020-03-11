import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import actions from './actions';
import mutations from './mutations';

const vuexLocal = new VuexPersistence({
  key: 'headUp',
  saveState(key, state, storage) {
    const persistenceSetting = state.settings.persistState.value;
    if (persistenceSetting) {
      localStorage.setItem(key, JSON.stringify(state));
    } else {
      const newState = JSON.parse(storage[key]);
      newState.settings.persistState.value = persistenceSetting;
      window.localStorage.setItem(key, JSON.stringify(newState));
    }
  },
});

Vue.use(Vuex);

export const initialState = {
  activeBoardId: window.location.hash.replace(/^#/, ''),
  editMode: false,
  showSidebar: true,
  serializedBoards: [],
  settings: {
    smoothScrolling: {
      type: 'toggle',
      label: 'Smooth scrolling',
      value: true,
    },
    persistState: {
      type: 'toggle',
      label: 'Persist to local storage',
      value: true,
    },
  },
};

export default new Vuex.Store({
  actions,
  mutations,
  state: initialState,
  plugins: [vuexLocal.plugin],
});
