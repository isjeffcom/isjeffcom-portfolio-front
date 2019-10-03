<template>
    <div id="all">
        <div id="nav">
            <div id="nav-inner">
                <div class="nav-single" v-for="item in navs" :key="item.id">
                    <a :href="item.url">{{item.name}}</a>
                </div>
            </div>
        </div>

        <div id="posts">
            <div id="posts-inner">
                <div class="post-single" v-for="item in postsList" :key="item.id"  v-on:click="toSingle(item.id)">
                    <div class="post-single-filter"></div>
                    <!--iimage :isrc="base + item.title_img" :ialt="item.title" :width="'360px'" :height="'260px'"></iimage-->
                    <img :src="base + item.title_img" :alt="item.title">
                </div>
            </div>
        </div>

        <div id="pagination" v-if="postsTotal != pageSize">
            <div id="p-nav">
                <div class="p-single arrow-left" :style="page === 1 ? 'opacity: .1' : 'opacity: 1'" v-on:click="sPage(1)"></div>
                <div class="p-single arrow-right" :style="page === pagesTotal  ? 'opacity: .1' : 'opacity: 1'" v-on:click="sPage(0)"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { genGet } from '../../request'
import { EventBus } from '../../bus'
import iimage from '../widgets/iimage'

export default {
    name: "home",
    components:{
        iimage
    },
    props:{
        base: String,
        navs: Array
    },
    data(){
        return{
            api: "https://api.isjeff.com/pot/front/posts/",
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

            genGet(this.api, param, (res)=>{
                if(res.status){
                    that.postsTotal = res.data.total
                    that.postsList = res.data.data
                    that.pagesTotal = Math.ceil(that.postsTotal / that.pageSize)
                }
            })
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

        toSingle(pid){
            EventBus.$emit('toPost', pid)
            //this.$router.push( { path: '/post' } )
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


#nav{
    width:100%;
    height:48px;
    margin-top:10px;
    margin-bottom: 36px;
}

#nav-inner{
    width: 480px;
    height: 48px;
    display: flex;
    margin-left:auto;
    margin-right:auto;
}

.nav-single{
    width:auto;
    margin-left:auto;
    margin-right:auto;
    text-align: center;
    opacity: .8;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.nav-single:hover{
    opacity: 1;
}

.nav-single a{
    color:#333;
    text-decoration: none;
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
    margin-right:72px;
    cursor: pointer;
}

.post-single:hover img{
    filter: grayscale(0%);
}

.post-single-filter{
    position:absolute;
    width:100%;
    height:100%;
    background: rgba(0,0,0,1);
    opacity: .1;
    z-index:2;
}

.post-single img{
    width:360px;
    height:280px;
    object-fit: cover;
    filter: grayscale(100%);
    z-index:1;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
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

</style>