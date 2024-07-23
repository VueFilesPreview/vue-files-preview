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
        component: void 0,
        type: PreviewType.NONE,
        fileRender: void 0,
        accept: []
    },
    [PreviewType.CODE]: {
        component: CodePreview,
        type: PreviewType.CODE,
        fileRender: void 0,
        accept: ['html', 'css', 'less', 'scss', 'js', 'json', 'ts', 'vue', 'c', 'cpp', 'java', 'py', 'go', 'php', 'lua', 'rb', 'pl', 'swift', 'vb', 'cs', 'sh', 'rs', 'vim', 'log', 'lock', 'swift', 'mod'],
    },
    [PreviewType.DOC]: {
        component: DocxPreview,
        type: PreviewType.DOC,
        fileRender: void 0,
        accept: ['doc']
    },
    [PreviewType.DOCX]: {
        component: DocxPreview,
        type: PreviewType.DOCX,
        fileRender: void 0,
        accept: ['docx']
    },
    [PreviewType.EPUB]: {
        component: EpubPreview,
        type: PreviewType.EPUB,
        fileRender: void 0,
        accept: ['epub']
    },
    [PreviewType.MD]: {
        component: MdPreview,
        type: PreviewType.MD,
        fileRender: void 0,
        accept: ['md'],
    },
    [PreviewType.PDF]: {
        component: PdfPreview,
        type: PreviewType.PDF,
        fileRender: void 0,
        accept: ['pdf'],
    },
    [PreviewType.PIC]: {
        component: PicPreview,
        type: PreviewType.PIC,
        fileRender: void 0,
        accept: ['jpg', 'png', 'jpeg', 'webp', 'gif', 'bmp', 'svg', 'ico'],
    },
    [PreviewType.TXT]: {
        component: TxtPreview,
        type: PreviewType.TXT,
        fileRender: void 0,
        accept: ['txt']
    },
    [PreviewType.XLS]: {
        component: void 0,
        type: PreviewType.XLS,
        fileRender: void 0,
        accept: ['xls'],
    },
    [PreviewType.XLSX]: {
        component: XlsxPreview,
        type: PreviewType.XLSX,
        fileRender: void 0,
        accept: ['xlsx'],
    },
    [PreviewType.PPT]: {
        component: void 0,
        type: PreviewType.PPT,
        fileRender: void 0,
        accept: ['ppt'],
    },
    [PreviewType.AUDIO]: {
        component: void 0,
        type: PreviewType.AUDIO,
        fileRender: void 0,
        accept: ['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'],
    },
    [PreviewType.VIDEO]: {
        component: void 0,
        type: PreviewType.VIDEO,
        fileRender: void 0,
        accept: ['mp4', 'webm', 'ogg', 'mkv', 'avi', 'mpeg', 'flv', 'mov', 'wmv'],
    },
};
