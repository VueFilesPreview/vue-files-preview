import type {App as Application} from 'vue'
import MsgPreview from './index.vue'

MsgPreview.install = (app: Application) => {
    app.component('MsgPreview', MsgPreview)
}
export default MsgPreview
