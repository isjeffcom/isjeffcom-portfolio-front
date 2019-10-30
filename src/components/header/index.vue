<template>

    <div id="hheader">
        <div id="hheader-inner">
            <router-link :to="{ path:'/home'}">
            <div id="hheader-left" ref="hl">
                <img :src="base + leftLogo" alt="Logo">
            </div>
            </router-link>

            <div id="hheader-center" ref="hc">
                <img id="hheader-center-logo" :src="base + centerLogo" alt="Name">
                <img id="hheader-center-upbtn" src="../../assets/sup.png" alt="Name">
            </div>

            <div id="hheader-right">
                <div class="hheader-sm" v-if="mode != 'post' && !mobileView">
                    <div class="hheader-sm-single" v-for="item in socialMedia" :key="item.id">
                        <a :href="item.url"><img :src="base + item.icon" :alt="item.name" class="hheader-sm-single-img"></a>
                    </div>
                </div>
                

                <div class="hheader-switcher" v-if="mode == 'post'">
                    <span class="hheader-switcher-single" v-on:click="switchLang(0, false)" :style="lang == 0 ? 'font-weight: bold' : 'font-weight: normal'">ENG</span> 
                    <span> / </span> 
                    <span class="hheader-switcher-single" v-on:click="switchLang(1, false)" :style="lang == 1 ? 'font-weight: bold' : 'font-weight: normal'">中文</span>
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
            mobileView: isMobile(),
            mode: "home"
        }
    },
    watch:{
        '$route': 'initial'
    },
    mounted(){
        if(this.mobileView){
            var hc = document.getElementById('hheader-center')
            var hl = document.getElementById('hheader-left')
            var hr = document.getElementById('hheader-right')


            window.addEventListener('scroll', function(e) {
                if(window.scrollY > 10){
                    hc.style.opacity = 1
                    hl.style.opacity = 0
                    hr.style.top = "-11px"
                } else {
                    hc.style.opacity = 0
                    hl.style.opacity = 1
                    hr.style.top = "3px"
                }
            });
        }
    },
    created(){
        var that = this
        this.initial()

        EventBus.$on("switchLangSync", (d)=>{
            that.switchLang(d, true)
        })
    },
    methods:{
        initial () {
            this.lang = 0
            
            this.mode = this.$route.name

            if(this.mobileView && this.mode == "home"){
                this.$nextTick(()=>{
                    this.$refs.hl.style.left = "41%"
                    this.$refs.hc.style.left = "0px"
                })
            }
            
            if(this.mobileView && this.mode != "home"){
                this.$nextTick(()=>{
                    this.$refs.hl.style.left = "2%"
                    this.$refs.hc.style.left = "-100px"
                })
            }
        },
        switchLang(data, sync) {
            this.lang = data
            if(!sync){
                EventBus.$emit('switchLang', data)
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
    transition: all 0.32s cubic-bezier(.25,.8,.25,1);
}

#hheader-left img{
    width:100px;
}

#hheader-center{
    width: 300px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    transition: all 0.32s cubic-bezier(.25,.8,.25,1);
}

#hheader-center:hover #hheader-center-logo{
    opacity: 0;
    transform: translateY(-30px);
}

#hheader-center:hover #hheader-center-upbtn{
    opacity: 1;
    transform: translateY(-60px);
}


#hheader-center img{
    width:300px;
}

#hheader-right{
    position: absolute;
    top:20px;
    right:50px;
    transition: all 0.32s cubic-bezier(.25,.8,.25,1);
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
    opacity: 1;
    transition: all 0.32s cubic-bezier(.25,.8,.25,1);
}

#hheader-center-upbtn{
    opacity:0;
    width:300px !important;
    margin-top: -50px;
    transition: all 0.32s cubic-bezier(.25,.8,.25,1);
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
        left: 2%;
        top: 15px;
    }

    #hheader-center{
        width: 100%;
        margin-top: 0px;
        position: absolute;
        left: -100px;
    }

    #hheader-center img{
        width: 50%;
        margin-top: 0px;
    }

    #hheader-left img{
        width: 70px;
    }

    #hheader-right {
        position: absolute;
        top: 3px;
        right: 10px;
    }

    #hheader-center{
        opacity: 0;
        pointer-events: none;
    }

    
}
</style>