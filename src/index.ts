import { Plugin } from 'vue';
import HeadUp from './components/HeadUp.vue';
import HeadUpBoard from './components/HeadUpBoard.vue';
import HeadUpCell from './components/HeadUpCell.vue';
import { store } from './store';

export const headUpPlugin: Plugin = {
  install: (app) => {
    app.use(store);

    app.component('HeadUp', HeadUp);
    app.component('HeadUpBoard', HeadUpBoard);
    app.component('HeadUpCell', HeadUpCell);
  },
};
