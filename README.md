<p align="center">
<a href="https://github.com/SmallTeddy/vue-files-preview">
  <img src="./public/file.svg" alt="VueUse - Collection of essential Vue Composition Utilities" width="300">
</a>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/vue-files-preview" target="__blank"><img src="https://img.shields.io/npm/v/vue-files-preview?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/vue-files-preview" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/vue-files-preview?color=50a36f&label="></a>
<a href="https://vuefilespreview.github.io/vue-files-preview-demo/" target="__blank"><img src="https://img.shields.io/static/v1?label=&message=demo&color=1e8a7a" alt="Demos"></a>
<a href="https://github.com/SmallTeddy/vue-files-preview" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/SmallTeddy/vue-files-preview?style=social"></a>
</p>

## 📖 Introduce

This project is dedicated to previewing any file format on the `Vue3` framework, supporting file previews such as docx,
xlsx, pdf, image, txt, epub, markdown, code, etc

Project
repository: [https://github.com/VueFilesPreview/vue-files-preview](https://github.com/VueFilesPreview/vue-files-preview)

## 🚀 Features

- [ ] Feat `CDN` support
- [ ] Reconfiguration docx-preview
- [ ] Reconfiguration excel-preview
- [x] Reconfiguration pdf-preview
- [ ] Support `Success` and `Error` callbacks
- [ ] Friendly interface for unknown file

## 📦 Install

> From v1.0.0 version
>
> It only works for Vue 3

```bash
# npm install
npm i vue-files-preview
# yarn install
yarn add vue-files-preview
# pnpm install
pnpm i vue-files-preview
```

### In Main.js

```javascript
import {
  createApp
} from 'vue'
import VueFilesPreview from 'vue-files-preview'
import App from './App.vue'
import 'vue-files-preview/lib/style.css'

const app = createApp(App)
app.use(VueFilesPreview)
app.mount('#app')
```

### In Component

> ⚠️ If you want import all preview component, you must be import `VueFilePreview` like this！

```vue3
<template>
  <VueFilesPreview :file="file" />
  <!-- or -- >
  <vue-files-preview :file="file" />
</template>

<script >
  import { VueFilesPreview } from 'vue-files-preview';
</script>
```

## 🦄 Demo

### Code

```vue3
<template>
  <div class="main-container">
    <div v-if="uploadFile" class="preview-container">
      <VueFilesPreview :file="uploadFile" />
    </div>
    <div v-else class="upload-btn">
      <el-upload
        ref="uploadRef"
        drag
        action="null"
        :limit="1"
        :before-upload="beforeFileUpload"
      >
        <el-icon class="el-icon--upload"><i-ep-upload-filled /></el-icon>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts" setup>
const uploadRef = ref();
const uploadFile = ref();

const beforeFileUpload = (rawFile) => {
  uploadFile.value = rawFile;
  return false;
};
</script>
```

### Page

![测试默认界面](assets/images/readme/default.png)

This demo is already here [vue-files-preview-demo](https://github.com/VueFilesPreview/vue-files-preview-demo), click to
view it.

## doc、xls、ppt preview

Be pending

## docx、xlsx、pdf preview

Using [Vue Office](https://github.com/501351981/vue-office?tab=readme) to implement preview of doc, excel, and pdf files

<p style="text-align: center">
  <img src="assets/images/readme/docx.png" alt="docx preview" style="width: 30%" />
  <img src="assets/images/readme/xlsx.png" alt="xlsx preview" style="width: 30%" />
  <img src="assets/images/readme/pdf.png" alt="pdf preview" style="width: 30%" />
<p>

## audio、video preview

use nature audio tag and canvas to implement the audio preview

![audio preview](assets/images/readme/audio.png)

use nature video tag to implement the video preview (just support mp4)

![video preview](assets/images/readme/video.png)

## image preview

using native img tags to implement image preview

<p style="text-align: center">
  <img src="assets/images/readme/jpg.png" alt="jpg preview" style="width: 30%" />
  <img src="assets/images/readme/jpeg.png" alt="jpeg preview" style="width: 30%" />
  <img src="assets/images/readme/png.png" alt="png preview" style="width: 30%" />
<p>

## txt preview

![txt preview](assets/images/readme/txt.png)

## code preview

using [codemirror](https://github.com/codemirror/dev/) to adapt the code file preview,
support `Angular, CSS, C++, Go, HTML, Java, JavaScript, JSON, Liquid, Markdown, PHP, Python, Rust, Sass, Vue, XML, YAML, C#, CMake, CoffeeScript, Dart, Elixir, GLSL, Haskell, Lua, Objective-C, R, Ruby, Scala, Shell, Swift, TeX, TypeScript, Visual Basic`
code file preview

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

## markdown preview

I have tried using both the [marked](https://github.com/markedjs/marked)
and [commonmark.js](https://github.com/commonmark/commonmark.js) tool libraries for simple implementation, and
ultimately adopted the [markdown-it](https://github.com/markdown-it/markdown-it) tool library

Currently, there may still be issues with formulas and other aspects, which will be further optimized in the future

![markdown preview](assets/images/readme/md.png)

## epub preview

using [epubjs](http://epubjs.org/documentation/0.3/) to adapt to EPUB file preview and configure page-flipping function
for secondary development

![epub preview](assets/images/readme/epub.png)

## 🌸 Thanks

* [vue-office](https://github.com/501351981/vue-office?tab=readme)
* [codemirror](https://github.com/codemirror/dev/)
* [marked](https://github.com/markedjs/marked)
* [commonmark.js](https://github.com/commonmark/commonmark.js)
* [markdown-it](https://github.com/markdown-it/markdown-it)
* [epubjs](http://epubjs.org/documentation/0.3/)
