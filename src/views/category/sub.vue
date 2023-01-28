<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
        <SubSort></SubSort>
        <!-- 列表 -->
        <ul>
          <li v-for="i in 20" :key="i">
            <GoodsItem :goods="{}" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData"></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { ref } from 'vue'
export default {
  name: 'SubCategoty',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    const loading = ref(false)
    const finished = ref(false)
    const getData = () => {
      console.log('加载数据');
    }
    return { getData, loading, finished }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;

    li {
      margin-right: 20px;
      margin-bottom: 20px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
