<template>
  <!-- 首页入口（分类+广告） -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
      <HomeBanner></HomeBanner>
      <!-- 新鲜好物 -->
      <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
        <template #right>
          <XtxMore path="/"></XtxMore>
          <!-- 面板内容 -->
        </template>
      </HomePanel>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import HomePanel from './components/home-panel.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomePanel
  }
}
</script>
<style scoped lang="less">
.container {
  .hoverShadow();
  color: @xtxColor;
}
</style>
