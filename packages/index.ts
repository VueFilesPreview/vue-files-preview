import type {App} from 'vue'
import Preview from "./preview/index";
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
    XlsPreview,
    XlsxPreview
} from "./preview/supports";

// 所有组件列表
const components = [
    Preview,
    AudioPreview,
    CodePreview,
    DocxPreview,
    EpubPreview,
    MdPreview,
    PdfPreview,
    PicPreview,
    TxtPreview,
    VideoPreview,
    XlsPreview,
    XlsxPreview
]

// 定义 install 方法
const install = (app: App): void => {
    components.forEach(component => app.component(component.__name as string, component))
}
const VueFilesPreview = {
    install
}
export {
    Preview,
    AudioPreview,
    CodePreview,
    DocxPreview,
    EpubPreview,
    MdPreview,
    PdfPreview,
    PicPreview,
    TxtPreview,
    VideoPreview,
    XlsPreview,
    XlsxPreview
}
export default VueFilesPreview;
