import { createApp } from 'vue';
import ExampleApp from './ExampleApp.vue';
import { headUpPlugin } from '../src';

import '../src/assets/index.css';

const app = createApp(ExampleApp);

app.use(headUpPlugin);
app.mount('#app');
