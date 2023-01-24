<template>
  <div>
    App {{ $store.state.user.profile.account }}
    <button @click="$store.commit('user/setUser', { account: 'shiyi' })">设置用户信息</button>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
