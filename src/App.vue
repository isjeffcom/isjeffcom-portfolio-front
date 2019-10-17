<template>
  <div id="app" v-if="loaded">

    <topping
      v-show="showTopping"
      :base="api_base"
      :toppingLogo="theme['Topping-Logo'].val">
    </topping>
    

    <hheader
      id="hheader"
      ref="headerRef"
      :base="api_base"
      :leftLogo="theme['Side-Logo'].val"
      :centerLogo="theme['Center-Logo'].val"
      :socialMedia="social_media">
    </hheader>

    <navs
      id="nnavs"
      :navs="navs">
    </navs>

    <div id="contents"
         ref="contentsRef">

      <transition name="fade">
        <router-view 
          :base="api_base"
          :files="files">
        </router-view>
      </transition>

    </div>


    <ffooter
      id="ffooter"
      :base="api_base"
      :bottomLogo="theme['Footer-Logo'].val"
      :icpNum="theme['China-ICP-License'].val">
    </ffooter>
    
    
  </div>
  
</template>

<script>
import { genGet, logVisit } from './request'
import { decodeRichText, setCookie, getCookie } from './utils'
import scrollTo from 'scroll-to'
import hheader from './components/header'
import topping from './components/topping'
import ffooter from './components/ffooter'
import navs from './components/navs'

export default {
  name: 'app',
  components: {
    topping,
    hheader,
    navs,
    ffooter
  },
  data(){
    return{
      api_base: "https://isjeff.com/api",
      api_site: "/front/home/",
      api_track: "/updater/visit/",
      mode: "home",
      pid: "1",
      loaded: false,
      site: {},
      theme: {},
      navs: [],
      social_media: [],
      files: [],
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
    setTimeout(()=>{
      logVisit(this.api_base + this.api_track, 1)
    }, 1000)
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

      genGet(this.api_base + this.api_site, [], (res)=>{
        if(res.status){

          var finalRes = res.data
          var siteData = finalRes.site[0]
          var socialMedia = finalRes.sm
          var navs = finalRes.nav

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
          that.navs = navs

          that.files = [
            {name: 'PDF-Portfolio', val: that.theme['PDF-Portfolio'] }, 
            {name: 'CV-English', val:that.theme['CV-English']},
            {name: 'CV-Chinese', val:that.theme['CV-Chinese']}
          ]

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

a{
    text-decoration: none !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}

.fade-enter{
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.fade-leave{
  opacity: 1;
}

.fade-leave-to{
  opacity: 0;
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
  position: relative;
  background: rgba(255,255,255,1);
  height:100px;
  transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

#nnavs{
  width:100%;
    height:48px;
    margin-top:40px;
    margin-bottom: 36px;
}

#contents{
  width: 1300px;
  overflow: hidden;
  margin-top:30px;
  margin-left:auto;
  margin-right:auto;
}

/*@media only screen 
and (min-device-width : 375px) 
and (max-device-width : 812px) 
and (-webkit-device-pixel-ratio : 3)
and (orientation : landscape) { 
  .contents{
    width: 90%;
  }
}*/



#ffooter{
  margin-top: 50px;
}

@media only screen and (max-device-width : 812px)  { 

  #hheader{
    position: fixed;
    top:0px;
    z-index: 80;
    height: 64px;
    width: 100%;
    background-color: #ffffff;
  }
  
  #nnavs {
    width: 100%;
    height: 28px;
    margin-top: 20px;
    margin-bottom: 16px;
  }

  #contents{
    width: 90%;
    margin-top: 60px;
  }

  #ffooter{
    margin-top: 30px;
    height: 120px;
  }

  
}
</style>
