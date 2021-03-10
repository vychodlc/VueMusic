<template>
  <div class="playBox">
    <div class="process"
    :style="{width: ($store.state.currentTime/$store.state.durationTime*100) + 'vw'}"></div>
    <div class="songImg" @click="$router.push('/play')">
        <img slot="item-icon-center" 
        :style="{
          transform:$store.state.imgRotate,
        }"
        :src="$store.state.audio.img" alt="">
    </div>
    <div class="songInfo" @click="$router.push('/play')">
      <span class="songName">{{$store.state.audio.name}}</span><span class="songSinger">- {{$store.state.audio.singer}}</span>
    </div>
    <div class="songCtrl">
      <div class="playBtn" @click="switchPlay">      
        <img v-show="!$store.state.playing" style="padding-left: 1px;" src="~assets/img/play/caret-right.png" alt="">
        <img v-show="$store.state.playing" src="~assets/img/play/pause.png" alt="">
      </div>
      <div class="listBtn" @click="$store.commit('nowlistShowChange', true)"><img src="~assets/img/play/indent.png" alt=""></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayBox",
  data () {
    return {}
  },
  methods:{
    switchPlay() {
      this.$store.commit('changePlaying',!this.$store.state.playing);
      this.$bus.$emit('switchPlay');
    },
  }
}
</script>

<style scoped>
  .playBox {
    padding: 2px 10px;
    background-color: #f6f6f6;
    width: 100vw;
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .process {
    position: absolute;
    top: 0;
    left: 0;
    /* width: 30px; */
    height: 2px;
    background-color: #e00;
  }
  .songImg {
    width: 40px;
    height: 40px;
    background-color: #000;
    border-radius: 50%;
    padding: 5px;
  }
  .songImg img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .songInfo {
    flex: 1;
    display: flex;
    padding-left: 10px;
    align-items: center;
  }
  .songName {
    font-size: 16px;
    color: #000;
    margin-right: 5px;
  }
  .songSinger {
    color: #999;
  }
  .songCtrl {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: row;
  }
  .songCtrl .playBtn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #777;
    border-radius: 50%;
    margin-right: 10px;
  }
  .songCtrl .playBtn img {
    width: 20px;
    height: 20px;
  }
  .songCtrl .listBtn img {
    width: 30px;
    height: 30px;
  }
</style>