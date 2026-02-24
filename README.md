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

## 📖 Introduce

This project is dedicated to previewing any file format on the `Vue3` framework, supporting file previews such as docx, xlsx, pptx, pdf, image, txt, epub, markdown, code, audio, video, msg, etc.

Project repository: [https://github.com/VueFilesPreview/vue-files-preview](https://github.com/VueFilesPreview/vue-files-preview)

## 🚀 Features

- [x] Support `CDN` / `ESM` / `CommonJS` import
- [x] Preview docx files via [vue-office](https://github.com/501351981/vue-office)
- [x] Preview xlsx / xls / csv and other spreadsheet formats via [vue-office](https://github.com/501351981/vue-office)
- [x] Preview pptx / ppt presentation files via [pptx-preview](https://github.com/nicl-dev/pptx-preview)
- [x] Preview pdf files via native iframe
- [x] Preview 28+ code file types with syntax highlighting via [codemirror](https://github.com/codemirror/dev/)
- [x] Preview markdown files via [markdown-it](https://github.com/markdown-it/markdown-it)
- [x] Preview epub e-books with page-flipping via [epubjs](http://epubjs.org/documentation/0.3/)
- [x] Preview images (jpg, png, webp, gif, bmp, svg, ico, etc.)
- [x] Preview audio files with waveform visualization
- [x] Preview video files (mp4, webm, mkv, avi, mov, etc.)
- [x] Preview msg (Outlook email) files via [msgreader](https://github.com/nicl-dev/msgreader)
- [x] Support `File`, `Blob`, and `URL` as input source
- [x] Support `rendered` and `error` event callbacks
- [x] Loading animation during file parsing
- [x] Friendly interface for unknown file types
- [x] Full TypeScript support with type declarations
- [x] Tree-shakable — import individual preview components on demand

## 📦 Install

> From v1.0.0 version
>
> It only works for Vue 3

```bash
# npm
npm i vue-files-preview
# yarn
yarn add vue-files-preview
# pnpm
pnpm i vue-files-preview
```

### CDN

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

### Global Registration (main.ts)

```typescript
import { createApp } from 'vue'
import VueFilesPreview from 'vue-files-preview'
import 'vue-files-preview/lib/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueFilesPreview)
app.mount('#app')
```

### On-demand Import (Component)

```vue
<template>
  <!-- Auto-detect file type -->
  <VueFilesPreview :file="file" />
  <VueFilesPreview :url="url" />

  <!-- Or use a specific preview component -->
  <PdfPreview url="https://example.com/sample.pdf" />
</template>

<script setup>
import { VueFilesPreview, PdfPreview } from 'vue-files-preview'
</script>
```

## 📋 API

### Props

#### VueFilesPreview (main component)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `File \| Blob` | — | File or Blob object to preview |
| `url` | `string` | — | URL of the file to preview |
| `name` | `string` | — | File name (used for type detection when passing Blob) |
| `width` | `string` | `'100%'` | Container width |
| `height` | `string` | `'100%'` | Container height |
| `overflow` | `string` | `'auto'` | Container overflow behavior |

> When both `file` and `url` are provided, `file` takes priority.

#### Individual Preview Components

All individual preview components (`PdfPreview`, `DocxPreview`, `XlsxPreview`, etc.) accept these common props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `File \| Blob` | — | File or Blob object to preview |
| `url` | `string` | — | URL of the file to preview |
| `name` | `string` | — | File name hint |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `rendered` | — | Emitted when the file has been successfully rendered |
| `error` | `Error` | Emitted when an error occurs during rendering |

### Exported Components

| Component | Description |
|-----------|-------------|
| `VueFilesPreview` | Main component — auto-detects file type and renders the appropriate preview |
| `AudioPreview` | Audio player with waveform visualization |
| `CodePreview` | Code file preview with syntax highlighting |
| `DocxPreview` | Word (.docx) document preview |
| `EpubPreview` | EPUB e-book preview with page turning |
| `MdPreview` | Markdown rendered preview |
| `MsgPreview` | Outlook email (.msg) preview |
| `PdfPreview` | PDF preview (iframe-based) |
| `PicPreview` | Image preview |
| `TxtPreview` | Plain text preview |
| `VideoPreview` | Video player |
| `XlsxPreview` | Spreadsheet (xlsx/xls/csv/ods...) preview |

## 🦄 Example

An interactive example application is included in the [`example/`](example/) directory. It demonstrates:

- **File upload**: Select a local file or drag-and-drop to preview
- **URL preview**: Enter a remote file URL to preview directly
- **Sample files**: Quick-access buttons for PDF, Markdown, Video, Audio, SVG, XML, JSON, PPTX, MSG, and more
- **Blob support**: Test Blob object preview (e.g. fetching a remote SVG as Blob)

### Run the example locally

```bash
# Install dependencies
pnpm install
pnpm example:install

# Start the dev server
pnpm example
```

Online demo: [https://vuefilespreview.github.io/vue-files-preview/](https://vuefilespreview.github.io/vue-files-preview/)

## 📁 Supported File Types

### docx preview

Using [Vue Office](https://github.com/501351981/vue-office) to preview Word documents.

Supported formats: `docx`

<p style="text-align: center">
  <img src="assets/images/readme/docx.png" alt="docx preview" style="width: 30%" />
<p>

### xlsx preview

Using [Vue Office](https://github.com/501351981/vue-office) to preview spreadsheet files.

Supported formats: `xlsx`, `xls`, `csv`, `fods`, `ods`, `ots`, `xlsm`, `xlt`, `xltm`

<p style="text-align: center">
  <img src="assets/images/readme/xlsx.png" alt="xlsx preview" style="width: 30%" />
<p>

### pptx preview

Using [pptx-preview](https://github.com/nicl-dev/pptx-preview) to preview presentation files with responsive layout and all slides tiled vertically.

Supported formats: `ppt`, `pptx`, `fodp`, `odp`, `otp`, `pot`, `potm`, `potx`, `pps`, `ppsm`, `ppsx`, `pptm`

### pdf preview

Using native iframe to render PDF files.

Supported formats: `pdf`

<p style="text-align: center">
  <img src="assets/images/readme/pdf.png" alt="pdf preview" style="width: 30%" />
<p>

### audio preview

Using native audio tag and canvas to implement the audio preview with waveform visualization.

Supported formats: `mp3`, `wav`, `wma`, `ogg`, `aac`, `flac`

![audio preview](assets/images/readme/audio.png)

### video preview

Using native video tag to implement the video preview.

Supported formats: `mp4`, `webm`, `ogg`, `mkv`, `avi`, `mpeg`, `flv`, `mov`, `wmv`

![video preview](assets/images/readme/video.png)

### image preview

Using native img tag to implement image preview.

Supported formats: `jpg`, `png`, `jpeg`, `webp`, `gif`, `bmp`, `svg`, `ico`

<p style="text-align: center">
  <img src="assets/images/readme/jpg.png" alt="jpg preview" style="width: 30%" />
  <img src="assets/images/readme/jpeg.png" alt="jpeg preview" style="width: 30%" />
  <img src="assets/images/readme/png.png" alt="png preview" style="width: 30%" />
<p>

### txt preview

Supported formats: `txt`

![txt preview](assets/images/readme/txt.png)

### code preview

Using [codemirror](https://github.com/codemirror/dev/) to provide syntax-highlighted code file preview.

Supported formats: `html`, `css`, `less`, `scss`, `js`, `json`, `ts`, `vue`, `c`, `cpp`, `java`, `py`, `go`, `php`, `lua`, `rb`, `pl`, `swift`, `vb`, `cs`, `sh`, `rs`, `vim`, `log`, `lock`, `xml`, `mht`, `mhtml`, `mod`

<p style="text-align: center">
  <img src="assets/images/readme/html.png" alt="html preview" style="width: 20%" />
  <img src="assets/images/readme/css.png" alt="css preview" style="width: 20%" />
  <img src="assets/images/readme/js.png" alt="js preview" style="width: 20%" />
  <img src="assets/images/readme/py.png" alt="py preview" style="width: 20%" />
  <img src="assets/images/readme/rs.png" alt="rs preview" style="width: 20%" />
  <img src="assets/images/readme/go.png" alt="go preview" style="width: 20%" />
  <img src="assets/images/readme/lua.png" alt="lua preview" style="width: 20%" />
  <img src="assets/images/readme/c.png" alt="c preview" style="width: 20%" />
<p>

### markdown preview

Using [markdown-it](https://github.com/markdown-it/markdown-it) with [highlight.js](https://github.com/highlightjs/highlight.js) for code block highlighting.

Supported formats: `md`

![markdown preview](assets/images/readme/md.png)

### epub preview

Using [epubjs](http://epubjs.org/documentation/0.3/) to preview EPUB e-books with page-flipping support.

Supported formats: `epub`

![epub preview](assets/images/readme/epub.png)

### msg preview

Using [msgreader](https://github.com/nicl-dev/msgreader) to preview Outlook email (.msg) files, displaying sender, recipients, subject, and body content.

Supported formats: `msg`

### doc preview

> doc format support is still pending. Files with the following extensions will display a friendly "unknown file" interface.

Recognized but not yet previewable: `doc`, `docm`, `dot`, `dotm`, `dotx`, `fodt`, `odt`, `ott`, `rtf`, `djvu`, `xps`

## 🤝 Contributors

<a href="https://github.com/VueFilesPreview/vue-files-preview/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=VueFilesPreview/vue-files-preview" alt="Contributors" />
</a>

## 🌸 Thanks

* [pptx-preview](https://github.com/nicl-dev/pptx-preview)
* [vue-office](https://github.com/501351981/vue-office)
* [codemirror](https://github.com/codemirror/dev/)
* [markdown-it](https://github.com/markdown-it/markdown-it)
* [highlight.js](https://github.com/highlightjs/highlight.js)
* [epubjs](http://epubjs.org/documentation/0.3/)
* [msgreader](https://github.com/nicl-dev/msgreader)
* [vue-codemirror](https://github.com/surmon-china/vue-codemirror)
* [vueuse](https://github.com/vueuse/vueuse)
