import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import headUpPlugin from './index';

const app = createApp(App);

app.use(headUpPlugin);
app.mount('#app');
