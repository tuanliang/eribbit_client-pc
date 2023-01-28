<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange"></SubFilter>
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange"></SubSort>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" />
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
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryGoods } from '@/api/category'
export default {
  name: 'SubCategoty',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    const route = useRoute()
    const loading = ref(false)
    const finished = ref(false)
    // 商品类表数据
    const goodsList = ref([])
    // 请i去参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          // 加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }
    // 在更改了二级类目的时候需要重新加载数据
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        finished.value = false
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20
        }
      }
    })
    // 1.更改排序组件的筛选条件，重新请求
    const sortChange = (sortParams) => {
      finished.value = false
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }
    // 2.更改筛选组件的筛选条件，重新请求
    const filterChange = (filterParams) => {
      finished.value = false
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }
    return { getData, loading, finished, goodsList, sortChange, filterChange }
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
