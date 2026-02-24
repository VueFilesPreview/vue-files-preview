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

// MIME type 到文件扩展名的映射 用于Blob类型推断
const mimeToExtMap: Record<string, string> = {
    'image/svg+xml': 'svg',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'image/x-icon': 'ico',
    'image/vnd.microsoft.icon': 'ico',
    'application/pdf': 'pdf',
    'text/plain': 'txt',
    'text/markdown': 'md',
    'text/html': 'html',
    'text/css': 'css',
    'text/javascript': 'js',
    'application/javascript': 'js',
    'application/json': 'json',
    'application/xml': 'xml',
    'text/xml': 'xml',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'application/msword': 'doc',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/epub+zip': 'epub',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/ogg': 'ogg',
    'video/quicktime': 'mov',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/ogg': 'ogg',
    'audio/flac': 'flac',
    'application/vnd.ms-outlook': 'msg',
}

/**
 * 通过MIME type推断文件扩展名
 * @param mimeType
 */
export function getExtFromMimeType(mimeType: string): string {
    if (!mimeType) return ''
    // 精确匹配
    if (mimeToExtMap[mimeType]) return mimeToExtMap[mimeType]
    // 尝试从 MIME subtype 提取 如 image/png -> png
    const parts = mimeType.split('/')
    if (parts.length === 2) {
        const subtype = parts[1].replace(/^x-/, '')
        return subtype
    }
    return ''
}

/**
 * 获取文件类型
 * 支持File和Blob 对于Blob优先从name提取 其次从MIME type推断
 * @param file File或Blob对象
 * @param name 可选的文件名 用于从Blob推断类型
 */
export function getFileType(file: File | Blob, name?: string): string {
    // 优先从File.name提取
    if ('name' in file && file.name) {
        const idx = file.name.lastIndexOf('.')
        if (idx !== -1) return file.name.substring(idx + 1)
    }
    // 其次从外部传入的name提取
    if (name) {
        const idx = name.lastIndexOf('.')
        if (idx !== -1) return name.substring(idx + 1)
    }
    // 最后从MIME type推断
    return getExtFromMimeType(file.type)
}

/**
 * 获取文件名
 * 支持File和Blob
 * @param file File或Blob对象
 * @param name 可选的文件名
 */
export function getFileName(file: File | Blob, name?: string): string {
    // 优先从File.name提取
    if ('name' in file && file.name) {
        const idx = file.name.lastIndexOf('.')
        return idx === -1 ? file.name : file.name.substring(0, idx)
    }
    // 其次从外部传入的name提取
    if (name) {
        const idx = name.lastIndexOf('.')
        return idx === -1 ? name : name.substring(0, idx)
    }
    return ''
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
 * 支持File和Blob
 * @param file File或Blob对象
 * @param name 可选的文件名 用于Blob类型推断
 */
export function getFileRenderByFile(file: File | Blob, name?: string): Promise<ArrayBuffer | string> {
    const previewType = getPreviewTypeByFileType(getFileType(file, name))
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
                const ext = getFileType(file, name)
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
