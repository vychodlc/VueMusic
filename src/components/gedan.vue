<template>
  <div class="gedan" style="color: white">
      <div id="gedan-topic">你的歌单精选站</div>
      <div class="b">
          <div class="box" v-for='(item,index) in gedan_list' :key="index">
              <div class="box-img">
                  <img :src="item.coverImgUrl" alt="">
                  <span class="box-count">{{ item.playCount|Num2Wan }}</span>
                </div>
              <div class="box-topic">{{ item.name }}</div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'gedan',
    data(){
        return{
            gedan_list: []
        }
    },
    created(){
        axios({
            url: "https://api.itooi.cn/netease/songList/highQuality?cat=全部&pageSize=7",
            method: 'get'
        }).then(res=>{
            this.gedan_list = res.data.data
        });
    },
    filters: {
        Num2Wan: function (value) {
            if (!value) return '0'
            if(value>=100000000){
                return (value/100000000).toFixed(1) + '亿'
            }else if(value>=10000 && value<100000000){
                return (value/10000).toFixed(1) + '万'
            }
        }
    },
}
</script>

<style>
.gedan{
    overflow: hidden;
    width: 90vw;
    margin-left: 5vw;
}
#gedan-topic{
    font-size: 1.5rem;
    margin-bottom: 0.5vh;
}
.b{
    padding: 1vh 0;
    white-space: nowrap;
    overflow-y:auto;
}
.b::-webkit-scrollbar{
    display: none;
}
.box{
    width: 25vw;
    margin-left: 3vw;
    height: auto;
    display: inline-block;
    border-color: red;
}
.box-img{
    width: 25vw;
    height: 25vw;
    margin-bottom: 0.5vh;
    position: relative;
}
.box-count{
    position: absolute;
    top: 0vw;
    right: 2vw;
}
.box-img img{
    width: 25vw;
    height: 25vw;
    border-radius: 1rem;
}
.box-topic{
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:3; 
}
</style>