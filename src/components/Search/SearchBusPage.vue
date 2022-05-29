<template>
    <div class="search-page">
        <v-select v-model="selectedBusRoute"
                  placeholder="請輸入搜尋關鍵字"
                  :filter="matchSearch"
                  :options="singleDirectionBusRoutes"
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
        <div class="bus-group-area">
            <div class="bus-group"
                 v-for="busRoute in singleDirectionBusRoutes"
                 :key="busRoute.SubRouteID"
                 @click="toTimeArrivalPage(busRoute)">
                <div class="bus-number-title">
                    <i class="fa fa-bus" :style="{color: setBusIconColor(busRoute.RouteID)}"/>
                    <span class="bus-number">{{ busRoute.SubRouteName }}</span>
                </div>
                <span class="bus-route">{{ busRoute.Headsign }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import {mapState} from 'vuex';

    export default {
        name: "SearchBusPage",
        computed: {
            ...mapState({
                busRoutes: state => state.busRoutes
            }),
            singleDirectionBusRoutes() {
                return _.filter(this.busRoutes, (busRoute) => !busRoute.Direction).map((match) => {
                    match.Headsign = match.Headsign.replace('→', ' ↔ ');
                    return match
                })
            }
        },
        watch: {
            selectedBusRoute(newVal) {
                if(newVal) {
                    this.toTimeArrivalPage()
                }
            }
        },
        data() {
            return {
                loading: false,
                selectedBusRoute: null
            }
        },
        methods: {
            toTimeArrivalPage(busRoute) {
                if(busRoute) //使用點擊
                    this.selectedBusRoute = busRoute;
                this.$store.commit('UPDATE_SELECTED_BUS_ROUTE', this.selectedBusRoute);
                this.$router.push('timeArrival');
            },
            matchSearch(options, search) {
                let match = _.filter(this.singleDirectionBusRoutes, (busRoute) => {
                    if(busRoute.SubRouteName.includes(search))
                        return busRoute
                    if(busRoute.Headsign) {
                        if(busRoute.Headsign.includes(search))
                            return busRoute
                    }
                })
                if(match.length) {
                    return match
                } else {
                    return []
                }
            },
            setBusIconColor(routeId) {
                if(routeId === '0714') return '#4eba66'
                else if(routeId === '0715') return '#ffc107'
                else return '#e32525'
            }
        }
    }
</script>

<style scoped lang="scss">
</style>