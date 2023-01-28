<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!-- 测试复选框 -->
      <XtxCheckbox v-model="isAllChecked">全选</XtxCheckbox>{{ isAllChecked }}
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import { ref } from 'vue'
export default {
  name: 'SubCategoty',
  components: { SubBread, SubFilter },
  setup () {
    const isAllChecked = ref(true)
    return { isAllChecked }
  }
}
</script>

<style scoped lang="less">

</style>
