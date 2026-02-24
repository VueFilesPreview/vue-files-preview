---
name: support
description: 为 vue-files-preview 添加新文件类型预览支持。当用户提到"添加支持"、"新文件类型"、"support"时使用。
---

# 添加新文件类型预览支持

为 vue-files-preview 组件库添加新的文件格式预览能力。

## 前置信息收集

在开始之前，需要确认以下信息（如用户未提供则主动询问）：

1. **文件类型名称** - 如 `ppt`、`msg`、`svg` 等
2. **文件扩展名列表** - 该类型包含的所有扩展名，如 `['ppt', 'pptx', 'pptm']`
3. **渲染方式** - 需要读取文件为哪种格式：
   - `text` - 文本内容（代码、纯文本、Markdown 等）
   - `arrayBuffer` - 二进制数据（Office 文档、EPUB 等）
   - `image` - 图片类型（直接生成 Object URL）
   - `pdf` - PDF 文件
   - `video` - 视频文件
4. **是否需要第三方库** - 如 `@vue-office/pptx`、`@kenjiuno/msgreader` 等
5. **MIME type** - 该文件类型对应的 MIME type（用于 Blob 支持）

## 项目架构概览

```
packages/preview/
├── preview.interface.ts    # PreviewType 枚举、PreviewProps 接口、IPreviewRule 等类型定义
├── preview.const.ts        # PreviewRules 规则映射、渲染类型分类列表
├── utils/utils.ts          # getFileType、getFileRenderByFile、mimeToExtMap 等工具函数
└── supports/               # 各预览组件目录
    ├── {type}-preview/
    │   ├── index.ts        # 组件导出和全局注册
    │   └── index.vue       # 预览组件实现
    └── vue-files-preview/  # 主入口组件（路由分发）
```

## 执行步骤

### 第一步：安装依赖（如需要）

```bash
pnpm add <package-name>
```

**注意事项：**
- 确认包支持 Vue 3
- 如果是 `@vue-office` 系列的包，导入路径必须使用 `lib/v3/index.js`（因为 postinstall 脚本在 pnpm 下可能未正确执行）
- 检查是否需要导入 CSS：`ls node_modules/<package>/lib/v3/` 查看是否存在 CSS 文件

### 第二步：注册 PreviewType（如枚举中不存在）

在 `packages/preview/preview.interface.ts` 的 `PreviewType` 枚举中添加：

```typescript
export enum PreviewType {
    // ... 已有类型
    NEW_TYPE = 'new_type',  // 新类型
}
```

**命名规范：**
- 枚举 key 使用大写：`PPT`、`MSG`、`XLSX`
- 枚举 value 使用小写：`'ppt'`、`'msg'`、`'xlsx'`

### 第三步：创建预览组件

创建目录 `packages/preview/supports/{type}-preview/`，包含两个文件：

#### index.vue - 组件实现

根据渲染方式选择对应的模板：

**模板 A：使用第三方 Vue 组件渲染（如 @vue-office 系列）**

```vue
<script lang='ts' setup>
import ThirdPartyComponent from '<package>/lib/v3/index.js'
// 如有 CSS：import '<package>/lib/v3/index.css'
import {ref, watch} from 'vue'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile, getFileRenderByUrl} from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps>(),
    {
      url: () => null,
      file: () => null,
    },
)

const fileRender = ref(null)
watch(
    () => props.file,
    (file) => {
      if (file) {
        getFileRenderByFile(file).then((render) => {
          fileRender.value = render
        })
      }
    },
    {immediate: true},
)

watch(
    () => props.url,
    (url) => {
      if (url && !props.file) {
        getFileRenderByUrl(url).then((render) => {
          fileRender.value = render
        })
      }
    },
    {immediate: true},
)

const emit = defineEmits<{
  rendered: []
  error: [error: Error]
}>()

function renderedHandler(): void {
  emit('rendered')
}

function errorHandler(e: Error): void {
  emit('error', e)
}
</script>

<template>
  <div class="{type}-preview">
    <ThirdPartyComponent :src="fileRender" @rendered="renderedHandler" @error="errorHandler"/>
  </div>
</template>

<style scoped lang='scss'></style>
```

**模板 B：自定义渲染逻辑（如 msg-preview）**

```vue
<script lang='ts' setup>
import {ref, watch} from 'vue'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile, getFileRenderByUrl} from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps>(),
    {
      url: () => null,
      file: () => null,
    },
)
const emit = defineEmits<{
  rendered: []
  error: [error: Error]
}>()

const renderData = ref(null)

function parseData(data: ArrayBuffer | string): void {
  try {
    // 自定义解析逻辑
    renderData.value = /* 解析结果 */
    emit('rendered')
  } catch (e) {
    emit('error', e instanceof Error ? e : new Error('Failed to parse file'))
  }
}

watch(
    () => props.file,
    (file) => {
      if (file) {
        getFileRenderByFile(file).then((render) => {
          parseData(render)
        }).catch((e: Error) => {
          emit('error', e)
        })
      }
    },
    {immediate: true},
)

watch(
    () => props.url,
    (url) => {
      if (url && !props.file) {
        getFileRenderByUrl(url).then((render) => {
          parseData(render)
        }).catch((e: Error) => {
          emit('error', e)
        })
      }
    },
    {immediate: true},
)
</script>

<template>
  <div class="{type}-preview">
    <!-- 自定义渲染模板 -->
  </div>
</template>

<style scoped lang='scss'>
/* 自定义样式 */
</style>
```

**模板 C：简单媒体渲染（如 pic-preview、video-preview）**

```vue
<script lang='ts' setup>
import {ref, watch} from 'vue'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile, getFileRenderByUrl} from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps>(),
    {
      url: () => null,
      file: () => null,
    },
)
const emit = defineEmits<{
  rendered: []
  error: [error: Error]
}>()

const fileRender = ref(null)
watch(
    () => props.file,
    (file) => {
      if (file) {
        getFileRenderByFile(file).then((render) => {
          fileRender.value = render
        }).catch((e: Error) => {
          emit('error', e)
        })
      }
    },
    {immediate: true},
)

watch(
    () => props.url,
    (url) => {
      if (url && !props.file) {
        getFileRenderByUrl(url).then((render) => {
          fileRender.value = render
        }).catch((e: Error) => {
          emit('error', e)
        })
      }
    },
    {immediate: true},
)
</script>

<template>
  <div class="{type}-preview">
    <!-- 使用 fileRender 作为 src -->
    <img :src="fileRender" @load="emit('rendered')" @error="emit('error', new Error('Load failed'))">
  </div>
</template>

<style scoped lang='scss'></style>
```

#### index.ts - 组件导出

```typescript
import type {App as Application} from 'vue'
import {TypeName}Preview from './index.vue'

{TypeName}Preview.install = (app: Application) => {
    app.component('{TypeName}Preview', {TypeName}Preview)
}
export default {TypeName}Preview
```

**命名规范：**
- 目录名：`{type}-preview`（小写连字符），如 `ppt-preview`、`msg-preview`
- 组件名：`{TypeName}Preview`（PascalCase），如 `PptPreview`、`MsgPreview`

### 第四步：注册预览规则

在 `packages/preview/preview.const.ts` 中：

1. **导入组件**：

```typescript
import {TypeName}Preview from './supports/{type}-preview/index'
```

2. **添加到渲染类型分类列表**（根据实际渲染方式选一个）：

```typescript
export const textFilePreviewTypeList = [...]          // 文本类型
export const arrayBufferPreviewTypeList = [...]       // 二进制数据类型
export const imagePreviewTypeList = [...]             // 图片类型
export const pdfPreviewTypeList = [...]               // PDF 类型
export const videoPreviewTypeList = [...]             // 视频类型
```

3. **注册 PreviewRules**：

```typescript
[PreviewType.NEW_TYPE]: {
    name: '',
    component: {TypeName}Preview,
    type: PreviewType.NEW_TYPE,
    accept: ['ext1', 'ext2', 'ext3'],  // 支持的文件扩展名
},
```

### 第五步：添加 MIME type 映射

在 `packages/preview/utils/utils.ts` 的 `mimeToExtMap` 中添加对应映射：

```typescript
const mimeToExtMap: Record<string, string> = {
    // ... 已有映射
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
}
```

**此步骤确保 Blob 类型的文件能通过 MIME type 正确推断文件类型。**

### 第六步：构建验证

```bash
npm run build
```

确保 ES 和 UMD 两种格式均构建成功，无类型错误。

### 第七步（可选）：添加示例

在 `example/src/App.vue` 的 `sampleLinks` 数组中添加测试链接：

```typescript
const sampleLinks = [
  // ... 已有链接
  'https://example.com/test.newtype',
]
```

## 检查清单

完成后逐项确认：

- [ ] `PreviewType` 枚举已添加新类型
- [ ] `supports/{type}-preview/index.vue` 组件已创建
- [ ] `supports/{type}-preview/index.ts` 导出已创建
- [ ] `preview.const.ts` 已导入组件
- [ ] `preview.const.ts` 渲染类型分类列表已添加
- [ ] `preview.const.ts` PreviewRules 已注册（component 指向实际组件而非 UnknownPreview）
- [ ] `utils/utils.ts` mimeToExtMap 已添加 MIME 映射
- [ ] 第三方依赖已安装（如需要）
- [ ] `npm run build` 构建通过

## 注意事项

1. **组件必须 emit `rendered` 和 `error` 事件** - 主组件依赖这两个事件控制 loading 状态
2. **同时支持 `file` 和 `url` 两种输入** - 通过两个 watch 分别处理，url 仅在没有 file 时生效
3. **file prop 类型为 `File | Blob`** - 不能假设 file 一定有 `.name` 属性
4. **@vue-office 系列导入路径** - 必须用 `lib/v3/index.js` 而非包根路径，避免 pnpm 下 postinstall 脚本问题
5. **accept 数组不可与已有类型重叠** - 一个扩展名只能属于一个 PreviewType
6. **PreviewRules 中 component 不要指向 UnknownPreview** - 那意味着该类型实际上不支持预览
7. **构建产物会影响包体积** - 引入大型第三方库时注意评估
