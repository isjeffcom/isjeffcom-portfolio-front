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
      :leftLogoDark="theme['Side-Logo-Dark'].val"
      :centerLogo="theme['Center-Logo'].val"
      :centerLogoDark="theme['Center-Logo-Dark'].val"
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
      :bottomLogoDark="theme['Footer-Logo-Dark'].val"
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
      // api_base: process.env.NODE_ENV === "production" ? "https://api.isjeff.com" : "http://localhost:3000",
      api_base: "https://api.isjeff.com",
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
      showTopping: false,
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
          siteData.title = decodeRichText(siteData.title);
          siteData.subtitle = decodeRichText(siteData.subtitle);
          siteData.desText = decodeRichText(siteData.desText);
          siteData.seoTitle = decodeRichText(siteData.seoTitle);

          // Parse theme data
          that.theme = JSON.parse(decodeRichText(siteData.data_struct));
          console.log(that.theme);

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
          this.showTopping = false;

          // if(this.dontDisplayAni){
          //   this.showTopping = false;
          // } else {
          //   // this.scrollToMain()
          // }
          

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

@keyframes showup {
  0% {opacity: 0; transform: translateX(70px);}
  100% {opacity: 1; transform: translateX(0px);}
}

@keyframes covering {
  0% {opacity: 0; transform: translateY(-400px);}
  50% {opacity: 1; transform: translateY(0px);}
  100% {opacity: 0; transform: translateY(400px);}
}

@keyframes poping {
  0% {opacity: 0; transform: scale(0);}
  25% {opacity: 1; transform: scale(1);}
  85% {opcity: 1; transform: scale(1);}
  100% {opacity: 0; transform: scale(0);}
}

@keyframes blurout {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

/** Overwrite scroll bar style */
::-webkit-scrollbar {
  border: none;
  width: 9px;
  height: 6px;
}
::-webkit-scrollbar-track {
  border: none;
  background: rgba(0,0,0,0);
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: rgba(0,0,0,0.25);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.5);
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

:root {
  --body-bg: #ffffff;
  --bg-caption: #F9F9F9;
  --bg-cover: linear-gradient(90deg, #FFFFFF 20%, rgba(255, 255, 255, 0) 100%);
  --bg-card: linear-gradient(195.65deg, #EFF2F3 0%, #FFFFFF 100%);
  --bg-card-shadow: 0px 16px 24px rgba(69, 76, 84, 0.1);
  --border-card: 1px solid #D2D5E1;
  --bg-card-text: #454C54;
  --namecard-button: rgba(255, 255, 255, 1);
  --namecard-button-hover: #F6F6F6;
  --namecard-button-shadow: 0px 4px 8px rgba(69, 76, 84, 0.05);
  --namecard-button-shadow-hover: 0px 12px 18px rgba(69, 76, 84, 0.24);
  --avatar-ani-cover-blur: rgba(255,255,255,0.75);
  --border-card-button: 0.5px solid #BCC3C8;
  --header-bg: transparent;
  --header-bg-mobile: #ffffff;
  --text-normal: #333333;
}

@media (prefers-color-scheme: dark) {
  :root {
    --body-bg: linear-gradient(252.44deg, #282828 0%, #000000 100%);
    --bg-caption: #252525;
    --bg-cover: linear-gradient(90deg, #090909 20%, rgba(25, 25, 25, 0) 100%);
    --bg-card: linear-gradient(214.44deg, #19203A 27.18%, #341222 100%);
    --bg-card-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    --border-card: 1px solid #202020;
    --bg-card-text: #ffffff;
    --namecard-button: rgba(255, 255, 255, 0.05);
    --namecard-button-hover: rgba(255, 255, 255, 0.15);;
    --namecard-button-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    --namecard-button-shadow-hover: 0px 12px 20px rgba(0, 0, 0, 0.36);
    --avatar-ani-cover-blur: rgba(0,0,0,0.65);
    --border-card-button: 1px solid rgba(255, 255, 255, 0.15);
    --header-bg: transparent;
    --header-bg-mobile: linear-gradient(252.44deg, #282828 0%, #1e1e1e 100%);
    --text-normal: #ffffff;
  }

  .hheader-sm-single, #hheader-center-upbtn{
    filter: invert(100%);
  }

  .ce-block--selected .ce-block__content{
    background: #1e2d38;
  }

  #namecard-person img, #namecard-actions img{
    filter: invert(100%);
  }

  ::selection {
    background-color: #365165;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(116 116 116 / 25%);
  }

  ::-webkit-scrollbar-track {
    background: #1C1C1C;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #484848;
  }
}



html, body{
  background: var(--body-bg);
}

body{
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  padding-left: constant(safe-area-inset-left);
  padding-left: env(safe-area-inset-left);
  padding-right: constant(safe-area-inset-right);
  padding-right: env(safe-area-inset-right);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom:  env(safe-area-inset-bottom);
}

#app {
  height:auto;
  width:100%;
  font-family: fregular, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:var(--text-normal);
}

#topping{
  height: 590px;
}

#hheader{
  position: relative;
  background: var(--header-bg);
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

.file-down-icon svg g{
  fill: var(--text-normal);
}

@media only screen and (max-device-width : 812px)  { 

  #hheader{
    position: fixed;
    top:0px;
    z-index: 80;
    height: 64px;
    width: 100%;
    background: var(--header-bg-mobile);
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
