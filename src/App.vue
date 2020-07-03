<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{padding: 0;margin: 0;box-sizing: border-box;}
#app{
    background-color: black;
    height: 100vh;
    width: 100vw;
}
</style>
