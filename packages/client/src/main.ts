import App from './App.vue'

import 'virtual:uno.css'
import 'uno.css'
import 'virtual:unocss-devtools'

import { setupPinia } from './store'
import router from './router'

const app = createApp(App)

setupPinia(app)

app.use(router).mount('#app')
