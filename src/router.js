import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from './components/home'
import post from './components/post'
import blog from './components/blog'


export default new VueRouter({
  mode: 'history',
  routes: [
      { path:'/', name:'Home', redirect: '/home' },
      { path: '/home', name: 'home', component: home },
      { path: '/post', name: 'post', component: post },
      { path: '/blog', name: 'blog', component: blog }
    ]
})