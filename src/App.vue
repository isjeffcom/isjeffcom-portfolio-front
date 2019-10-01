<template>
  <div id="app">

    <topping 
      :leftLogo="theme['Topping-Logo'].val"
      :centerLogo="theme['Center-Logo'].val"
      :socialMedia="social_media"
      :mode.sync="mode"
      v-if="loaded">
    </topping>

    <div id="mid">
      <router-view 
        :pid.sync="pid">
      </router-view>
    </div>
    
  </div>
</template>

<script>
import { genGet } from './request'
import { decodeRichText } from './utils'
import topping from './components/topping'

export default {
  name: 'app',
  components: {
    topping
  },
  data(){
    return{
      api_site: "https://api.isjeff.com/pot/front/home/",
      mode: "home",
      pid: "0",
      loaded: false,
      site: {},
      theme: {},
      social_media: []
    }
  },
  created(){
    this.getSiteData()
    
  },
  methods:{

    getSiteData (){

      var that = this

      genGet(this.api_site, [], (res)=>{
        console.log(res)
        if(res.status){
          var finalRes = res.data
          var siteData = finalRes.site[0]
          var socialMedia = finalRes.sm
          siteData.title = decodeRichText(siteData.title)
          siteData.subtitle = decodeRichText(siteData.subtitle)
          siteData.desText = decodeRichText(siteData.desText)
          siteData.seoTitle = decodeRichText(siteData.seoTitle)

          that.theme = JSON.parse(decodeRichText(siteData.data_struct))
          siteData.data_struct = ""
          that.site = siteData
          that.social_media = socialMedia

          that.loaded = true
          
        }

      })

      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
