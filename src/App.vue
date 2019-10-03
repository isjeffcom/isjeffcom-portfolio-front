<template>
  <div id="app" v-if="loaded">

    <div id="sup">
      <img id="sup_img" src="./assets/sup.png" alt="">
    </div>

      <topping
        v-show="showTopping"
        :base="site.baseUrl"
        :toppingLogo="theme['Topping-Logo'].val">
      </topping>
    

    <hheader
      id="hheader"
      ref="headerRef"
      :leftLogo="theme['Side-Logo'].val"
      :centerLogo="theme['Center-Logo'].val"
      :socialMedia="social_media"
      :mode.sync="mode">
    </hheader>

    <div id="contents"
         ref="contentsRef">

      <router-view 
        :base="site.baseUrl"
        :navs="nav"
        :pid.sync="pid">
      </router-view>

    </div>

    
    
  </div>
</template>

<script>
import { EventBus } from './bus'
import { genGet } from './request'
import { decodeRichText, setCookie, getCookie } from './utils'
import scrollTo from 'scroll-to'
import hheader from './components/header'
import topping from './components/topping'

export default {
  name: 'app',
  components: {
    topping,
    hheader
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
      supRef: {},
      showTopping: true,
      animating: false,
      currentPosi: 0,
      damping: 20,

    }
  },
  created(){

    var that = this

    // Get Data
    this.getSiteData()

    // Receiving to post
    // Goint to throw an error if use directly in created
    EventBus.$on('toPost', function(pid){
      that.pid = pid
      that.toPage('/post')
    })

    EventBus.$on("toPage", function(data){
      that.toPage(data)
    })

    EventBus.$on("toTopping", function(data){
      that.scrollToTopping()
    })
    
  },
  mounted(){
    var that = this
    if(getCookie("topping").length < 1){
      this.scrollToMain("first")
    }
    
    window.addEventListener('wheel', function(e) {

      /*if(that.currentPosi === 1 && window.scrollY < that.headerY - that.damping && !that.animating){
        that.scrollToTopping()
        document.getElementById('sup').style.opacity = 1
        document.getElementById('hheader').style.opacity = 0
        document.getElementById('contents').style.opacity = 0
        
      } 

      else*/ 
      if(that.currentPosi === 0 && window.scrollY > that.headerY - 400 && !that.animating){
        that.scrollToMain("o")
        document.getElementById('sup').style.opacity = 0
      }
    })
  },

  watch:{
    loaded: function () {
      if(this.loaded && getCookie("topping") === "true"){
        this.showTopping = false
        setTimeout(()=>{
          this.displayContent()
        }, 400)
        
      }
    }
  },
  methods:{

    displayContent () {
      this.$refs.headerRef.$el.style.opacity = 1
      this.$refs.contentsRef.style.opacity = 1
    },

    scrollToMain (mode) {
      this.animating = true
      var that = this
      var time
      if(mode === "first"){
        time = 3000
      } else {
        time = 60
      }
      setTimeout(()=>{
          if(that.loaded){
            that.$refs.headerRef.$el.style.opacity = 1
            that.$refs.contentsRef.style.opacity = 1
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

      // Set other content transparent
      that.$refs.headerRef.$el.style.opacity = 0
      that.$refs.contentsRef.style.opacity = 0

      scrollTo(0, 30, {
        ease: 'inOutQuart',
        duration: 100
      })
      
      
      setTimeout(()=>{
        this.showTopping = true
        this.$nextTick(()=>{
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

          // Get header render X value
          that.$nextTick(()=>{
            that.headerY = that.$refs.headerRef.$el.offsetTop
            that.supRef = that.$refs.sup
          })
          
        }

      })

    },
    toPage(path){
      this.$router.push({ path: path })
    },
    inGap (val, gap) {
      if(val > gap.high && val< gap.low){
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>

*{
  margin:0;
  padding:0;
}

#app {
  height:auto;
  width:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:#333;
}

#sup{
  position:absolute;
  top:-50px;
  left: 50%;
  right: 50%;
  z-index:999;
  transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

#sup img{
  width:40px;
}

#topping{
  height: 590px;
}

#hheader{
  opacity: 0;
  height:100px;
  transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

#contents{
  opacity: 0;
  height:1000px;
  width: 1224px;
  overflow: hidden;
  margin-top:30px;
  margin-left:auto;
  margin-right:auto;
}
</style>
