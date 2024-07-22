# Vue Files Preview

## Introduce

This project is dedicated to previewing any file format on the `Vue3` framework, supporting file previews such as docx, xlsx, pdf, image, txt, epub, markdown, code, etc

Project repository: [https://github.com/SmallTeddy/vue-files-preview](https://github.com/SmallTeddy/vue-files-preview)

## 📦 Install

> 🎩 From v1.0, it only works for Vue 3

```bash
# npm install
npm i vue-files-preview
# yarn install
yarn add vue-files-preview
# pnpm install
pnpm i vue-files-preview
```

## Default

![测试默认界面](assets/images/readme/default.png)

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

Due to the inability of native audio and video tags to support more audio and video formats

The audio is temporarily using [vue-audio-player](https://github.com/1014156094/vue-audio-player) to implement

The video is temporarily using [vue3-video-player](https://github.com/LarchLiu/vue3-video-player) to implement

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

using [codemirror](https://github.com/codemirror/dev/) to adapt the code file preview，support `Angular, CSS, C++, Go, HTML, Java, JavaScript, JSON, Liquid, Markdown, PHP, Python, Rust, Sass, Vue, XML, YAML, C#, CMake, CoffeeScript, Dart, Elixir, GLSL, Haskell, Lua, Objective-C, R, Ruby, Scala, Shell, Swift, TeX, TypeScript, Visual Basic` code file preview

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

先后试用了[marked](https://github.com/markedjs/marked)和[commonmark.js](https://github.com/commonmark/commonmark.js)工具库简单实现，最终采用[markdown-it](https://github.com/markdown-it/markdown-it)工具库，目前公式等可能还存在问题，后续再优化

![markdown preview](assets/images/readme/md.png)

## epub preview

using [epubjs](http://epubjs.org/documentation/0.3/) to adapt to EPUB file preview and configure page flipping function for secondary development

![epub preview](assets/images/readme/epub.png)
