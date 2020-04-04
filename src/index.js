import 'focus-visible';
import axios from 'axios';
import get from 'lodash/get';
import Vue from 'vue/dist/vue.common';
import VueAxios from 'vue-axios';
import ShortKey from 'vue-shortkey';
import Vue2Filters from 'vue2-filters';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/plus';
import 'vue-awesome/icons/edit';
import 'vue-awesome/icons/minus-circle';
import 'vue-awesome/icons/ellipsis-h';
import 'vue-awesome/icons/ellipsis-v';
import 'vue-awesome/icons/chevron-left';
import 'vue-awesome/icons/cog';
import 'vue-awesome/icons/question';
import 'vue-awesome/icons/caret-up';
import 'vue-awesome/icons/caret-down';
import HeadUp from './components/HeadUp';
import Board from './components/Board';
import Cell from './components/Cell';
import HValue from './components/HValue';
import HCard from './components/HCard';
import HGauge from './components/HGauge';

import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      // eslint-disable-line no-console
      // console.warn(
      //   err.response.data.status_message,
      //   '\n',
      //   err.response.config.url,
      // );
    }
    return err;
  },
);

export const HeadUpPlugin = {
  install(Vue) {
    Vue.prototype.$get = get;
    Vue.use(VueAxios, axios);
    Vue.use(Vue2Filters);
    Vue.use(ShortKey, { prevent: ['input', 'textarea'] });
    Vue.component('v-icon', Icon);
    Vue.component(HeadUp.name, HeadUp);
    Vue.component(Board.name, Board);
    Vue.component(Cell.name, Cell);
    Vue.component(HValue.name, HValue);
    Vue.component(HCard.name, HCard);
    Vue.component(HGauge.name, HGauge);

    const requireComponent = require.context(
      './components', // components dir
      true, // recursive
      /^(\.\/.*)*V[A-Z].+\.vue$/, // global name regex
    );

    requireComponent.keys().forEach((fileName) => {
      let baseComponentConfig = requireComponent(fileName);
      baseComponentConfig = baseComponentConfig.default || baseComponentConfig;

      const baseComponentName =
        baseComponentConfig.name ||
        fileName.replace(/^.+\//, '').replace(/\.\w+$/, '');

      Vue.component(baseComponentName, baseComponentConfig);
    });
  },
};

/**
 * Initialise the library when running at runtime via script tag
 *
 * @param {string} template - template string or selector of a script tag of type="text/x-template"
 * @param {string} el - container selector id which will contain the result
 * @returns {Promise<void>}
 */
export async function initRuntime(template, el = '#app') {
  if (!template) {
    throw new Error(
      `'template is required and should point to id of a <script type="text/x-template"> or template literal with actual template code.`,
    );
  }
  Vue.use(HeadUpPlugin);
  window.addEventListener('load', () => {
    new Vue({
      el,
      template,
    });
  });
}
