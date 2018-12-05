import 'focus-visible';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ShortKey from 'vue-shortkey';
import HeadUp from './components/HeadUp';
import Board from './components/Board';
import Cell from './components/Cell';
import HUDValue from './components/HUDValue';
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

const HeadUpPlugin = {
  install(Vue) {
    Vue.use(VueAxios, axios);
    Vue.use(ShortKey, { prevent: ['input', 'textarea'] });
    Vue.component('v-icon', Icon);
    Vue.component(HeadUp.name, HeadUp);
    Vue.component(Board.name, Board);
    Vue.component(Cell.name, Cell);
    Vue.component(HUDValue.name, HUDValue);

    const requireComponent = require.context(
      './components', // components dir
      true, // recursive
      /^(\.\/.*)*V[A-Z].+\.vue$/, // global name regex
    );

    requireComponent.keys().forEach(fileName => {
      let baseComponentConfig = requireComponent(fileName);
      baseComponentConfig = baseComponentConfig.default || baseComponentConfig;

      const baseComponentName =
        baseComponentConfig.name ||
        fileName.replace(/^.+\//, '').replace(/\.\w+$/, '');

      Vue.component(baseComponentName, baseComponentConfig);
    });
  },
};

export default HeadUpPlugin;
