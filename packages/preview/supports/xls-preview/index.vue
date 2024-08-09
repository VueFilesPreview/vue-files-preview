<script>
import { defineComponent } from 'vue'
import { HotTable } from '@handsontable/vue3'
import { registerAllModules } from 'handsontable/registry'
import 'handsontable/dist/handsontable.full.css'

// register Handsontable's modules
registerAllModules()

export default defineComponent({
  components: {
    HotTable,
  },
  data() {
    return {
      data: [
        ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
        ['2016', 10, 11, 12, 13],
        ['2017', 20, 11, 14, 13],
        ['2018', 30, 15, 12, 13],
      ],
    }
  },
})
</script>

<template>
  <HotTable :data="data" :row-headers="true" :col-headers="true" />
</template>
