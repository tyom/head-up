import { createApp } from 'vue';
import DemoApp from './DemoApp.vue';
import { headUpPlugin } from '../src';

import '../src/assets/index.css';

const app = createApp(DemoApp);

app.use(headUpPlugin);
app.mount('#app');
