<template>
  <div class="main-container">
    <div v-if="uploadFile" class="preview-container">
      <Preview :upload-file="uploadFile" />
    </div>
    <div v-else class="upload-btn">
      <el-upload ref="uploadRef" drag action="null" :limit="1" :before-upload="beforeFileUpload">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElUpload } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadInstance, UploadFile, UploadRawFile } from 'element-plus'

const uploadRef = ref<UploadInstance>()
const uploadFile = ref<UploadFile>()

const beforeFileUpload = (rawFile: UploadRawFile) => {
  uploadFile.value = {
    name: rawFile.name,
    size: rawFile.size,
    status: 'ready',
    uid: rawFile.uid,
    raw: rawFile
  }
  return false
}

</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;

  .upload-btn {
    width: 60%;

    ::v-deep(.el-upload-dragger) {
      height: 40vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .el-icon--upload {
        font-size: 120px;
      }

      .el-upload__text {
        font-size: 24px;
      }
    }
  }

  .preview-container {
    height: 100vh;
    overflow: auto;
    flex: 1;
  }
}
</style>
