<template>
    <div id="post" v-if="loaded">
        <div id="post-title">
            <div id="post-title-inner">
                <span>{{lang === 0 ? postData.title : postData.title_sublang}}</span>
            </div>

            <div id="post-title-info">
                <span>{{postData.name}} | {{postData.date_pub}} | {{postData.ux_visit}} Views</span>
            </div>
        </div>

        <div id="post-title-img" v-if="postData.title_img.length > 1">
            <div id="post-title-img-inner">
                <iimage :isrc="base + postData.title_img" :ialt="'title image'" :width="'100%'" :height="'340px'" :mode="'grey'"></iimage>
            </div>
        </div>

        <div id="post-contents">
            <div id="posts-contents-cont" v-html="lang === 0 ? postData.content : postData.content_sublang"></div>
            <div id="posts-content-end">
                <div id="posts-content-end-inner">
                    <span> - END - </span>
                </div>
            </div>
        </div>

        <div id="post-like">
            <div id="post-like-inner">
                <div id="post-like-icon" v-on:click="like">
                    <!--div id="post-like-icon-bg" :style="!liked ? 'transform: rotate(15deg);' : 'transform: rotate(90deg);background-color: #FF8791'"></div-->
                    <div id="post-like-icon-bg" :style="'transform: rotate(' + like_rotate + 'deg)'"></div>
                    <img src="../../assets/like.png" alt="Like">
                </div>
                <div id="post-like-count">
                    <span><span style="font-weight: bold;">{{postData.ux_likes}}</span> Likes</span>
                </div>
            </div>
        </div>

        <transition name="up">

            <div id="post-popup" v-if="popup">

                <div id="post-popup-inner">
                    <div id="post-popup-info">
                        <span>{{popup_info}}</span>
                    </div>
                    <div id="post-popup-button" v-on:click="popupAct">{{popup_action}}</div>
                </div>
                
            </div>

        </transition>
        
        <image-viewer v-if="showImgViewer && viewingImg.length > 1" :imgWidth="viewingImgWidth" :imgHeight="viewingImgHeight" :path="viewingImg"></image-viewer>

    </div>
</template>

<script>
import { genGet, genUpdate, logView } from '../../request'

import { decodeRichText, decodeImgSrc, getCookie, setCookie } from '../../utils'
import { EventBus } from '../../bus'

import iimage from '../../components/widgets/iimage'
import imageViewer from '../../components/widgets/imgviewer'
import scrollTo from 'scroll-to'

export default {
    name: 'post',
    components:{
        iimage,
        imageViewer
    },
    props:{
        base: String,
        files: Array,
        siteName: String
    },
    data(){
        return{
            api: "/front/posts/",
            api_up: "/front/like/",
            api_view: "/front/view/",
            loaded: false,
            liked: false,
            like_posted: false,
            showImgViewer: false,
            lang:0,
            like_rotate: 15,
            postData: {},
            viewingImg: "",
            viewingImgWidth: 0,
            viewingImgHeight: 0,
            popup: false,
            popup_info: "",
            popup_action: "",
            shareTitle: "",
            shareDes: ""

        }
    },

    metaInfo() {
        return{
            title: this.shareTitle,
            titleTemplate: '%s - ' + this.siteName,
            meta: [
                { name: "description", content: this.shareDes },
            ],
            htmlAttrs: {
                lang: 'en',
                amp: true
            }
        }
      
    },

    mounted(){
        var that = this
        window.addEventListener('click', e => {
            if(e.target.nodeName == "IMG" && e.target.parentNode.nodeName == "P" && e.target.id != "iv-close"){
                that.handleImgViewer(e.target.src, e.target.naturalWidth, e.target.naturalHeight, true)
            }
        })
    },
    created(){
        var that = this

        EventBus.$emit("show-footer", false)

        this.pid = this.$route.query.pid
        this.getData()

        // If user share link with lang
        if(this.$route.query.lang == 1){
            this.lang = parseInt(this.$route.query.lang)
            this.switchLang(1, true)
        }
        
        // If user from China mainland
        else if(getCookie("v_region") == "CN"){
            this.switchLang(1, true)
            this.alertLang()
        } 
        
        // If no lang param than set up one
        else {
            this.setUrlParam()
        }

        // Check later (in case if IP check might return late)
        setTimeout(()=>{
            if(getCookie("v_region") == "CN" && this.lang == 0){
                this.switchLang(1, true)
                this.alertLang()
            }
        }, 3000)

        // If switch lang from navigation bar
        EventBus.$on("switchLang", function(data){
            that.switchLang(data, false)
        })

        // If image viewer closed
        EventBus.$on("img-viewer-close", function(data){
            that.handleImgViewer('', 0, 0, false)
        })

        // If not on top when open than scroll to top
        if(window.scrollY != 0){
            scrollTo(0, 0, {
              ease: 'inOutQuart',
              duration: 100
            })
        }
    },
    methods:{
        getData () {
            var that = this
            
            genGet(this.base + this.api, [{name: "pid", val: this.pid}], (res)=>{
                if(res.status){

                    that.postData = res.data.data[0]
                    
                    // Parse and decode data
                    that.postData.content = decodeRichText(that.postData.content)
                    that.postData.content = decodeImgSrc(that.postData.content, that.base)
                    
                    that.postData.ux_likes = parseInt(that.postData.ux_likes)
                    that.postData.date_pub = that.postData.date_pub.substr(0, that.postData.date_pub.length -9 )
                    that.postData.content_sublang = decodeRichText(that.postData.content_sublang)
                    that.postData.content_sublang = decodeImgSrc(that.postData.content_sublang, that.base)

                    that.$nextTick(()=>{
                        // Tell everyone we are ready
                        that.loaded = true
                        // Set meta for SEO and Share
                        that.setMeta()
                    })
                    
                }
                EventBus.$emit("show-footer", true)
            })

            // Log View
            logView(this.base + this.api_view, this.pid)
        },

        like () {

            this.liked = true
            
            this.postData.ux_likes = this.postData.ux_likes + 1
            this.like_rotate = this.like_rotate == 360 ? 0 : this.like_rotate + 15
            
            if(!this.like_posted){
                genUpdate(this.base + this.api_up, {pid: this.pid}, (res)=>{
                    if(res.status){
                        this.like_posted = true
                    }
                })
            }
        },

        showPopup (info, action, delay) {
            this.popup = true
            this.popup_info = info
            this.popup_action = action
            setTimeout(()=>{
                this.popup = false
            }, delay*1000)
        },

        popupAct (){
            this.switchLang(0, true)
            this.popup = false
            setCookie("v_region", 0, 0, true)
        },

        alertLang () {
            this.showPopup(
                "您可能在中国大陆地区，已切换为中文 You might visit from China mainland, post has been switch to Chinese.",
                "BACK",
                10
            )
        },

        switchLang (data, sync) {
            this.lang = data
            this.setMeta()
            this.setUrlParam()
            
        },

        handleImgViewer (data, width, height, bol) {

            this.showImgViewer = bol

            if(bol){
                this.viewingImg = data
                this.viewingImgWidth = width
                this.viewingImgHeight = height
            } else {
                this.viewingImg = ""
                this.viewingImgWidth = 0
                this.viewingImgHeight = 0
            }

        },

        // Set page meta for share
        setMeta () {
            this.shareTitle = this.lang == 0 ? this.postData.title : this.postData.title_sublang
            this.shareDes = this.lang == 0 ? this.postData.brief : this.postData.brief_sublang
        },

        // Save language settings when user share a post
        setUrlParam () {
            if(!this.$route.query.lang || this.$route.query.lang != parseInt(this.lang)){
                this.$router.push({ query: Object.assign({}, this.$route.query, { lang: this.lang }) })
            }
            
        }
    }
}
</script>

<style>

.up-enter-active {
  animation: poping-up .35s forwards;
}
.up-leave-active {
  animation: poping-up .35s reverse;
}

@keyframes poping-up {
  0% {
    opacity: 0;
    bottom: -40px;
  }
  100% {
    opacity: 1;
    bottom: 0px;
  }
}

#post-popup{
    position: fixed;
    width: 100%;
    bottom: 0px;
    left: 0px;
    height: 40px;
    color: #444444;
    font-weight: bold;
    background-color: #00FFC3;
    text-align:left;
    user-select: none;
}

#post-popup-info{
    width: 70%;
    margin-top: 8px;
    margin-left: 16px;
}

#post-popup-button{
    position: absolute;
    right: 20px;
    top: 7px;
    width: 59px;
    height: 24px;
    padding-top: 2px;
    padding-left: 20px;
    border-radius: 4px;
    background: rgba(0,0,0,0.1);
    cursor: pointer;
}


#post-title{
    width: 100%;
    margin-bottom: 30px;
}

#post-title-img{
    position:absolute;
    left:0px;
    width:100%;
    user-select: none;
}

#post-title-inner { 
    font-family: fblack;
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
    width: 900px;
}

#post-title-inner span{
    text-align:center;
    font-size: 54px;
}

#post-title-info{
    margin-top:15px;
    opacity: 0.5;
}

#post-contents{
    text-align: left;
    margin-top: 400px;
    margin-left: auto;
    margin-right: auto;
    width: 730px;
}

#posts-contents-cont{
    line-height: 32px;
}

#posts-contents-cont p{
    margin-bottom: 16px;
    line-height: 36px;
    font-size: 20px;
}

#posts-contents-cont li{
    margin-left: 24px;
}

#posts-contents-cont img{
    margin-top: 15px;
    margin-bottom: 15px;
    width: 100%;
    user-select: none;
}

#posts-contents-cont h1{
    margin-bottom: 20px;
}

#posts-contents-cont h2{
    margin-bottom: 20px;
}

#posts-contents-cont h3{
    margin-bottom: 20px;
}

#posts-contents-cont iframe{
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
}

#posts-content-end{
    opacity: .2;
    margin-top:100px;
    user-select: none;
}

#posts-content-end-inner{
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    width: 120px;
    margin-left: auto;
    margin-right: auto;
}

#post-like{
    margin-top: 100px;
    width:100%;
    height:200px;
    user-select: none;
}

#post-like-inner{
    width:100px;
    margin-left: auto;
    margin-right: auto;
}

#post-like{
    cursor: pointer;
    text-align: center;
}

#post-like-icon:hover img{
    margin-top: -51px;
    margin-left: -19px;
    width: 38px;
}

#post-like-icon:active img{
    margin-top: -51px;
    margin-left: -19px;
    width: 65px;
}

#post-like-icon:active #post-like-icon-bg{
    background-color: #FF6370;
}


#post-like-icon img{
    position: absolute;
    margin-top: -53px;
    margin-left: -23px;
    width: 45px;
    transition: all 0.22s cubic-bezier(.25,.8,.25,1);
}

#post-like-icon-bg{
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    width: 70px;
    height:70px;
    background-color:#00FFC3;
    transition: all 0.22s cubic-bezier(.25,.8,.25,1);
}

#post-like-count{
    opacity: .7;
    margin-top: 24px;
}

@media only screen and (max-device-width : 812px)  { 

    #post{ 
        margin-top: 70px;
    }
    #post-contents {
        width: 100%;
    }

    #posts-contents-cont iframe {
        width: 100%;
    }

    #post-title-inner span{
        font-size: 24px;
    }

    #post-title-inner{
        width: 90%;
    }

    #posts-contents-cont img{
        width: 100%;
    }

    #post-popup {
        height: 84px;
        font-size: 14px;
    }

    #post-popup-info {
        width: 75%;
        margin-top: 12px;
    }

    #post-popup-button{
        right: 16px;
        top: 20px;
        width: 48px;
        height: 34px;
        padding-top: 12px;
        padding-left: 13px;
        border-radius: 4px;
    }

    #posts-contents-cont p{
        font-size: 16px;
        line-height: 30px;
    }
}

</style>