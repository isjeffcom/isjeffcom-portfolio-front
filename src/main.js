import { createApp } from 'vue'
import App from './App.vue'

import router from './router.js'

import axios from 'axios'
import { createHead } from '@unhead/vue'
 
const app = createApp(App)

// 配置axios
app.config.globalProperties.$http = axios
app.config.globalProperties.$axios = axios

// 配置meta管理
const head = createHead()
app.use(head)

// 配置路由
app.use(router)

// 挂载应用
app.mount('#app')
