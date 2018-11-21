import Vue from 'vue';
import Vuex from 'vuex';
import HeadUp, { store as headUpStore } from 'head-up';
import router from './router';
import Layout from './layout.vue';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(HeadUp);

const store = new Vuex.Store(headUpStore);

new Vue({
  store,
  router,
  render: h => h(Layout),
}).$mount('#app');
