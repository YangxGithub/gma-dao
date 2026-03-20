import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue';
import router from './router';
import './styles/index.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');

