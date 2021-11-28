<template>
    <div class="search-page">
        <loading-view v-if="loading"/>
        <div v-else v-for="(busRoute,i) in busRoutes" :key="i">
            <div v-for="(route, index) in busRoute.SubRoutes" :key="index">
                <div v-if="route.Direction == 0"
                     class="bus-group"
                     @click="toTimeArrivalPage(route.SubRouteUID, route.SubRouteName.Zh_tw, route.Direction)">
                    <div class="bus-number-title">
                        <i class="fa fa-bus" aria-hidden="true"/>
                        <span class="bus-number">{{ route.SubRouteName.Zh_tw }}</span>
                    </div>
                    <span class="bus-route">{{ route.Headsign }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadingView from '@/components/Common/LoadingView';

    export default {
        name: "SearchBusPage",
        components: {LoadingView},
        data() {
            return {
                busRoutes: [],
                loading: false
            }
        },
        async created() {
            this.loading = true;
            this.busRoutes = await this.getBusRoutes();
            this.loading = false;
        },
        methods: {
            toTimeArrivalPage(subRouteUID, subRouteName, direction) {
                let busRoute = {
                    subRouteUID: subRouteUID,
                    subRouteName: subRouteName,
                    direction: direction
                }
                this.$store.commit('UPDATE_BUS_ROUTE', busRoute);
                this.$store.commit('UPDATE_DIRECTION_0_ROUTE_HEAD_SIGN', [])
                this.$router.push('/timeArrival');
            }
        }
    }
</script>

<style scoped lang="scss">
    .search-page{
        .bus-group{
            display:        flex;
            flex-direction: column;
            margin:         15px;
            .bus-number-title{
                .fa-bus{
                    font-size: 24px;
                }
                .bus-number{
                    margin:    0 10px;
                    font-size: 22px;
                }
            }
            .bus-route{
                font-size: 16px;
                color: #939499;
            }
        }
    }
</style>