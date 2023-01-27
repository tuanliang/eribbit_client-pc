<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    // 用法
    // 1.template标签去除，单文件组件
    // 2.返回值就是组件内容
    // 3.vue2.0的h函数是传参进来的，vue3.0的h函数导入进来
    // 4.h 第一个参数：标签名字，第二个参数：标签属性对象，第三个参数：子节点
    // 需求
    // 1.创建xtx-bread父容器
    // 2.获取默认插槽内容
    // 3.出去xtx-bread-item组件的i标签，应该有render函数来组织
    // 4.遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 5.把动态创建的节点渲染到xtx-bread标签中
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<!-- 去掉scoped属性，目的是让样式作用到xtx-bread-item组件 -->
<style lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;

  &-item {
    a {
      color: #666;
      transition: all .4s;

      &:hover {
        color: @xtxColor;
      }
    }
  }

  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
