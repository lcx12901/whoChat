import { createApp } from 'vue'
import './styles.css'
import App from './App.vue'

import 'virtual:uno.css'
import 'uno.css'
import 'virtual:unocss-devtools'

const app = createApp(App)

app.mount('#app')
