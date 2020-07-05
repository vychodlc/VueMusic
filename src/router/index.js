import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import player from '@/views/player'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/player',
      name: 'player',
      component: player
    }
  ]
})
