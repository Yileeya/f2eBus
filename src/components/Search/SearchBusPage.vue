<template>
    <div class="search-page">
        <v-select v-model="selectedBusRoute"
                  placeholder="請輸入搜尋關鍵字"
                  :filter="matchSearch"
                  :options="busRoutes"
                  :get-option-label="(option) => option.SubRouteName">
            <template #option="{ SubRouteName, Headsign }">
                {{ SubRouteName }}
                <br/>
                <cite>{{ Headsign }}</cite>
            </template>
            <template #no-options>
                無符合選項
            </template>
        </v-select>
        <loading-view v-if="loading"/>
        <div v-else v-for="(busRoute,i) in busRoutes" :key="i">
            <div class="bus-group"
                 @click="toTimeArrivalPage(busRoute.SubRouteUID, busRoute.SubRouteName)">
                <div class="bus-number-title">
                    <i class="fa fa-bus" aria-hidden="true"/>
                    <span class="bus-number">{{ busRoute.SubRouteName }}</span>
                </div>
                <span class="bus-route">{{ busRoute.Headsign }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadingView from '@/components/Common/LoadingView';
    import _ from 'lodash';

    export default {
        name: "SearchBusPage",
        components: {LoadingView},
        watch: {
            selectedBusRoute(newVal) {
                if(newVal) {
                    this.toTimeArrivalPage(newVal.SubRouteUID, newVal.SubRouteName)
                }
            }
        },
        data() {
            return {
                busRoutes: [],
                loading: false,
                selectedBusRoute: null
            }
        },
        async created() {
            this.loading = true;
            let busRoutes = await this.getBusRoutes();
            _.each(busRoutes, (busRoute) => {
                _.each(busRoute.SubRoutes, (r) => {
                    if(r.Direction === 0) {
                        let route = {
                            SubRouteUID: r.SubRouteUID,
                            SubRouteName: r.SubRouteName.Zh_tw,
                            Headsign: r.Headsign
                        }
                        this.busRoutes.push(route)
                    }
                })
            })
            this.loading = false;
        },
        methods: {
            toTimeArrivalPage(subRouteUID, subRouteName) {
                let busRoute = {
                    subRouteUID: subRouteUID,
                    subRouteName: subRouteName,
                    direction: 0
                }
                this.$store.commit('UPDATE_BUS_ROUTE', busRoute);
                this.$store.commit('UPDATE_DIRECTION_0_ROUTE_HEAD_SIGN', [])
                this.$router.push('/timeArrival');
            },
            matchSearch(options, search) {
                let match = _.filter(this.busRoutes, (busRoute) => {
                    if(busRoute.SubRouteName.includes(search) || busRoute.Headsign.includes(search))
                        return busRoute
                })
                if(match.length) {
                    return match
                } else {
                    return []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
</style>