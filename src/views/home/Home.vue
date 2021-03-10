<template>
  <div id="home" style="padding-bottom: 99px">
    <div class="head-bar">
      <head-bar>
        <div class="left" slot="left" @click="$router.push({ path: '/logview'})"><img src="~assets/img/home/menu.png" alt=""></div>
        <div class="center" slot="center" @click="$router.push({ path: '/search'})"><search-box></search-box></div>
        <div class="right" slot="right"><img src="~assets/img/home/audio-fill.png" alt=""></div>
      </head-bar>
    </div>
    <div class="home-swiper"><home-swiper :banners="banners" /></div>
    <!-- <div class="home-btns" id="box-bottom"><home-btns /></div> -->
    <div class="home-playlists" id="playlist1"><home-playlist boxName='推荐歌单' :play-list="playlistRmd" /></div>
    <div class="home-custom" id="box-bottom"><home-custom :customtitle='customtitle' :customlist='customlist' /></div>
    <div class="home-playlists" id="playlist2"><home-playlist boxName='专属场景歌单' :play-list="playlistScene" /></div>
    <div class="home-playlists" id="playlist3"><home-playlist boxName='播客合辑' :play-list="playlistVoice" /></div>
    <div class="home-playlists" id="playlist4"><home-playlist boxName='视频合辑' :play-list="playlistVideo" /></div>
  </div>
</template>

<script>
import HeadBar from "components/common/headbar/HeadBar"
import SearchBox from "components/common/searchbox/SearchBox"
import HomeSwiper from "./childCpns/HomeSwiper"
import HomeBtns from "./childCpns/HomeBtns"
import HomePlaylist from "./childCpns/HomePlaylist"
import HomeCustom from "./childCpns/HomeCustom"

import { getHomeData } from 'network/home.js'

export default {
  name: 'Home',
  components: {
    HeadBar,
    SearchBox,
    HomeSwiper,
    HomeBtns,
    HomePlaylist,
    HomeCustom
  },
  data() {
    return {
      banners: [],
      playlistRmd: [],
      customtitle: '',
      customlist: [],
      playlistScene: [],
      playlistVoice: [],
      playlistVideo: []
    }
  },
  created() {
    console.log("home created");
  },
  deactivated() {
    console.log("home deactivated");
  },
  activated() {
    console.log("home activated");
    this.$store.commit('navbarShowChange', true);
  },
  mounted() {
    this._getHomeData();
  },
  methods: {
    _getHomeData() {
      getHomeData().then(res => {
        this.banners = res.data.blocks[0].extInfo.banners;
        this.playlistRmd = res.data.blocks[this.getIndex(res.data.blocks, '推荐歌单')].creatives;
        this.customtitle = res.data.blocks[2].uiElement.subTitle.title;
        this.customlist = res.data.blocks[2].creatives;
        this.playlistScene = res.data.blocks[this.getIndex(res.data.blocks, '专属场景歌单')].creatives;
        // this.playlistVoice = res.data.blocks[this.getIndex(res.data.blocks, '播客合辑')].creatives;
        this.playlistVideo = res.data.blocks[this.getIndex(res.data.blocks, '视频合辑')].creatives;
      })
    },
    getIndex(items, name) {
      let index = null;
      for(let i in items){
        if(items[i].uiElement&&items[i].uiElement.subTitle){
          if(items[i].uiElement.subTitle.title==name){
            index = i;
          }
        }
      }
      return index;
    },
    goSearch() {
      console.log(123);
    }
  }
}
</script>

<style scope>
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
  .head-bar,
  .home-btns {
    margin-top: 1vh;
    margin-bottom: 1vh;
  }
  #box-bottom {
    /* border-bottom: 5px solid #eee; */
  }
  .home-swiper {
    width: 94vw;
    margin-left: 3vw;
    margin-bottom: 2vh;
    overflow: hidden;
  }
  .home-playlists {
    margin-bottom: 10px;
    /* border-bottom: 5px solid #eee; */
  }
</style>