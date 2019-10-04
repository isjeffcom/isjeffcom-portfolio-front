<template>
  <div id="app" v-if="loaded">

    <topping
      v-show="showTopping"
      :base="site.baseUrl"
      :toppingLogo="theme['Topping-Logo'].val">
    </topping>
    

    <hheader
      id="hheader"
      ref="headerRef"
      :base="site.baseUrl"
      :leftLogo="theme['Side-Logo'].val"
      :centerLogo="theme['Center-Logo'].val"
      :socialMedia="social_media">
    </hheader>

    <div id="contents"
         ref="contentsRef">

      <router-view 
        :base="site.baseUrl"
        :navs="nav">
      </router-view>

    </div>


    <ffooter
      id="ffooter"
      :base="site.baseUrl"
      :bottomLogo="theme['Footer-Logo'].val"
      :icpNum="theme['China-ICP-License'].val">
    </ffooter>
    
    
  </div>
  
</template>

<script>
import { genGet } from './request'
import { decodeRichText, setCookie, getCookie } from './utils'
import scrollTo from 'scroll-to'
import hheader from './components/header'
import topping from './components/topping'
import ffooter from './components/ffooter'

export default {
  name: 'app',
  components: {
    topping,
    hheader,
    ffooter
  },
  data(){
    return{
      api_site: "https://api.isjeff.com/pot/front/home/",
      mode: "home",
      pid: "1",
      loaded: false,
      site: {},
      theme: {},
      nav: [],
      social_media: [],
      headerY: 0,
      showTopping: true,
      animating: false,
      currentPosi: 0,
      delay: 3000,
      damping: 20,
      dontDisplayAni: false,

    }
  },

  created(){
    this.dontDisplayAni = getCookie('topping') == "true" ? true : false
    this.getSiteData()
  },
  methods:{

    scrollToMain () {
      this.animating = true
      var that = this
      var time = this.delay
      setTimeout(()=>{
          if(that.loaded){
            scrollTo(0, that.headerY, {
              ease: 'inOutQuart',
              duration: 500
            })
          } else {
            that.showTopping = false
          }
        }, time)

        setTimeout(()=>{
          that.showTopping = false
          that.animating = false
          that.currentPosi = 1
        }, time+550)


        setCookie("topping", true, 3, false)
        
    },

    scrollToTopping () {

      var that = this
      this.animating = true

      scrollTo(0, 30, {
        ease: 'inOutQuart',
        duration: 100
      })
      
      
      setTimeout(()=>{
        that.showTopping = true
        that.$nextTick(()=>{
          scrollTo(0, 0, {
            ease: 'inOutQuart',
            duration: 600
          })
        })
        
      }, 150)

      setTimeout(()=>{
        that.animating = false
        that.currentPosi = 0
      }, 700)
    },

    getSiteData (){

      var that = this

      genGet(this.api_site, [], (res)=>{
        
        if(res.status){

          var finalRes = res.data
          var siteData = finalRes.site[0]
          var socialMedia = finalRes.sm
          var nav = finalRes.nav

          // Parse site data
          siteData.title = decodeRichText(siteData.title)
          siteData.subtitle = decodeRichText(siteData.subtitle)
          siteData.desText = decodeRichText(siteData.desText)
          siteData.seoTitle = decodeRichText(siteData.seoTitle)

          // Parse theme data
          that.theme = JSON.parse(decodeRichText(siteData.data_struct))

          // Merge theme data into site data
          siteData.data_struct = ""
          // Put in datas
          that.site = siteData
          that.social_media = socialMedia
          that.nav = nav

          // Loaded
          that.loaded = true

          if(this.dontDisplayAni){
            //console.log(this.dontDisplayAni)
            this.showTopping = false
          } else {
            this.scrollToMain()
          }
          

          // Get header render X value
          that.$nextTick(()=>{
            that.headerY = that.$refs.headerRef.$el.offsetTop
          })
          
        }

      })

    }
  }
}
</script>

<style>

@font-face{
  font-family: fblack;
  src: url('./assets/black.otf');
}

@font-face{
  font-family: fregular;
  src: url('./assets/regular.otf');
}

*{
  margin:0;
  padding:0;
}

#app {
  height:auto;
  width:100%;
  font-family: fregular, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:#333;
}

#topping{
  height: 590px;
}

#hheader{
  height:100px;
  transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

#contents{
  width: 1000px;
  overflow: hidden;
  margin-top:30px;
  margin-left:auto;
  margin-right:auto;
}

#ffooter{
  margin-top: 50px;
}
</style>
