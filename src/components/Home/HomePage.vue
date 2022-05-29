<template>
    <div class="home">
        <div class="county-div">
            <i class="fa fa-map-marker" aria-hidden="true"/>
            <h3>嘉義市</h3>
        </div>
        <div class="gray-box">
            <router-link to="/search">
                公車動態<br>
                路線班表
                <i class="fa fa-arrow-right" aria-hidden="true"/>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomePage"
    }
</script>

<style scoped lang="scss">
</style>