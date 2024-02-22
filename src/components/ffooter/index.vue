<template>

    <div id="ffooter">
        <div id="f-inner">

            <div id="f-avatar-ava">Avatar Loading {{avatarLoadingState2}}%</div>

            <div id="f-logo" v-on:click="toTop">
                <img :src="darkMode ? parseTitleImg(bottomLogoDark) : parseTitleImg(bottomLogo)" alt="logo">
            </div>

            <div id="f-info">
                <div style="display: flex; gap: 4px; width: 100%; justify-content: center; align-items: center;">
                    <div style="">Design by JIANFENG WU | Powered by POSTER</div>
                    <div v-if="isZHCN"><a href="https://beian.miit.gov.cn/">{{icpNum.length>0 ? "|&nbsp;" + icpNum : ""}}</a></div>
                    <div style="display: flex; gap: 4px; justify-content: center; align-items: center;">
                        <div> | </div>
                        <div style="display: flex; justify-content: center; align-items: center;">
                            <img src="/assets/icon/cnpolice.png" alt="" width="14px">
                        </div> 
                        <div>
                            <a v-if="isZHCN" href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002002492\" rel="noreferrer" target="_blank">粤公网安备44030002002492</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<script>

import scrollTo from 'scroll-to'
import { isDark, parseDiffImg, isNativeZHCN } from '../../utils'
import { EventBus } from '../../bus'
//import { EventBus } from '../../bus'

export default {
    name:"ffooter",
    props:{
        bottomLogo: String,
        bottomLogoDark: String,
        icpNum: String,
        base: String,
    },
    data(){
        return{
            darkMode: isDark(),
            avatarLoadingState: 0,
            avatarLoadingState1: 0,
            avatarLoadingState2: 0,
            isZHCN: false,
        }
    },
    created(){

        this.isZHCN = isNativeZHCN();

        // Listen color scheme change
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",   e => {
            this.darkMode = isDark();
        });

        EventBus.$on("avatar-loading-1", (data) => {
            const state = (data).toFixed(2);
            this.avatarLoadingState1 = state;
            this.avatarLoadingState = ((this.avatarLoadingState1 / 70) + (this.avatarLoadingState2 / 30)).toFixed(2);
        })

        EventBus.$on("avatar-loading-2", (data) => {
            const state = (data).toFixed(2);
            this.avatarLoadingState2 = state;
            this.avatarLoadingState = ((this.avatarLoadingState1 / 70) + (this.avatarLoadingState2 / 30)).toFixed(2);
        })
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
    height: 160px;
    width: 100%;
    background: transparent;
    user-select: none;
}

#f-avatar-ava{
    margin-bottom: 10px;
    opacity: 0;
    font-size: 9px;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

#f-avatar-ava:hover{
    opacity: 0.5;
}

#f-inner{
    text-align: center;
    width: 800px;
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
    color: var(--text-normal);
    margin-top: 8px;
    font-size: 14px;
    opacity: .4;
}

#f-info a{
    text-decoration: none;
    color: var(--text-normal);
}

@media only screen and (max-device-width: 900px)  { 
    #f-inner {
        width: 100%;
        padding-top: 20px;
    }

    #f-logo img{
        width: 160px;
    }
}



</style>