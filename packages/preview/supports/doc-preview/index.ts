import type { App as Application } from 'vue'
import DocPreview from './index.vue'

DocPreview.install = (app: Application) => {
  app.component('DocPreview', DocPreview)
}
export default DocPreview
