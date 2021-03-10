<template>
  <div class="home-btns">
    <!-- <div class="home-btn" v-for="(item, index) in HomeBtnsList" :key="index">
      {{ item }}
    </div> -->
    <div class="home-btn">
      <div class="btn-item" @click="dailySongs"><img src="~assets/img/common/calendar.png" alt=""></div>
      <p>每日推荐</p>
    </div>
    <div class="home-btn">
      <div class="btn-item"><img src="~assets/img/common/fm.png" alt=""></div>
      <p>私人FM</p>
    </div>
    <div class="home-btn">
      <div class="btn-item"><img src="~assets/img/common/musiclist.png" alt=""></div>
      <p>歌单</p>
    </div>
    <div class="home-btn">
      <div class="btn-item"><img src="~assets/img/common/signal-fill.png" alt=""></div>
      <p>排行榜</p>
    </div>
    <div class="home-btn">
      <div class="btn-item"><img src="~assets/img/common/album.png" alt=""></div>
      <p>数字专辑</p>
    </div>
    <div class="home-btn">
      <div class="btn-item"><img src="~assets/img/common/microphone.png" alt=""></div>
      <p>畅聊</p>
    </div>
    <div class="home-btn">
      <div class="btn-item"><img src="~assets/img/common/game.png" alt=""></div>
      <p>游戏专区</p>
    </div>
  </div>
</template>

<script>

  import { getDailySongs } from 'network/home.js'

  export default {
    name: 'HomeBtns',
    data() {
      return {
        btnsList: [
          {name: "每日推荐", image: '@assets/img/home'}
        ]
      }
    },
    methods: {
      dailySongs() {
        getDailySongs().then(res=>{
          // console.log(res);
        })
      }
    }
  }
</script>

<style scope>
  .home-btns {
    display: flex;
    overflow:scroll;
  }
  .home-btns::-webkit-scrollbar {display:none}
  .home-btn {
    flex: 1;
    text-align: center;
    margin-left: 4vw;
    margin-right: 4vw;
  }
  .btn-item {
    width: 13vw;
    height: 13vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1vh;

    background-color:	#fdf0f0;
    /* padding: 1px; */
    border-radius: 50%;
  }
  .btn-item img {
    width: 8vw;
    height: 8vw;
    border-radius: 0;
  }
</style>