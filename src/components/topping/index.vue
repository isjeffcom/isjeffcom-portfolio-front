<template>
    <div id="topping">
        <div id="topping-inner">
            <img :src="parseTitleImg(toppingLogo)" alt="Topping logo">
        </div>
        
    </div>
</template>

<script>
import { parseDiffImg } from '../../utils'
export default {
    name: "topping",
    props:{
        base: String,
        toppingLogo: String
    },
    methods: {
        parseTitleImg(url) {
            return parseDiffImg(this.base, url);
        }
    }
}
</script>

<style scoped>

#topping{
    user-select: none;
}

#topping-inner{
    padding-top:140px;
}

#topping-inner img{
    width:300px;
}


</style>