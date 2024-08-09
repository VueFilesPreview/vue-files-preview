import type { App as Application } from 'vue'
import PdfPreview from './index.vue'

PdfPreview.install = (app: Application) => {
  app.component('PdfPreview', PdfPreview)
}
export default PdfPreview
