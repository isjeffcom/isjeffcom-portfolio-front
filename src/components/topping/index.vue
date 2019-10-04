<template>
    <div id="topping">
        <div id="topping-inner">
            <img :src="base + toppingLogo" alt="Topping logo">
        </div>
        
    </div>
</template>

<script>
export default {
    name: "topping",
    props:{
        base: String,
        toppingLogo: String
    },

    
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