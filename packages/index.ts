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

export default {version, install}
export {
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
