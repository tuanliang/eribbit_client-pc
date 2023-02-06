// 提供复用逻辑的函数（钩子）
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'

/**
 * 数据懒加载函数
 * @param {Element} target - Dom对象
 * @param {Function} apiFn - API函数
 */
export const useLazyData = (apiFn) => {
  const result = ref([])
  const target = ref(null)
  // stop停止观察
  const { stop } = useIntersectionObserver(
    // 监听的目标元素
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting是否进入可视区
      if (isIntersecting) {
        stop()
        // 调用API获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 配置选项 相交的比例大于0就触发
    {
      threshold: 0
    }
  )
  return { result, target }
}

/**
 * 支付倒计时函数
 * @param {Integer} countdown - 倒计时秒数
 */
export const usePayTime = (countdown) => {
  // 倒计时逻辑
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume } = useIntervalFn(() => {
    if (time.value > 0) {
      time.value--
      timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    }
    if (time.value <= 0) {
      pause()
    }
  }, 1000, false)
  onUnmounted(() => {
    pause()
  })

  const start = (countdown) => {
    time.value = countdown
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }

  return { start, timeText }
}
