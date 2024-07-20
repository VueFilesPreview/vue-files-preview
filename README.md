# Vue Files Preview

## 1、项目介绍

该项目致力于在 `Vue3` 框架上对任意文件格式进行预览，支持docx、xlsx、pdf、image、txt、epub、markdown、code等文件预览

项目仓库地址[github](https://github.com/SmallTeddy/vue-files-preview)

## 2、测试默认界面

![测试默认界面](assets/images/readme/default.png)

## 3、doc、xls、ppt 预览

待定

## 4、docx、xlsx、pdf 预览

使用[vue-office](https://github.com/501351981/vue-office?tab=readme-ov-file)，支持word(.docx)、excel(.xlsx)、pdf等各类型office文件预览的vue组件集合，提供一站式office文件预览方案，支持vue2和3，也支持React等非Vue框架。Web-based pdf, excel, word preview library

<p style="text-align: center">
  <img src="assets/images/readme/docx.png" alt="docx预览" style="width: 30%" />
  <img src="assets/images/readme/xlsx.png" alt="xlsx预览" style="width: 30%" />
  <img src="assets/images/readme/pdf.png" alt="pdf预览" style="width: 30%" />
<p>

## 5、audio、video 预览

使用原生或寻找框架

## 6、image 预览

使用原生或 `element` 中图片预览组件

<p style="text-align: center">
  <img src="assets/images/readme/jpg.png" alt="jpg预览" style="width: 30%" />
  <img src="assets/images/readme/jpeg.png" alt="jpeg预览" style="width: 30%" />
  <img src="assets/images/readme/png.png" alt="png预览" style="width: 30%" />
<p>

## 7、txt 预览

![txt预览](assets/images/readme/txt.png)

## 8、code 预览

使用[codemirror](https://github.com/codemirror/dev/)来适配代码预览，支持Angular, CSS, C++, Go, HTML, Java, JavaScript, JSON, Liquid, Markdown, PHP, Python, Rust, Sass, Vue, XML, YAML, C#, CMake, CoffeeScript, Dart, Elixir, GLSL, Haskell, Lua, Objective-C, R, Ruby, Scala, Shell, Swift, TeX, TypeScript, Visual Basic等代码显示

<p style="text-align: center">
  <img src="assets/images/readme/html.png" alt="html预览" style="width: 20%" />
  <img src="assets/images/readme/css.png" alt="css预览" style="width: 20%" />
  <img src="assets/images/readme/js.png" alt="js预览" style="width: 20%" />
  <img src="assets/images/readme/py.png" alt="py预览" style="width: 20%" />
  <img src="assets/images/readme/rs.png" alt="rs预览" style="width: 20%" />
  <img src="assets/images/readme/go.png" alt="go预览" style="width: 20%" />
  <img src="assets/images/readme/lua.png" alt="lua预览" style="width: 20%" />
  <img src="assets/images/readme/c.png" alt="c预览" style="width: 20%" />
<p>

## 9、markdown 预览

先后试用了[marked](https://github.com/markedjs/marked)和[commonmark.js](https://github.com/commonmark/commonmark.js)工具库简单实现，最终采用[markdown-it](https://github.com/markdown-it/markdown-it)工具库，目前公式等可能还存在问题，后续再优化

![markdown预览](assets/images/readme/md.png)

## 10、epub 预览

使用[epubjs](http://epubjs.org/documentation/0.3/)来适配epub文件预览，二次开发配置翻页功能

![epub预览](assets/images/readme/epub.png)
