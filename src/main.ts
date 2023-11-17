import 'virtual:uno.css'
// REF: https://unocss.dev/guide/style-reset#tailwind-compat
import '@unocss/reset/tailwind-compat.css'

import { createApp } from 'vue'
import router from './router'
import vueI18n from './plugins/vueI18n'

import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(vueI18n)

app.mount('#app')
