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

        <div id="post-title-img">
            <div id="post-title-img-inner">
                <iimage :isrc="base + postData.title_img" :ialt="'title image'" :width="'100%'" :height="'380px'" :mode="'grey'"></iimage>
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
    </div>
</template>

<script>
import { genGet, genUpdate } from '../../request'
import iimage from '../../components/widgets/iimage'
import { decodeRichText, decodeImgSrc } from '../../utils'
import { EventBus } from '../../bus'

export default {
    name: 'post',
    components:{
        iimage
    },
    props:{
        base: String,
        files: Array
    },
    data(){
        return{
            api: "https://api.isjeff.com/pot/front/posts/",
            api_up: "https://api.isjeff.com/pot/front/like/",
            loaded: false,
            liked: false,
            like_posted: false,
            lang:0,
            like_rotate: 15,
            postData: {},

        }
    },
    created(){
        var that = this
        
        // Hide footer
        EventBus.$emit("ffooter", false)

        this.pid = this.$route.query.pid
        this.getData()

        EventBus.$on("switchLang", function(data){
            that.switchLang(data)
        })
    },
    methods:{
        getData () {
            var that = this
            
            genGet(this.api, [{name: "pid", val: this.pid}], (res)=>{
                if(res.status){

                    that.postData = res.data.data[0]
                    that.postData.content = decodeRichText(that.postData.content)
                    that.postData.content = decodeImgSrc(that.postData.content, that.base)
                    that.postData.ux_likes = parseInt(that.postData.ux_likes)
                    that.$nextTick(()=>{
                        that.loaded = true
                    })
                    that.postData.date_pub = that.postData.date_pub.substr(0, that.postData.date_pub.length -9 )

                    that.postData.content_sublang = decodeRichText(that.postData.content_sublang)
                    that.postData.content_sublang = decodeImgSrc(that.postData.content_sublang, that.base)
                    
                    // Show footer
                    EventBus.$emit("ffooter", true)
                }
            })
        },

        like () {

            this.liked = true
            
            this.postData.ux_likes = this.postData.ux_likes + 1
            this.like_rotate = this.like_rotate == 360 ? 0 : this.like_rotate + 15
            
            if(!this.like_posted){
                genUpdate(this.api_up, {pid: this.pid}, (res)=>{
                    if(res.status){
                        this.like_posted = true
                    }
                })
            }
        },

        switchLang (data) {
            this.lang = data
        }
    }
}
</script>

<style>

#post-title{
    width: 100%;
    margin-bottom: 50px;
}

#post-title-img{
    position:absolute;
    left:0px;
    width:100%;
    user-select: none;
}

#post-title-inner { 
    font-family: fblack;
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
    margin-top: 470px;
    margin-left: auto;
    margin-right: auto;
    width: 1120px;
}

#posts-contents-cont{
    line-height: 32px;
}

#posts-contents-cont img{
    margin-top: 15px;
    margin-bottom: 15px;
    user-select: none;
}

#posts-contents-cont iframe{
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
}

</style>