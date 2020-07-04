<template>
  <div class="swipe">
    <van-swipe :autoplay="3000" indicator-color='red'>
        <!-- <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" width="200" height="200"/>
        </van-swipe-item> -->
        <van-swipe-item v-for="(item, index) in images" :key="index">
            <img :src="item.imageUrl" alt="">
        </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'index_swipe',
  data() {
    return {
      images: [],
    };
  },
  created(){
      axios({
          url: "https://autumnfish.cn/banner",
          method: 'get',
      }).then(res=>{
          this.images = res.data.banners
      })
  }
}
</script>

<style>
.swipe{
    padding-top: 0.5vh;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    background-color: #000;
    padding-left: 2vh;
}
.swipe img{
    width: 90vw;
    height: (94*1080/400)vw;
    margin-left: 5vw;
    border-radius: 2vh;
}
</style>