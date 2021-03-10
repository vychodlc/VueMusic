<template>
  <div id="search-box">
    <input class="input-box" type="text" placeholder="请输入搜索词" >
  </div>
</template>

<script>
  export default {
    name: 'SearchBox'
  }
</script>

<style scope>
  #search-box {
  }
  #search-box input {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border: none;
    border: 1px solid transparent;
    border-radius: 10px;
    text-align: center;
    color: #444;
  }
</style>