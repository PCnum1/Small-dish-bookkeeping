<template>
    <svg class="icon">
        <use :xlink:href="'#' + name" />
    </svg>
</template>

<script lang='ts'>
//将任意目录中.svg结尾的文件引入到当前文件中，不用一个一个引入
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
try{
    importAll(require.context('../assets/icons',true,/\.svg$/))
}catch(error){
    console.log(error);
    
}

    export default {
        props:['name'],
        name :'Icon'
    }
</script>

<style lang="scss" scoped>
    .icon{
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill:currentColor;
        overflow: hidden;
    }
</style>