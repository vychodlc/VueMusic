<template>
  <div class="player">
    <!-- <van-swipe style="height: 300px;" vertical :height="30" :autoplay="300">
      <van-swipe-item v-for="(lyric,index) in songLyric" :key="index">{{lyric}}</van-swipe-item>
    </van-swipe>-->
    <!-- <div class="swiper-container swiper-lyrics">
      <div class="swiper-wrapper">
        <div class="swiper-slide slide" v-for="(lyric,index) in songLyric" :key="index">{{lyric}}</div>
      </div>
      <div class="swiper-pagination"></div>
    </div>-->

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
      <p v-for="(lyric,index) in songLyric" :key="index">{{lyric}}</p>
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
      <van-slider v-model="value" :min="0" :max="100" button-size="1rem" @change="audioControl" />
    </div>
    <div class="player-player">
      <audio id="audioPlayer" :src="songUrl" autoplay>您的浏览器不支持 audio 标签。</audio>
      <div class="player-player-icon">
        <van-icon name="replay" size="2rem" />
      </div>
      <div class="player-player-icon">
        <van-icon name="arrow-left" size="3rem" />
      </div>
      <div class="player-player-icon">
        <van-icon class="playBtn" :name="playBtn" size="6rem" ref="playBtn" @click="playSwitch" />
      </div>
      <div class="player-player-icon" @click="nextSong">
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
      audioTime: 0, //音频进度百分比
      audioCurrentTime: "00:00", //音频当前播放时间
      audioAllTime: "00:00", //音频总播放时间
      audioAllDuration: 0, //音频总播放秒数
      isPlay: false, //是否正在播放

      playBtn: "pause-circle-o",
      songId: "",
      songUrl: "",
      songName: "",
      singerName: "",
      songImg: "",
      songLyricTest: [
        "12asdasdsad3",
        "31asdasdasd2",
        "2333asdasd3",
        "asdasdasd"
      ],
      songLyric: [
        "[00:00.000] 作曲 : 火星电台",
        "[00:01.000] 作词 : 火星电台",
        "[00:04.021]编曲 Arrangement：火星电台 Radio Mars",
        "[00:04.305]Goodbye 偷信的人并不坏",
        "[00:13.470]Goodbye 被爱的背对着爱 回来",
        "[00:28.389]我们从小聪明 我们从大道理 先出来",
        "[00:39.921]我们把老实的 我们把天才的 一一膜拜",
        "[00:52.054]一一",
        "[00:58.088]我们把小聪明 我们把大道理 先放开",
        "[01:10.138]我们把找到的 我们把丢掉的 一 一 爱",
        "[01:22.142]一 一 宠爱",
        "[02:25.081]我们把小聪明 我们把大道理 先放开",
        "[02:36.254]我们把找到的 我们把丢掉的 一 一 爱",
        "[02:49.073]一 一 宠爱",
        "[03:00.755]Goodbye 作秀的人 谁青睐 Hmm...",
        "[03:12.670]Oh Bye 做错的如果能再重来",
        "[03:25.089]我们从老实的 我们从天才的 先出来",
        "[03:37.022]我们把小聪明 我们把大道理 一 一用坏",
        "[03:49.437]一 一",
        "[03:56.488]制作人 Producer：火星电台 Radio Mars",
        "[03:56.690]木吉他 Acoustic Guitar：曾宇 Yu Zeng",
        "[03:56.870]贝斯 Bass：韩阳 Yang Han",
        "[03:57.088]鼓 Drum：贝贝 (武勇恒) Yongheng Wu",
        "[03:57.304]小号 Trumpet：李晓川 Xiaochuan Li",
        "[03:57.488]和声编写 Backing Vocals Arrangement：田馥甄 Hebe Tien、黄少峰 Shaofeng Huang",
        "[03:57.687]和声 Backing Vocal：田馥甄 Hebe Tien",
        "[03:57.872]录音师 Recording Engineers：黄钦胜 Adam Huang、阿烈 Alex",
        "[03:58.074]录音室 Recording Studios：强力录音室Mega Force Studio、MDD Studio北京、上海升赫录音棚 Soundhub Studios",
        "[03:58.255]混音师 Mixing Engineer：黄钦胜 Adam Huang",
        "[03:58.405]混音室 Mixing Studio：强力录音室 Mega Force Studio",
        "[03:58.620]母带后期处理工程师 Mastering Engineer：内田孝弘 UCHIDA TAKAHIRO",
        "[03:58.805]母带后期录音室 Mastering Studio：FLAIR MASTERING WORKS",
        "[03:58.988]OP：北京飞行者音乐科技有限公司",
        "[03:59.188]SP：北京飞行者音乐科技有限公司",
        "[04:00.704]TW-EW7-20-01006"
      ],
      arrItem: [
        {
          name: "swiperSlide5",
          imgUrl: "http://pic.58pic.com/58pic/13/60/16/64b58PICXEK_1024.jpg"
        },
        {
          name: "swiperSlide1",
          imgUrl: "http://image.qmango.com/hotelimg/dl1210/109490/109.jpeg"
        },
        {
          name: "swiperSlide51",
          imgUrl: "http://image.qmango.com/hotelimg/dl1210/125708/181.jpeg"
        },
        {
          name: "swiperSlide1111115",
          imgUrl: "http://image.qmango.com/hotelimg/dl1210/119297/793.jpeg"
        }
      ]
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
      // this.songLyric = this.lyricFormat(res.data);
    });
  },
  mounted() {
    new Swiper(".swiper-container", {
      autoplay: true,
      direction: "vertical",
      speed: 100
    });
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
      }, 500);
    },
    audioControl(val) {
      const audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.currentTime = val / 100 * audioPlayer.duration;
    },
    nextSong() {
      this.value = 0;
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
      }
    },
    lyricFormat(lyrics) {
      console.log(lyrics);
    }
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
  background-color: blue;
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
  width: 80vw;
  height: 1vh;
  margin: 0 auto;
  transform: translateY(-100%);
}
.player-player {
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-10%);
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