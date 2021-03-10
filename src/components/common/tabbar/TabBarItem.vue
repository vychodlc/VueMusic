<template>
  <div class="tab-bar-item" @click="itemClick">
    <div class="item-icon-center">
      <slot name="item-icon-center"></slot>
    </div>
    <div v-if="!isActive" class="item-icon">
      <slot name="item-icon"></slot>
    </div>
    <div v-else class="item-icon-active">
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor:{
      type: String,
      default: "#c20c0c"
    }
  },
  data() {
    return {
    }
  },
  computed: {
    isActive() {
      return !this.$route.path.indexOf(this.path)
    },
    activeStyle(){
      return this.isActive? {color:this.activeColor}:{};
    }
  },
  methods: {
    itemClick() {
      if(this.$route.path!==this.path){
        this.$router.push(this.path);
      }
    }
  }
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 10px;
    overflow: hidden;
    color: #999;
  }

  .tab-bar-item img {
    height: 24px;
    width: 24px;
    color: black;
    vertical-align: middle;
    margin-bottom: 5px;
    margin-top: 2px;
  }

  .item-icon {
    position: relative;
    /* left: -80px; */
    filter:drop-shadow(80px 0 #999);
  }

  .item-icon-active {
    position: relative;
    left: -80px;
    filter:drop-shadow(80px 0 #c20c0c);
  }

  .item-icon-center img {
    width: 35px;
    height: 35px;
    margin-top: 5px;
  }
</style>