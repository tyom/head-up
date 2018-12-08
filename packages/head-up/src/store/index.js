import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import actions from './actions';
import mutations from './mutations';

const vuexLocal = new VuexPersistence({
  key: 'headUp',
  storage: window.localStorage,
});

Vue.use(Vuex);

export const initialState = {
  activeBoardId: undefined,
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
