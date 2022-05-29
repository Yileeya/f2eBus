<template>
    <div class="row">
        <div class="col-md-12">
            <div class="left-sidebar">
                <i class="fa fa-bars fa-lg" @click="openSideBar = !openSideBar"/>
                <b-sidebar id="sidebar" v-model="openSideBar">
                    <div class="router-link">
                        <router-link to="/">Home</router-link>
                    </div>
                    <div class="router-link">
                        <router-link to="/search">
                            找公車
                        </router-link>
                    </div>
                    <div class="about">
                        <p>code by <b>Yilee</b></p>
                        <p>design by <b>Yiyu</b></p>
                        <p>source by <b>TDX</b></p>
                    </div>
                </b-sidebar>
            </div>
            <router-view></router-view>
            <footer-view/>
        </div>
        <loading-view v-show="currentRoute !== '/' && isLoading"/>
    </div>
</template>

<script>
    import FooterView from '@/components/Common/FooterView';
    import LoadingView from '@/components/Common/LoadingView';
    import {mapState} from 'vuex';

    export default {
        name: "AppLayout",
        metaInfo: {
            title: 'F2E Bus'
        },
        components: {LoadingView, FooterView},
        computed: {
            ...mapState({
                isLoading: state => state.isLoading
            })
        },
        watch: {
            '$route.path': {
                handler: function(newVal) {
                    this.currentRoute = newVal
                },
                deep: true,
                immediate: true
            }
        },
        data() {
            return {
                currentRoute: this.$router.currentRoute.path,
                openSideBar: false
            }
        },
        async created() {
            this.$store.commit('UPDATE_IS_LOADING', true);
            await this.getToken();
            await this.getBusRoutes();
            this.$store.commit('UPDATE_IS_LOADING', false);
        }
    }
</script>

<style scoped lang="scss">
    .row, .col-md-12{
        margin:  0;
        padding: 0;
    }
</style>