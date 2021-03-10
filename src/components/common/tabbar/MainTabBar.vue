<template>
    <tab-bar>
      <tab-bar-item path='/home'>
        <img slot="item-icon" src="~assets/img/home/home.png" alt="">
        <img slot="item-icon-active" src="~assets/img/home/home.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category'>
        <img slot="item-icon" src="~assets/img/home/list.png" alt="">
        <img slot="item-icon-active" src="~assets/img/home/list.png" alt="">
        <div slot="item-text">歌单</div>
      </tab-bar-item>
      <tab-bar-item path='/friends'>
        <img slot="item-icon" src="~assets/img/home/team.png" alt="">
        <img slot="item-icon-active" src="~assets/img/home/team.png" alt="">
        <div slot="item-text">云村</div>
      </tab-bar-item>
      <tab-bar-item path='/profile'>
        <img slot="item-icon" src="~assets/img/home/user.png" alt="">
        <img slot="item-icon-active" src="~assets/img/home/user.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar';
import TabBarItem from 'components/common/tabbar/TabBarItem';

export default {  
  name: 'MainTabBar',
  components: {TabBar,TabBarItem}
}
</script>

<style>

</style>