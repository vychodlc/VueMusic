<template>
  <div class="newsong" style="color: white">
    <div id="newsong-topic">这些新歌你听了吗</div>
    <van-swipe :loop="false" :width="325" indicators='transparent'>
        <van-swipe-item  v-for="(swipe,index) in 3" :key="index">
            <div class="song-box">
                <div class="song-item" v-for="(song,index2) in 3" :key="index2">
                    <div class="song-item-left">
                        <img class='song-img' :src="newsong_list[index*3+index2].picUrl" alt="">
                    </div>
                    <div class="song-item-right">
                        <div class='song-name'>{{ newsong_list[index*3+index2].name }}</div>
                        <div class="singer-name">{{ newsong_list[index*3+index2].song.artists[0].name }}</div>
                    </div>
                </div>
            </div>
        </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'newsong',
    data(){
        return{
            // screenWidth: document.body.clientWidth,
            newsong_list: [],
            li: [111,222,333,444,555,666,777,888,999,1111,11111,12123,123131,2323123]
        }
    },
    created(){
        axios({
            url: "https://autumnfish.cn/personalized/newsong",
            method: 'get'
        }).then(res=>{
            this.newsong_list = res.data.result;
            console.log(this.newsong_list)
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
    methods:{
        playMusic(id){
            console.log(id);
        }
    }
}
</script>

<style>
.newsong{
    overflow: hidden;
    width: 90vw;
    margin-left: 5vw;
}
.newsong .van-swipe__indicators{
    display: none;
}
#newsong-topic{
    font-size: 1.5rem;
    margin-bottom: 0.5vh;
}
.song-box{
    width: 90vw;
}
.song-item{
    width: 80vw;
    height: 18vw;
    margin-top: 1vh;
}
.song-item-left{
    display: inline-block;
    width: 18vw;
    height: 18vw;
}
.song-item-right{
    display: inline-block;
    width: 50vw;
    height: 18vw;
    margin-left: 2vw;
    transform: translateY(-50%);
}
.song-name{
    transform: translateY(30%);
    color: #fff;
    font-size: 1.3rem;
}
.singer-name{
    transform: translateY(70%);
    color: #888;
}
.song-img{
    width: 18vw;
    height: 18vw;
    border-radius: 1rem;
}
</style>