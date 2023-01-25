// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法
// 这就是插件
// vue3.0插件要素写法：导出一个对象，有install函数，默认传入了app应用实例，Vue基础之上扩展
import XtxSkeleton from './xtx-skeleton.vue'

export default {
  install (app) {
    // 在app上进行扩展，app提供 component，directive函数
    // 如果要挂载原型，app.config.globalProperties.$http
    app.component(XtxSkeleton.name, XtxSkeleton)
  }
}
