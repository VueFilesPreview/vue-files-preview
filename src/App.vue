<template>
  <div class="main-container">
    <div class="upload-btn">
      <el-upload ref="docUpload" action="none" :limit="1" :on-exceed="handleExceed" :on-change="changeDocHandle"
        :auto-upload="false">
        <template #trigger>
          <el-button type="primary">select doc file</el-button>
        </template>
      </el-upload>
      <el-upload ref="xlsUpload" action="none" :limit="1" :on-exceed="handleExceed" :on-change="changeXlsHandle"
        :auto-upload="false">
        <template #trigger>
          <el-button type="primary">select xls file</el-button>
        </template>
      </el-upload>
      <el-upload ref="pdfUpload" action="none" :limit="1" :on-exceed="handleExceed" :on-change="changePdfHandle"
        :auto-upload="false">
        <template #trigger>
          <el-button type="primary">select pdf file</el-button>
        </template>
      </el-upload>
    </div>
    <div class="preview-container">
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
  console.log(upload.value)
}

const changeHandle = (file) => {
  console.log(file, 'file')
  let fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file.raw)
  fileReader.onload = () => {
    console.log(fileReader.result, 'fileReader.result')
    fileRender.value = fileReader.result;
  }
}

const changeDocHandle: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  changeHandle(uploadFile)
  setTimeout(() => {
    fileType.value = 'docx'
  }, 200)
}

const changeXlsHandle: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  changeHandle(uploadFile)
  setTimeout(() => {
    fileType.value = 'xlsx'
  }, 200)
}

const changePdfHandle: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  changeHandle(uploadFile)
  setTimeout(() => {
    fileType.value = 'pdf'
  }, 200)
}
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
