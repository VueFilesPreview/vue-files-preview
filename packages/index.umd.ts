import {
    AudioPreview,
    CodePreview,
    DocxPreview,
    EpubPreview,
    MdPreview,
    PdfPreview,
    PicPreview,
    TxtPreview,
    VideoPreview,
    VueFilesPreview,
    XlsxPreview,
} from './preview/supports/index.js'
import {version} from './version.js'

const components = {
    VueFilesPreview,
    AudioPreview,
    CodePreview,
    DocxPreview,
    EpubPreview,
    MdPreview,
    PdfPreview,
    PicPreview,
    TxtPreview,
    VideoPreview,
    XlsxPreview,
}

function install(app: import('vue').App<any>): void {
    Object.keys(components).forEach((key) => {
        app.component(key, components[key])
    })
}

// UMD 入口：将 install、version 和所有组件合并到同一个默认导出对象
// 这样 window.VueFilesPreview 可直接用于 app.use()，同时也能访问各组件
export default {version, install, ...components}
