<template>
    <div id="all">

        <div id="posts">
            <div id="posts-inner">
                <div class="post-single" v-for="item in postsList" :key="item.id">
                    <router-link :to="{ path:'/post', query: { pid: item.id} }">
                        <div class="post-single-title">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="post-single-filter"></div>
                        
                        <img :src="base + item.title_img" :alt="item.title">
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
                        <a :href="base + item.val.val" target="_blank" style="display: flex; margin-left: auto; margin-right: auto;">
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
import { EventBus } from '../../bus'
import { genGet } from '../../request'
import iimage from '../widgets/iimage'

export default {
    name: "home",
    components:{
        iimage
    },
    props:{
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
        }
    },
    created(){
        this.getPosts(this.page)
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
                if(res.status){
                    that.postsTotal = res.data.total
                    that.postsList = res.data.data
                    that.pagesTotal = Math.ceil(that.postsTotal / that.pageSize)
                }
            })

            EventBus.$emit("show-footer", true)
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

#posts{
    width:100%;
}

#posts-inner{
    display:flex;
    flex-wrap: wrap;
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