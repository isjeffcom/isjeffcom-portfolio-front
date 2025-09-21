import { createRouter, createWebHistory } from 'vue-router'

import home from './components/home'
import post from './components/post'
import blog from './components/blog'

const routes = [
  { path:'/', name:'Home', redirect: '/home' },
  { path: '/home', name: 'home', component: home },
  { path: '/post', name: 'post', component: post },
  { path: '/blog', name: 'blog', component: blog }
]

export default createRouter({
  history: createWebHistory(),
  routes
})