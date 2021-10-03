import { Plugin } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import HeadUp from './components/HeadUp.vue';
import HeadUpBoard from './components/HeadUpBoard.vue';
import HeadUpCell from './components/HeadUpCell.vue';
import { store } from './store';

export { default as CircleGauge } from './components/CircleGauge.vue';

export const headUpPlugin: Plugin = {
  install: (app) => {
    app.use(store);
    app.use(VueAxios, axios);
    app.provide('axios', app.config.globalProperties.axios);

    app.component('HeadUp', HeadUp);
    app.component('HeadUpBoard', HeadUpBoard);
    app.component('HeadUpCell', HeadUpCell);
  },
};
