<template>
  <div style="margin-top:1vh;padding-left:20px">
    <head-bar :isLeft='false'>
      <div class="center" slot="center">
        <input class="input-box" type="text" v-model="keywords" @input="_search" placeholder="请输入搜索词" >
      </div>
      <div class="right" slot="right" @click="$router.go(-1)"><p>取消</p></div>
    </head-bar>
    <p class="title" v-show="!isInput">热搜榜<span class="playHot">播放</span></p>
    <div class="hotSongs" v-show="!isInput">
      <div class="hotSong" v-for="(item,index) in hotSongs" :key="index" @click="goSearch(item.searchWord)">
        <span class="index">{{index+1}}</span>
        <span>{{item.searchWord}}</span>
        <span v-if="item.iconUrl"><img :src="item.iconUrl" alt=""></span>
      </div>
    </div>
    <p class="s-default" v-show="isInput" @click="goSearch(keywords)">搜索“{{keywords}}”</p>
    <div v-show="isInput">
      <div v-for="(o,index1) in suggetResult.order" :key="index1">
        <div v-if="o=='songs'">
          <p class="result-title">单曲</p>
          <p class="result-item" v-for="(song,index11) in suggetResult[o]" :key="index11" 
          @click="goSearch(song.name)">{{song.name}}---{{song.artists[0].name}}</p>
        </div>
        <div v-if="o=='artists'">
          <p class="result-title">歌手</p>
          <p class="result-item" v-for="(artist,index12) in suggetResult[o]" :key="index12"
          @click="goSearch(artist.name)">{{artist.name}}</p>
        </div>
        <div v-if="o=='albums'">
          <p class="result-title">专辑</p>
          <p class="result-item" v-for="(album,index13) in suggetResult[o]" :key="index13"
          @click="goSearch(album.name)">{{album.name}}---{{album.artist.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "components/common/headbar/HeadBar"
import SearchBox from "components/common/searchbox/SearchBox"

import { searchSuggest,searchHot } from 'network/search.js'

export default {
  name: "Search",
  components: {
    HeadBar,
    SearchBox
  },
  data () {
   return {
     test: 'albums',
     isInput: false,
     keywords: '',
     hotSongs: [],
     suggetResult: []
   }
  },
  mounted() {
    searchHot().then(res=>{
      this.hotSongs = res.data;
    })
  },
  activated() {
    console.log("search activated");
    this.keywords = '';
    this.isInput = false;
    this.$store.commit('navbarShowChange', false);
  },
  deactivated() {
    console.log("search deactivated");
    this.$store.commit('navbarShowChange', true);
  },
  methods:{
    _search() {
      if(this.keywords==''){
        this.isInput = false
      }else{
        this.isInput = true
      }
      searchSuggest(this.keywords).then(res=>{
        if(res.code==200){        
          this.suggetResult = res.result;
          console.log(this.suggetResult);
        }
      })
    },
    goSearch(keyword) {
      // console.log(keyword);
      this.$router.push({ path: '/search/detail', query: { keywords: keyword }})
    }
  },
  
}
</script>

<style scoped>
  input {
    width: 100%;
    height: 30px;
    text-align: left;
    line-height: 30px;
    border: none;
    border: 1px solid transparent;
    border-radius: 10px;
    padding-left: 10px;
    color: #444;
  }
  .title {
    position: relative;
    color: #000;
    font-weight: bold;
    margin-top: 5vh;
    margin-bottom: 1vh;
  }
  .playHot {
    font-size: 10px;
    color: #666;
    border: 1px solid #666;
    border-radius: 10px;
    font-weight: normal;
    position: absolute;
    padding: 1px 5px;
    right: 20px;
  }
  .hotSongs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }
  .hotSong {
    position: relative;
    flex: 1;
    width: 49.5%;
    min-width: 49.5%;
    max-width: 49.5%;
    height: 30px;
  }
  .hotSong span {
    margin-right: 5px;
    color: #000;
  }
  .hotSong .index {
    color: #aaa;
  }
  .hotSong:nth-child(-n+3) .index {
    color: #f00;
  }
  .hotSong:nth-child(-n+3) span {
    font-weight: bold;
  }
  span img {
    border-radius: 0;
    height: 10px;
    width: 20px;
  }

  .s-default {
    margin-top: 1vh;
    color: #2661c0;
  }

  .result-title {
    margin-top: 2vh;
    color: #000;
    font-size: 14px;
  }
  .result-item {
    margin-right: 20px;
    height: 20px;
    margin-top: 1vh;
  }
  .result-item img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
</style>