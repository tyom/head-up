import { Plugin } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import HeadUp from './components/HeadUp.vue';
import HeadUpBoard from './components/HeadUpBoard.vue';
import HeadUpCell from './components/HeadUpCell.vue';
import { store } from './store';

export { default as CircleGauge } from './components/CircleGauge.vue';
export { default as VCard } from './components/VCard.vue';
export { default as VCollection } from './components/VCollection.vue';
export * from './utils';

export const headUpPlugin: Plugin = {
  install: (app) => {
    app.use(store);
    app.use(VueApexCharts);

    app.component('HeadUp', HeadUp);
    app.component('HeadUpBoard', HeadUpBoard);
    app.component('HeadUpCell', HeadUpCell);
  },
};
