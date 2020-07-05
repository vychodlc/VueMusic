<template>
  <div class="player">
      <div class="player-header">
          <div class="player-back" @click="returnIndex">
              <van-icon name="arrow-left" size="2rem"/>
          </div>
          <div class="player-brief">
              <div class="player-song">{{singerName}}</div>
              <div class="player-singer">{{songName}}</div>
          </div>
          <div class="player-zhuanfa">
              <van-icon name="weapp-nav" size="2rem"/>
          </div>
      </div>
      <div class="player-image">
          <div class="player-image-rotate" :class="{'running-rotate': playBtn!='play-circle-o'}">
            <img :src="songImg">
          </div>
      </div>
      <div class="player-lyrics">
          <p>{{songLyric}}</p>
      </div>
      <div class="player-icons">
          <div class="player-icon"><van-icon name="like-o"  size="2rem"/></div>
          <div class="player-icon"><van-icon name="upgrade" size="2rem" style="transform: rotate(180deg);"/></div>
          <div class="player-icon"><van-icon name="chat-o" size="2rem"/></div>
          <div class="player-icon"><van-icon name="ellipsis" size="2rem" style="transform: rotate(90deg);"/></div>
      </div>
      <div class="player-progress">
          <van-slider v-model="value" :min="0" :max="100" button-size='1rem' />
      </div>
      <div class="player-player">
          <audio 
          id="audioPlayer"
          :src="songUrl"
          autoplay>
          您的浏览器不支持 audio 标签。
          </audio>
          <div class="player-player-icon"><van-icon name="replay"  size="2rem"/></div>
          <div class="player-player-icon"><van-icon name="arrow-left" size="3rem"/></div>
          <div class="player-player-icon"><van-icon class="playBtn" :name="playBtn" size="6rem" ref="playBtn" @click="playSwitch"/></div>
          <div class="player-player-icon"><van-icon name="arrow" size="3rem"/></div>
          <div class="player-player-icon"><van-icon name="ascending" size="2rem"/></div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'player',
    data(){
        return{
            audioTime:0,//音频进度百分比
            audioCurrentTime:'00:00',//音频当前播放时间
            audioAllTime:'00:00',//音频总播放时间
            audioAllDuration:0,//音频总播放秒数
            isPlay:false,//是否正在播放

            playBtn: 'pause-circle-o',
            songId: '',
            songUrl: '',
            songName: '',
            singerName: '',
            songImg: '',
            songLyric: '和气吹绿野，梅雨洒芳田。<br />新流添旧涧，宿雾足朝烟。<br />雁湿行无次，花沾色更鲜。<br />对此欣登岁，披襟弄五弦。'
        }
    },
    created(){
        this.songId = this.$route.query.id
        this.songUrl = this.$route.query.url
        this.songName = this.$route.query.song
        this.singerName = this.$route.query.singer
        this.songImg = this.$route.query.song_img
        axios({
            url: "https://autumnfish.cn/lyric",
            method: 'get',
            params: {
                id: this.songId
            }
        }).then(res=>{
            // this.songLyric = res.data.lrc.lyric;
        });
    },
    mounted() {
        this.setAudioInterval();
    },
    methods:{
        // setAudioInterval(){
        //     audioInterval = setInterval(()=>{
        //         this.getAudioTime();
        //         let audioPlayer = document.getElementById('audioPlayer');
        //         if(audioPlayer.ended){
        //             //播放结束后重置数据
        //             clearInterval(audioInterval);
        //             this.audioTime=0;
        //             audioPlayer.currentTime = 0;
        //             this.audioCurrentTime='00:00';
        //             this.isPlay=false;
        //         }
        //     },500)
        // },
        returnIndex(){
            this.$router.replace('/');
        },
        playSwitch(e){
            var audioPlayer = document.querySelector('#audioPlayer');
            if(String(e.path[0].className).indexOf('pause')==-1){
                this.playBtn = 'pause-circle-o';
                audioPlayer.play();
            }else{
                this.playBtn = 'play-circle-o';
                audioPlayer.pause();
            }
        }
    }
}
</script>

<style>
.player{
    color: #7d7d7d;
    position: relative;
    background-color: #333;
    width: 100%;
    height: 100%;
}
.player-header{
    padding-top: 2vh;
    height: 10vh;
    display: flex;
    align-items: center;
}
.player-back, .player-zhuanfa{
    width: 10vw;
    text-align: center;
}
.player-brief{
    width: 80vw;
    text-align: center;
}
.player-song{
    font-size: 1.75rem;
}
@keyframes rotate {
    0%{
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        /* border: 16px solid #7d7d7d; */
    }
    25%{
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        /* border: 16px solid #222; */
    }
    50%{
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        /* border: 16px solid #7d7d7d; */
    }
    75%{
        transform: rotate(270deg);
        -webkit-transform: rotate(270deg);
        /* border: 16px solid #222; */
    }
    100%{
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        /* border: 16px solid #7d7d7d; */
    }
}
.player-image{
    width: 100vw;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.player-image img{
    width: 60vw;
    height: 60vw;
    border-radius: 50%;
}
.player-image-rotate{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80vw;
    height: 80vw;
    border-radius: 50%;
    background-color: red;
    background: url('../assets/imgs/黑胶唱片.png');
    background-size:100% 100%;  
    animation: rotate infinite linear 5s;
    -webkit-animation: rotate infinite linear 5s;
    -moz-animation: rotate infinite linear 5s;
    animation-play-state:paused;
    -webkit-animation-play-state:paused;
}
.running-rotate{
    animation-play-state:running;
    -webkit-animation-play-state:running;
}
.player-lyrics{
    width: 100vw;
    height: 30vh;
    background-color: blue;
}
.player-icons{
    width: 100vw;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.player-icon{
    flex: 1;
    text-align: center;
}
.player-progress{
    width: 80vw;
    height: 1vh;
    margin: 0 auto;
    transform: translateY(-100%);
}
.player-player{
    width: 100vw;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-10%);
}
.player-player-icon{
    flex: 1;
    text-align: center;
}
</style>