<template>
  <div class="home-playlist">
    <div class="title">{{boxName}}<span class="more">更多</span></div>
    <div class="plist-items">
      <div class="plist-item" 
        v-for="(item, index) in playList" :key="index"
        @click="goPList(item.creativeId)"
      >
        <span class="pamount">{{item.resources[0].resourceExtInfo.playCount | NumFormat}}</span>
        <img :src='item.uiElement.image.imageUrl' alt="">
        <span class="plist-name">{{item.uiElement.mainTitle.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomePlaylist",
    props: {
      boxName: {
        type: String,
        default() {
          return ''
        }
      },
      playList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
      }
    },
    filters: {
      NumFormat: (val) => {
        if(val>=100000&&val<100000000){
          return parseInt(val/10000)+'万'
        }else if(val>=100000000){
          return parseInt(val/100000000)+'亿'
        }else{
          return val
        }
      }
    },
    methods: {
      goPList(id) {
        this.$router.push({ path: '/playlist', query: { id: parseInt(id) }})
      }
    },
    create() {
    }
  }
</script>

<style scope>
  .home-playlist {}
  .home-playlist .title {
    font-size: 16px;
    font-weight: bolder;
    position: relative;
    padding-left: 15px;
    height: 44px;
    display: flex;
    align-items: center;
  }
  .home-playlist .more {
    font-weight: initial;
    position: absolute;
    right: 15px;
    border: 1px solid #bbb;
    border-radius: 10px;
    padding: 3px 10px;
  }
  .plist-items {
    display: flex;
    overflow: scroll;
  }
  .plist-items::-webkit-scrollbar {display:none}
  .plist-item {
    flex: 1;
    margin-left: 4vw;
    position: relative;
  } 
  .plist-item .pamount {
    position: absolute;
    right: 5%;
    top: 5%;
    background-color: rgba(85, 85, 85, .7);
    color: #ddd;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 0 3px;
  }
  .plist-item img {
    width: 25vw;
    height: 25vw;
    border: 1px solid transparent;
    border-radius: 10%;
  }
  .plist-name {
    margin: 5px 0;
    display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>