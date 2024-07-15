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

const changeFileHandle = (file) => {
  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file.raw)
  fileReader.onload = () => {
    fileRender.value = fileReader.result;
  }
}

const changeDocHandle: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  changeFileHandle(uploadFile)
  setTimeout(() => {
    fileType.value = 'docx'
  }, 200)
}

const changeXlsHandle: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
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
  const file = uploadFile
  const fileReader = new FileReader()
  fileReader.readAsText(file.raw)
  fileReader.onload = () => {
    fileRender.value = fileReader.result;
  }
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

const uploadItems = [
  {
    name: 'doc',
    ref: 'docUpload',
    type: ['doc', 'docx'],
    accept: 'doc,docx',
    changeFunc: changeDocHandle
  },
  {
    name: 'xls',
    ref: 'xlsUpload',
    type: ['xls', 'xlsx'],
    accept: 'xls,xlsx',
    changeFunc: changeXlsHandle
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
  }
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
    border-right: 1px solid #9d9d9d;
  }

  .preview-container {
    flex: 1;
  }
}
</style>
