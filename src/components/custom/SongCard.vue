<template>
  <div>
    <div class="songCard">
      <div class="card-left">
        <div class="imgBorder"><img src="~assets/img/home/caret-right.png" alt=""></div>
      </div>
      <div class="card-center">
        <div class="songName" style="font-weight: bold">播放全部</div>
      </div>
      <div class="card-right">
        <img style="margin-right: 10px" src="~assets/img/common/download.png" alt="">
        <img style="margin-right: 10px" src="~assets/img/common/check.png" alt="">
      </div>
    </div>
    <div class="songCard" v-for="(item,index) in songs" :key="index" @click="playSong(item)">
      <div class="card-left">
        <p>{{index+1}}</p>
      </div>
      <div class="card-center">
        <div class="songName">
          <div class="songNameText">{{item.name}}</div>
        </div>
        <div class="songInfo">
          <div class="songtag">独家</div>
          <div class="songtag">SQ</div>
          <div class="songText" v-if="item.ar">{{item.ar[0].name}}-{{item.al.name}}</div>
          <div class="songText" v-else>{{item.artists[0].name}}-{{item.album.name}}</div>
        </div>
      </div>
      <div class="card-right">
        <img src="~assets/img/home/ellipsis.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongCard",
  props: {
    songs: {type:Array,default(){return []}}
  },
  data () {
   return {}
  },
  mounted() {
  },
  activated() {
  },
  methods:{
    playSong(item) {
      this.$store.commit('addSong', item);
      this.$store.commit('changeId', item.id);
      this.$bus.$emit('nextSong');

      this.$router.push({ path: '/play', query: { id: parseInt(item.id) }});
    }
  }
}
</script>

<style scoped>
  img {
    width: 20px;
  }
  .songCard {
    width: 100vw;
    height: 10vw;
    margin-bottom: 6vw;
    display: flex;
  }
  .card-left,
  .card-right {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-left p {
    font-size: 20px;
  }
  .card-left .imgBorder {
    width:30px;
    height:30px;
    border-radius: 50%;
    background-color:#ec5c55;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .imgBorder img{
    transform: translateX(2px);
  }
  .card-center {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .songNameText,
  .songInfo {
    font-size: 16px;
    color: #000;
    flex: 1;
    display: flex;
    align-items: center;
  }
  .songNameText {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .songInfo {
    margin-top: 5px;
  }
  .songText {
    font-size: 12px;
    color: #999;
    
    width: 50vw;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .songtag {
    /* font-size: 10px; */
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.80);
    border: 1px solid #ec5c55;
    border-radius: 3px;
    color: #ec5c55;
    padding: 1px;
  }
</style>