<template>
    <div id="post" v-if="loaded">
        <div id="post-title">
            <div id="post-inner">
                <span>{{lang === 0 ? postData.title : postData.title_sublang}}</span>
            </div>
        </div>

        <div id="post-title-img">
            <div id="post-title-img-inner">
                <iimage :isrc="base + postData.title_img" :ialt="'title image'" :width="'100%'" :height="'500px'"></iimage>
            </div>
        </div>

        <div id="post-contents" v-if="loaded">
            <span id="posts-contents-cont" v-html="lang === 0 ? postData.content : postData.content_sublang"></span>
        </div>
    </div>
</template>

<script>
import { genGet } from '../../request'
import iimage from '../../components/widgets/iimage'
import { decodeRichText, decodeImgSrc } from '../../utils'

export default {
    name: 'post',
    components:{
        iimage
    },
    props:{
        base: String,
        pid: {
            type: String,
            default: 1
        }
    },
    data(){
        return{
            api: "https://api.isjeff.com/pot/front/posts/",
            loaded: false,
            lang:0,
            postData: {},

        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData () {
            var that = this
            
            genGet(this.api, [{name: "pid", val: this.pid}], (res)=>{
                if(res.status){

                    that.postData = res.data.data[0]
                    that.postData.content = decodeRichText(that.postData.content)
                    that.postData.content = decodeImgSrc(that.postData.content, that.base)
                    that.$nextTick(()=>{
                        that.loaded = true
                    })

                    that.postData.content_sublang = decodeRichText(that.postData.content_sublang)
                    console.log(that.postData)
                }
            })
        }
    }
}
</script>

<style scoped>


#post-contents{
    text-align: left;
}

</style>