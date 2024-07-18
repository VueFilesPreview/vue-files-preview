<template>
  <div class="epub-box" v-loading="!bookAvailable" element-loading-text="正在加载...">
    <div class="epub-viewer" id="epub-viewer"></div>
    <div class="footer">
      <el-button type="primary" @click="prevPage">
        上一页
      </el-button>
      <el-button type="primary" @click="nextPage">
        下一页
      </el-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import ePub from 'epubjs'

const props = defineProps({
  url: {
    type: String,
    default: () => {
      return 'none'
    }
  },
  type: {
    type: String,
    default: () => {
      return 'none'
    }
  },
  fileRender: {
    type: [ArrayBuffer, String]
  }
})

const navigation = ref()
const locations = ref()
const currentPage = ref(1)
const totalPages = ref()
const bookAvailable = ref(false)
const book = ref(ePub(props.fileRender as ArrayBuffer))
const rendition = ref(book.value.renderTo("epub-viewer", {
  // 滚动模式
  width: '100%',
  height: 'calc(100vh - 80x)',
  flow: "scrolled",
  allowScriptedContent: true,
}));

book.value.ready.then(() => {
  navigation.value = book.value.navigation;
  return book.value.locations.generate(1);
}).then(() => {
  locations.value = book.value.locations;
  bookAvailable.value = true;
  // 获取总页数
  totalPages.value = locations.value.length();
  rendition.value.display();
});

// epub翻页
const prevPage = () => {
  if (rendition.value) {
    rendition.value.prev();
    // 向前翻页时更新 currentPage
    currentPage.value--;
    if (currentPage.value < 1) {
      currentPage.value = 1
    }
  }
}
const nextPage = () => {
  if (rendition.value) {
    try {
      rendition.value.next();
      // 向后翻页时更新 currentPage
      currentPage.value++;
      if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value
      }
    } catch (error) {
      console.log("EPUB 下一页出错：", error);
      alert("出错，请重试或检查 EPUB 文件格式。");
    }
  }
}
</script>

<style scoped lang='scss'>
.epub-box {
  height: 100vh;
  width: 100%;
}

.epub-viewer {
  padding: 10px;
  min-height: calc(100vh - 80px);
  max-height: calc(100vh - 80px);
  overflow: auto;
}

.footer {
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px
}
</style>
