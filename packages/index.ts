import {
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
    XlsPreview,
    XlsxPreview
} from './preview/supports/index.js';
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
    XlsPreview,
    XlsxPreview,
};

const install = (app: import("vue").App<any>) => {
    Object.keys(components).forEach(key => {
        app.component(key, components[key]);
    });
};
export default { install };
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
    XlsPreview,
    XlsxPreview
};
