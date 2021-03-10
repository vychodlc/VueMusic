<template>
  <div style="padding-bottom: 99px">
    <div class="menu"><img src="~assets/img/home/menu.png" alt=""></div>
    <div class="head">
      <div class="headImg"><img :src="$store.state.userInfo.profile.avatarUrl" alt=""></div>
      <div class="userInfo">
        <div class="name">{{$store.state.userInfo.profile.nickname}}</div>
        <span class="level">Lv.{{$store.state.userDetail.level}}</span>
      </div>
      <div class="moreInfo"><img src="~assets/img/home/right.png" alt=""></div>
    </div>
    <div class="btns">
      <div class="btn">
        <div class="btnImg"><img src="~assets/img/home/team.png" alt=""></div>
        <div class="btnText"><p>本地/下载</p></div>
      </div>
      <div class="btn">
        <div class="btnImg"><img src="~assets/img/home/team.png" alt=""></div>
        <div class="btnText"><p>本地/下载</p></div>
      </div>
      <div class="btn">
        <div class="btnImg"><img src="~assets/img/home/team.png" alt=""></div>
        <div class="btnText"><p>本地/下载</p></div>
      </div>
      <div class="btn">
        <div class="btnImg"><img src="~assets/img/home/team.png" alt=""></div>
        <div class="btnText"><p>本地/下载</p></div>
      </div>
      <div class="btn">
        <div class="btnImg"><img src="~assets/img/home/team.png" alt=""></div>
        <div class="btnText"><p>本地/下载</p></div>
      </div>
      <div class="btn">
        <div class="btnImg"><img src="~assets/img/home/team.png" alt=""></div>
        <div class="btnText"><p>本地/下载</p></div>
      </div>
      <div class="btn">
        <div class="btnImg"><img src="~assets/img/home/team.png" alt=""></div>
        <div class="btnText"><p>本地/下载</p></div>
      </div>
      <div class="btn">
        <div class="btnImg"><img src="~assets/img/home/team.png" alt=""></div>
        <div class="btnText"><p>本地/下载</p></div>
      </div>
    </div>
    <div class="myLike" @click="goPList(playlist1.id)">
      <div class="myLikeImg"><img :src="playlist1.coverImgUrl" alt=""></div>
      <div class="myLikeInfo">
        <div class="text"><span>我喜欢的音乐</span></div>
        <div class="amount"><span>{{playlist1.trackCount}}首</span></div>
      </div>
      <div class="heartModel">
        <img src="~assets/img/common/heart.png" alt="">
        <span>心动模式</span>
      </div>
    </div>
    <div class="playLists">
      <div class="playlistTabs">
        <div class="tab" @click="playlistIndex=0"><span :class="{tabActive: playlistIndex==0}">创建歌单</span></div>
        <div class="tab" @click="playlistIndex=1"><span :class="{tabActive: playlistIndex==1}">收藏歌单</span></div>
        <div class="tab" @click="playlistIndex=2"><span :class="{tabActive: playlistIndex==2}">歌单助手</span></div>
      </div>
      <div class="playList" v-show="playlistIndex==0">
        <div class="listHead">
          <div class="title">创建歌单(6个)</div>
          <div><img src="~assets/img/common/plus.png" alt=""></div>
          <div><img src="~assets/img/home/ellipsis.png" alt=""></div>
        </div>
        <div class="listItem" v-for="(item,index) in playlist2" :key="index" @click="goPList(item.id)">
          <div class="myLikeImg"><img :src="item.coverImgUrl" alt=""></div>
          <div class="myLikeInfo">
            <div class="text"><span>{{item.name}}</span></div>
            <div class="amount"><span>{{item.trackCount}}首</span></div>
          </div>
        </div>
      </div>
      <div class="playList" v-show="playlistIndex==1">
        <div class="listHead">
          <div class="title">收藏歌单(6个)</div>
          <div><img src="~assets/img/common/plus.png" alt=""></div>
          <div><img src="~assets/img/home/ellipsis.png" alt=""></div>
        </div>
        <div class="listItem" v-for="(item,index) in playlist3" :key="index" @click="goPList(item.id)">
          <div class="myLikeImg"><img :src="item.coverImgUrl" alt=""></div>
          <div class="myLikeInfo">
            <div class="text"><span>{{item.name}}</span></div>
            <div class="amount"><span>{{item.trackCount}}首</span></div>
          </div>
        </div>
      </div>
      <div class="playList" v-show="playlistIndex==2">
        <div class="listHead">
          <div class="title">歌单助手(6个)</div>
          <div><img src="~assets/img/common/plus.png" alt=""></div>
          <div><img src="~assets/img/home/ellipsis.png" alt=""></div>
        </div>
        <div class="listItem" @click="goPList(playlist1.id)">
          <div class="myLikeImg"><img :src="playlist1.coverImgUrl" alt=""></div>
          <div class="myLikeInfo">
            <div class="text"><span>{{playlist1.name}}</span></div>
            <div class="amount"><span>{{playlist1.trackCount}}首</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAccount, getUserDetail, getUserPlaylist } from 'network/profile.js'

export default {
  name: 'Profile',
  data() {
    return {
      playlistIndex: 0,
      playlist1: [],
      playlist2: [],
      playlist3: []
    }
  },
  methods: {
    goPList(id) {
      this.$router.push({ path: '/playlist', query: { id: parseInt(id) }});
    }
  },
  mounted() {
    getAccount().then(res => {
      console.log(res);
    })
    getUserDetail(this.$store.state.userInfo.account.id).then(res => {
      this.$store.commit('setUserDetail', res);
    })
    getUserPlaylist(this.$store.state.userInfo.account.id).then(res => {
      let plist = res.playlist;
      for(let i=0;i<plist.length;i++) {
        if(plist[i].name == this.$store.state.userInfo.profile.nickname+'喜欢的音乐') {
          this.playlist1 = plist[i];
        }else if(plist[i].userId == this.$store.state.userInfo.account.id) {
          this.playlist2.push(plist[i]);
        }else{
          this.playlist3.push(plist[i]);
        }
      }
    })
  },
  activated() {
    this.$store.commit('navbarShowChange', true);
    this.$store.commit('changeinPlaying', true);
  },
  deactivated() {
    this.$store.commit('navbarShowChange', false);
    this.$store.commit('changeinPlaying', false);
  },
}
</script>

<style scope>
  img {
    border-radius: 10px;
  }
  .menu {
    margin-top: 1vh;
    margin-left: 3vw;
    width: 50px;
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu img {
    width: 25px;
    height: 25px;
  }
  .head {
    width: 100%;
    height: 15vh;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    position: relative;
  }
  .head .headImg {
    width: 70px;
    height: 70px;
  }
  .head .headImg img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
  .head .userInfo {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    flex: 1;
  }
  .head .userInfo .name {
    font-size: 20px;
    color: #000;
    font-weight: bold;
  }
  .head .userInfo .level {
    color: #000;
    width: 10vw;
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    background-color: #fff;
    border-radius: 10px;
    padding: 2px 0;
  }
  .moreInfo img {
    width: 20px;
    height: 20px;
  }

  .btns {
    width: 90vw;
    height: 25vh;
    margin-left: 5vw;
    padding: 10px 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    border-radius: 10px;
    background-color: #fff;
  }
  .btn {
    flex: 1;
    display: flex;
    background-color: #fff;
    color: #000;
    flex-direction: column;
    align-items: center;
    /* margin-bottom: 3vh; */
  }
  .btnImg {
    width: 16vw;
    display: flex;
    justify-content: center;
  }
  .btnImg img {
    width: 40px;
    height: 40px;
  }
  .btnText p {
    margin-top: 5px;
    text-align: center;
  }

  .myLike {
    margin-top: 2vh;
    width: 90vw;
    margin-left: 5vw;
    padding: 15px;
    display: flex;
    align-items: center;

    border-radius: 10px;
    background-color: #fff;
  }
  .myLikeImg {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
  .myLikeImg img {
    width: 50px;
    height: 50px;
  }
  .myLikeInfo,
  .listItemInfo {
    flex: 1;
    margin-left: 4vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .myLikeInfo .text {
    margin-bottom: 5px;
  }
  .myLikeInfo .text span {
    font-size: 16px;
    color: #000;
  }
  .myLikeInfo .amount span {
    font-size: 12px;
    color: #999;
  }
  .heartModel {
    padding: 2px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #999;
    border-radius: 20px;

    transform: scale(0.8);
  }
  .heartModel img {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }
  
  .playlistTabs {
    margin-top: 2vh;
    margin-left: 5vw;
    width: 90vw;
    margin: 3vh auto;

    display: flex;
    justify-content: center;
  }
  .playlistTabs .tab {
    flex: 1;
    text-align: center;
  }
  .playlistTabs .tab span {
    font-size: 16px;
  }
  .tabActive {
    color: #000;
    font-weight: bold;
    border-bottom: 5px solid #f00;
  }
  
  .playList {
    margin-top: 2vh;
    margin-left: 5vw;
    width: 90vw;
    padding: 15px;
    align-items: center;

    border-radius: 10px;
    background-color: #fff;
  }
  .playList .listHead {
    display: flex;
    align-items: center;
  }
  .playList .listHead .title {
    flex: 1;
  }
  .playList .listHead img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
  .playList .listItem {
    margin-top: 2vh;
    display: flex;
    align-items: center;
  }
</style>