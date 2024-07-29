import {
    AudioPreview,
    CodePreview,
    DocxPreview,
    EpubPreview,
    MdPreview,
    PdfPreview, PicPreview, TxtPreview, VideoPreview,
    FilesPreview, XlsPreview, XlsxPreview
} from "./preview/supports/index.js";

const components = {
    FilesPreview,
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

const _default:{
    install: (app: import("vue").App<any>) => void;
} = {
    install
}
export default _default;