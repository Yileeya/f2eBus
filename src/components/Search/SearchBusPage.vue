<template>
    <div class="search-page">
        <div v-for="(busRoute,i) in busRoutes" :key="i">
            <div v-for="(route, index) in busRoute.SubRoutes" :key="index">
                <div v-if="route.Direction == 0"
                     class="bus-group"
                     @click="toTimeArrivalPage(route.SubRouteUID, route.SubRouteName.Zh_tw, route.Headsign)">
                    <div class="bus-number-title">
                        <i class="fa fa-bus fa-2x" aria-hidden="true"/>
                        <span class="bus-number">{{ route.SubRouteName.Zh_tw }}</span>
                    </div>
                    <span class="bus-route">{{ route.Headsign }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchBusPage",
        data() {
            return {
                busRoutes: []
            }
        },
        async created() {
            this.busRoutes = await this.getBusRoutes();
        },
        methods: {
            toTimeArrivalPage(SubRouteUID, subRouteName, headSign) {
                let busRoute = {
                    subRouteUID: SubRouteUID,
                    subRouteName: subRouteName,
                    headSign: headSign
                }
                this.$store.commit('UPDATE_BUS_ROUTE', busRoute)
                this.$router.push('/timeArrival');
            }
        }
    }
</script>

<style scoped lang="scss">
    .search-page{
        padding:    30px 0;
        min-height: calc(100vh - 100px);
    }
    .bus-group{
        display:        flex;
        flex-direction: column;
        margin:         15px;
        background:     #EFEFF0;
        padding:        15px 10px;
        border-radius:  1em;
        .bus-number-title{
            .bus-number{
                font-size: 1.5em;
                margin:    0 10px;
            }
        }
        .bus-route{
            font-size: 1.2em;
        }
    }
</style>