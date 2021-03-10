import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../views/login/Login.vue')

const Home = () => import('../views/home/Home.vue')
const LogView = () => import('../components/common/logview/LogView.vue')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Friends = () => import('../views/friends/Friends')
const Profile = () => import('../views/profile/Profile')

const Search = () => import('../views/search/Search')
const SearchDetail = () => import('../views/search/childCpns/SearchDetail')
const PlayList = () => import('../views/playlist/PlayList')
const Album = () => import('../views/album/Album')
const Play = () => import('../views/play/Play')
const Comment = () => import('../views/play/Comment')

Vue.use(Router)

const routes = [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/logview',
      name: 'LogView',
      component: LogView
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/friends',
      name: 'Friends',
      component: Friends
    },
    {
      path: '/playlist',
      name: 'Playlist',
      component: PlayList
    },
    {
      path: '/album',
      name: 'Album',
      component: Album
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      // children: [
      //   {
      //     path: '/detail',
      //     name: 'SearchDetail',
      //     component: SearchDetail
      //   }
      // ]
    },
    {
      path: '/search/detail',
      name: 'SearchDetail',
      component: SearchDetail
    }
  ]

export default new Router({
  routes,
  mode: 'hash'
})
