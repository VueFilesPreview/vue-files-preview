import { createApp } from 'vue'
import VueFilesPreview from 'vue-files-preview'
import 'vue-files-preview/lib/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueFilesPreview)
app.mount('#app')
