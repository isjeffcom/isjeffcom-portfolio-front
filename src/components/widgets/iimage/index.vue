<template>
    <div id="iimage" ref="iimage" :style="'width:' + width + ';' + 'height:' + height + ';'">

        <div id="real" ref="real" :style="'width:' + width + ';' + 'height:' + height + ';'" v-if="loaded" :class="tclass">
            <transition name="fade">
                <img id="realimg" :src="isrc" :alt="ialt" @load="imgLoaded" :style="'width:' + width + ';' + 'height:' + height + ';'">
            </transition>
        </div>

        <div id="placeholder" ref="placeholder" v-if="!loaded">
            <img src="../../../assets/image.svg" alt="Image placeholder"  class="phimg" @load="imgLoaded">
        </div>

    </div>
</template>

<script>
export default {
    name: "iimage",
    props:{
        isrc: {
            type: String,
            default: ""
        },
        ialt: {
            type: String,
            default: ""
        },
        width: {
            type: String,
            default: "100px"
        },
        height: {
            type: String,
            default: "100px"
        },
        mode: {
            type: String,
            default: "normal"
        }
    },
    data(){
        return{
            loaded: false,
            tclass: "normal",
        }
    },
    created(){
        this.tclass = this.mode
        //console.log(this.isrc)
    },

    methods:{
        imgLoaded () {
            //this.$refs.placeholder.style.opacity = 0
            //this.$refs.real.style.opacity = 1
            setTimeout(()=>{
                this.loaded = true
            }, 1000)
        }
    }
}
</script>

<style scoped>
#real{
    position:relative;
    margin-top:0px;
    margin-left:0px;
    opacity: 1;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

#real{
    position:relative;
    margin-top:0px;
    margin-left:0px;
    opacity: 1;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

#placeholder{
    position: absolute;
    margin-top:0px;
    margin-left:0px;
    width:100%;
    height:100%;
    background-color: #F9F9F9;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

#realimg{
    object-fit: cover;
}

.grey {
    background-color: #000000;
}

.grey img{
    opacity: 0.8;
    filter: grayscale(100%) contrast(50%);
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.phimg{
    width:30px;
    margin-top:auto;
    margin-bottom:auto;
    margin-left:auto;
    margin-right:auto;
}

</style>