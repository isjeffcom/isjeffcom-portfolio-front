import Vue from 'vue'
import App from './App.vue'

import router from './router.js'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMeta from 'vue-meta'
 
Vue.use(VueAxios, axios)

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
