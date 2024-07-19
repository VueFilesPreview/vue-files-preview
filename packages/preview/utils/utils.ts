import { UploadFile } from "element-plus";
import { FileRenderType, PreviewType } from "../preview.interface";
import {
    arrayBufferPreviewTypeList,
    getPreviewTypeByFileType,
    imagePreviewTypeList,
    textFilePreviewTypeList
} from "../preview.const";

/**
 * 获取文件类型
 * @param file
 */
export const getFileType = (file: UploadFile): string => {
    const fileName = file.name
    const idx = fileName.lastIndexOf('.')
    return fileName.substring(idx + 1)
}

/**
 * 通过文件类型获取fileRender
 */
export const getFileRenderByFile = (file: UploadFile) => {
    const previewType = getPreviewTypeByFileType(getFileType(file));
    const renderType = getFileRenderType(previewType);
    return new Promise(resolve => {
        const raw = file.raw;
        switch (renderType) {
            case "text":
            case "arrayBuffer":
                const fileReader = new FileReader()
                if (renderType == 'text') {
                    fileReader.readAsText(raw)
                } else {
                    fileReader.readAsArrayBuffer(raw)
                }
                fileReader.onload = () => {
                    resolve(fileReader.result);
                }
                break;
            case "image":
                resolve(window.URL.createObjectURL(raw));
                break;

        }
    })
}
/**
 * 获取文件渲染数据类型
 * @param previewType
 */
export const getFileRenderType = (previewType: PreviewType): FileRenderType => {
    const types: Record<FileRenderType, boolean> = {
        "text": textFilePreviewTypeList.includes(previewType),
        "arrayBuffer": arrayBufferPreviewTypeList.includes(previewType),
        "image": imagePreviewTypeList.includes(previewType),
    }
    return Object.keys(types)!.find((key) => types[key]) as FileRenderType;
}
