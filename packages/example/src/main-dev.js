import Vue from 'vue';
import HeadUp from '../../head-up/src';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(HeadUp);

new Vue({ render: h => h(App) }).$mount('#app');
