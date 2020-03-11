import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import HeadUp from '../../src';
Vue.use(HeadUp);

new Vue({
  render: h => h(App),
}).$mount('#app');
