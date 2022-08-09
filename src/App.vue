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
        <keep-alive exclude="post">
          <router-view 
            :base="api_base"
            :siteName="site.title"
            :siteDes="site.desText"
            :files="files">
          </router-view>
        </keep-alive>
      </transition>

    </div>


    <ffooter
      id="ffooter"
      v-show="showFooter"
      :base="api_base"
      :bottomLogo="theme['Footer-Logo'].val"
      :icpNum="theme['China-ICP-License'].val">
    </ffooter>
    
    
  </div>
  
</template>

<script>
import { EventBus } from './bus'
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
  metaInfo() {
      return{
          title: this.metaTitle,
          titleTemplate: '%s - ' + this.site.title,
          meta: [
              { name: "description", content: this.metaDes },
          ],
          htmlAttrs: {
              lang: 'en',
              amp: true
          }
      }
    
  },
  data(){
    return{
      api_base: process.env.NODE_ENV === "production" ? "https://api.isjeff.com" : "http://localhost:3000",
      // api_base: "http://api.isjeff.com",
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
      showFooter: false,
      animating: false,
      currentPosi: 0,
      delay: 3000,
      damping: 20,
      dontDisplayAni: false,
      metaTitle: "Welcome",
      metaDes: "Hello",

    }
  },

  created(){
    const that = this;
    this.dontDisplayAni = getCookie('topping') == "true" ? true : false
    this.getSiteData()

    setTimeout(()=>{
      logVisit(this.api_base + this.api_track, 1)
    }, 1000)

    EventBus.$on("set-meta", function(data){
        that.setMeta(data)
    })

    EventBus.$on("show-footer", function(data){
        that.showFot(data)
    })
  },
  methods:{

    scrollToMain () {
      this.animating = true;
      const that = this;
      const time = this.delay;
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

    showFot (d) {
      this.showFooter = d
    },

    setMeta (data) {
      this.metaTitle = data.title
      this.metaDes = data.des
    },

    getSiteData (){

      const that = this

      genGet(this.api_base + this.api_site, [], (res)=>{
        if(res.status){

          const finalRes = res.data
          const siteData = finalRes.site
          const socialMedia = finalRes.sm
          const navs = finalRes.nav

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
            this.showTopping = false
          } else {
            this.scrollToMain()
          }
          

          // Get header render X value
          that.$nextTick(()=>{
            that.headerY = that.$refs.headerRef.$el.offsetTop
            that.setMeta({title: "Home", des: this.site.desText})
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

.fade-enter-active{
  animation: router-main .42s forwards;
}

.fade-leave-active{
  animation: router-main .42s reverse;
}

@keyframes router-main {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}


body{
  background-color: #ffffff;
}

#app {
  height:auto;
  width:100%;
  font-family: fregular, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background:#ffffff;
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
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

#contents{
  width: 1300px;
  overflow: hidden;
  margin-top:30px;
  margin-left:auto;
  margin-right:auto;
  transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

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
    margin-top: 100px;
    margin-bottom: 16px;
  }

  #contents{
    width: 90%;
    margin-top: 30px;
  }

  #ffooter{
    margin-top: 30px;
    height: 120px;
  }

  
}
</style>
