<template>
  <!-- <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <img :src="item.pic" alt="">
    </swiper-item>
  </swiper> -->
  <swiper ref="mySwiperBannner" :options="swiperOptions">
    <swiper-slide 
      v-for="(item, index) in banners" 
      :key="index" 
      v-if="item.song!=null"
    >
      <img :src="item.pic" alt="" @click="playSong(item)">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  // import {Swiper, SwiperItem} from 'components/common/swiper'

  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'
  import Swiper2, {Navigation, Pagination, Autoplay} from 'swiper';

  Swiper2.use([Navigation, Pagination, Autoplay]);
  
  export default {
    name: 'HomeSwiper',
    props: {
      banners: Array,
      default() {
        return []
      }
    },
    data() {
      return {
        swiperOptions: {
          observer:true,
          observeParents:true, 
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          loop:true,
          autoplay: {
            disableOnInteraction: false,
            delay: 2000
          }
        }
      }
    },
    components: {
      Swiper,
      SwiperSlide
    },
    methods: {
      playSong(item) {
        this.$store.commit('addSong', item);
        console.log(item);
        this.$router.push({ path: '/play', query: { id: parseInt(item.song.id) }})
      }
    }
  }
</script>

<style scope>
  img{
    width: 100%;
    border-radius: 5vw;
  }
</style>