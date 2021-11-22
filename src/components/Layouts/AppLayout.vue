<template>
    <div class="row">
        <div class="col-md-12">
            <header-view/>
            <router-view></router-view>
            <footer-view/>
        </div>
    </div>
</template>

<script>
    import FooterView from '@/components/Common/FooterView';
    import HeaderView from '@/components/Common/HeaderView';

    export default {
        name: "AppLayout",
        components: {HeaderView, FooterView}
    }
</script>

<style scoped lang="scss">
    .row, .col-md-12{
        margin:  0;
        padding: 0;
    }
</style>