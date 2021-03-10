<template>
  <div>
    <div class="back" @click="$router.go(-1)"><img src="~assets/img/common/left.png" alt=""></div>
    <div class="title">项目日志记录</div>
    <div class="logs">
      <div class="log" v-for="(item,index) in $store.state.logs" :key="index">
        <div class="time">{{item.time}}</div>
        <div class="text">{{item.log}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogView",
  data () {
    return {
    }
  },
  activated() {
  },
  methods:{
  }
}
</script>

<style scoped>
  .back {
    margin-top: 1vh;
    width: 50px;
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .back img {
    width: 25px;
    height: 25px;
  }
  .title {
    font-size: 20px;
    font-weight: bolder;
    height: 49px;
    line-height: 49px;
    text-align: center;
    color: #000;
    position: absolute;
    top: 1vh;
    left: 50%;
    transform: translateX(-50%);
  }
  .logs {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 90vw;
    margin-left: 5vw;
    border: 2px solid #999;
    padding: 20px;
    border-radius: 20px;

    max-height: 70vh;
    overflow: scroll;
  }
  .log {
    display: flex;
    margin-bottom: 15px;
    align-items: center;
  }
  .time {
    flex: 1;
    color: #999;
    font-weight: bolder;
  }
  .log:first-child .time {
    color: #f00;
  }
  .text {
    flex: 1;
    color: #666;
    font-size: 14px;
    padding-left: 20px;
  }
  .log:first-child .text {
    font-size: 16px;
    color: #000;
  }
  .log:last-child {
    margin-bottom: 0;
  }
</style>