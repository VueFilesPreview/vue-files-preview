<template>
  <div class="main-container">
    <div class="upload-btn">
      <el-upload v-for="upload in uploadItems" :key="upload.name" :ref="upload.ref" action="none" :limit="1"
        :accept="upload.accept" :on-exceed="handleExceed" :on-change="upload.changeFunc" :auto-upload="false">
        <template #trigger>
          <el-button type="primary">select {{ upload.name }} file</el-button>
        </template>
      </el-upload>
    </div>
    <div v-if="fileRender" class="preview-container">
      <Preview :type="fileType" :fileRender="fileRender" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElUpload } from 'element-plus'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile, UploadFiles } from 'element-plus'

const fileRender = ref()
const fileType = ref('')
const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  console.log(file, 'file')
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const changeFileHandle = (file, isReadTxt = false) => {
  const fileReader = new FileReader()
  if (isReadTxt) {
    fileReader.readAsText(file.raw)
  } else {
    fileReader.readAsArrayBuffer(file.raw)
  }
  fileReader.onload = () => {
    fileRender.value = fileReader.result;
  }
}

const changeDocxHandle: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  changeFileHandle(uploadFile)
  setTimeout(() => {
    fileType.value = 'docx'
  }, 200)
}

const changeXlsxHandle: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  changeFileHandle(uploadFile)
  setTimeout(() => {
    fileType.value = 'xlsx'
  }, 200)
}

const changePdfHandle: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  changeFileHandle(uploadFile)
  setTimeout(() => {
    fileType.value = 'pdf'
  }, 200)
}

const changeTxtHandle: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  changeFileHandle(uploadFile, true)
  setTimeout(() => {
    fileType.value = 'txt'
  }, 200)
}

const changePicHandle: UploadProps['onChange'] = async (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const picBlob = uploadFile.raw
  const url = window.URL.createObjectURL(picBlob)
  fileRender.value = url
  setTimeout(() => {
    fileType.value = 'pic'
  }, 200)
}

const changeCodeHandle: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  changeFileHandle(uploadFile, true)
  setTimeout(() => {
    fileType.value = 'code'
  }, 200)
}

const changeMdHandle: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  changeFileHandle(uploadFile, true)
  setTimeout(() => {
    fileType.value = 'md'
  }, 200)
}

interface UploadItem {
  name: string
  ref: string
  type: string[]
  accept: string
  changeFunc: UploadProps['onChange']
}

const uploadItems: UploadItem[] = [
  {
    name: 'docx',
    ref: 'docxUpload',
    type: ['docx'],
    accept: 'docx',
    changeFunc: changeDocxHandle
  },
  {
    name: 'xlsx',
    ref: 'xlsxUpload',
    type: ['xlsx'],
    accept: 'xlsx',
    changeFunc: changeXlsxHandle
  },
  {
    name: 'pdf',
    ref: 'pdfUpload',
    type: ['pdf'],
    accept: 'pdf',
    changeFunc: changePdfHandle
  },
  {
    name: 'pic',
    ref: 'picUpload',
    type: ['jpg', 'png', 'jpeg', 'webp'],
    accept: 'jpg,png,jpeg,webp',
    changeFunc: changePicHandle
  },
  {
    name: 'txt',
    ref: 'txtUpload',
    type: ['txt'],
    accept: 'txt',
    changeFunc: changeTxtHandle
  },
  {
    name: 'code',
    ref: 'codeUpload',
    type: ['html', 'css', 'less', 'scss', 'js', 'json', 'ts', 'vue', 'md', 'txt', 'c', 'cpp', 'java', 'py', 'go', 'php', 'rb', 'pl', 'swift', 'vb', 'cs', 'py', 'sh'],
    accept: 'html,css,less,scss,js,json,ts,vue,md,c,cpp,java,py,go,php,rb,pl,swift,vb,cs,py,sh',
    changeFunc: changeCodeHandle
  },
  {
    name: 'md',
    ref: 'mdUpload',
    type: ['md'],
    accept: 'md',
    changeFunc: changeMdHandle
  },
]
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100vh;

  .upload-btn {
    box-sizing: border-box;
    padding-top: 20px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 220px;
    min-width: 220px;
    border-right: 1px solid #9d9d9d;
  }

  .preview-container {
    height: 100vh;
    overflow: auto;
    flex: 1;
  }
}
</style>
