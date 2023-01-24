<template>
  <div>
    App <button @click="fn">测试request</button>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'app',
  setup () {
    const fn = () => {
      // 测试请求
      request('/member/profile', 'get', { a: 10 })
    }
    return { fn }
  }
}
</script>
