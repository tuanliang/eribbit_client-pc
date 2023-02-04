// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法
// 这就是插件
// vue3.0插件要素写法：导出一个对象，有install函数，默认传入了app应用实例，Vue基础之上扩展

import defaultImg from '@/assets/images/qrcode.jpg'
import Confirm from './Confirm'
import Message from './Message'

// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import xtxBread from './xtx-bread.vue'
// import xtxBreadItem from './xtx-bread-item.vue'

const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // 在app上进行扩展，app提供 component，directive函数
    // 如果要挂载原型，app.config.globalProperties.$http

    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(xtxBread.name, xtxBread)
    // app.component(xtxBreadItem.name, xtxBreadItem)

    importFn.keys().forEach(path => {
      // 导入组件
      const component = importFn(path).default

      app.component(component.name, component)
    });

    // 定义指令
    defineDirective(app)

    // 定义一个原型函数
    app.config.globalProperties.$message = Message
    app.config.globalProperties.$confirm = Confirm
  }
}

// 定义指令
const defineDirective = (app) => {
  // 1.图片懒加载指令
  // 原理：先存储图片地址不能再src上，当图片进入可视区，将你存储图片地址设置给图片元素即可
  app.directive('lazy', {
    // vue3.0 的指令拥有的钩子函数和组件的一样，使用指令的Dom是否创建好，钩子函数：mounted
    mounted (el, binding) {
      // 2.创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 3.把指令的值设置给el的src属性，binding.value就是指令的值
          // 4.处理图片加载失败
          el.onerror = () => {
            // 加载失败，设置默认值  error图片加载失败的事件，load成功的事件
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
