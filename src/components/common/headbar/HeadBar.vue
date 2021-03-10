<template>
  <div class="headbar">
    <div class="left" v-if="isLeft"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
    <div class="right" v-if="ifHas2"><slot name="right2"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'HeadBar',
    props: {
      isLeft: {
        type: Boolean,
        default: true
      },
      ifHas2: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // console.log(this.isLeft);
    }
  }
</script>

<style scoped>
  .headbar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  .headbar .left,
  .headbar .right {
    width: 50px;
  }
  .left2 {
    width: 20px;
  }
  .headbar .center {
    flex: 1;
  }
</style>