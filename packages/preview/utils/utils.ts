import type { FileRenderType, PreviewType } from '../preview.interface.js'
import {
  arrayBufferPreviewTypeList,
  getPreviewTypeByFileType,
  imagePreviewTypeList,
  pdfPreviewTypeList,
  textFilePreviewTypeList,
  videoPreviewTypeList,
} from '../preview.const'

/**
 * 获取文件类型
 * @param file
 */
export function getFileType(file: File): string {
  const fileName = file.name
  const idx = fileName.lastIndexOf('.')
  return fileName.substring(idx + 1)
}

/**
 * 获取文件名
 * @param file
 */
export function getFileName(file: File): string {
  const fileAllName = file.name
  const idx = fileAllName.lastIndexOf('.')
  return fileAllName.substring(0, idx)
}

/**
 * 通过文件类型获取fileRender
 */
export function getFileRenderByFile(file: File): Promise<ArrayBuffer | string> {
  const previewType = getPreviewTypeByFileType(getFileType(file))
  const renderType = getFileRenderType(previewType)
  return new Promise((resolve) => {
    const raw = file
    const fileReader = new FileReader()
    switch (renderType) {
      case 'text':
        fileReader.readAsText(raw)
        fileReader.onload = () => {
          resolve(fileReader.result)
        }
        break
      case 'arrayBuffer':
        fileReader.readAsArrayBuffer(raw)
        fileReader.onload = () => {
          resolve(fileReader.result)
        }
        break
      case 'image':
        resolve(window.URL.createObjectURL(raw))
        break
      case 'pdf':
        // const pdfBlobUrl = new Blob([raw], { type: 'application/pdf' });
        // const pdfBlobUrl = raw;
        // resolve(pdfBlobUrl);
        fileReader.readAsArrayBuffer(raw)
        fileReader.onload = () => {
          resolve(fileReader.result)
        }
        break
      case 'video':
        const videoBlobUrl = URL.createObjectURL(new Blob([raw], { type: 'video/mp4' }))
        resolve(videoBlobUrl)
        break
    }
  })
}
/**
 * 获取文件渲染数据类型
 * @param previewType
 */
export function getFileRenderType(previewType: PreviewType): FileRenderType {
  const types: Record<FileRenderType, boolean> = {
    text: textFilePreviewTypeList.includes(previewType),
    arrayBuffer: arrayBufferPreviewTypeList.includes(previewType),
    image: imagePreviewTypeList.includes(previewType),
    pdf: pdfPreviewTypeList.includes(previewType),
    video: videoPreviewTypeList.includes(previewType),
  }
  return Object.keys(types)!.find(key => types[key]) as FileRenderType
}
