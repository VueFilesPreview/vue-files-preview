<script lang='ts' setup>
import {ref, watch} from 'vue'
import MsgReader from '@kenjiuno/msgreader'
import type {FieldsData} from '@kenjiuno/msgreader'
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

const msgData = ref<FieldsData | null>(null)

function parseMsgBuffer(buffer: ArrayBuffer): void {
  try {
    const reader = new MsgReader(buffer)
    msgData.value = reader.getFileData()
    emit('rendered')
  } catch (e) {
    emit('error', e instanceof Error ? e : new Error('Failed to parse MSG file'))
  }
}

watch(
    () => props.file,
    (file) => {
      if (file) {
        getFileRenderByFile(file).then((render) => {
          parseMsgBuffer(render as ArrayBuffer)
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
          parseMsgBuffer(render as ArrayBuffer)
        }).catch((e: Error) => {
          emit('error', e)
        })
      }
    },
    {immediate: true},
)

function formatRecipients(recipients?: FieldsData[]): string {
  if (!recipients || recipients.length === 0) return ''
  return recipients.map(r => {
    const name = r.name || ''
    const email = r.email || r.smtpAddress || ''
    if (name && email) return `${name} <${email}>`
    return name || email
  }).join('; ')
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return date.toLocaleString()
  } catch {
    return dateStr
  }
}
</script>

<template>
  <div v-if="msgData" class="msg-preview">
    <div class="msg-header">
      <h2 class="msg-subject">{{ msgData.subject || '(No Subject)' }}</h2>
      <div class="msg-meta">
        <div v-if="msgData.senderName || msgData.senderEmail" class="msg-field">
          <span class="msg-label">From</span>
          <span class="msg-value">
            {{ msgData.senderName }}
            <span v-if="msgData.senderEmail" class="msg-email">&lt;{{ msgData.senderEmail }}&gt;</span>
          </span>
        </div>
        <div v-if="msgData.recipients && msgData.recipients.length" class="msg-field">
          <span class="msg-label">To</span>
          <span class="msg-value">{{ formatRecipients(msgData.recipients) }}</span>
        </div>
        <div v-if="msgData.clientSubmitTime || msgData.messageDeliveryTime" class="msg-field">
          <span class="msg-label">Date</span>
          <span class="msg-value">{{ formatDate(msgData.clientSubmitTime || msgData.messageDeliveryTime) }}</span>
        </div>
        <div v-if="msgData.attachments && msgData.attachments.length" class="msg-field">
          <span class="msg-label">Attachments</span>
          <span class="msg-value msg-attachments">
            <span v-for="(att, i) in msgData.attachments" :key="i" class="msg-attachment-tag">
              {{ att.fileName || att.name || 'attachment' }}
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="msg-body">
      <div v-if="msgData.bodyHtml" class="msg-body-html" v-html="msgData.bodyHtml" />
      <pre v-else-if="msgData.body" class="msg-body-text">{{ msgData.body }}</pre>
      <div v-else class="msg-body-empty">No content</div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.msg-preview {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
}

.msg-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e8ecf0;
}

.msg-subject {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.4;
}

.msg-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.msg-field {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.msg-label {
  flex-shrink: 0;
  min-width: 80px;
  color: #8b9dc3;
  font-weight: 500;
}

.msg-value {
  color: #333;
  word-break: break-word;
}

.msg-email {
  color: #667eea;
}

.msg-attachments {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.msg-attachment-tag {
  display: inline-block;
  padding: 2px 10px;
  background: #f0f4ff;
  border-radius: 4px;
  font-size: 12px;
  color: #667eea;
}

.msg-body {
  padding: 24px;
}

.msg-body-html {
  line-height: 1.6;
  word-break: break-word;
}

.msg-body-text {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.6;
}

.msg-body-empty {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 40px 0;
}
</style>
