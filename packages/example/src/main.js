import Vue from 'vue';
import Vuex from 'vuex';
import HeadUp, { store as headUpStore } from 'head-up';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(HeadUp);

const store = new Vuex.Store(headUpStore);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
