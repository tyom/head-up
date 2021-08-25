import { createApp } from 'vue';
import App from './App.vue';
import headUpPlugin from './';

import './assets/index.css';

const app = createApp(App);

app.use(headUpPlugin);
app.mount('#app');
