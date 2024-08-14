import DocxPreview from './supports/docx-preview/index'
import XlsxPreview from './supports/xlsx-preview/index'
import PdfPreview from './supports/pdf-preview/index'
import PicPreview from './supports/pic-preview/index'
import TxtPreview from './supports/txt-preview/index'
import CodePreview from './supports/code-preview/index'
import MdPreview from './supports/md-preview/index'
import EpubPreview from './supports/epub-preview/index'
import AudioPreview from './supports/audio-preview/index'
import VideoPreview from './supports/video-preview/index'
import type {IPreviewRule} from './preview.interface'
import {PreviewType} from './preview.interface'

export const textFilePreviewTypeList = [PreviewType.CODE, PreviewType.TXT, PreviewType.MD]
export const arrayBufferPreviewTypeList = [PreviewType.DOC, PreviewType.DOCX, PreviewType.XLSX, PreviewType.PPT, PreviewType.EPUB]
export const imagePreviewTypeList = [PreviewType.PIC, PreviewType.AUDIO]
export const pdfPreviewTypeList = [PreviewType.PDF]
export const videoPreviewTypeList = [PreviewType.VIDEO]

export const PreviewRules: Record<PreviewType, IPreviewRule> = {
    [PreviewType.NONE]: {
        name: '',
        component: void 0,
        type: PreviewType.NONE,
        accept: [],
    },
    [PreviewType.CODE]: {
        name: '',
        component: CodePreview,
        type: PreviewType.CODE,
        accept: ['html', 'css', 'less', 'scss', 'js', 'json', 'ts', 'vue', 'c', 'cpp', 'java', 'py', 'go', 'php', 'lua', 'rb', 'pl', 'swift', 'vb', 'cs', 'sh', 'rs', 'vim', 'log', 'lock', 'swift', 'mod', 'mht', 'mhtml', 'xml'],
    },
    [PreviewType.DOC]: {
        name: '',
        component: void 0,
        type: PreviewType.DOC,
        accept: ['doc', 'docm', 'dot', 'dotm', 'dotx', 'fodt', 'mht', 'odt', 'ott', 'rtf', 'djvu', 'xps'],
    },
    [PreviewType.DOCX]: {
        name: '',
        component: DocxPreview,
        type: PreviewType.DOCX,
        accept: ['docx'],
    },
    [PreviewType.XLSX]: {
        name: '',
        component: XlsxPreview,
        type: PreviewType.XLSX,
        accept: ['xlsx', 'xls', 'csv', 'fods', 'ods', 'ots', 'xlsm', 'xlt', 'xltm'],
    },
    // ppt: presentation
    [PreviewType.PPT]: {
        name: '',
        component: void 0,
        type: PreviewType.PPT,
        accept: ['ppt', 'pptx', 'fodp', 'odp', 'otp', 'pot', 'potm', 'potx', 'pps', 'ppsm', 'ppsx', 'pptm'],
    },
    [PreviewType.PDF]: {
        name: '',
        component: PdfPreview,
        type: PreviewType.PDF,
        accept: ['pdf'],
    },
    [PreviewType.EPUB]: {
        name: '',
        component: EpubPreview,
        type: PreviewType.EPUB,
        accept: ['epub'],
    },
    [PreviewType.MD]: {
        name: '',
        component: MdPreview,
        type: PreviewType.MD,
        accept: ['md'],
    },
    [PreviewType.PIC]: {
        name: '',
        component: PicPreview,
        type: PreviewType.PIC,
        accept: ['jpg', 'png', 'jpeg', 'webp', 'gif', 'bmp', 'svg', 'ico'],
    },
    [PreviewType.TXT]: {
        name: '',
        component: TxtPreview,
        type: PreviewType.TXT,
        accept: ['txt'],
    },
    [PreviewType.AUDIO]: {
        name: '',
        component: AudioPreview,
        type: PreviewType.AUDIO,
        accept: ['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'],
    },
    [PreviewType.VIDEO]: {
        name: '',
        component: VideoPreview,
        type: PreviewType.VIDEO,
        accept: ['mp4', 'webm', 'ogg', 'mkv', 'avi', 'mpeg', 'flv', 'mov', 'wmv'],
    },
}

/**
 * 根据文件类型获取rule
 * @param type
 */
export function getRuleByFileType(type: string): IPreviewRule {
    return Object.values(PreviewRules).find(cur => cur.accept.includes(type)) ?? PreviewRules[PreviewType.NONE]
}

/**
 * 根据文件类型获取PreviewType
 * @param type
 */
export function getPreviewTypeByFileType(type: string): PreviewType {
    return getRuleByFileType(type).type
}
