import { App } from 'vue';
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
} from './preview/supports';

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

const install = (app: App) => {
    Object.keys(components).forEach(key => {
        app.component(key, components[key]);
    });
};

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

export default install;
