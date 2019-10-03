<template>

    <div id="hheader">
        <div id="hheader-inner">
            <div id="hheader-left" v-on:click="toHome">
                <img :src="base_url + leftLogo" alt="Logo">
            </div>

            <div id="hheader-center" v-on:click="toTopping" ref="cl" @mouseenter="showCNName()" @mouseleave="showCNName()">
                <img id="hheader-center-logo" :src="base_url + centerLogo" alt="Name" v-show="nameLogoShown">
                <img id="hheader-center-upbtn" src="../../assets/sup.png" alt="Name" v-show="!nameLogoShown">
            </div>

            <div id="hheader-right">
                <div class="hheader-sm-single" v-for="item in socialMedia" :key="item.id">
                    <a :href="item.url"><img :src="base_url + item.icon" :alt="item.name" class="hheader-sm-single-img"></a>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

import { EventBus } from '../../bus'

export default {
    name:"hheader",
    props:{
        leftLogo: String,
        centerLogo: String,
        socialMedia: Array
    },
    components:{

    },
    data(){
        return{
            base_url:"https://api.isjeff.com/pot",
            nameLogoShown: true,
            animating: false,
        }
    },
    created(){
        
    },
    methods:{
        toHome(){
            EventBus.$emit("toPage", '/home')
        },

        toTopping(){
            this.showCNName(false)
            EventBus.$emit("toTopping", true)
        },

        showCNName(bol){

            if(this.animating){
                return
            } else {
                this.animating = true
            }

            if(this.nameLogoShown){
                this.$refs.cl.style.opacity = 0
                setTimeout(()=>{
                    this.$refs.cl.style.opacity = 1
                    this.nameLogoShown = false
                }, 400)

                setTimeout(()=>{
                    this.animating = false
                }, 450)
                
            } else {
                this.$refs.cl.style.opacity = 0
                setTimeout(()=>{
                    this.$refs.cl.style.opacity = 1
                    this.nameLogoShown = true
                }, 400)

                setTimeout(()=>{
                    this.animating = false
                }, 450)
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
    position: relative;
    height: 100px;
    width: 100%;
    background: rgba(255,255,255,1);
}

#hheader-inner{
    width: 100%;
    display: flex;
}

#hheader-left{
    position:absolute;
    left:34px;
    top:20px;
    cursor: pointer;
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
    padding-top: 30px;
    width:50px !important;
    transition: all 0.2s cubic-bezier(.25,.8,.25,1);
}
</style>