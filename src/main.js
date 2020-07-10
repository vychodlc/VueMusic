// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import "@/assets/resetVant.css"

import {
  Button,
  Row,
  Col,
  Tabbar,
  TabbarItem,
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  Tab,
  Tabs,
  Icon,
  Slider,
  Picker
} from 'vant';

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload, {
  lazyComponent: true,
})
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Slider)
Vue.use(Picker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
