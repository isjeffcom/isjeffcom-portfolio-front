<template>
    <div id="image-viewer">
        <div id="image-viewer-close" v-on:click="close"><img id="iv-close" src="../../../assets/close.svg" alt=""></div>
        <div id="image-viewer-inner">
            <img :src="path" :style="stylePreset" alt="image">
        </div>
    </div>
</template>

<script>

import { EventBus } from '../../../bus'

export default {
    name: "viewimg",
    props:{
        imgWidth: Number,
        imgHeight: Number,
        path: String
    },
    data(){
        return{
            stylePreset: ""
        }
    },
    created(){
        this.stylePreset = this.imgWidth > this.imgHeight ? "width:" + window.innerWidth + "px" : "height:" + window.innerHeight + "px"
        if(this.imgWidth > this.imgHeight && this.imgHeight > window.innerHeight){
            this.stylePreset = "height:" + window.innerHeight + "px"
        }
    },
    methods:{
        close () {
            EventBus.$emit("img-viewer-close", true)
        }
    }
}
</script>

<style scoped>
#image-viewer{
    position: fixed;
    z-index:9999;
    background: rgba(0, 0, 0, 0.9);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    text-align: center;
}

#image-viewer-close{
    position: fixed;
    top: 24px;
    right: 24px;
    cursor: pointer;
}

#image-viewer-close img{
    width: 44px;
}
</style>