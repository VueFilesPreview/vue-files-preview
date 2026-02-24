<script setup lang="ts">
import { ref, computed } from 'vue'
import VFP from 'vue-files-preview'

const version = VFP.version

// 当前 Tab: demo | code
const activeTab = ref<'demo' | 'code'>('demo')

// 预览源：文件或链接
const previewFile = ref<File | Blob | null>(null)
const previewUrl = ref('')

// 链接输入
const urlInput = ref('')

// 是否拖拽中
const isDragging = ref(false)

// 是否在预览模式
const isPreviewMode = computed(() => previewFile.value || previewUrl.value)

// 示例链接列表
const sampleLinks = [
  'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  'https://raw.githubusercontent.com/adam-p/markdown-here/master/README.md',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg',
  'https://gist.githubusercontent.com/Ram-N/5189462/raw/books.xml',
  'https://raw.githubusercontent.com/vuejs/core/main/package.json',
  'https://github.com/github/gitignore/archive/refs/heads/main.zip',
]

// 从链接中提取文件名作为标签
function getTagFromUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const filename = pathname.split('/').pop() || ''
    // 如果文件名包含扩展名，直接返回
    if (filename && filename.includes('.')) {
      return filename
    }
    // 如果没有扩展名，尝试从路径推断类型
    if (pathname.includes('todos')) return 'todos.json'
    return filename || 'file'
  } catch {
    return 'file'
  }
}

// 点击示例链接预览
function previewSampleLink(url: string) {
  previewUrl.value = url
  previewFile.value = null
}

// 处理文件选择
function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    previewFile.value = target.files[0]
    previewUrl.value = ''
  }
}

// 处理拖拽
function handleDragOver(e: DragEvent) {
  e.preventDefault()
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false
  if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
    previewFile.value = e.dataTransfer.files[0]
    previewUrl.value = ''
  }
}

// 加载链接
function loadUrl() {
  if (urlInput.value.trim()) {
    previewUrl.value = urlInput.value.trim()
    previewFile.value = null
  }
}

// 返回上传页
function goBack() {
  previewFile.value = null
  previewUrl.value = ''
  urlInput.value = ''
}

// 测试 Blob SVG 预览
async function testBlobSvg() {
  const response = await fetch('https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg')
  const blob = await response.blob()
  // 直接传 Blob，不包装成 File，验证 MIME type 推断
  previewFile.value = blob
  previewUrl.value = ''
}

// 复制状态：用对象记录每个代码块的复制状态
const copiedState = ref<Record<string, boolean>>({})

function copyCode(key: string, code: string) {
  navigator.clipboard.writeText(code)
  copiedState.value[key] = true
  setTimeout(() => {
    copiedState.value[key] = false
  }, 2000)
}

const codeBlocks = [
  {
    key: 'install',
    title: '1. 安装',
    code: `npm install vue-files-preview`,
  },
  {
    key: 'import',
    title: '2. 引入',
    code: `// main.ts
import { createApp } from 'vue'
import VueFilesPreview from 'vue-files-preview'
import 'vue-files-preview/lib/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueFilesPreview)
app.mount('#app')`,
  },
  {
    key: 'usage',
    title: '3. 使用',
    code: `<template>
  <!-- 通过 URL 预览 -->
  <VueFilesPreview url="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf" />

  <!-- 通过 File 对象预览 -->
  <VueFilesPreview :file="fileObject" />
</template>`,
  },
  {
    key: 'cdn',
    title: '4. CDN 引入',
    code: ['<!-- 在 HTML 中通过 CDN 使用 -->',
      '<script src="https://unpkg.com/vue@3"><\/script>',
      '<script src="https://unpkg.com/vue-files-preview"><\/script>',
      '<link rel="stylesheet" href="https://unpkg.com/vue-files-preview/umd/style.css">',
      '',
      '<div id="app">',
      '  <vue-files-preview url="https://example.com/file.pdf"></vue-files-preview>',
      '</div>',
      '',
      '<script>',
      'const { createApp } = Vue',
      'createApp({}).use(VueFilesPreview).mount(\'#app\')',
      '<\/script>'].join('\n'),
  },
]
</script>

<template>
  <div class="app-container">
    <!-- 预览模式 -->
    <template v-if="isPreviewMode">
      <div class="preview-page">
        <VueFilesPreview
          v-if="previewFile"
          :file="previewFile"
        />
        <VueFilesPreview
          v-else
          :url="previewUrl"
        />
      </div>
      <button class="back-btn" @click="goBack" title="返回">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
    </template>

    <!-- 首页模式 -->
    <template v-else>
      <div class="home-page">
        <div class="main-card">
          <!-- Tabs -->
          <div class="tabs">
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'demo' }"
              @click="activeTab = 'demo'"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Demo
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'code' }"
              @click="activeTab = 'code'"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              Code
            </button>
          </div>

          <!-- Demo Tab -->
          <div v-show="activeTab === 'demo'" class="tab-content">
            <div
              class="upload-box"
              :class="{ dragging: isDragging }"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
              @drop="handleDrop"
            >
              <input
                type="file"
                id="file-input"
                @change="handleFileChange"
                hidden
              />
              <label for="file-input" class="upload-content">
                <div class="upload-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                <div class="upload-text">拖拽文件到此处</div>
                <div class="upload-hint">或点击选择文件</div>
              </label>

              <div class="divider">
                <span>或</span>
              </div>

              <div class="url-input-wrapper">
                <div class="url-input-container">
                  <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  <input
                    v-model="urlInput"
                    type="text"
                    class="url-input"
                    placeholder="输入在线文件链接..."
                    @keyup.enter="loadUrl"
                  />
                </div>
                <button class="url-btn" @click="loadUrl">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  预览
                </button>
              </div>

              <!-- 示例链接 -->
              <div class="sample-section">
                <div class="sample-title">示例文件</div>
                <div class="sample-tags">
                  <button
                    v-for="(link, index) in sampleLinks"
                    :key="index"
                    class="sample-tag"
                    :title="link"
                    @click="previewSampleLink(link)"
                  >
                    {{ getTagFromUrl(link) }}
                  </button>
                  <button
                    class="sample-tag blob-test"
                    title="测试 Blob SVG 预览"
                    @click="testBlobSvg"
                  >
                    Blob SVG Test
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Code Tab -->
          <div v-show="activeTab === 'code'" class="tab-content">
            <div class="code-section">
              <div
                v-for="block in codeBlocks"
                :key="block.key"
                class="code-block"
              >
                <div class="code-header">
                  <span class="code-title">{{ block.title }}</span>
                  <button class="copy-btn" @click="copyCode(block.key, block.code)">
                    <svg v-if="!copiedState[block.key]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    <svg v-else class="copied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>
                </div>
                <pre><code>{{ block.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 底部信息栏 -->
    <div class="footer-bar">
      <div class="footer-links">
        <a
          href="https://github.com/VueFilesPreview/vue-files-preview"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
          title="GitHub"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://www.npmjs.com/package/vue-files-preview"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
          title="npm"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/>
          </svg>
        </a>
      </div>
      <div class="version">v{{ version }}</div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.app-container {
  width: 100%;
  height: 100%;
}

/* 首页 */
.home-page {
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.main-card {
  width: 100%;
  max-width: 540px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

/* Tabs */
.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #999;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  transition: background 0.3s;
}

.tab-btn:hover {
  color: #667eea;
}

.tab-btn.active {
  color: #667eea;
}

.tab-btn.active::after {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.tab-btn svg {
  width: 18px;
  height: 18px;
}

.tab-content {
  padding: 24px;
}

/* Upload Box */
.upload-box {
  transition: all 0.3s;
}

.upload-box.dragging {
  transform: scale(1.01);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  border: 2px dashed #ddd;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-content:hover,
.upload-box.dragging .upload-content {
  border-color: #667eea;
  background: #f8f9ff;
}

.upload-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  color: #667eea;
}

.upload-icon svg {
  width: 100%;
  height: 100%;
}

.upload-text {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 8px;
}

.upload-hint {
  font-size: 0.9rem;
  color: #999;
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #999;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #eee;
}

.divider span {
  padding: 0 16px;
  font-size: 0.9rem;
}

.url-input-wrapper {
  display: flex;
  gap: 10px;
}

.url-input-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.link-icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: #999;
  pointer-events: none;
  transition: color 0.3s;
}

.url-input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.url-input:focus {
  border-color: #667eea;
}

.url-input:focus ~ .link-icon,
.url-input-container:hover .link-icon {
  color: #667eea;
}

.url-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.3s;
  white-space: nowrap;
}

.url-btn svg {
  width: 18px;
  height: 18px;
}

.url-btn:hover {
  opacity: 0.9;
}

/* Sample Section */
.sample-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.sample-title {
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 12px;
}

.sample-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sample-tag {
  padding: 6px 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.sample-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.sample-tag.blob-test {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* Code Section */
.code-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.code-block {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
}

.code-title {
  color: #e1e1e1;
  font-size: 0.85rem;
  font-weight: 500;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #888;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: #3d3d3d;
  color: #fff;
}

.copy-btn svg {
  width: 16px;
  height: 16px;
}

.copy-btn svg.copied {
  color: #4ade80;
}

.code-block pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.code-block code {
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #d4d4d4;
  white-space: pre;
}

/* 预览页面 */
.preview-page {
  width: 100%;
  height: 100%;
}

.back-btn {
  position: fixed;
  top: 16px;
  left: 16px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  z-index: 9999999;
  opacity: 0.3;
  transition: all 0.3s;
}

.back-btn svg {
  width: 22px;
  height: 22px;
}

.back-btn:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.7);
  transform: scale(1.05);
}

.footer-bar {
  position: fixed;
  bottom: 16px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  z-index: 1000;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  transition: all 0.2s;
}

.footer-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.footer-link svg {
  width: 18px;
  height: 18px;
}

.version {
  color: white;
  font-size: 0.85rem;
  user-select: none;
  padding-left: 12px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

/* 响应式 */
@media (max-width: 600px) {
  .home-page {
    padding: 20px;
  }

  .tab-content {
    padding: 20px;
  }

  .upload-content {
    padding: 30px 15px;
  }

  .upload-icon {
    width: 48px;
    height: 48px;
  }

  .url-input-wrapper {
    flex-direction: column;
  }

  .url-btn {
    width: 100%;
    justify-content: center;
  }

  .code-block code {
    font-size: 0.75rem;
  }
}
</style>
