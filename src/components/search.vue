<template>
  <div class="_search">
    <van-search 
    class="search" 
    v-model="value" 
    placeholder="请输入搜索关键词" 
    input-align="center"
    shape="round"
    background="#000"
    />
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },
  },
}
</script>

<style>
._search{
    display: inline-block;
}
.search{
    width: 90vw;
}
</style>