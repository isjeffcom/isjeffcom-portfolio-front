<template>
    <div id="all">

        <div id="posts">
            <div id="posts-inner">
                <div class="post-single" v-for="item in blogsList" :key="item.id">
                    
                    <div class="post-single-topbar">
                        <div class="post-single-author">
                            <div class="post-single-author-avator">
                                <img :src="parseTitleImg(item.users[0].avatar)" alt="Author avatar">
                            </div>

                            <div class="post-single-author-info">

                                <div class="post-single-author-name">
                                    <span>{{item.users[0].name}}</span>
                                </div>

                                <div class="post-single-date">
                                    <span>{{item.date_modi ? item.date_modi.slice(5,10) : "2910-01-01"}} · {{item.ux_visit}} views</span>
                                </div>

                            </div>

                        </div>

                        <div class="post-single-like">
                            <div class="post-single-like-count">
                                <span>{{item.ux_likes}}</span>
                            </div>
                            <div class="post-single-like-icon">
                                <img src="../../assets/like.png" alt="">
                            </div>
                        </div>
                    </div>

                    <router-link :to="{ path:'/post', query: { pid: item._id, from: 'blog'} }">

                        <div class="post-single-titleimg">
                            <div class="post-single-filter"></div>
                            <iimage :isrc="parseTitleImg(item.title_img)" :ialt="item.title" :width="'100%'" :height="'330px'"></iimage>
                        </div>

                    
                        <div class="post-single-content">
                            <div class="post-single-content-title">
                                <span>{{item.title}}</span>
                            </div>

                            <div class="post-single-content-brief">
                                <span>{{item.brief}}</span>
                            </div>
                        </div>
                    
                    </router-link>

                    <hr style="opacity: .2">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { genGet } from '../../request';
import { EventBus } from '../../bus';
import iimage from '../widgets/iimage';
import { cosUseAccelerate, parseDiffImg } from '../../utils';

//import { isMobile } from '../../utils'

export default {
    name: "home",
    components:{
        iimage
    },
    props:{
        base: String,
        files: Array,
    },
    data(){
        return{
            api: "/front/posts/",
            page: 1,
            blogsList: [],
            postsTotal: 0,
            pagesTotal: 0,
            pageSize: 10,

        }
    },
    created(){
        // Hard Fix, attention needed!!!!!
        if(!this.$route.query.cate){
            this.$router.push({ query: { cate: "62d581d423bbc91225ed338e" } });
        }

        this.getData(this.page);
    },

    activated(){
        EventBus.$emit("set-meta", {title: "Blog", des: this.siteDes});
    },
    methods:{
        getData(page){
            const that = this;
            const ls = this.pageToLimit(page);
            const param = page ? [ 
                {
                    name: "ls", 
                    val: ls
                }, 
                { 
                    name: "size",
                    val: this.pageSize
                } 
            ] : [];

            param.push({name: "cate", val: this.$route.query.cate});

            genGet(this.base + this.api, param, (res)=>{
                console.log(res);
                if(res.status){
                    that.postsTotal = res.total;
                    that.blogsList = res.data;
                    console.log(that.blogsList);
                    that.pagesTotal = Math.ceil(that.postsTotal / that.pageSize);
                }
            })

            EventBus.$emit("show-footer", true);
            EventBus.$emit("set-meta", {title: "Blog", des: this.siteDes});
        },

        sPage (mode) {
            
            if(mode === 1 && this.page !== this.pagesTotal){
                this.page = this.page + 1;
            } 
            else if(mode === 0 && this.page != 1) {
                this.page = this.page - 1;
            } 
            else {
                return false;
            }
            
            this.getPosts(this.page);
        },

        pageToLimit ( val ) {
            return (val - 1) * this.pageSize;
        },

        parseTitleImg(url){
            return parseDiffImg(this.base, cosUseAccelerate(url));
        }

        
    }
}
</script>

<style scoped>

::-webkit-scrollbar {
  width: 0 !important;
}


#posts{
    width: 800px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    text-decoration: none !important;
}

.post-single{
    margin-bottom: 50px;
}

.post-single-topbar{
    width: 100%;
    height:60px;
    display: flex;
    position: relative;
}

.post-single-author{
    color: var(--text-normal);
    display: flex;
}

.post-single-author-info span{
    margin-left: 14px;
}


.post-single-author-avator{
    width: 40px;
    height: 40px;
    border-radius: 100px;
    overflow: hidden;
}

.post-single-author-avator img{
    width: 40px;
}

.post-single-date{
    opacity: .5;
    font-size: 14px;
}

.post-single-like{
    position:absolute;
    right: 10px;
    display:flex;
    opacity: .85;
}

.post-single-like-count{
    font-family: fblack;
    font-weight: bold;
    color:var(--text-normal);
    margin-right: 6px;
    font-size:20px;
}

.post-single-like-icon{
    margin-top:4px;
}

.post-single-like img{
    width: 24px;
}

.post-single-content{
    color: var(--text-normal);
    margin-top: 12px;
    margin-bottom: 50px;
    opacity: .85;
    transition: all 0.32s cubic-bezier(.25,.8,.25,1);
}

.post-single-content:hover{
    opacity: 1;
}

.post-single-content-title{
    font-family: fblack;
    font-weight: bold;
    font-size: 36px;
    width: 640px;
}


.post-single-content-brief{
    margin-top: 8px;
}

.post-single-titleimg{
    width: 100%;
    height: 330px;
    border-radius: 24px;
    overflow: hidden;
}

.post-single-filter{
    width: 100%;
    height: 330px;
    margin-bottom: -330px;
    background: rgba(0,0,0,1);
    transition: all 0.32s cubic-bezier(.25,.8,.25,1);
}

.post-single-titleimg:hover .post-single-filter{
    background: rgba(0,0,0,0);
}




@media only screen and (max-device-width : 900px)  { 



    #posts{
        width:100%;
        margin-top: 20px;
    }

    .post-single-author-avator{
        width: 35px;
        height: 35px;
    }

    .post-single-author-name{
        font-size: 14px;
    }

    .post-single-like{
        top:4px;
    }

    .post-single-like-count{
        margin-top: 2px;
        font-size: 16px;
    }

    

    .post-single-date{
        font-size: 12px;
    }

    .post-single-like img{
        width: 20px;
    }

    .post-single-titleimg{
        border-radius: 4px;
    }

    .post-single-content-title{
        font-size: 22px;
        width: 100%;
    }

    .post-single-content-brief{
        width: 100%;
        font-size: 16px;
    }

       
 }
</style>