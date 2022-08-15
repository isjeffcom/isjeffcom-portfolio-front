<template>
    <div id="all">

        <!-- <div id="home-avatar">
            <avatar></avatar>
        </div> -->

        <div id="namecard-trigger" ref="namecardTrigger" v-if="!mobileView">
            <div id="namecard-cont" ref="namecardContainer">
                <namecard></namecard>
            </div>
        </div>
        <div
            v-if="!mobileView"
            id="namecard-bg"
            ref="namecardBg"
            :style="`
                transform: translateX(${namecardEnabled ? 0 : -500}px);
                opacity: ${namecardEnabled ? 1 : 0};
                pointer-events: ${namecardEnabled ? 'auto' : 'none'}`">
        </div>

        <div id="posts">
            <div id="posts-inner">
                <div class="post-single" v-for="item in postsList" :key="item._id">
                    <router-link :to="{ path:'/post', query: { pid: item._id, from: 'home'} }">
                        <div class="post-single-title">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="post-single-filter"></div>
                        
                        <img :src="parseTitleImg(item.title_img)" :alt="item.title">
                    </router-link>
                </div>
            </div>
        </div>


        <div id="pagination" v-if="postsTotal > 9">
            <div id="p-nav">
                <div class="p-single arrow-left" :style="page === 1 ? 'opacity: .1' : 'opacity: 1'" v-on:click="sPage(0)"></div>
                <div class="p-single arrow-right" :style="page === pagesTotal  ? 'opacity: .1' : 'opacity: 1'" v-on:click="sPage(1)"></div>
            </div>
        </div>

        <div id="files">
            <div class="files-cont">
                <div class="file-single" v-for="(item, key) in files" :key="key">
                    <div class="file-single-inner">
                        <a :href="item.val.val.indexOf('http') != -1 ? item.val.val : base + item.val.val" target="_blank" style="display: flex; margin-left: auto; margin-right: auto;">
                            <div class="file-down-icon">
                                <img src="../../assets/download.svg" alt="">
                            </div>

                            <div class="file-down-name">
                                <span>{{item.name}}</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script>
// import avatar from '../avatar'
import { EventBus } from '../../bus';
import { genGet } from '../../request';
import { isMobile, parseDiffImg } from '../../utils';
import namecard from '../namecard'
//import iimage from '../widgets/iimage'

export default {
    name: "home",
    components:{
        namecard,
        // avatar,
        //iimage
    },
    props:{
        siteName: String,
        siteDes: String,
        base: String,
        navs: Array,
        files: Array
    },
    data(){
        return{
            api: "/front/posts/",
            page: 1,
            postsList: [],
            postsTotal: 0,
            pagesTotal: 0,
            pageSize: 9,
            namecardEnabled: false,
            mobileView: false,
        }
    },
    created(){
        this.getPosts(this.page);
        this.mobileView = isMobile();
    },
    mounted() {
        // When 3d avatar ready
        EventBus.$on("avatar-ready", () => {
            this.$refs.namecardTrigger.addEventListener("mouseover", () => {
                if(this.namecardEnabled) return;
                this.$refs.namecardContainer.style.transform = "translateX(-452px)";
            });

            this.$refs.namecardTrigger.addEventListener("mouseleave", () => {
                if(this.namecardEnabled) return;
                this.$refs.namecardContainer.style.transform = "translateX(-500px)";
            });

            this.$refs.namecardTrigger.addEventListener("click", () => {
                this.namecardEnabled = true;
                this.$refs.namecardContainer.style.transform = "translateX(0px)";
            });

            this.$refs.namecardBg.addEventListener("click", () => {
                this.namecardEnabled = false;
                this.$refs.namecardContainer.style.transform = "translateX(-500px)";
            })

        })
    },
    watch: {
        namecardEnabled() {
            EventBus.$emit("avatar-render", this.namecardEnabled);
        }
    },  
    activated(){
        EventBus.$emit("set-meta", {title: "Home", des: this.siteDes})
    },
    methods:{
        getPosts(page){
            var that = this
            var ls = this.pageToLimit(page)
            var param = page ? [ 
                {
                    name: "ls", 
                    val: ls
                }, 
                { 
                    name: "size",
                    val: this.pageSize
                } 
            ] : []
            if(this.$route.query.cate){
                param.push({name: "cate", val: this.$route.query.cate})
            }

            genGet(this.base + this.api, param, (res)=>{
                console.log(res)
                if(res.status){
                    that.postsTotal = res.total
                    that.postsList = res.data
                    that.pagesTotal = Math.ceil(that.postsTotal / that.pageSize)
                }
            })

            EventBus.$emit("show-footer", true)
            EventBus.$emit("set-meta", {title: "Home", des: this.siteDes})
        },

        sPage (mode) {
            if(mode === 1 && this.page !== this.pagesTotal){
                this.page = this.page + 1
            } 
            else if(mode === 0 && this.page != 1) {
                this.page = this.page - 1
            } 
            else {
                return false
            }
            
            this.getPosts(this.page)
        },

        pageToLimit ( val ) {
            return (val - 1) * this.pageSize
        },

        parseTitleImg(url){
            return parseDiffImg(this.base, url);
        }
        
    }
}
</script>

<style scoped>

::-webkit-scrollbar {
  width: 0 !important;
}


/* icons */
.arrow-right {
  width: 0; 
  height: 0; 
  border-top: 14px solid transparent;
  border-bottom: 14px solid transparent;
  border-left: 18px solid #333333;
}

.arrow-left {
  width: 0; 
  height: 0; 
  border-top: 14px solid transparent;
  border-bottom: 14px solid transparent; 
  border-right: 18px solid #333333; 
}

#all{
  user-select: none;
}

#home-avatar{
    position: fixed;
    left: 0px;
    bottom: 0px;
    height: 100%;
    width: 100%;
}

#posts{
    width:100%;
}

#posts-inner{
    display:flex;
    flex-wrap: wrap;
}

#namecard-trigger{
    position: fixed;
    width: 200px;
    height: 85%;
    left: 0px;
    bottom: 0px;
    background: rgba(255,0,0,0);
    z-index: 999;
}

#namecard-cont{
    transform: translateX(-500px);
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

#namecard-bg{
    position: fixed;
    width: 100%;
    height: 90%;
    left: 0px;
    bottom: 0px;
    background: linear-gradient(90deg, #FFFFFF 20%, rgba(255, 255, 255, 0) 100%);
    z-index: 998;
}

.post-single{
    position: relative;
    width:360px;
    height:280px;
    margin-left: 36px;
    margin-right: 36px;
    margin-bottom:30px;
    cursor: pointer;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.post-single-title{
    position: absolute;
    font-family: fblack;
    color: #ffffff;
    font-size: 18px;
    top: 40%;
    width: 100%;
    z-index: 3;
    opacity: 0;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.post-single-filter{
    position:absolute;
    width:100%;
    height:100%;
    background: rgba(0,0,0,1);
    opacity: .1;
    z-index:2;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.post-single img{
    width:360px;
    height:280px;
    object-fit: cover;
    filter: grayscale(10%);
    z-index:1;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.post-single:hover img{
    filter: grayscale(0%);
}

.post-single:hover .post-single-filter{
    opacity: .7;
}

.post-single:hover .post-single-title{
    opacity: 1;
}


#pagination{
    margin-top: 80px;
    width:100%;
}

#p-nav{
    display:flex;
    width:300px;
    align-items: center;
    margin-left:auto;
    margin-right: auto;
}

#p-nav div{
    flex:1;
}

.p-single{
    cursor: pointer;
    margin-left: 30px;
    margin-right: 30px;
}

#files{
    text-align: center;
    height:80px;
    width: 100%;
    margin-top: 100px;
}

.files-cont{
    width: 800px;
    display: flex;
    align-content: center;
    margin-left: auto;
    margin-right: auto;
}

.file-single{
    flex: 1;
    margin-left:30px;
    margin-right:30px;
}

.file-single-inner a{
    text-decoration: none;
}

.file-single-inner{
    display: flex;
}

.file-down-name{
    color:#000;
    text-decoration: none;
    margin-left: 14px;
}

@media only screen and (max-width : 812px)  { 
  .post-single{
    width: 360px;
    height: 280px;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 20px;
  }

  #files{
    margin-top: 40px;
    height: 120px;
  }

  .files-cont{
      width: 100%;
      display: block;
  }

  .file-single{
    margin-top: 24px;
    margin-bottom: 24px;
  }
}

</style>