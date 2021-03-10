<template>
  <div class="playList" v-if="plist.playCount">
    <div class="head-bar">
      <head-bar :ifHas2='true'>
        <div class="left" slot="left" @click="goBack"><img src="~assets/img/common/left.png" alt=""></div>
        <!-- <div class="center" slot="center" style="color:#fff">歌单</div> -->
        <div class="right" slot="right"><img src="~assets/img/home/search.png" alt=""></div>
        <div class="right" slot="right2"><img src="~assets/img/home/ellipsis.png" alt=""></div>
      </head-bar>
    </div>
    <div class="imgBoxCon">
      <div class="imgBox">
        <div class="imgCon">
          <span class="play-count" v-if="plist.playCount!=null">{{plist.playCount | NumFormat}}</span>
          <img class="imgBoxImg" :src="plistImage" alt="">
        </div>
        <div class="pListText">
          <div class="name">{{plistName}}</div>
          <div class="author" v-if="plistAuthor!=''">
            <img :src="plistAuthor.avatarUrl">
            <div>{{plistAuthor.nickname}}</div>
          </div>
          <div class="info">{{plistInfo}}</div>
        </div>
      </div>
    </div>
    <div class="btnsBox">
      <div class="btnItem">
        <div class="btnImg"><img src="~assets/img/common/plus.png" alt=""></div>
        <div class="btnAmount"><span>{{plist.subscribedCount|NumFormat}}</span></div>
      </div>
      <div class="btnItem">
        <div class="btnImg"><img src="~assets/img/home/comment.png" alt=""></div>
        <div class="btnAmount"><span>{{plist.commentCount|NumFormat}}</span></div>
      </div>
      <div class="btnItem">
        <div class="btnImg"><img src="~assets/img/common/share.png" alt=""></div>
        <div class="btnAmount"><span>{{plist.shareCount|NumFormat}}</span></div>
      </div>
    </div>
    <div class="songCards">
      <song-card :songs='songs' />
    </div>

    <!-- <div style="margin-bottom: 49px"></div> -->
  </div>
</template>

<script>
import HeadBar from "components/common/headbar/HeadBar"

import SongCard from "components/custom/SongCard"

import { getPListData,getSongData } from 'network/home.js'

export default {
  name: 'PlayList',
  components: {
    HeadBar,
    SongCard
  },
  data() {
    return {
      plist: {},
      plistName: '',
      plistImage: '',
      plistAuthor: '',
      plistInfo: '',
      songs: []
    }
  },
  filters: {
    NumFormat: (val) => {
      if(val>=100000&&val<100000000){
        return parseInt(val/10000)+'万'
      }else if(val>=100000000){
        return parseInt(val/100000000)+'亿'
      }else{
        return val
      }
    }
  },
  created() {
    console.log("playlist created");
  },
  activated() {
    console.log("playlist activated");
    this.$store.commit('navbarShowChange', false)
    this._getPListData(this.$route.query.id)
  },
  deactivated() {
    console.log("playlist deactivated");
  },
  mounted() {
  },
  methods: {
    _getPListData(id) {
      getPListData(id).then(res => {
        if(res&&res.code==200){
          this.plist = res.playlist
          this.plistName = res.playlist.name
          this.plistImage = res.playlist.coverImgUrl
          this.plistAuthor = res.playlist.creator
          this.plistInfo = res.playlist.description

          let songText = ""
          res.playlist.trackIds.map((item) => {songText += item.id += ','});
          songText = songText.substr(0,songText.length-1);
          getSongData(songText).then(res => {
            this.songs = res.songs
          })
        }
      })
    },
    goBack() {
      // this.$router.replace('/home')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .playList {
    position: relative;
  }
  .left, .right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left img,
  .right img {
    width: 24px;
    height: 24px;
  }
  .head-bar{
    margin-top: 1vh;
    margin-bottom: 1vh;
  }
  .imgBoxCon{
    z-index: -199;
    height: 60vw;
    background-color: #666;
    position: relative;
    transform: translateY(-20vw);
    padding-top: 20vw;
  }
  .imgBox {
    display: flex;
    height: 30vw;
    position: relative;
  }
  .imgCon {
    position: relative;

  }
  .imgBox .play-count{
    position: absolute;
    right: 5%;
    top: 5%;
    background-color: rgba(85, 85, 85, .7);
    color: #ddd;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 0 3px;

    z-index: 1000000;
  }
  .imgBoxImg{
    width: 30vw;
    height: 30vw;
    border-radius: 10%;
    margin-left: 5vw;
  }
  .imgBox .pListText{
    display: flex;
    flex-direction: column;
    padding: 5px 20px;
    justify-content: space-between;
  }
  .pListText .name{
    font-size: 18px;
    /* flex: 1; */
    color: #fff;
    display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
    overflow: hidden;
  }
  .pListText .author{
    flex: 1;
    margin-top: 10px;
    color: #ddd;
    display: flex;
    align-items: center;
  }
  .pListText .info{
    /* flex: 1; */
    margin-top: 10px;
    color: #ddd;
    display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
    overflow: hidden;
  }
  .pListText .author img {
    width: 15px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .pListText .author span {
    flex: 1;
  }

  .btnsBox {
    width: 70vw;
    height: 10vw;
    margin-left: 15vw;
    border-radius: 5vw;

    background-color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    transform: translateY(-25vw);
  }
  .btnsBox img {
    width: 5vw;
    margin-right: 5px;
  }
  .btnsBox .btnItem {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .songCards {
    transform: translateY(-49px);
  }
</style>