import {Component} from "vue";

/**
 * VueFilesPreview
 */
// region FilesPreview
// 预览组件的规则配置
export interface IPreviewRule {
    name: string;
    type: PreviewType;
    accept: Array<string>;
    component: Component;
}

// 预览组件类型 有多少预览模式 有多少个项
export enum PreviewType {
    NONE = 'none', // 无类型
    CODE = 'code', // 代码类型
    DOC = 'doc',
    DOCX = 'docx', // WORD文档
    XLS = 'xls',
    XLSX = 'xlsx', // Excel文件
    PDF = 'pdf', // PDF
    PIC = 'pic', // 图片
    TXT = 'txt', // 文本
    MD = 'md', // Markdown
    EPUB = 'epub', // epub
    PPT = 'ppt',
    AUDIO = 'audio',
    VIDEO = 'video',
}

// render读取时使用的类型
export type FileRenderType = 'text' | 'image' | 'pdf' | 'arrayBuffer' | 'video';

// endregion

// region common
// 预览组件的基础属性 扩展属性使用 & 实现
export interface PreviewProps {
    // 接受文件对象
    file?: File;
    // 链接
    url?:string;
    // 文件名称
    name?: string;
}

// endregion