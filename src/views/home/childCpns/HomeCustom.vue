<template>
  <div class="home-custom">
    <div class="title">
      <span class="sub-title">私人定制</span>
      {{customtitle}}
      <span class="more">播放</span>
    </div>
    <swiper ref="mySwiperPList" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in customlist" :key="index">
        <div class="list-container" v-for="(item1,index1) in item.resources" :key="index1">
          <div class="list-item" @click="playSong(item1)">
            <div class="list-item-img">
              <img :src="item1.uiElement.image.imageUrl" alt="">
            </div>
            <div class="list-item-text">
              <span class="songname">
                {{ item1.uiElement.mainTitle.title }}
                <span class="singername">- {{ item1.resourceExtInfo.artists[0].name }}</span>
              </span>
              <span v-if="item1.uiElement.subTitle" class="subTitle">{{item1.uiElement.subTitle.title}}</span>
            </div>
          </div>
        </div>
      </swiper-slide>
  </swiper>
  </div>
</template>

<script>
// import {Swiper, SwiperItem} from 'components/common/swiper'

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: 'HomeCustom',
  props: {
    customtitle: {
      type: String,
      default() {
        return ''
      }
    },
    customlist: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1.15,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination'
        },
        // Some Swiper option/callback...
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
      this.$router.push({ path: '/play', query: { id: parseInt(item.resourceExtInfo.songData.id) }})
    }
  }
}
</script>

<style scope>
  .home-custom {}
  .home-custom .title {
    font-size: 16px;
    font-weight: bolder;
    position: relative;
    padding-left: 15px;
    height: 64px;
    display: flex;
    align-items: center;
  }
  .home-custom .sub-title {
    font-size: 12px;
    font-weight: normal;
    position: absolute;
    color: #999;
    top: 10%;

  }
  .home-custom .more {
    font-weight: initial;
    position: absolute;
    right: 15px;
    border: 1px solid #bbb;
    border-radius: 10px;
    padding: 3px 10px;
  }
  .list-container {
    padding-bottom: 0.5vh;
  }
  .list-item {
    padding-left: 2vw;
    display: flex;
  }
  .list-item-img img {
    width: 15vw;
    border-radius: 20%;
    padding: 3px;
  }
  .list-item-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
  }
  .list-item-text .songname {
    font-size: 14px;
    color: #000;
  }
  .list-item-text .singername,
  .list-item-text .subTitle {
    font-size: 10px;
    color: #999;
  }
  .list-item-text .subTitle {
    /* flex: 1; */
    padding-top: 5px;
  }
</style>