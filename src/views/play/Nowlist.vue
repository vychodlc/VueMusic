<template>
  <div>
    <div class="box" @click.stop="closeBox" v-show="$store.state.isNowlist">
      <div class="listbox" @click.stop="fun2">
        <div class="top">
          <div class="title">当前播放 <span>({{$store.state.songList.length}})</span></div>
          <div class="playmodel">
            <img src="~assets/img/common/retweet.png" alt="" style="margin-right:5px">
            <span>循环播放</span>
          </div>
        </div>
        <div class="songlist">
          <div v-for="(item,index) in $store.state.songList" :key="index">
            <div class="songitem" @click="switchSong(item.id)">      
              <img v-show="item.id==$store.state.audio.id" style="margin-right:10px" src="~assets/img/common/signal-fill.png" alt="">
              <div class="info" :style="{color: item.id==$store.state.audio.id?'#f00':'#000'}">
                {{item.name}}<span :style="{color: item.id==$store.state.audio.id?'#f00':'#000'}"> - {{item.singer}}</span>
              </div>
              <img v-show="item.id!=$store.state.audio.id" src="~assets/img/home/close.png" alt="" @click.stop="rmSong(item.id)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nowlist",
  data () {
    return {
      currentId: 1,
      songs: [1,2,3,4,5]
    }
  },
  methods:{
    closeBox() {
      this.$store.commit('nowlistShowChange', false);
    },
    fun2() {
      // console.log(this.$store.state.songList);
    },
    switchSong(id) {
      if(id!=this.$store.state.audio.id) {
        if(this.$route.path.indexOf("play") != -1) {
          this.$router.replace({ path: '/play', query: { id: parseInt(id) }});
        }
        this.$bus.$emit('playplay', id);
      }
    },
    rmSong(id) {
      this.$store.commit('rmSong',id);
    }
  }
}
</script>

<style scoped>
  .box {
    z-index: 9999999;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, .5);

    position: fixed;
    left: 0;
    top: 0;
  }
  .listbox {
    
    width: 96vw;
    height: 60vh;
    top: 39vh;
    left: 2vw;
    background-color: #fff;
    position: absolute;

    border-radius: 5vw;
    padding: 20px;
  }
  .listbox img {
    width: 20px;
    height: 20px;
  }
  .top {
    display: flex;
    justify-content: space-between;
  }
  .top .title {
    font-size: 18px;
    font-weight: bold;
  }
  .top .title span {
    font-size: 14px;
    font-weight: normal;
  }
  .top .playmodel {
    display: flex;
    align-items: center;
  }
  .songlist {
    margin-top: 2vh;
  }
  .songlist img {
    border-radius: 0;
  }
  .songlist .songitem {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 6vh;
  }
  .info {
    flex: 1;
    margin-right: 10px;
    font-size: 18px;
    color: #000;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .info span {
    color: #999;
  }
</style>