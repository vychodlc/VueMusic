<template>
  <div style="postion:relative">
    <head-bar>
      <div class="left" slot="left" @click="goBack"><img src="~assets/img/common/left.png" alt=""></div>
      <div class="center" slot="center">
        <p style="color:#000;font-size:20px">{{$store.state.audio.name}}</p> 
        <p style="color:#666;font-size:14px;transform:translateY(-20px)">{{$store.state.audio.singer}}</p> 
      </div>
      <div class="right" slot="right" @click="$router.push({ path: '/comment', query: { id }});"><img src="~assets/img/common/message.png" alt=""></div>
    </head-bar>
    <div class="needle" ref="needle" v-show="isShow"
      :style="{
        transform: (!$store.state.playing?'rotate(-40deg) translate(13vw,-4vw)':'translate(-5vw,0)')
      }"
    ><img src="~assets/img/play/needle.png" alt=""></div>
    <div class="playBox" @click="switchView">
      <div class="discBox" ref="discBox"
        :style="{
          transform:$store.state.imgRotate,
          transition:'.5s linear',
          display: isShow?'':'none'
        }"
      >
        <img :src="$store.state.audio.img" alt="">
      </div>
      <div class="lyricBox" v-show="!isShow">
        <div class="lyricCon" :style="{ top: -($store.state.currentIndex-5)*10.6667 + 'vw' }">
          <div class="lyricItem" v-for="(item, index) in $store.state.lyrics" :key="index">
            <p class="lyricP" :class="{'lyricActive':($store.state.currentTime>item.time&&$store.state.currentTime<$store.state.lyricIndex[index+1])}">
              {{item.lrc}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="controlBox">
      <div class="btnBox">
        <div class="btnItem"><img src="~assets/img/common/heart.png" alt=""></div>
        <div class="btnItem"><img src="~assets/img/common/download.png" alt=""></div>
        <div class="btnItem"><img src="~assets/img/home/audio-fill.png" alt=""></div>
        <div class="btnItem" @click="$router.push({ path: '/comment', query: { id }});"><img src="~assets/img/common/message.png" alt=""></div>
        <div class="btnItem"><img src="~assets/img/home/ellipsis.png" alt=""></div>
      </div>
      <div class="progressLine">
        <span class="lineTime">{{$store.state.currentTime|sec2min}}</span>
        <input ref="range" type="range" 
          :value='$store.state.currentTime'
          @change="rangeChange()"
          :max="$store.state.durationTime" min="0" step="1"
        />
        <span class="lineTime">{{$store.state.durationTime|sec2min}}</span>
      </div>
      <div class="ctrlBox">
        <div class="btnItem2"><img src="~assets/img/common/retweet.png" alt=""></div>
        <div class="btnItem2" @click="switchSong('previous',id)"><img src="~assets/img/play/step-backward.png" alt=""></div>
        <div class="btnItem1" @click="switchPlay">
          <img v-show="!$store.state.playing" style="padding-left: 8px;" src="~assets/img/play/caret-right.png" alt="">
          <img v-show="$store.state.playing" src="~assets/img/play/pause.png" alt="">
        </div>
        <div class="btnItem2" @click="switchSong('next',id)"><img src="~assets/img/play/step-forward.png" alt=""></div>
        <div class="btnItem2" @click="$store.commit('nowlistShowChange', true)"><img src="~assets/img/play/indent.png" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "components/common/headbar/HeadBar"

import { getSongData, getSong, getLyric } from 'network/home.js'

export default {
  name: "Play",
  components: {HeadBar},
  data () {
   return {
     id: 0,
     lyrics: [],
     songUrl: '',
     lyricIndex: [],
     songData: {},
     rotateVal: 300,
     isShow: true,
     isPlay: false,
     currentTime: 0,
     currentIndex: 0,
     currentLyric: '',
     allTime: 0,
     progress: 0,
   }
  },
  filters: {
    sec2min(sec){
      let secs = parseInt(sec);
      if(secs%60<10){    
        return '0'+parseInt(secs/60)+':0'+parseInt(secs%60)
      }else{      
        return '0'+parseInt(secs/60)+':'+parseInt(secs%60)
      }
    }
  },
  created() {
    console.log("play created");
    this.$bus.$on('playplay', (id)=>{
      this.playSong(id)
    })
  },
  activated() {
    console.log("play activated");
    
    this.$store.commit('navbarShowChange', false);
    this.$store.commit('changeinPlaying', false);
    this.$store.commit('changeRotate',0)
    
    if(this.$route.query.id&&this.$route.query.id!=this.id){
      this.id = this.$route.query.id;
      this.$bus.$emit('playplay', this.$route.query.id);
    }
  },
  deactivated() {
    console.log("play deactivated");
    this.$store.commit('navbarShowChange', true);
    this.$store.commit('changeinPlaying', true);
  },
  mounted() {
  },
  methods:{
    playSong(id) {
      this.$store.commit('changeId', id);
      this.isShow = true;

      getSongData(id).then(res=>{
        this.$store.commit('changeName', res.songs[0].name);
        this.$store.commit('changeSinger', res.songs[0].ar[0].name);
        this.$store.commit('changeImg', res.songs[0].al.picUrl);
      })
      
      getSong(id).then(res=>{
        this.$store.commit('changeUrl', res.data[0].url);
        this.$store.commit('changePlaying', true);
      })

      getLyric(id).then(res=>{
        this.lyrics = [];
        this.lyricIndex = [];
        let s_lyrics = [];
        let s_lyricIndex = [];
        if(res.nolyric){
          s_lyrics = [{time:0,lrc:'纯音乐，请欣赏'}];
          s_lyricIndex = [0]
        }else{
          let lyric = res.lrc.lyric;
          let lrcs = lyric.split('\n');
          let lrcReg = /\[\d*:\d*\.\d*]/g;
          for(let lrc of lrcs){
            if(lrc.match(lrcReg)){
              let lrcText = lrc.replace(lrc.match(lrcReg)[0],'')
              let lrcTimeMin = parseInt(lrc.match(lrcReg)[0].slice(1,3));
              let lrcTimeSec = parseFloat(lrc.match(lrcReg)[0].slice(4,8));
              let lyricTime = lrcTimeMin*60+lrcTimeSec;
              s_lyrics.push({
                'time': lyricTime,
                'lrc': lrcText
              });
              s_lyricIndex.push(lyricTime);
            }
          }
        }
        s_lyricIndex.push(100000);
        this.$store.commit('changeLyrics', s_lyrics);
        this.$store.commit('changeLyricIndex', s_lyricIndex);
      })
    },
    switchView() {
      this.isShow = !this.isShow;
    },
    switchPlay() {
      this.$store.commit('changePlaying',!this.$store.state.playing);
      this.$bus.$emit('switchPlay');
    },
    rangeChange() {
      this.$bus.$emit('updateCur',this.$refs.range.value);
    },
    goBack() {
      this.$router.go(-1)
    },
    switchSong(param,oldId) {
      let songs = this.$store.state.songList;
      let oldIndex = 0;
      for(let i=0;i<songs.length;i++){
        if(oldId==songs[i].id){
          oldIndex = i;
        }
      }
      let newIndex = 0;
      if(param=='previous') {
        newIndex = (oldIndex+songs.length-1)%songs.length;
      }else if(param=='next') {
        newIndex = (oldIndex+1)%songs.length;
      }

      if(oldId!=songs[newIndex].id) {
        this.$router.replace({ path: '/play', query: { id: parseInt(songs[newIndex].id) }});

        if(this.$route.query.id&&this.$route.query.id!=this.id){
          this.id = this.$route.query.id;
          this.playSong(this.$route.query.id);
        }
      }
    }
  },
  // beforeDestroy() {
  //   this.$refs.audio.removeEventListener('timeupdate', this.func_timeupdate)
  //   this.$refs.audio.removeEventListener('ended', this.switchPlay)
  // }
}
</script>

<style scoped>

  .left, .right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 49px;
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
  .needle {
    position: absolute;
    left: 50%;
    top: 8vh;
    z-index: 100;
    transition: .5s linear;
  }
  .needle img,
  .needle-active img {
    width: 30vw;
  }
  .playBox {
    width: 100vw;
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .discBox {
    position: relative;
    width: 90vw;
    height: 90vw;
    margin: 0 auto;
    border-radius: 50%;

    background-image: url(https://s3.music.126.net/mobile-new/img/disc_default.png?ba7c53e25dbac9fe14f024846ddb57d2=);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .discBox img {
    position: absolute;
    width: 70%;
    height: 70%;
    left: 15%;
    top: 15%;
    border-radius: 50%;
  }

  .lyricBox {
    position: relative;
    width: 100%;
    height: 80%;
    overflow-y: hidden;
    /* padding-top: 100px; */
  }
  .lyricCon {
    position: absolute;
    width: 100%;
    height: 80%;
    top: 10%;
  }
  .lyricItem {
    width: 100%;
    height: 40px;
    line-height: 20px;
    text-align: center;
  }
  .lyricP {
    font-size: 12px;
    color: #666;
  }
  .lyricActive {
    font-size: 18px;
    color: #ec5c55;
  }

  .controlBox {
    position: relative;
    width: 100vw;
    height: calc(100vh - 44px - 70vh);
  }
  .controlBox img {
    width: 24px;
    height: 24px;
  }
  .btnBox {
    width: 100%;
    height: 30%;
    display: flex;
  }
  .btnBox .btnItem {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .progressLine {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .progressLine .lineTime {
    width: 50px;
    text-align: center;
  }
  .progressLine progress,
  .progressLine input {
    /* width: 90vw; */
    flex: 1;
  }
  .ctrlBox {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ctrlBox div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ctrlBox .btnItem1 img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    padding: 4px;
  }
  .ctrlBox .btnItem2 img {
    width: 24px;
    height: 24px;
  }
</style>