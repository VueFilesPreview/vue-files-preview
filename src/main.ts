import type { App as Application } from 'vue'
import { createApp } from 'vue'
import App from './App.vue'

const app: Application = createApp(App)

app.mount('#app')
