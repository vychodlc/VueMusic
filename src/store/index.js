import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    autoplay: true,
    navbarShow: true,
    audio: {
      'id': 0,
      'name': '',
      'singer': '',
      'img': 'https://s3.music.126.net/mobile-new/img/disc_default.png?ba7c53e25dbac9fe14f024846ddb57d2=',
      'location': '',
      'album': '',
      'url': 'https://api.bupt404.cn/music/blank.m4a'
      // 'url': '@assets/music.mp3'
    },
    message: {text: '', show: false},
    userInfo: {},
    userDetail: {},
    lyrics: ['正在加载中'],
    lyricIndex: [],
    currentIndex: 0,
    playing: false,
    // loading: false,
    // showDetail: false,
    inplayView: false,
    songList: [],
    currentTime: 0,
    // tmpCurrentTime: 0,
    durationTime: 0,
    // bufferedTime: 0,
    imgRotate: 'rotate(300deg)',
    isNowlist: false,
    logs: [
      {time: '2021/3/9 22点10分',log: '个人界面歌单完成'},
      {time: '2021/3/8 23点48分',log: '登陆界面及页面跳转完成'},
      {time: '2021/3/7 17点28分',log: '手机自动播放完成'},
      {time: '2021/3/7 14点39分',log: '歌曲评论完成'},
      {time: '2021/3/6 23点56分',log: '歌曲切换完成'},
      {time: '2021/2/20 21点52分',log: '进度条拖动控制完毕'},
      {time: '2021/2/19 17点32分',log: '播放指针完毕'},
      {time: '2021/2/06 18点50分',log: '全局播放界面完毕'},
      {time: '2021/2/06 00点56分',log: '个人页布局完毕'},
      {time: '2021/2/05 16点38分',log: '搜索详情页完毕'},
      {time: '2021/2/03 21点27分',log: '搜索页完毕'},
      {time: '2021/2/03 00点12分',log: '全局播放完毕'},
      {time: '2021/2/02 14点04分',log: '播放页完毕'},
      {time: '2021/2/02 01点58分',log: 'api服务器完毕'},
      {time: '2021/2/01 19点25分',log: '歌单页完毕'},
      {time: '2021/1/31 23点18分',log: '首页布局完毕'},
      {time: '2021/1/31 00点00分',log: '项目启动'},
    ]
  },
  mutations: {
    navbarShowChange(state, bool) {state.navbarShow = bool},
    nowlistShowChange(state, bool) {state.isNowlist = bool},
    
    changeAutoplay(state){state.autoplay = false},
    changeUrl(state,url){state.audio.url = url},
    changeId(state,id){state.audio.id = id},
    changeName(state,name){state.audio.name = name},
    changeSinger(state,singer){state.audio.singer = singer},
    changeImg(state,img){state.audio.img = img},

    changeLyrics(state,lyrics){state.lyrics = lyrics;},
    changeLyricIndex(state,lyricIndex){state.lyricIndex = lyricIndex},
    changePlaying(state,bool){state.playing = bool},
    changeinPlaying(state,bool){state.inplayView = bool},
    changeCurrentTime(state,currentTime){state.currentTime = currentTime},
    changeDurationTime(state,durationTime){state.durationTime = durationTime},
    changeCurrentIndex(state,currentIndex){state.currentIndex = currentIndex},

    changeRotate(state,tag){
      if(tag!=0){
        let reg = /[0-9]+/g;
        let rotate = parseInt(state.imgRotate.match(reg)[0]);
        rotate += 5;
        state.imgRotate = 'rotate('+ rotate + 'deg)';
      }else{
        state.imgRotate = 'rotate('+ 0 + 'deg)';
      }
    },

    getRotateVal(state) {
      return 'rotate(300deg)'
    },

    addSong(state,song) {
      let isHave = false;
      let name = '';
      let singer = '';
      let id = 0;
      if(song.ar) {
        name=song.name;singer=song.ar[0].name;id=song.id
      }else if(song.artists) { 
        name=song.name;singer=song.artists[0].name;id=song.id
      }else if(song.uiElement) {
        name=song.uiElement.mainTitle.title;
        singer=song.resourceExtInfo.artists[0].name;
        id=song.resourceExtInfo.songData.id       
      }else if(song.song) {
        name=song.song.name;
        singer=song.song.ar[0].name;
        id=song.song.id  
      }else {
        name=song.songs.name;
        singer=song.songs.ar[0].name;
        id=song.songs.id 
      }
      for(let i=0;i<state.songList.length;i++) {if(state.songList[i].id==id) {isHave = true;}}
      if(!isHave) {state.songList.push({name,singer,id})}
    },
    rmSong(state,id) {
      let index = null;
      for(let i=0;i<state.songList.length;i++) {if(state.songList[i].id==id) { index = i;}}
      if(index!=null)state.songList.splice(index,1)
    },
    setUserInfo(state, info) {
      localStorage.setItem('userInfo', JSON.stringify(info));
      state.userInfo = info;
    },
    setUserDetail(state, detail) {
      state.userDetail = detail;
    },
    showMsg(state, text) {
      state.message.text = text;
      state.message.show = true;
      let showmessage = setTimeout(function() {
        state.message.show = false;
      }, 800)
      

      // if(state.message.show==false) {
      //   state.message.show = true;
      //   let showmessage = setTimeout(function() {
      //     state.message.show = false;
      //   }, 2000)
      //   window.clearTimeout(showmessage);
      // }
    }
  },
  actions: {
  },
  modules: {
  }
})
