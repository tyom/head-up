import { Plugin } from 'vue';
// import VueFeather from 'vue-feather';
import HeadUp from './components/HeadUp.vue';
import HeadUpBoard from './components/HeadUpBoard.vue';
import HeadUpCell from './components/HeadUpCell.vue';

const headUpPlugin: Plugin = {
  install: (app) => {
    // app.component(VueFeather.name, VueFeather);
    app.component('head-up', HeadUp);
    app.component('head-up-board', HeadUpBoard);
    app.component('head-up-cell', HeadUpCell);
  },
};

export default headUpPlugin;
