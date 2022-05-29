<template>
    <div class="loading">
        <i class="fa fa-bus" aria-hidden="true"/>
        <h3>Loading...</h3>
    </div>
</template>

<script>
    export default {
        name: "LoadingView"
    }
</script>

<style scoped lang="scss">
    .loading{
        background:      #EFEFF0;
        display:         flex;
        justify-content: center;
        align-items:     center;
        flex-direction:  column;
        position:        fixed;
        width:           100%;
        top:             0;
        height:          100vh;
        z-index:         2000;
        opacity:         0.9;
        .fa-bus{
            font-size:                 5em;
            color:                     #F6E04F;
            animation-name:            keyframeZoom;
            animation-duration:        1.3s;
            animation-delay:           1.5s;
            animation-iteration-count: infinite;
        }
        h3{
            margin-left: 0.5em;
        }
    }
</style>