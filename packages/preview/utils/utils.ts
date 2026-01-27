import type {FileRenderType, PreviewType} from '../preview.interface'
import {
    arrayBufferPreviewTypeList,
    getPreviewTypeByFileType,
    imagePreviewTypeList,
    pdfPreviewTypeList,
    textFilePreviewTypeList,
    videoPreviewTypeList,
} from '../preview.const'

const videoMimeTypes: Record<string, string> = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    mkv: 'video/x-matroska',
    avi: 'video/x-msvideo',
    mpeg: 'video/mpeg',
    flv: 'video/x-flv',
    mov: 'video/quicktime',
    wmv: 'video/x-ms-wmv',
}

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
 * 从 URL 获取文件扩展名
 * @param url
 */
export function getFileTypeFromUrl(url: string): string {
    try {
        const urlObj = new URL(url, window.location.origin)
        const pathname = urlObj.pathname
        const idx = pathname.lastIndexOf('.')
        if (idx === -1) return ''
        const ext = pathname.substring(idx + 1).toLowerCase()
        // 移除可能的查询参数残留
        return ext.split('?')[0].split('#')[0]
    } catch {
        // 简单的字符串处理作为后备
        const idx = url.lastIndexOf('.')
        if (idx === -1) return ''
        const ext = url.substring(idx + 1).toLowerCase()
        return ext.split('?')[0].split('#')[0]
    }
}

/**
 * 从 URL 获取文件名（不含扩展名）
 * @param url
 */
export function getFileNameFromUrl(url: string): string {
    try {
        const urlObj = new URL(url, window.location.origin)
        const pathname = urlObj.pathname
        const lastSlash = pathname.lastIndexOf('/')
        const filename = pathname.substring(lastSlash + 1)
        const dotIdx = filename.lastIndexOf('.')
        return dotIdx === -1 ? filename : filename.substring(0, dotIdx)
    } catch {
        const lastSlash = url.lastIndexOf('/')
        const filename = url.substring(lastSlash + 1).split('?')[0].split('#')[0]
        const dotIdx = filename.lastIndexOf('.')
        return dotIdx === -1 ? filename : filename.substring(0, dotIdx)
    }
}

/**
 * 通过 URL 获取 fileRender
 * @param url 文件地址
 * @param fileType 可选的文件类型，如果不传则从 URL 解析
 */
export async function getFileRenderByUrl(url: string, fileType?: string): Promise<ArrayBuffer | string> {
    const ext = fileType || getFileTypeFromUrl(url)
    const previewType = getPreviewTypeByFileType(ext)
    const renderType = getFileRenderType(previewType)

    // 对于图片、视频、PDF，直接返回 URL（浏览器可直接加载）
    if (renderType === 'image' || renderType === 'video' || renderType === 'pdf') {
        return url
    }

    // 其他类型需要 fetch 获取内容
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`)
    }

    if (renderType === 'text') {
        return await response.text()
    }

    if (renderType === 'arrayBuffer') {
        return await response.arrayBuffer()
    }

    // 默认返回 URL
    return url
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
            case 'pdf': {
                const pdfBloBlob = new Blob([raw], {type: 'application/pdf'})
                const pdfBlobUrl = URL.createObjectURL(pdfBloBlob)
                resolve(pdfBlobUrl)
                break
            }
            case 'video': {
                const ext = getFileType(file)
                const mimeType = videoMimeTypes[ext] || file.type || 'video/mp4'
                const videoBlobUrl = URL.createObjectURL(new Blob([raw], {type: mimeType}))
                resolve(videoBlobUrl)
                break
            }
            default:
                resolve(window.URL.createObjectURL(raw))
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
