<template>
  <div class="member-order-detail" v-if="order">
    <!-- 头部 -->
    <DetailAction :order="order"></DetailAction>
    <!-- 进度 -->
    <DetailStep :order="order"></DetailStep>
    <!-- 物流 -->
    <!-- 信息 -->
  </div>
</template>
<script>
import { findOrderDetail } from '@/api/order';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import DetailAction from './components/detail-action.vue'
import DetailStep from './components/detail-step.vue'
export default {
  name: 'MemberOrder',
  components: { DetailAction, DetailStep },
  setup () {
    const route = useRoute()
    const order = ref(null)
    findOrderDetail(route.params.id).then(data => {
      order.value = data.result
    })
    return { order }
  }
}
</script>
<style scoped lang="less">
.member-order-detail {
  background: #fff;
  height: 100%;
}
</style>
