<p align="right">
  <a href="./README.md">English</a> | <a href="./README.zh-CN.md">简体中文</a>
</p>

<p align="center">
<a href="https://github.com/VueFilesPreview/vue-files-preview">
  <img src="./public/file.svg" alt="Vue File Preview" width="300">
</a>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/vue-files-preview" target="__blank"><img src="https://img.shields.io/npm/v/vue-files-preview?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/vue-files-preview" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/vue-files-preview?color=50a36f&label="></a>
<a href="https://vuefilespreview.github.io/vue-files-preview/" target="__blank"><img src="https://img.shields.io/static/v1?label=&message=demo&color=1e8a7a" alt="Demos"></a>
<a href="https://github.com/VueFilesPreview/vue-files-preview" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/VueFilesPreview/vue-files-preview?style=social"></a>
</p>

## 📖 介绍

本项目致力于在 `Vue3` 框架上实现任意文件格式的预览，支持 docx、xlsx、pptx、pdf、图片、txt、epub、markdown、代码、音频、视频、msg 等多种文件类型的在线预览。

项目仓库：[https://github.com/VueFilesPreview/vue-files-preview](https://github.com/VueFilesPreview/vue-files-preview)

## 🚀 特性

- [x] 支持 `CDN` / `ESM` / `CommonJS` 三种引入方式
- [x] 通过 [vue-office](https://github.com/501351981/vue-office) 预览 docx 文档
- [x] 通过 [vue-office](https://github.com/501351981/vue-office) 预览 xlsx / xls / csv 等电子表格
- [x] 通过 [vue-office](https://github.com/501351981/vue-office) 预览 pptx / ppt 演示文稿
- [x] 通过原生 iframe 预览 pdf 文件
- [x] 通过 [codemirror](https://github.com/codemirror/dev/) 预览 28+ 种代码文件（语法高亮）
- [x] 通过 [markdown-it](https://github.com/markdown-it/markdown-it) 预览 markdown 文件
- [x] 通过 [epubjs](http://epubjs.org/documentation/0.3/) 预览 epub 电子书（支持翻页）
- [x] 预览图片（jpg、png、webp、gif、bmp、svg、ico 等）
- [x] 预览音频文件（带波形可视化）
- [x] 预览视频文件（mp4、webm、mkv、avi、mov 等）
- [x] 通过 [msgreader](https://github.com/nicl-dev/msgreader) 预览 msg（Outlook 邮件）文件
- [x] 支持 `File`、`Blob`、`URL` 三种输入源
- [x] 支持 `rendered` 和 `error` 事件回调
- [x] 文件解析时显示 Loading 动画
- [x] 未知文件类型的友好提示界面
- [x] 完整的 TypeScript 类型声明
- [x] 支持 Tree-shaking —— 按需引入单个预览组件

## 📦 安装

> 从 v1.0.0 版本起
>
> 仅支持 Vue 3

```bash
# npm
npm i vue-files-preview
# yarn
yarn add vue-files-preview
# pnpm
pnpm i vue-files-preview
```

### CDN 引入

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/vue-files-preview"></script>
<link rel="stylesheet" href="https://unpkg.com/vue-files-preview/umd/style.css">

<div id="app">
  <vue-files-preview :url="fileUrl"></vue-files-preview>
</div>

<script>
  const { createApp, ref } = Vue
  const app = createApp({
    setup() {
      const fileUrl = ref('https://example.com/sample.pdf')
      return { fileUrl }
    }
  })
  app.use(VueFilesPreview)
  app.mount('#app')
</script>
```

### 全局注册（main.ts）

```typescript
import { createApp } from 'vue'
import VueFilesPreview from 'vue-files-preview'
import 'vue-files-preview/lib/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueFilesPreview)
app.mount('#app')
```

### 按需引入（组件内）

```vue
<template>
  <!-- 自动识别文件类型 -->
  <VueFilesPreview :file="file" />
  <VueFilesPreview :url="url" />

  <!-- 或直接使用特定的预览组件 -->
  <PdfPreview url="https://example.com/sample.pdf" />
</template>

<script setup>
import { VueFilesPreview, PdfPreview } from 'vue-files-preview'
</script>
```

## 📋 API

### 属性（Props）

#### VueFilesPreview 主组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `file` | `File \| Blob` | — | 要预览的 File 或 Blob 对象 |
| `url` | `string` | — | 要预览的文件 URL |
| `name` | `string` | — | 文件名（传入 Blob 时用于类型识别） |
| `width` | `string` | `'100%'` | 容器宽度 |
| `height` | `string` | `'100%'` | 容器高度 |
| `overflow` | `string` | `'auto'` | 容器溢出行为 |

> 同时传入 `file` 和 `url` 时，`file` 优先。

#### 各预览子组件

所有预览子组件（`PdfPreview`、`DocxPreview`、`XlsxPreview` 等）均接受以下通用属性：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `file` | `File \| Blob` | — | 要预览的 File 或 Blob 对象 |
| `url` | `string` | — | 要预览的文件 URL |
| `name` | `string` | — | 文件名提示 |

### 事件（Events）

| 事件名 | 回调参数 | 说明 |
|--------|----------|------|
| `rendered` | — | 文件渲染成功时触发 |
| `error` | `Error` | 渲染过程中出错时触发 |

### 导出组件

| 组件 | 说明 |
|------|------|
| `VueFilesPreview` | 主组件 —— 自动识别文件类型并渲染对应的预览 |
| `AudioPreview` | 音频播放器（带波形可视化） |
| `CodePreview` | 代码文件预览（语法高亮） |
| `DocxPreview` | Word 文档（.docx）预览 |
| `EpubPreview` | EPUB 电子书预览（支持翻页） |
| `MdPreview` | Markdown 渲染预览 |
| `MsgPreview` | Outlook 邮件（.msg）预览 |
| `PdfPreview` | PDF 预览（基于 iframe） |
| `PicPreview` | 图片预览 |
| `TxtPreview` | 纯文本预览 |
| `VideoPreview` | 视频播放器 |
| `XlsxPreview` | 电子表格（xlsx/xls/csv/ods...）预览 |

## 🦄 示例

项目内置了一个交互式示例应用，位于 [`example/`](example/) 目录，演示了以下功能：

- **文件上传**：选择本地文件或拖拽上传进行预览
- **URL 预览**：输入远程文件链接直接预览
- **示例文件**：快捷按钮一键预览 PDF、Markdown、视频、音频、SVG、XML、JSON、PPTX、MSG 等
- **Blob 支持**：测试 Blob 对象预览（如将远程 SVG 作为 Blob 加载）

### 本地运行示例

```bash
# 安装依赖
pnpm install
pnpm example:install

# 启动开发服务器
pnpm example
```

在线演示：[https://vuefilespreview.github.io/vue-files-preview/](https://vuefilespreview.github.io/vue-files-preview/)

## 📁 支持的文件类型

### docx 预览

使用 [Vue Office](https://github.com/501351981/vue-office) 预览 Word 文档。

支持格式：`docx`

<p style="text-align: center">
  <img src="assets/images/readme/docx.png" alt="docx 预览" style="width: 30%" />
<p>

### xlsx 预览

使用 [Vue Office](https://github.com/501351981/vue-office) 预览电子表格文件。

支持格式：`xlsx`、`xls`、`csv`、`fods`、`ods`、`ots`、`xlsm`、`xlt`、`xltm`

<p style="text-align: center">
  <img src="assets/images/readme/xlsx.png" alt="xlsx 预览" style="width: 30%" />
<p>

### pptx 预览

使用 [Vue Office](https://github.com/501351981/vue-office) 预览演示文稿文件。

支持格式：`ppt`、`pptx`、`fodp`、`odp`、`otp`、`pot`、`potm`、`potx`、`pps`、`ppsm`、`ppsx`、`pptm`

### pdf 预览

使用原生 iframe 渲染 PDF 文件。

支持格式：`pdf`

<p style="text-align: center">
  <img src="assets/images/readme/pdf.png" alt="pdf 预览" style="width: 30%" />
<p>

### 音频预览

使用原生 audio 标签和 canvas 实现音频预览，带波形可视化效果。

支持格式：`mp3`、`wav`、`wma`、`ogg`、`aac`、`flac`

![音频预览](assets/images/readme/audio.png)

### 视频预览

使用原生 video 标签实现视频预览。

支持格式：`mp4`、`webm`、`ogg`、`mkv`、`avi`、`mpeg`、`flv`、`mov`、`wmv`

![视频预览](assets/images/readme/video.png)

### 图片预览

使用原生 img 标签实现图片预览。

支持格式：`jpg`、`png`、`jpeg`、`webp`、`gif`、`bmp`、`svg`、`ico`

<p style="text-align: center">
  <img src="assets/images/readme/jpg.png" alt="jpg 预览" style="width: 30%" />
  <img src="assets/images/readme/jpeg.png" alt="jpeg 预览" style="width: 30%" />
  <img src="assets/images/readme/png.png" alt="png 预览" style="width: 30%" />
<p>

### txt 预览

支持格式：`txt`

![txt 预览](assets/images/readme/txt.png)

### 代码预览

使用 [codemirror](https://github.com/codemirror/dev/) 实现代码文件的语法高亮预览。

支持格式：`html`、`css`、`less`、`scss`、`js`、`json`、`ts`、`vue`、`c`、`cpp`、`java`、`py`、`go`、`php`、`lua`、`rb`、`pl`、`swift`、`vb`、`cs`、`sh`、`rs`、`vim`、`log`、`lock`、`xml`、`mht`、`mhtml`、`mod`

<p style="text-align: center">
  <img src="assets/images/readme/html.png" alt="html 预览" style="width: 20%" />
  <img src="assets/images/readme/css.png" alt="css 预览" style="width: 20%" />
  <img src="assets/images/readme/js.png" alt="js 预览" style="width: 20%" />
  <img src="assets/images/readme/py.png" alt="py 预览" style="width: 20%" />
  <img src="assets/images/readme/rs.png" alt="rs 预览" style="width: 20%" />
  <img src="assets/images/readme/go.png" alt="go 预览" style="width: 20%" />
  <img src="assets/images/readme/lua.png" alt="lua 预览" style="width: 20%" />
  <img src="assets/images/readme/c.png" alt="c 预览" style="width: 20%" />
<p>

### markdown 预览

使用 [markdown-it](https://github.com/markdown-it/markdown-it) 解析 Markdown 文件，并通过 [highlight.js](https://github.com/highlightjs/highlight.js) 实现代码块高亮。

支持格式：`md`

![markdown 预览](assets/images/readme/md.png)

### epub 预览

使用 [epubjs](http://epubjs.org/documentation/0.3/) 预览 EPUB 电子书，支持翻页功能。

支持格式：`epub`

![epub 预览](assets/images/readme/epub.png)

### msg 预览

使用 [msgreader](https://github.com/nicl-dev/msgreader) 预览 Outlook 邮件（.msg）文件，展示发件人、收件人、主题和正文内容。

支持格式：`msg`

### doc 预览

> doc 格式的预览支持仍在开发中。以下扩展名的文件目前会显示友好的"未知文件"提示界面。

已识别但暂不支持预览：`doc`、`docm`、`dot`、`dotm`、`dotx`、`fodt`、`odt`、`ott`、`rtf`、`djvu`、`xps`

## 🤝 贡献者

<a href="https://github.com/VueFilesPreview/vue-files-preview/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=VueFilesPreview/vue-files-preview" alt="Contributors" />
</a>

## 🌸 致谢

* [vue-office](https://github.com/501351981/vue-office)
* [codemirror](https://github.com/codemirror/dev/)
* [markdown-it](https://github.com/markdown-it/markdown-it)
* [highlight.js](https://github.com/highlightjs/highlight.js)
* [epubjs](http://epubjs.org/documentation/0.3/)
* [msgreader](https://github.com/nicl-dev/msgreader)
* [vue-codemirror](https://github.com/surmon-china/vue-codemirror)
* [vueuse](https://github.com/vueuse/vueuse)
