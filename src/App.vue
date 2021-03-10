<template>
  <div id="app">
    <audio
      id="audio"
      ref="playaudio"
      autoplay
      :src="$store.state.audio.url">
    </audio>
 
    <keep-alive><router-view></router-view></keep-alive>
    
    <div style="z-index:100;position:fixed;bottom:0" v-show="(!$store.state.navbarShow)&&($store.state.inplayView)&&($store.state.audio.id!=0)"><play-box></play-box></div>
    <div style="z-index:100;position:fixed;bottom:49px" v-show="$store.state.navbarShow&&($store.state.audio.id!=0)"><play-box></play-box></div>
    <div v-show="$store.state.navbarShow"><main-tab-bar></main-tab-bar></div>

    <div><nowlist></nowlist></div>

    <div class="message" v-show="$store.state.message.show">{{$store.state.message.text}}</div>
    <!-- <div class="message">正在加载在加载在加载在加载在加载在加载中</div> -->

  </div>
</template>

<script>
import PlayBox from './components/common/playbox/PlayBox';
import MainTabBar from './components/common/tabbar/MainTabBar';
import Nowlist from './views/play/Nowlist.vue';

export default {  
  name: 'App',
  components: {MainTabBar,PlayBox,Nowlist},
  mounted() {
    
    document.addEventListener('touchstart', ()=> {
      if(this.$store.state.autoplay==true) {
        this.$refs.playaudio.play();
        this.$store.commit('changeAutoplay');
      }
    })

    this.addEventHandle();
    this.$bus.$on('switchPlay', ()=>{
      if(this.$refs.playaudio){
        if(this.$store.state.playing==false){
          this.$refs.playaudio.pause();
        }else{
          this.$refs.playaudio.play();
        }
      }
    })
    this.$bus.$on('updateCur', (cur)=>{
      if(this.$refs.playaudio.currentTime) {
        this.$refs.playaudio.currentTime = parseInt(cur);
        this.$store.commit('changePlaying', true);
        this.$refs.playaudio.play();
      }
    })
    this.$bus.$on('message', (text)=>{
      this.$store.commit('showMsg', text);
    })
  },
  methods: {
    addEventHandle() {
      this.$refs.playaudio.addEventListener('timeupdate', this.func_timeupdate)
      this.$refs.playaudio.addEventListener('ended', this.song_over)
    },
    func_timeupdate() {
      let cur = this.$refs.playaudio.currentTime;
      let dur = this.$refs.playaudio.duration;
      this.$store.commit('changeCurrentTime', cur);
      this.$store.commit('changeDurationTime', dur);

      this.$store.commit('changeCurrentIndex',this.getIndex(cur));

      this.$store.commit('changeRotate',1);
    },
    song_over() {
      this.$store.commit('changePlaying', false);
      
      let oldId = this.$store.state.audio.id;
      let songs = this.$store.state.songList;
      let oldIndex = 0;
      for(let i=0;i<songs.length;i++){
        if(oldId==songs[i].id){
          oldIndex = i;
        }
      }
      let newIndex = (oldIndex+1)%songs.length;
      if(songs[newIndex].id!=oldId) {
        if(this.$route.path.indexOf("play") != -1) {
          this.$router.replace({ path: '/play', query: { id: parseInt(songs[newIndex].id) }});
        }
        this.$bus.$emit('playplay', songs[newIndex].id);
      }else {
        console.log(songs[newIndex].id);
        this.$bus.$emit('playplay', songs[newIndex].id);
        this.$refs.playaudio.play();
      }
    },
    getIndex(cur) {
      let lyrics = this.$store.state.lyrics;
      let lrcLen = lyrics.length;
      for(let i=0;i<lrcLen-1;i++) {
        if(lyrics[i].time<cur&&cur<lyrics[i+1].time){
          return i
        }
      }
    },

  }
}
</script>

<style scoped>
  @import "assets/css/base.css";
  .message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /* width: 20vw; */
    /* height: 4vh; */
    padding: 10px;
    background-color: #555;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2vh;
  }
</style>