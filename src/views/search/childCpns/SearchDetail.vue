<template>
  <div style="margin-top:1vh">
    <!-- <head-bar>
      <div class="left" slot="left" style="margin-top:1vh" @click="$router.go(-1)"><img src="~assets/img/common/left.png" alt=""></div>
      <div class="center" slot="center" @click="$router.push({ path: '/search'})"><search-box></search-box></div>
    </head-bar> -->
    <div class="head">
      <img @click="$router.go(-1)" src="~assets/img/common/left.png" alt="">
      <p>“{{keywords}}”的搜索结果</p>
    </div>
    <div class="resultTypes">
      <div class="resultType" v-for="(item,index) in types" :key="index" @click="changeIndex(index)">
        <div class="text"><span :class="{active: index===typeIndex}">{{item}}</span></div>
      </div>
    </div>
    <div class="DataView">
      <div id="allView" v-show="typeIndex==0">
        <div class="viewContainer" v-if="allData.song">
          <p class="title">单曲</p>
          <div class="viewItem" v-for="(item,index) in allData.song.songs" :key="index"
          @click="playSong(item)">
            <p class="name">{{item.name}}</p>
            <p class="info">{{item.ar[0].name}}-{{item.al.name}}</p>
            <img class="more" src="~assets/img/home/ellipsis.png" alt="">
          </div>
          <div class="moreData">
            <p>{{allData.song.moreText}}</p>
          </div>
        </div>
        <div class="viewContainer" v-if="allData.playList">
          <p class="title">歌单</p>
          <div class="viewItem" style="display:flex;" v-for="(item,index) in allData.playList.playLists" :key="index"
          @click="$router.push({ path: '/playlist', query: { id: parseInt(item.id) }})">
            <img class="cover" :src="item.coverImgUrl" alt="">
            <div class="text">
              <p class="name">{{item.name}}</p>
              <p class="info">{{item.trackCount}}首音乐，播放{{item.playCount|NumFormat}}次</p>
            </div>
          </div>
          <div class="moreData">
            <p>{{allData.playList.moreText}}</p>
          </div>
        </div>
        <div class="viewContainer" v-if="allData.video">
          <p class="title">视频</p>
          <div class="viewItem" style="display:flex;" v-for="(item,index) in allData.video.videos" :key="index">
            <img class="cover2" :src="item.coverUrl" alt="">
            <div class="text">
              <p class="name">{{item.title}}</p>
              <p class="info">{{item.durationms/1000|sec2min}}，by {{item.creator[0].userName}}，播放{{item.playTime|NumFormat}}次</p>
            </div>
          </div>
          <div class="moreData">
            <p>{{allData.video.moreText}}</p>
          </div>
        </div>
        <div class="viewContainer" v-if="allData.album">
          <p class="title">专辑</p>
          <div class="viewItem" style="display:flex;" v-for="(item,index) in allData.album.albums" :key="index">
            <img class="cover3" :src="item.picUrl" alt="">
            <div class="text">
              <p class="name">{{item.name}}</p>
              <p class="info">{{item.artists[0].name}}，{{item.publishTime}}</p>
            </div>
          </div>
          <div class="moreData">
            <p>{{allData.album.moreText}}</p>
          </div>
        </div>
        <div class="viewContainer" v-if="allData.artist">
          <p class="title">歌手</p>
          <div class="viewItem" style="display:flex;" v-for="(item,index) in allData.artist.artists" :key="index">
            <img class="cover4" :src="item.picUrl" alt="">
            <div class="text">
              <p class="name">{{item.name}}</p>
            </div>
          </div>
          <div class="moreData">
            <p>{{allData.artist.moreText}}</p>
          </div>
        </div>
        <div class="viewContainer" v-if="allData.user">
          <p class="title">用户</p>
          <div class="viewItem" style="display:flex;" v-for="(item,index) in allData.user.users" :key="index">
            <img class="cover4" :src="item.avatarUrl" alt="">
            <div class="text">
              <p class="name">{{item.nickname}}</p>
            </div>
          </div>
          <div class="moreData">
            <p>{{allData.user.moreText}}</p>
          </div>
        </div>
      </div>
      <div id="songView" v-show="typeIndex==1">
        <div v-if="songData.songs">        
          <song-card :songs='songData.songs' />
        </div>
      </div>
      <div id="albumView" v-show="typeIndex==2">
        <div class="viewItem" style="display:flex;width:90vw;margin-left:5vw" v-for="(item,index) in albumData.albums" :key="index"
        @click="$router.push({ path: '/album', query: { id: parseInt(item.id)}})">
          <img class="cover3" :src="item.picUrl" alt="">
          <div class="text">
            <p class="name">{{item.name}}</p>
            <p class="info">{{item.artists[0].name}}，{{item.publishTime}}</p>
          </div>
        </div>
      </div>
      <div id="singerView" v-show="typeIndex==3">
        <div class="viewItem" style="display:flex;width:90vw;margin-left:5vw" v-for="(item,index) in singerData.artists" :key="index">
          <img class="cover4" :src="item.picUrl" alt="">
          <div class="text">
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </div>
      <div id="listView" v-show="typeIndex==4">
        <div class="viewItem" style="display:flex;width:90vw;margin-left:5vw" v-for="(item,index) in listData.playlists" :key="index"
        @click="$router.push({ path: '/playlist', query: { id: parseInt(item.id) }})">
          <img class="cover" :src="item.coverImgUrl" alt="">
          <div class="text">
            <p class="name">{{item.name}}</p>
            <p class="info">{{item.trackCount}}首音乐，播放{{item.playCount|NumFormat}}次</p>
          </div>
        </div>
      </div>
      <div id="userView" v-show="typeIndex==5">
        <div class="viewItem" style="display:flex;width:90vw;margin-left:5vw" v-for="(item,index) in userData.userprofiles" :key="index">
          <img class="cover4" :src="item.avatarUrl" alt="">
          <div class="text">
            <p class="name">{{item.nickname}}</p>
          </div>
        </div>
      </div>
      <div id="mvView" v-show="typeIndex==6">mvView</div>
      <div id="lyricView" v-show="typeIndex==7">lyricView</div>
      <div id="fmView" v-show="typeIndex==8">fmView</div>
      <div id="videoView" v-show="typeIndex==9">videoView</div>
    </div>
  </div>
</template>

<script>

import { searchDefault } from 'network/search.js'

import HeadBar from "components/common/headbar/HeadBar"
import SearchBox from "components/common/searchbox/SearchBox"
import SongCard from "components/custom/SongCard"

export default {
  name: "SearchDetail",
  components: {
    HeadBar,SearchBox,SongCard
  },
  data () {
    return {
     keywords: '',
     typeIndex: 0,
     types: ['综合','单曲','专辑','歌手','歌单','用户','MV','歌词','电台','视频'],
     typesNum: [1018,1,10,100,1000,1002,1004,1006,1009,1014],
     allData: {},
     songData: {},
     albumData: {},
     singerData: {},
     listData: {},
     userData: {},
     mvData: {},
     lyricData: {},
     fmData: {},
     videoData: {}
    }
  },
  mounted() {
  },
  activated() {
    console.log("search detail activated");
    this.$store.commit('navbarShowChange', false);
    this.keywords = this.$route.query.keywords;
    this._search()
  },
  deactivated() {
    console.log("search detail deactivated");
    this.$store.commit('navbarShowChange', true);
  },
  filters: {
    NumFormat: (val) => {
      if(val>=100000&&val<100000000){
        return parseFloat(val/10000).toFixed(1)+'万'
      }else if(val>=100000000){
        return parseFloat(val/100000000).toFixed(1)+'亿'
      }else{
        return val
      }
    },
    sec2min(sec){
      let secs = parseInt(sec);
      if(secs%60<10){    
        return '0'+parseInt(secs/60)+':0'+parseInt(secs%60)
      }else{      
        return '0'+parseInt(secs/60)+':'+parseInt(secs%60)
      }
    }
  },
  methods:{
    _search() {
      searchDefault(this.$route.query.keywords,this.typesNum[this.typeIndex]).then(res => {
        switch(this.typeIndex){
          case 0:
            this.allData = res.result;
            break;
          case 1:
            this.songData = res.result;
            break;
          case 2:
            this.albumData = res.result;
            break;
          case 3:
            this.singerData = res.result;
            break;
          case 4:
            this.listData = res.result;
            break;
          case 5:
            this.userData = res.result;
            break;
          case 6:
            this.mvData = res.result;
            break;
          case 7:
            this.lyricData = res.result;
            break;
          case 8:
            this.fmData = res.result;
            break;
          case 9:
            this.videoData = res.result;
            break;          
        }
      })
    },
    changeIndex(index) {
      this.typeIndex = index;
      this._search()
    },
    playSong(item) {
      this.$router.push({ path: '/play', query: { id: parseInt(item.id) }});
      this.$store.commit('addSong', item);
    }
  }
}
</script>

<style scoped>
  /* .left, .right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left img,
  .right img {
    width: 24px;
    height: 24px;
  }
  .head-bar,
  .home-btns {
    margin-top: 1vh;
    margin-bottom: 1vh;
  }
  input {
    text-align: left;
  } */
  .head {
    width: 100%;
    height: 49px;
    position: relative;
  }
  .head img {
    width: 24px;
    height: 24px;
    position: absolute;
    left: 10px;
    top: 12px;
    line-height: 49px;
  }
  .head p {
    text-align: center;
    font-size: 14px;
    line-height: 49px;
  }

  .resultTypes {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-top: 1vh;
    height: 4vh;
    overflow: scroll;
  }
  .resultTypes::-webkit-scrollbar {display:none}
  .resultType {
    flex: 1;
    text-align: center;
  }
  .resultType .text {
    width: 15vw;
  }
  .active {
    border-bottom: 2px solid #f00;
    padding: 0 2px;
  }

  .DataView {
    width: 100vw;
    height: calc(100vh - 49px - 6vh);

    padding-top: 1vh;
    overflow: scroll;
  }

  .viewContainer .title {
    position: relative;
    color: #000;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 1.5vh;
  }
  .viewContainer {
    width: 92vw;
    margin-left: 4vw;
    margin-bottom: 4vh;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
  }
  .viewItem {
    position: relative;
    width: 100%;
    margin-top: 1vh;
    border-top: 1px solid #ddd;
    padding: 6px 0;
  }
  .viewItem .name {
    font-size: 14px;
    color: #000;
    display: flex;
    align-items: center;
  }
  .viewItem .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .viewItem .info {
    font-size: 10px;
    color: #888;
    margin-top: 5px;
    display: flex;
    align-items: center;
  }
  .viewItem .more{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-8px);
    width: 16px;
    height: 16px;
  }
  .viewItem .cover{
    /* position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-8px); */
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 10%;
  }
  .cover2 {
    width: 60px;
    height: 40px;
    margin-right: 10px;
    border-radius: 10px;
  }
  .cover3 {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 10px;
  }
  .cover4 {
    width: 40px;
    height: 40px;
    margin-right: 30px;
    border-radius: 50%;
  }
  .moreData {
    margin-top: 1vh;
    padding-top: 1vh;
    text-align: center;
    color: #888;
    border-top: 1px solid #ddd;
  }
</style>