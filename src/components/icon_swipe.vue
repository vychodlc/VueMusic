<template>
  <div id="icons">
      <div class="icon-item" v-for="(icon,index) in icons" :key="index">
          <div class="icon">
            <img :src="icon.url" alt="">
          </div>
          <div style="text-align:center; margin-top: 1vh">{{ icon.name }}</div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'icon_swipe',
    data() {
        return {
            icons: [
                { name:'每日推荐',url: require('@/assets/imgs/rili.png')},
                { name:'歌单',url: require('@/assets/imgs/gedan.png')},
                { name:'排行榜',url: require('@/assets/imgs/ranking.png')},
                { name:'私人FM',url: require('@/assets/imgs/fm.png')},
            ]
        };
    }
  }
</script>

<style scoped>
#icons{
    color: #999;
}
.icon-item{
    display: inline-block;
    margin-left: 8vw;
    text-align: center;
}
.icon {
    width: 15vw;
    height: 15vw;
    background-color: #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
}
.icon img{
    margin: 0 auto;
    width: 10vw;
    height: 10vw;
    border-radius: 0;
}
</style>