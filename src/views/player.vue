<template>
  <div class="player">
      <div class="player-header">
          <div class="player-back">
              <van-icon name="arrow-left" size="2rem"/>
          </div>
          <div class="player-brief">
              <div class="player-song">再见</div>
              <div class="player-singer">张震岳</div>
          </div>
          <div class="player-zhuanfa">
              <van-icon name="ellipsis" size="2rem"/>
          </div>
      </div>
      <div class="player-image">
          <div class="player-image-rotate">
            <img src="http://pic17.nipic.com/20111104/5478291_205548886000_2.jpg">
          </div>
      </div>
      <div class="player-icons">
      </div>
      <div class="player-player"></div>
  </div>
</template>

<script>
export default {
    name: 'player'
}
</script>

<style>
.player{
    color: #7d7d7d;
    position: relative;
    background-color: #333;
    width: 100%;
    height: 100%;
}
.player-header{
    padding-top: 2vh;
    height: 10vh;
    display: flex;
    align-items: center;
}
.player-back, .player-zhuanfa{
    width: 10vw;
    text-align: center;
}
.player-brief{
    width: 80vw;
    text-align: center;
}
.player-song{
    font-size: 1.75rem;
}
@keyframes rotate {
    0%{transform: rotate(0deg);webkit-transform: rotate(0deg);border: 6px solid #7d7d7d;}
    25%{transform: rotate(90deg);-webkit-transform: rotate(90deg);border: 6px solid #222;}
    50%{transform: rotate(180deg);-webkit-transform: rotate(180deg);border: 6px solid #7d7d7d;}
    75%{transform: rotate(270deg);-webkit-transform: rotate(270deg);border: 6px solid #222;}
    100%{transform: rotate(360deg);-webkit-transform: rotate(360deg);border: 6px solid #7d7d7d;}
}
.player-image{
    width: 100vw;
    height: 65vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.player-image img{
    width: 80vw;
    height: 80vw;
    border-radius: 50%;
}
.player-image-rotate{
    display: inline;
    padding: 5vw;
    animation: rotate infinite linear 5s;
    -webkit-animation: rotate infinite linear 5s;
    -moz-animation: rotate infinite linear 5s;
    border-radius: 50%;
}
.player-icons{
    width: 100vw;
    height: 10vh;
    background-color: antiquewhite;
}
.player-player{
    width: 100vw;
    height: 25vh;
    background-color: red;
}
</style>