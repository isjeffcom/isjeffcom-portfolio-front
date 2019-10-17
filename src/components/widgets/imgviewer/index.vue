<template>
    <div id="image-viewer">
        <img :src="base + path" alt="image">
    </div>
</template>

<script>
export default {
    name: "viewimg",
    props:{
        base: String,
        path: String
    },
    data(){
        return{

        }
    },
    created(){
        
    },
    methods:{

    }
}
</script>

<style scoped>
#image-viewer{
    position: fixed;
    z-index:9999;
}
</style>