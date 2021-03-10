<template>
  <div class="comment">
      <div class="header">
          <div class="back" @click="$router.go(-1)"><img src="~assets/img/common/left.png" alt=""></div>
          <div class="title">评论({{totalNum}})</div>
          <div class="share"><img src="~assets/img/common/share.png" alt=""></div>
      </div>
      <div class="cmItems">
          <div class="cmItem" v-for="(item,index) in comments" :key="index">
              <div class="avatar"><img :src="item.user.avatarUrl" alt=""></div>
              <div class="content">
                  <div class="info">
                      <div class="infoLeft">
                        <div class="nickname">{{item.user.nickname}}</div>
                        <div class="time">{{item.time | timeFormat }}</div>
                      </div>
                      <!-- <div class="infoRight">
                          <span class="hotNum">{{item.likedCount}}</span>
                          <img src="" alt="">
                      </div> -->
                  </div>
                  <div class="text">{{item.content}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { getMusicComment } from 'network/comment.js'

export default {
  name: 'Comment',
  components: {},
  data() {
    return {
        totalNum: null,
        comments: []
    };
  },
  computed: {},
  watch: {},
  methods: {
  },
  created() {
  },
  mounted() {
  },
  activated() {
    console.log("comment activated");
    this.$store.commit('navbarShowChange', false);
    this.$store.commit('changeinPlaying', false);

    // console.log(this.$route.query);
    getMusicComment(this.$route.query.id,50).then(res=>{
        this.totalNum = res.total;
        this.comments = res.comments;
    })
  },
  deactivated() {
    console.log("comment deactivated");
    this.$store.commit('navbarShowChange', true);
    this.$store.commit('changeinPlaying', true);
  },
  filters: {
      timeFormat : (val) => {
          let time = new Date(parseInt(val));
          return time.toLocaleString()
      }
  }
}
</script>

<style lang='css' scoped>
.comment {
    padding-top: 40px;
}
.header {
    width: 100vw;
    height: 40px;
    display: flex;
    position: fixed;
    top: 0;
    background-color: #efefef;
}
.back, .share {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.header img {
    height: 20px;
    width: 20px;
}
.title {
    flex: 1;
    color: #000;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cmItems {
    margin-top: 3vh;
}
.cmItem {
    width: 100vw;
    display: flex;
    margin-top: 10px;
}
.cmItem .avatar {
    width: 50px;
    display: flex;
    justify-content: center;
}
.cmItem .avatar img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.cmItem .content {
    flex: 1;
    /* border: 1px solid #000; */
    display: flex;
    flex-direction: column;
}
.content .info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.content .info,
.content .text,
.info .infoLeft,
.info .infoRight {
    flex: 1;
}
.info .infoRight {
    text-align: right;
    padding-right: 10px;
}
.infoLeft .nickname {
    color: #666;
    font-size: 12px;
}
.infoLeft .time {
    color: #aaa;
    font-size: 12px;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.70);
}
.content .text {
    margin-top: 5px;
    color: #000;
    margin-right: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    line-height: 1.8;
}

</style>