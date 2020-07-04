<template>
  <div id="icons">
    <!-- <van-tabs>
        <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
            内容 {{ index }}
        </van-tab>
    </van-tabs> -->
    <van-row gutter="20">
        <van-col span="6" v-for="(url,name) in icons" :key="name">
            <div>
                <div>
                    <img src="@/assets/imgs/rili.png" alt="">
                </div>
                <img :src="url" alt="">
                <p style="margin-top: 1vh">{{ name }}</p>
                <p style="margin-top: 1vh">{{ url }}</p>
            </div>
        </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: 'icon_swipe',
    data() {
        return {
            icons: {
                '每日推荐':'@/assets/imgs/rili.png',
                '歌单':'@/assets/imgs/gedan.png',
                '排行榜':'@/assets/imgs/ranking.png',
                '私人FM':'@/assets/imgs/fm.png',
            }
        };
    }
  }
</script>

<style scoped>
#icons{
    text-align: center;
    color: #999;
}
#icons img{
    width: 10vw;
    height: 10vw;
}
</style>