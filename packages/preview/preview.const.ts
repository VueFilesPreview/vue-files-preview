import DocxPreview from './supports/docx-preview'
import XlsxPreview from './supports/xlsx-preview'
import PdfPreview from './supports/pdf-preview'
import PicPreview from './supports/pic-preview'
import TxtPreview from './supports/txt-preview'
import CodePreview from './supports/code-preview'
import MdPreview from './supports/md-preview'
import EpubPreview from './supports/epub-preview'
import { IPreview, PreviewType } from "./preview.interface";

/**
 * 根据文件类型获取rule
 * @param type
 */
export const getRuleByFileType = (type: string) => {
    return Object.values(PreviewRules).find((cur) => cur.accept.includes(type)) ?? PreviewRules[PreviewType.NONE];
}
/**
 * 根据文件类型获取PreviewType
 * @param type
 */
export const getPreviewTypeByFileType = (type: string) => {
    return getRuleByFileType(type).type;
}

export const textFilePreviewTypeList = [PreviewType.CODE, PreviewType.TXT, PreviewType.MD];
export const arrayBufferPreviewTypeList = [PreviewType.DOC, PreviewType.DOCX, PreviewType.XLS, PreviewType.XLSX, PreviewType.PPT, PreviewType.PDF, PreviewType.EPUB];
export const imagePreviewTypeList = [PreviewType.PIC];

export const PreviewRules: Record<PreviewType, IPreview> = {
    [PreviewType.NONE]: {
        component: undefined,
        type: PreviewType.NONE,
        fileRender: undefined,
        accept: []
    },
    [PreviewType.CODE]: {
        component: CodePreview,
        type: PreviewType.CODE,
        fileRender: undefined,
        accept: ['html', 'css', 'less', 'scss', 'js', 'json', 'ts', 'vue', 'c', 'cpp', 'java', 'py', 'go', 'php', 'lua', 'rb', 'pl', 'swift', 'vb', 'cs', 'sh'],
    },
    [PreviewType.DOC]: {
        component: DocxPreview,
        type: PreviewType.DOC,
        fileRender: undefined,
        accept: ['doc']
    },
    [PreviewType.DOCX]: {
        component: DocxPreview,
        type: PreviewType.DOCX,
        fileRender: undefined,
        accept: ['docx']
    },
    [PreviewType.EPUB]: {
        component: EpubPreview,
        type: PreviewType.EPUB,
        fileRender: undefined,
        accept: ['epub']
    },
    [PreviewType.MD]: {
        component: MdPreview,
        type: PreviewType.MD,
        fileRender: undefined,
        accept: ['md'],
    },
    [PreviewType.PDF]: {
        component: PdfPreview,
        type: PreviewType.PDF,
        fileRender: undefined,
        accept: ['pdf'],
    },
    [PreviewType.PIC]: {
        component: PicPreview,
        type: PreviewType.PIC,
        fileRender: undefined,
        accept: ['jpg', 'png', 'jpeg', 'webp', 'gif', 'bmp', 'svg'],
    },
    [PreviewType.TXT]: {
        component: TxtPreview,
        type: PreviewType.TXT,
        fileRender: undefined,
        accept: ['txt']
    },
    [PreviewType.XLS]: {
        component: null,
        type: PreviewType.XLS,
        fileRender: undefined,
        accept: ['xls'],
    },
    [PreviewType.XLSX]: {
        component: XlsxPreview,
        type: PreviewType.XLSX,
        fileRender: undefined,
        accept: ['xlsx'],
    },
    [PreviewType.PPT]: {
        component: null,
        type: PreviewType.PPT,
        fileRender: undefined,
        accept: ['ppt'],
    },
};
