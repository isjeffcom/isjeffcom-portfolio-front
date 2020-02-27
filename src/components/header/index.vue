<template>

    <div id="hheader">
        <div id="hheader-inner">
            <div id="hheader-left" ref="hl" v-on:click="back()">
                <img :src="base + leftLogo" alt="Logo">
            </div>

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
                    <span class="hheader-switcher-single" v-on:click="switchLang(0, false)" :style="lang == 0 ? 'font-weight: bold;' : 'font-weight: normal;'">ENG</span> 
                    <span> / </span> 
                    <span class="hheader-switcher-single" v-on:click="switchLang(1, false)" :style="lang == 1 ? 'font-weight: bold;' : 'font-weight: normal;'">中文</span>
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


            window.addEventListener('scroll', function() {
                if(window.scrollY > 10){
                    hc.style.opacity = 1
                    hl.style.opacity = 0
                    hr.style.top = "-13px"
                } else {
                    hc.style.opacity = 0
                    hl.style.opacity = 1
                    hr.style.top = "5px"
                }
            });


            // Orientation 

            window.addEventListener("orientationchange", function() {
                
                if(screen.orientation.angle == 90 || screen.orientation.angle == -90){
                    hc.style.top = "-40px"
                } else {
                    hc.style.top = "0px"
                }

            });

            if(screen.orientation.angle == 90 || screen.orientation.angle == -90){
                hc.style.top = "-40px"
            } else {
                hc.style.top = "0px"
            }

        }
    },
    created(){
        this.initial()
    },
    methods:{
        initial () {
            this.lang = parseInt(this.$route.query.lang)
            
            this.mode = this.$route.name
            
            if(this.mobileView){
                
                if(this.mode == "home" || this.mode == "blog"){
                    this.$nextTick(()=>{
                        this.$refs.hl.style.left = "41%"
                        this.$refs.hc.style.left = "0px"
                    })
                }

                else{
                    this.$nextTick(()=>{
                        this.$refs.hl.style.left = "2%"
                        this.$refs.hc.style.left = screen.width > 320 ? "-108px" : "-80px"
                    })
                }
            }
        
        },
        switchLang(data, sync) {
            this.lang = data
            if(!sync){
                EventBus.$emit('switchLang', data)
            }
        },

        back(){
            // if no where to go (mostly from share link)
            if(history.length == 1){

                this.$router.push('home')

            } else {
                // Lang param is added after page loaded so if has lang parma than go 2 stpe backward
                /*if(this.$route.query.lang){
                    window.history.go(-2)
                } else {
                    window.history.go(-1)
                }*/
                
                if(this.$route.query.from){
                    this.$router.push(this.$route.query.from)
                } else {
                    this.$router.push('home')
                }
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
    height: 100px;
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
    transform: translateY(-30px);
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
    margin-top: -100px;
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
        width: 180px;
        margin-top: 0px;
    }

    #hheader-left img{
        width: 70px;
    }

    #hheader-right {
        position: absolute;
        top: 5px;
        right: 15px;
    }

    #hheader-center{
        opacity: 0;
        pointer-events: none;
    }

    
}
</style>