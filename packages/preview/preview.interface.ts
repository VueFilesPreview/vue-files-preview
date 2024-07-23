import { Component } from "vue";

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
export type FileRenderType = 'text' | 'image' | 'arrayBuffer';

export interface IPreview {
    type: PreviewType;
    accept: Array<string>;
    component: Component;
    fileRender?: ArrayBuffer | String;
}
