<template>
  <div>
    <div id="header">
        <div id="hear-img">
            <img src="@/assets/imgs/yuyin.png">
        </div>
        <search/>
        <div id="rot-img">
            <img src="@/assets/logo.png">
        </div>
    </div>
    <index-swipe style="margin-top: 1vh"></index-swipe>
    <icon-swipe style="margin-top: 2vh"></icon-swipe>
    <gedan style="margin-top: 2vh"></gedan>
    <newsong style="margin-top: 2vh"></newsong>
    <tarbar/>
  </div>
</template>

<script>
import tarbar from '@/components/tarbar.vue';
import search from '@/components/search.vue';
import index_swipe from '@/components/index_swipe.vue';
import icon_swipe from '@/components/icon_swipe.vue';
import gedan from '@/components/gedan.vue';
import newsong from '@/components/newsong.vue';
export default {
  name: 'index',
  components: {
    tarbar,
    search,
    'index-swipe':index_swipe,
    'icon-swipe':icon_swipe,
    gedan,
    newsong,
  },
}
</script>

<style>
#header{
    display: flex;
    align-items: center;
    padding-top: 1vh;
    padding-left: 1vh;
}
@keyframes rotate {
    from{
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
    }to{
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }
}
@keyframes animated-border {
    0% {
        box-shadow: 0 0 0 0 rgba(255,255,255,0.4);
    }
    100% {
        box-shadow: 0 0 0 20 rgba(255,255,255,0);
    }
}
#hear-img{
    display: inline-block;
    width: 8vw;
    height: 8vw;
    z-index: 100;
}
#hear-img img{
    width: 8vw;
    height: 8vw;
}
#rot-img{
    display: inline-block;
    width: 8vw;
    height: 8vw;
    animation: rotate infinite linear 5s;
    -webkit-animation: rotate infinite linear 5s;
    -moz-animation: rotate infinite linear 5s;
    /* animation: animated-border 1.5s infinite; */
}
#rot-img img{
    width: 8vw;
    height: 8vw;
}
</style>