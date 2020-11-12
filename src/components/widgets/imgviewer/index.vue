<template>
    <div id="image-viewer">
        <div id="image-viewer-close" v-on:click="close"><img id="iv-close" src="../../../assets/close.png" alt=""></div>
        <div id="image-viewer-inner">
            <img :src="path" alt="image">
        </div>
    </div>
</template>

<script>

import { EventBus } from '../../../bus'
//import { isMobile } from '../../../utils'

export default {
    name: "viewimg",
    props:{
        imgWidth: Number,
        imgHeight: Number,
        path: String
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
    z-index: 99999;
}

#image-viewer-close img{
    width: 44px;
}

#image-viewer-inner{
    height: 100%;
    width: 100%;
}

#image-viewer-inner img{
    height: 100%;
    width: 100%;
    object-fit: scale-down;
}


</style>