import { App } from 'vue';
import Preview from './preview/index.vue';
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
} from './preview/supports';

const components = {
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
    XlsxPreview,
};

const install = (app: App) => {
    Object.keys(components).forEach(key => {
        app.component(key, components[key]);
    });
};

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
};

export default {
    install
};