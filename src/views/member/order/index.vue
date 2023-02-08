<template>
  <div class="member-order">
    <!-- tab组件 -->
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name">
      </XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem @on-cancel="handlerCancel" v-for="item in orderList" :key="item.id" :order="item"></OrderItem>
    </div>
    <!-- 分页组件 -->
    <XtxPagination v-if="total > 0" @current-change="reqParams.page=$event" :total="total"
      :page-size="reqParams.pageSize" :current-page="reqParams.page">
    </XtxPagination>
    <!-- 取消原因组件 -->
    <OrderCancel ref="orderCancelCom"></OrderCancel>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import OrderItem from './components/order-item.vue'
import { findOrderList } from '@/api/order'
import OrderCancel from './components/order-cancel.vue'
export default {
  name: 'MemberOrder',
  components: { OrderItem, OrderCancel },
  setup () {
    const activeName = ref('all')

    // 获取数据
    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    const orderList = ref([])
    const loading = ref(false)
    const total = ref(0)

    watch(reqParams, () => {
      loading.value = true
      findOrderList(reqParams).then(data => {
        orderList.value = data.result.items
        total.value = data.result.counts
        console.log(111, total.value);
        loading.value = false
      })
    }, { immediate: true })

    // 点击选项卡
    const tabClick = ({ index }) => {
      reqParams.page = 1
      reqParams.orderState = index
    }

    return { activeName, orderStatus, orderList, tabClick, loading, total, reqParams, ...useCancel() }
  }
}
// 取消订单
const useCancel = () => {
  const orderCancelCom = ref(null)
  const handlerCancel = (order) => {
    orderCancelCom.value.open(order)
  }
  return { handlerCancel, orderCancelCom }
}
</script>
<style scoped lang="less">
.member-order {
  height: 100%;
  background: #fff;
}

.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}

.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, .9) url(../../../assets/images/qrcode.jpg) no-repeat center;
}

.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
