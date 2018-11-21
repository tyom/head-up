import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import plugins from './plugins';

Vue.use(Vuex);

export default {
  state,
  mutations,
  actions,
  plugins,
};
