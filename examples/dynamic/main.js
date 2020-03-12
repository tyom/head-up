import Vue from 'vue';
import HeadUpPlugin from '../../src';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(HeadUpPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
