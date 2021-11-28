<template>
    <div class="time-arrival-map-page" v-if="busRoute">
        <div class="time-header">
            <div class="time-header-title">
                <div class="route-name">{{ busRoute.subRouteName }}</div>
                <div class="btn-group">
                    <router-link to="/timeArrival">
                        <i class="fa fa-code-fork" aria-hidden="true"/>
                    </router-link>
                    <router-link to="/schedule">
                        <i class="fa fa-info" aria-hidden="true"/>
                    </router-link>
                </div>
            </div>
            <switch-button :color-group="'time-arrival-switch-group'" @switch="fetchData"/>
        </div>
        <loading-view v-if="loading"/>
        <l-map v-else
               ref="myMap"
               :zoom="zoom"
               :minZoom="zoom - 1"
               :center="center"
               :options="options"
               style="height: calc(100vh - 218px)">
            <!-- 載入圖資 -->
            <l-tile-layer :url="url" :attribution="attribution"/>

            <!-- 創建標記點 -->
            <l-marker :lat-lng="stop.StopPosition" v-for="stop in stopOfRoute" :key="stop.id">
                <l-icon class-name="bus-stop-icon">
                    <div class="bus-stop-circle"
                         :class="TimeArrivalCSS(stop.id)">
                        {{ stop.id }}
                    </div>
                </l-icon>
                <l-popup class="stop-popup">
                    <div class="stop-name">{{ stop.StopName }}</div>
                    <div class="states" :class="showTimeArrival(stop.id, 'css')">
                        {{ showTimeArrival(stop.id, 'text') }}
                    </div>
                </l-popup>
            </l-marker>
            <l-marker :lat-lng="bus.BusPosition" v-for="(bus, i) in busses" :key="'bus' + i">
                <l-icon class-name="bus-position">
                    <i class="fa fa-bus" aria-hidden="true"/>
                </l-icon>
                <l-popup>
                    <div>{{ bus.PlateNumb}}</div>
                </l-popup>
            </l-marker>
            <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"/>
        </l-map>
    </div>
</template>

<script>
    import _ from 'lodash';
    import SwitchButton from '@/components/Common/SwitchButton';
    import {mapState} from 'vuex';
    import LoadingView from '@/components/Common/LoadingView';

    export default {
        name: "TimeArrivalMapPage",
        components: {
            LoadingView,
            SwitchButton
        },
        computed: {
            ...mapState({
                busRoute: state => state.busRoute
            })
        },
        data() {
            return {
                zoom: 13,
                center: [23.479425, 120.44227],
                url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
                options: {
                    zoomControl: false
                },
                stopOfRoute: [],
                polyline: null,
                timeOfArrival: [],
                timeTable: [],
                busses: [],
                timer: null,
                time: 40,
                loading: false
            };
        },
        async created() {
            if(!this.busRoute) {
                await this.$router.push('/search');
                return
            }
            await this.fetchData();
        },
        methods: {
            countdown() {
                if(this.time == 0) {
                    this.fetchData();
                    return
                }
                this.time--;
            },
            async fetchData() {
                this.loading = true;
                clearInterval(this.timer);
                this.timeTable = [];
                this.busses = [];
                await this.fetchStopOfRoute();
                await this.fetchEstimatedTimeOfArrival();
                await this.fetchRealTimeByFrequency();// 拿到公車的位置
                this.time = 40;
                this.timer = setInterval(this.countdown, 1000);
                this.loading = false;
            },
            async fetchStopOfRoute() {
                let StopOfRoute = await this.getStopOfRoute(this.busRoute.subRouteUID);
                this.stopOfRoute = _.map(StopOfRoute[0].Stops, (stop, i) => {
                    return {
                        id: i + 1,
                        StopID: stop.StopID,
                        StopName: stop.StopName.Zh_tw,
                        StopPosition: [stop.StopPosition.PositionLat, stop.StopPosition.PositionLon]
                    }
                })
                this.polyline = {
                    latlngs: _.map(this.stopOfRoute, (stop) => stop.StopPosition),
                    color: '#E8C931',
                    weight: 10
                }
                this.center = this.stopOfRoute[Math.floor(this.stopOfRoute.length / 2)].StopPosition
            },
            async fetchEstimatedTimeOfArrival() {
                let timeOfArrival = this.timeOfArrival = await this.getEstimatedTimeOfArrival(this.busRoute.subRouteUID);
                _.forEach(this.stopOfRoute, (stop) => {
                    let matchIndex = _.find(timeOfArrival, (r) => r.StopID == stop.StopID);
                    if(typeof matchIndex == 'undefined') {
                        let stopInfo = {
                            StopID: stop.StopID,
                            EstimateTime: null
                        }
                        this.timeTable.push(stopInfo)
                    } else {
                        let EstimateTime = null;
                        if(typeof matchIndex.EstimateTime !== 'undefined') {
                            EstimateTime = Math.floor(Number(matchIndex.EstimateTime) / 60)
                        }
                        let stopInfo = {
                            StopID: stop.StopID,
                            EstimateTime: EstimateTime
                        }
                        this.timeTable.push(stopInfo)
                    }
                })
            },
            async fetchRealTimeByFrequency() {
                let busPosition = await this.getRealTimeByFrequency(this.busRoute.subRouteUID)
                this.busses = _.map(busPosition, (bus) => {
                    return {
                        PlateNumb: bus.PlateNumb,
                        BusPosition: [bus.BusPosition.PositionLat, bus.BusPosition.PositionLon]
                    }
                })
            },
            showTimeArrival(index, target) {
                let matchStop = this.timeTable[index - 1];
                if(matchStop.EstimateTime === null) {
                    return target == 'css' ? null : '尚未發車'
                } else if(matchStop.EstimateTime <= 3) {
                    return target == 'css' ? 'bus-coming' : '即將進站'
                } else
                    return matchStop.EstimateTime + '分'
            },
            TimeArrivalCSS(index) {
                let matchStop = this.timeTable[index - 1];
                if(matchStop.EstimateTime <= 3 && matchStop.EstimateTime !== null)
                    return 'bus-coming-circle'
            },
            beforeDestroy() {
                clearInterval(this.timer)
            }
        }
    }
</script>

<style scoped lang="scss">
    .time-header{
        background-color: #019EB1;
    }
    .states{
        margin-top:     5px;
        padding:        0;
        letter-spacing: 2px;
        min-width:      initial;
    }
</style>