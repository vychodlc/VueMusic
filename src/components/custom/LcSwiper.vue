<template>
  <div class="swiper" ref="swiperEl">
    <div class="swiper-container" ref="containerEl"
      @touchstart="TouchStart"
      @touchmove="TouchMove"
      @touchend="TouchEnd"
      :style="{'left': left+'px'}"
    >
      <div class="swiper-item" v-for="(item,index) in banners" :key="index">
        <img :src="item.pic" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LcSwiper",
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      amount: 0,
      touchStart: 0,
      touchMove: 0,
      touchEnd: 0,
      state: 0,
      oldEvent: null,
      diff: 0,
      left: 0,
      index: 0,
    }
  },
  mounted() {
    this.amount = this.banners.length;
    this.$refs.containerEl.style.width = this.amount*300 + 'px';
  },
  methods: {
    TouchStart(e) {
      this.state = 1;
      this.oldEvent = e.targetTouches[0].pageX;
      this.touchStart = e.targetTouches[0].pageX;
    },
    TouchMove(e) {
      if (this.state != 1) return;

      this.touchMove = e.targetTouches[0].pageX;
      const index = parseInt(e.targetTouches[0].pageX/300);
      this.diff = this.oldEvent-this.touchMove;
      this.left -= this.diff;
      this.index = parseInt(-this.left/300);
      this.oldEvent = this.touchMove;
      // > 0 右滑 下一页 index+1
      // < 0 左滑 上一页 index-1
      if(this.left>0){
        this.left=0
      }
      if(this.left<-1*((this.amount-1)*300)){
        this.left = -1*((this.amount-1)*300);
      }
    },
    TouchEnd(e) {
      this.state = 0;
      this.touchEnd = e.changedTouches[0].pageX;
      const distance = 50
      if(this.touchStart-this.touchEnd<-distance && this.index>=0){ //上页
        this.index = (this.index+this.amount)%this.amount;
        this.left = -this.index*300;
      }else if(this.touchStart-this.touchEnd>distance && this.index<this.amount){ //下页
        this.index = (this.index+1)%this.amount;
        this.left = -this.index*300;
      }else if(-distance<this.touchStart-this.touchEnd<0 && this.index>=0){
        this.left = -this.index*300;
      }else if(0<this.touchStart-this.touchEnd<distance && this.index<this.amount){
        this.left = -this.index*300;
      }
    }
  }
}
</script>

<style scope>
  .swiper {
    position: relative;
    width: 300px;
    height: 400px;
    padding: 30px 0;
    margin: 0 auto;
    background: #FFB973;
    overflow-x: hidden;
  }
  .swiper .swiper-container {
    position: relative;
    display: flex;

    background: red;
    padding: 15px 0;

  }
  .swiper .swiper-container.move {
    transition: left 2s ease-in-out;
  } 
  .swiper .swiper-container .swiper-item {
    width: 300px;
    height: 300px;
    background: #eee;

    text-align: center;
    font-size: 40px;
    color: #fff;
  }
  .swiper .swiper-container .swiper-item img {
    width: 100%;
    height: 100%;
  }
</style>