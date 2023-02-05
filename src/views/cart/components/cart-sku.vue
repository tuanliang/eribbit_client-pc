<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <GoodsSku v-else @change="changeSku" :skuId="skuId" :goods="goods"></GoodsSku>
      <XtxButton v-if="!loading" @click="sumbit" type="primary" size="mini" style="margin-left:60px">确认</XtxButton>
    </div>
  </div>
</template>
<script>
import { getGoodsSku } from '@/api/cart'
import { onClickOutside } from '@vueuse/core'
import GoodsSku from '@/views/goods/components/goods-sku.vue'
import { ref } from 'vue'
export default {
  name: 'CartSku',
  components: { GoodsSku },
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const visible = ref(false)
    const goods = ref(null)
    const loading = ref(false)
    const open = () => {
      visible.value = true
      // 获取商品数据
      loading.value = true
      getGoodsSku(props.skuId).then(data => {
        goods.value = data.result
        loading.value = false
      })
    }
    const close = () => {
      visible.value = false
    }
    const toggle = () => {
      visible.value ? close() : open()
    }
    // 点击其他地方关闭
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })
    // 监听sku改变的函数
    const currSku = ref(null)
    const changeSku = (sku) => {
      currSku.value = sku
    }
    // 点击确认 需要将更改后的sku信息提交给父组件（购物车组件）
    const sumbit = () => {
      // 当currSku有值，且skuId和默认的skuId不同
      if (currSku.value && currSku.value.skuId && currSku.value.skuId !== props.skuId) {
        emit('change', currSku.value)
        close()
      }
    }
    return { visible, toggle, target, goods, loading, changeSku, sumbit }
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;

  .attrs {
    line-height: 24px;
    display: flex;

    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }

    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }

  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;

    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8, 1) rotate(45deg);
    }

    .loading {
      height: 224px;
      background: url(../../../assets/images/qrcode.jpg) no-repeat center;
    }
  }
}
</style>
