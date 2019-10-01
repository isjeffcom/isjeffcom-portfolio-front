<template>

    <div id="topping">
        <div id="topping-inner">
            <div id="topping-left">
                <img :src="leftLogo" alt="">
            </div>

            <div id="topping-center">
                <img :src="centerLogo" alt="">
            </div>

            <div id="topping-right">
                <div class="topping-sm-single" v-for="item in socialMedia" :key="item.id">
                    <a :href="item.url"><img :src="item.icon" :alt="item.name" class="topping-sm-single-img"></a>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name:"topping",
    props:{
        leftLogo: String,
        centerLogo: String,
        socialMedia: Array
    },
    components:{

    },
    created(){
        console.log(this.socialMedia)
    },
    methods:{

    }
}
</script>

<style scoped>
#topping{
    position: absolute;
    top:0px;
    left:0px;
    height: 140px;
    width: 100%;
    background: rgba(255,255,255,1);
}

#topping-inner{
    width: 100%;
    display: flex;
}

#topping-left{
    position:absolute;
    left:34px;
}

#topping-left img{
    width:100px;
}

#topping-center{
    margin-left: auto;
    margin-right: auto;
}

#topping-center img{
    width:300px;
}

#topping-right{
    position: absolute;
    top:2px;
    right:50px;
    display:flex;
    text-align: right;
    margin-top:35px;
}

.topping-sm-single{
    margin-left:30px;
}

.topping-sm-single img{
    width:30px;
    height:30px;
    object-fit: contain;
}
</style>