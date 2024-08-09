import type { App as Application } from 'vue'
import XlsxPreview from './index.vue'

XlsxPreview.install = (app: Application) => {
  app.component('XlsxPreview', XlsxPreview)
}
export default XlsxPreview
