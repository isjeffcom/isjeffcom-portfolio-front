<template>

    <div id="hheader">
        <div id="hheader-inner">
            <router-link :to="{ path:'/home'}">
            <div id="hheader-left">
                <img :src="base + leftLogo" alt="Logo">
            </div>
            </router-link>

            <div id="hheader-center" ref="cl" @mouseenter="showCNName()" @mouseleave="showCNName()">
                <img id="hheader-center-logo" :src="base + centerLogo" alt="Name" v-show="nameLogoShown">
                <img id="hheader-center-upbtn" src="../../assets/sup.png" alt="Name" v-show="!nameLogoShown">
            </div>

            <div id="hheader-right">
                <div class="hheader-sm" v-if="mode != 'post'">
                    <div class="hheader-sm-single" v-for="item in socialMedia" :key="item.id">
                        <a :href="item.url"><img :src="base + item.icon" :alt="item.name" class="hheader-sm-single-img"></a>
                    </div>
                </div>
                

                <div class="hheader-switcher" v-if="mode == 'post'">
                    <span class="hheader-switcher-single" v-on:click="switchLang(0)" :style="lang == 0 ? 'font-weight: bold' : 'font-weight: normal'">ENG</span> 
                    <span> / </span> 
                    <span class="hheader-switcher-single" v-on:click="switchLang(1)" :style="lang == 1 ? 'font-weight: bold' : 'font-weight: normal'">中文</span>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

import { EventBus } from '../../bus'
import { isMobile } from '../../utils' 

export default {
    name:"hheader",
    props:{
        base: String,
        leftLogo: String,
        centerLogo: String,
        socialMedia: Array
    },
    components:{

    },
    data(){
        return{
            nameLogoShown: true,
            animating: false,
            lang: 0,
            mode: "home"
        }
    },
    watch:{
        '$route': 'initial'
    },
    mounted(){
        if(isMobile()){
            var hc = document.getElementById('hheader-center')
            var hl = document.getElementById('hheader-left')
            window.addEventListener('scroll', function(e) {
                if(window.scrollY > 10){
                    hc.style.opacity = 1
                    hl.style.opacity = 0
                } else {
                    hc.style.opacity = 0
                    hl.style.opacity = 1
                }
            });
        }
    },
    created(){
        this.initial()

        
        
    },
    methods:{
        initial () {
            this.lang = 0
            this.mode = this.$route.name
        },
        switchLang(data) {
            this.lang = data
            EventBus.$emit('switchLang', data)
        },

        showCNName(){


            if(this.nameLogoShown){
                this.$refs.cl.style.opacity = 0
                setTimeout(()=>{
                    this.$refs.cl.style.opacity = 1
                    this.nameLogoShown = false
                }, 400)

                
            } else {
                this.$refs.cl.style.opacity = 0
                setTimeout(()=>{
                    this.$refs.cl.style.opacity = 1
                    this.nameLogoShown = true
                }, 400)

            }
            
        }
    }
}
</script>

<style scoped>
@keyframes fadeAndShow {
    0% {opacity:1}
    50% {opacity:0}
    0% {opacity:1}
}

#hheader{
    user-select: none;
}

#hheader-inner{
    width: 100%;
    display: flex;
}

#hheader-left{
    position:absolute;
    left:34px;
    top:16px;
    cursor: pointer;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

#hheader-left img{
    width:100px;
}

#hheader-center{
    width: 300px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}



#hheader-center img{
    width:300px;
}

#hheader-right{
    position: absolute;
    top:20px;
    right:50px;
}

.hheader-sm{
    display:flex;
    text-align: right;
    margin-top:35px;
}

.hheader-sm-single{
    margin-left:30px;
}

.hheader-sm-single img{
    width:30px;
    height:30px;
    object-fit: contain;
}

#hheader-center-logo{
    transition: all 0.2s cubic-bezier(.25,.8,.25,1);
}

#hheader-center-upbtn{
    width:300px !important;
    transition: all 0.2s cubic-bezier(.25,.8,.25,1);
}

.hheader-switcher{
    margin-top: 32px;
}

.hheader-switcher-single{
    cursor: pointer;
}

@media only screen and (max-device-width : 812px)  { 
    #hheader-left{
        position: absolute;
        left: 41%;
        top: 20px;
    }

    #hheader-center{
        width: 100%;
        margin-top: 0px;
    }

    #hheader-center img{
        width: 50%;
        margin-top: 0px;
    }

    #hheader-left img{
        width: 70px;
    }

    #hheader-right {
        display: none;
    }

    #hheader-center{
        opacity: 0;
        pointer-events: none;
    }

    
}
</style>