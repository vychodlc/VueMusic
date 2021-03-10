<template>
  <div class="loginView">
      <div class="title">LOG IN
        <div @click="goLoginDefault">click big word to login default</div>
      </div>
      <div class="login">
          <div class="input">
              <input ref="phone" type="text" name="user" id="user" placeholder="Number">
              <input ref="password" type="password" name="pwd" id="pwd" placeholder="Password">
              <div class="btn" @click="goLogin"><img src="~assets/img/login/youred.png" alt=""></div>
          </div>
          <!-- <div class="others">
              <div class="icon" id="phone"><div class="iconimg"><img src="~assets/img/login/phone.png" alt=""></div></div>
              <div class="icon" id="wechat"><div class="iconimg"><img src="~assets/img/login/wechat.png" alt=""></div></div>
              <div class="icon" id="qq"><div class="iconimg"><img src="~assets/img/login/QQ.png" alt=""></div></div>
              <div class="icon" id="sina"><div class="iconimg"><img src="~assets/img/login/weibo.png" alt=""></div></div>
              <div class="icon" id="email"><div class="iconimg"><img src="~assets/img/login/mail.png" alt=""></div></div>
          </div> -->
      </div>
  </div>
</template>

<script>
import { login } from 'network/login.js'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
    };
  },
  computed: {},
  watch: {},
  methods: {
    goLoginDefault() {
      login(18813002322,'WEYOUNG918').then(res => {
        console.log(res);
        if(res.code&&res.code==200) {
          this.$store.commit("setUserInfo", res);
          this.$router.replace({ path: '/home'});
        }
      })
    },
    goLogin() {
      let phone = parseInt(this.$refs.phone.value);
      let password = this.$refs.password.value;

      // phone = 18813002322;
      // password = 'WEYOUNG918';
      
      if(phone<10000000000||phone>19999999999){
        this.$bus.$emit('message', '手机号码输入错误')
        return false;
      }else if(password=='') {
        this.$bus.$emit('message', '密码未输入')
        return false;
      }else {
        login(phone,password).then(res => {
          console.log(res);
          if(res.code&&res.code==200) {
            this.$store.commit("setUserInfo", res);
            this.$router.replace({ path: '/home'});
          }
        })
      }
    }
  },
  created() {
  },
  mounted() {
  },
  activated() {
    this.$store.commit('navbarShowChange', false);
    this.$store.commit('changeinPlaying', false);
    if(localStorage.userInfo.code=='200') {
      this.$store.commit("setUserInfo", localStorage.userInfo);
      this.$router.replace({ path: '/home'})
    }
  },
  deactivated() {
    this.$store.commit('navbarShowChange', true);
    this.$store.commit('changeinPlaying', true);
  },
}
</script>

<style lang='css' scoped>
  .loginView {
    touch-action: none;
    width: calc(100vw + 1px);
    height: 100vh;
    background-color: #b00;
  }
  .title {
    width: 100vw;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    font-size: 40px;
  }
  .login {
    width: 100vw;
    height: 50vh;
  }
  .login .input {
    width: 100vw;
    height: 40vh;
  }
  .input input {
    width: 80vw;
    height: 5vh;
    margin-left: 10vw;
    border: none;
    border-radius: 20px;
    margin-bottom: 20px;
    font-size: 18px;
    outline: none;
    padding-left: 20px;
  }
  input:focus {
    border: 1px solid #000;
  }
  .btn {
    width: 12vw;
    height: 12vw;
    margin: 0 auto;
    margin-top: 5vh;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn img {
    width: 12vw;
    height: 12vw;
  }
  .others {
    display: flex;
    width: 80vw;
    margin: 0 auto;
  }
  .others .icon {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .others .iconimg {
    /* width: 40px;
    height: 40px; */
    border-radius: 50%;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon img {
    width: 40px;
    height: 40px;
  }
</style>