<template>
  <div>
      <div id="header">
        <search/>
        <div id="rot-img">
            <img src="@/assets/logo.png">
        </div>
    </div>
    <index-swipe style="margin-top: 3vh"></index-swipe>
    <icon-swipe style="margin-top: 3vh"></icon-swipe>
    <tarbar/>
  </div>
</template>

<script>
import tarbar from '@/components/tarbar.vue';
import search from '@/components/search.vue';
import index_swipe from '@/components/index_swipe.vue';
import icon_swipe from '@/components/icon_swipe.vue';
export default {
  name: 'index',
  components: {
    tarbar,
    search,
    'index-swipe':index_swipe,
    'icon-swipe':icon_swipe,
  },
}
</script>

<style>
#header{
    display: flex;
    align-items: center;
    padding-top: 1vh;
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
#rot-img{
    display: inline-block;
    /* background-color: white; */
    width: 8vw;
    height: 8vw;
    animation: rotate infinite linear 5s;
    -webkit-animation: rotate infinite linear 5s;
    -moz-animation: rotate infinite linear 5s;
}
#rot-img img{
    width: 8vw;
    height: 8vw;
    transform: translateX(-3vw);
}
</style>