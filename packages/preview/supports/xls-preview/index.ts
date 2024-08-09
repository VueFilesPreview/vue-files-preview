import type { App as Application } from 'vue'
import XlsPreview from './index.vue'

XlsPreview.install = (app: Application) => {
  app.component('XlsPreview', XlsPreview)
}
export default XlsPreview
