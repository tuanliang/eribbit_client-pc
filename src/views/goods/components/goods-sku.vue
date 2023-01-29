<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img @click="changeSku(item, val)" v-if="val.picture" :class="{ selected: val.selected }" :src="val.picture"
            alt="val.name">
          <span @click="changeSku(item, val)" :class="{ selected: val.selected }" v-else>{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const pathMap = getPathMap(props.goods.skus)
    console.log(pathMap)

    // 1.选中与取消选中，约定在每一个按钮都拥有自己的选中状态数据：selected
    const changeSku = (item, val) => {
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(valItem => {
          valItem.selected = false
        })
        val.selected = true
      }
    }
    return { changeSku }
  }
}
const spliter = '★'
// 得到一个路径字典对象
const getPathMap = (skus) => {
  // 1.得到所有的sku集合 props.goods.skus
  // 2.从所有的sku中筛选出有效的sku
  // 3.根据有效的sku使用power-set算法得到子集
  // 4.根据子集往路径字典对象中存储key-value
  const pathMap = {}
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      // 计算当前有库存的sku的子集（幂集）
      // 例如：[1,2,3]==>[[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
      const valueArr = sku.specs.map(val => val.valueName)
      // 可选值数组 幂集
      const valueArrPowerSet = powerSet(valueArr)
      // 遍历幂集 往pathMap插入数据
      valueArrPowerSet.forEach(arr => {
        // 根据arr得到字符串的key，约定key是：['蓝色'，'美国']===》'蓝色*美国'
        const key = arr.join(spliter)
        // 给pathMap设置数据
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
