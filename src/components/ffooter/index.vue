<template>

    <div id="ffooter">
        <div id="f-inner">
            <div id="f-logo" v-on:click="toTop">
                <img :src="parseTitleImg(bottomLogo)" alt="logo">
            </div>

            <div id="f-info">
                <span>Design by JIANFENG WU | Powered by POSTER <a href="http://www.miit.gov.cn/">{{icpNum.length>0 ? "|&nbsp;" + icpNum : ""}}</a></span>
            </div>
        </div>
        
    </div>
    
</template>

<script>

import scrollTo from 'scroll-to'
import { parseDiffImg } from '../../utils'
//import { EventBus } from '../../bus'

export default {
    name:"ffooter",
    props:{
        bottomLogo: String,
        icpNum: String,
        base: String
    },
    components:{

    },
    data(){
        return{

        }
    },
    created(){
        //var that = this
    },
    methods:{
        toTop(){
            scrollTo(0, 0, {
              ease: 'inOutQuart',
              duration: 500
            })
        },
        parseTitleImg(url){
            return parseDiffImg(this.base, url);
        }
    }
}
</script>

<style scoped>

#ffooter{
    position: relative;
    height: 150px;
    width: 100%;
    background: rgba(255,255,255,1);
    user-select: none;
}

#f-inner{
    text-align: center;
    width: 500px;
    padding-top: 40px;
    margin-left: auto;
    margin-right: auto;
}

#f-logo{
    cursor: pointer;
}

#f-logo img{
    width: 200px;
}

#f-info{
    color: #000000;
    margin-top: 8px;
    font-size: 14px;
    opacity: .4;
}

#f-info a{
    text-decoration: none;
    color: #000000;
}

@media only screen and (max-device-width: 812px)  { 
    #f-inner {
        width: 100%;
        padding-top: 20px;
    }

    #f-logo img{
        width: 160px;
    }
}



</style>