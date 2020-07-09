<template>
  <div class="player">
    <div class="player-header">
      <div class="player-back" @click="returnIndex">
        <van-icon name="arrow-left" size="2rem" />
      </div>
      <div class="player-brief">
        <div class="player-song">{{singerName}}</div>
        <div class="player-singer">{{songName}}</div>
      </div>
      <div class="player-zhuanfa">
        <van-icon name="weapp-nav" size="2rem" />
      </div>
    </div>
    <div class="player-image">
      <div class="player-image-rotate" :class="{'running-rotate': playBtn!='play-circle-o'}">
        <img :src="songImg" />
      </div>
    </div>
    <div class="player-lyrics">
      <van-swipe
        style="height: 30vh;"
        vertical
        :height="25"
        ref="lyricSwiper"
      >
        <van-swipe-item v-for="(lyric,index) in songLyric" :key="index" showIndicators = false>
          <p>{{lyric.text}}</p>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="player-icons">
      <div class="player-icon">
        <van-icon name="like-o" size="2rem" />
      </div>
      <div class="player-icon">
        <van-icon name="upgrade" size="2rem" style="transform: rotate(180deg);" />
      </div>
      <div class="player-icon">
        <van-icon name="chat-o" size="2rem" />
      </div>
      <div class="player-icon">
        <van-icon name="ellipsis" size="2rem" style="transform: rotate(90deg);" />
      </div>
    </div>
    <div class="player-progress">
      <div class="player-progress-item">{{audioCurrentTime|timeFormat}}</div>
      <div class="player-progress-item-slider">
        <van-slider v-model="value" :min="0" :max="100" button-size="1rem" @change="audioControl" />
      </div>
      <div class="player-progress-item">{{audioAllTime|timeFormat}}</div>
    </div>
    <div class="player-player">
      <audio id="audioPlayer" :src="songUrl" autoplay>您的浏览器不支持 audio 标签。</audio>
      <!-- <audio id="audioPlayer" src="../assets/nishuo.mp3" autoplay>您的浏览器不支持 audio 标签。</audio> -->
      <div class="player-player-icon">
        <van-icon name="replay" size="2rem" />
      </div>
      <div class="player-player-icon">
        <van-icon name="arrow-left" size="3rem" />
      </div>
      <div class="player-player-icon">
        <van-icon class="playBtn" :name="playBtn" size="6rem" ref="playBtn" @click="playSwitch" />
      </div>
      <div class="player-player-icon">
        <van-icon name="arrow" size="3rem" />
      </div>
      <div class="player-player-icon">
        <van-icon name="ascending" size="2rem" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  name: "player",
  data() {
    return {
      value: 0,
      audioCurrentTime: "00:00",
      audioAllTime: "00:00",
      currentLyricIndex: 0,

      playBtn: "pause-circle-o",
      songId: "",
      songUrl: "",
      songName: "",
      singerName: "",
      songImg: "",
      songLyric: []
    };
  },
  created() {
    this.songId = this.$route.query.id;
    this.songUrl = this.$route.query.url;
    this.songName = this.$route.query.song;
    this.singerName = this.$route.query.singer;
    this.songImg = this.$route.query.song_img;
    axios({
      url: "https://api.itooi.cn/netease/lrc",
      method: "get",
      params: {
        id: this.songId
      }
    }).then(res => {
      this.songLyric = this.lyricFormat(res.data);
    });
  },
  mounted() {
    this.setAudioInterval();
  },
  methods: {
    setAudioInterval() {
      const audioPlayer = document.getElementById("audioPlayer");
      var audioInterval = setInterval(() => {
        if (audioPlayer.ended) {
          clearInterval(audioInterval);
          this.playBtn = "play-circle-o";
          audioPlayer.pause();
          this.value = 0;
          audioPlayer.currentTime = 0;
          console.log("当前歌曲播放完毕", audioPlayer.currentTime);
        }
        this.value = audioPlayer.currentTime / audioPlayer.duration * 100;
        this.audioCurrentTime =
          String(parseInt(audioPlayer.currentTime / 60)) +
          ":" +
          String(parseInt(audioPlayer.currentTime % 60));
        this.audioAllTime =
          String(parseInt(audioPlayer.duration / 60)) +
          ":" +
          String(parseInt(audioPlayer.duration % 60));
          
        // for(let i=0;i<this.songLyric.length-1;i++){
        //   // console.log(this.songLyric[i].time)
        //   var currentLyric = this.songLyric[i].time;
        //   var nextLyric = this.songLyric[i+1].time;
        //   let durationLyric = audioPlayer.duration;
        //   if((currentLyric<=durationLyric)&&(nextLyric>=durationLyric)){
        //     this.$refs.lyricSwiper.swipeTo(i);
        //   // console.log(currentLyric,nextLyric)
        //   }
        // }
        this.$refs.lyricSwiper.swipeTo(this.currentLyricIndex++);
        this.currentLyricIndex++;
      }, 500);
    },
    audioControl(val) {
      const audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.currentTime = val / 100 * audioPlayer.duration;
    },
    returnIndex() {
      this.$router.replace("/");
    },
    playSwitch(e) {
      const audioPlayer = document.getElementById("audioPlayer");
      if (audioPlayer.currentTime == 0) {
        this.setAudioInterval();
      }
      if (String(e.path[0].className).indexOf("pause") == -1) {
        this.playBtn = "pause-circle-o";
        audioPlayer.play();
      } else {
        this.playBtn = "play-circle-o";
        audioPlayer.pause();
      };
    },
    lyricFormat(lrc) {
      let lyrics = lrc.split("\n");
      let lrcObj = [];
      for (let i = 0; i < lyrics.length; i++) {
        let lyric = decodeURIComponent(lyrics[i]);
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        let timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        let clause = lyric.replace(timeReg, '');
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
            let t = timeRegExpArr[k];
            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            let time = min * 60 + sec;
            if (clause !== '') {
                lrcObj.push({time: time, text: clause})
            }
        }
      }
      return lrcObj;
    }
  },
  filters: {
    lyricSlice: function(value) {
      if (!value) return "";
      return value.slice(11, 1000);
    },
    timeFormat: function(value) {
      if (!value) return "";
      if (value.length==3){
        return '0' + value.slice(0,1) + ":0" + value.slice(2,3)
      }else{
        return '0' + value
      }
      return "0" + value;
    },
  }
};
</script>

<style>
.player {
  color: #7d7d7d;
  position: relative;
  background-color: #333;
  width: 100%;
  height: 100%;
}
.player-header {
  padding-top: 2vh;
  height: 10vh;
  display: flex;
  align-items: center;
}
.player-back,
.player-zhuanfa {
  width: 10vw;
  text-align: center;
}
.player-brief {
  width: 80vw;
  text-align: center;
}
.player-song {
  font-size: 1.75rem;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    /* border: 16px solid #7d7d7d; */
  }
  25% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    /* border: 16px solid #222; */
  }
  50% {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    /* border: 16px solid #7d7d7d; */
  }
  75% {
    transform: rotate(270deg);
    -webkit-transform: rotate(270deg);
    /* border: 16px solid #222; */
  }
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    /* border: 16px solid #7d7d7d; */
  }
}
.player-image {
  width: 100vw;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.player-image img {
  width: 60vw;
  height: 60vw;
  border-radius: 50%;
}
.player-image-rotate {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vw;
  height: 80vw;
  border-radius: 50%;
  background-color: red;
  background: url("../assets/imgs/黑胶唱片.png");
  background-size: 100% 100%;
  animation: rotate infinite linear 5s;
  -webkit-animation: rotate infinite linear 5s;
  -moz-animation: rotate infinite linear 5s;
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}
.running-rotate {
  animation-play-state: running;
  -webkit-animation-play-state: running;
}
.player-lyrics {
  width: 100vw;
  height: 30vh;
  color: #ddd;
}
.player-lyrics p {
  text-align: center;
}
.player-icons {
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.player-icon {
  flex: 1;
  text-align: center;
}
.player-progress {
  width: 100vw;
  height: 1vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateY(-100%);
}
.player-progress-item {
  flex: 1;
  text-align: center;
}
.player-progress-item-slider {
  flex: 5;
}
.player-player {
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-5%);
}
.player-player-icon {
  flex: 1;
  text-align: center;
}
.swiper-lyrics {
  height: 30vh;
  border: 1px solid white;
}
.slide {
  height: 2vh;
}
</style>