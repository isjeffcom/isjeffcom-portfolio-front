<template>
    <div id="navs">
        <div id="navs-inner">
            <div class="navs-single" v-for="item in navs" :key="item.id">
                <a :href="item.url">{{item.name}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "navs",
    props:{
        navs: Array
    },

    created(){
        console.log('a')
    }
}
</script>

<style scoped>


#navs-inner{
    width: 480px;
    height: 48px;
    display: flex;
    margin-left:auto;
    margin-right:auto;
}

.navs-single{
    width:auto;
    margin-left:auto;
    margin-right:auto;
    text-align: center;
    opacity: .8;
    transition: all 0.42s cubic-bezier(.25,.8,.25,1);
}

.navs-single:hover{
    opacity: 1;
}

.navs-single a{
    color:#333;
    text-decoration: none;
}

@media only screen and (max-device-width : 812px)  { 
    #navs-inner {
        width: 100%;
    }
}
</style>