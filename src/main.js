import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import router from '@/router/router.js';
import en from './locales/en.json';
import ru from './locales/ru.json';
import uk from './locales/uk.json';
import App from './App.vue';

// Читаем язык из localStorage или используем по умолчанию
const savedLocale = localStorage.getItem('locale') || 'en';

const i18n = createI18n({
  legacy: false,
  locale: savedLocale, // язык по умолчанию
  fallbackLocale: 'en',
  messages: {
    en,
    ru,
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
