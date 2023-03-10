import { createVNode, render } from 'vue'
import XtxConfirm from './xtx-confirm.vue'

// 准备dom
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

export default ({ title, text }) => {
  // 1.导入被创建的组件
  // 2.使用createVNode创建虚拟节点
  // 3.准备一个DOM容器装载组件
  // 4.使用render函数渲染组件到容器

  return new Promise((resolve, reject) => {
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }
    const submitCallback = () => {
      render(null, div)
      resolve()
    }

    const vn = createVNode(XtxConfirm, { title, text, cancelCallback, submitCallback })
    render(vn, div)
  })
}
