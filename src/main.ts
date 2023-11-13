import 'virtual:uno.css';
// REF: https://unocss.dev/guide/style-reset#tailwind-compat
import '@unocss/reset/tailwind-compat.css';

import { createApp } from 'vue'

import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
