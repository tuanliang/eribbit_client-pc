<template>
  <!-- 顶部通栏 -->
  <appNavBar></appNavBar>
  <!-- 头部组件 -->
  <header>头部组件</header>
  <!-- 内容容器 -->
  <div class="main">
    <!-- 二级路由 -->
    <RouterView></RouterView>
  </div>
  <!-- 底部组件 -->
  <footer>底部组件</footer>
</template>
<script>
import appNavBar from '@/components/app-navbar.vue'
export default {
  name: 'LayOut',
  components: {
    appNavBar
  }
}
</script>
<style scoped lang="less">

</style>
