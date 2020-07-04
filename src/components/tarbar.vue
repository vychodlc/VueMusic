<template>
  <div>
    <van-tabbar v-model="active">
        <van-tabbar-item icon="music-o">发现</van-tabbar-item>
        <van-tabbar-item icon="video">视频</van-tabbar-item>
        <van-tabbar-item icon="contact">我的</van-tabbar-item>
        <van-tabbar-item icon="setting-o">账号</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tarbar',
  data () {
    return {
      active: 0,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
