<template>
  <div class="member-home">
    <!-- 概览 -->
    <HomeOverview></HomeOverview>
    <!-- 收藏 -->
    <Homepanel title="我的收藏">
      <GoodsItem v-for="i in 4" :key="i" :goods="goods"></GoodsItem>
    </Homepanel>
    <!-- 组件 -->
    <Homepanel title="我的足迹">
      <GoodsItem v-for="i in 4" :key="i" :goods="goods"></GoodsItem>
    </Homepanel>
    <!-- 猜你 -->
    <GoodsRelevant></GoodsRelevant>
  </div>
</template>
<script>
import HomeOverview from './components/home-overview.vue'
import Homepanel from './components/home-panel.vue'
import GoodsRelevant from '@/views/goods/components/goods-relevant.vue'
import GoodsItem from '@/views/category/components/goods-item.vue'
import request from '@/utils/request'
export default {
  name: 'MemberHome',
  components: { HomeOverview, Homepanel, GoodsRelevant, GoodsItem },
  setup () {
    const goods = {
      id: '1',
      name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
      picture: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
      desc: '清汤鲜香 红汤劲爽',
      price: '159.00'
    }

    request('/my/test', 'get').then(data => {
      console.log(data);
    })

    return { goods }
  }
}
</script>
<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}

:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>
