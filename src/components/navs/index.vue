<template>
    <transition name="fade">
        <div id="navs" v-show="show">
            <div id="navs-inner">
                <div class="navs-single" v-for="item in navs" :key="item.id">
                    <a :href="item.url">{{item.name}}</a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "navs",
    props:{
        navs: Array
    },
    data(){
        return{
            show: true
        }
    }, 
    watch:{
        '$route': 'initial'
    },

    created(){
        
    },
    methods:{
        initial(){
            if(this.$route.name === "post"){
                this.show = false
            } else {
                this.show = true
            }
        }
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