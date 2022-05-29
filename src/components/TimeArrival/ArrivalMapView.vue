<template>
    <div class="time-arrival-map-page">
        <l-map ref="myMap"
               :zoom="zoom"
               :minZoom="zoom - 1"
               :center="center"
               :options="options"
               style="min-height: calc(100vh - 210px)">
            <!-- 載入圖資 -->
            <l-tile-layer :url="url" :attribution="attribution"/>

            <!-- 創建標記點 -->
            <l-marker :lat-lng="stop.StopPosition"
                      v-for="stop in stopOfRouteInMap"
                      :key="stop.id">
                <l-icon class-name="bus-stop-icon">
                    <div class="bus-stop-circle"
                         :class="timeTable.length && TimeArrivalCSS(stop.id)">
                        {{ stop.id }}
                    </div>
                </l-icon>
                <l-popup class="stop-popup">
                    <div class="stop-name">{{ stop.StopName }}</div>
                    <div v-if="timeTable.length" class="states" :class="showTimeArrival(stop.id, 'css')">
                        {{ showTimeArrival(stop.id, 'text') }}
                    </div>
                </l-popup>
            </l-marker>
            <l-marker :lat-lng="bus.BusPosition" v-for="(bus, i) in bussesInMap" :key="'bus' + i">
                <l-icon class-name="bus-position">
                    <i class="fa fa-bus" aria-hidden="true"/>
                </l-icon>
                <l-popup>
                    <div>{{ bus.PlateNumb}}</div>
                </l-popup>
            </l-marker>
            <l-polyline v-if="polyline" :lat-lngs="polyline.latlngs" :color="polyline.color"/>
        </l-map>
    </div>
</template>

<script>
    import _ from 'lodash';

    export default {
        name: "ArrivalMapView",
        props: {
            stopOfRoute: {
                type: Array,
                default: () => []
            },
            bussesInMap: {
                type: Array,
                default: () => []
            },
            timeTable: {
                type: Array,
                default: () => []
            }
        },
        watch: {
            stopOfRoute(newVal) {
                if(newVal)
                    this.showMapStopOfRoute()
            }
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
                stopOfRouteInMap: [],
                polyline: null
            };
        },
        methods: {
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
            async showMapStopOfRoute() {
                this.stopOfRouteInMap = _.map(this.stopOfRoute, (stop, i) => {
                    return {
                        id: i + 1,
                        StopID: stop.StopID,
                        StopName: stop.StopName.Zh_tw,
                        StopPosition: [stop.StopPosition.PositionLat, stop.StopPosition.PositionLon]
                    }
                })
                this.polyline = {
                    latlngs: _.map(this.stopOfRouteInMap, (stop) => stop.StopPosition),
                    color: '#E8C931',
                    weight: 10
                }
                this.center = this.stopOfRouteInMap[Math.floor(this.stopOfRouteInMap.length / 2)].StopPosition
            }
        }
    }
</script>

<style scoped lang="scss">
    .states{
        margin-top:     5px;
        padding:        0;
        letter-spacing: 2px;
        min-width:      initial;
    }
</style>