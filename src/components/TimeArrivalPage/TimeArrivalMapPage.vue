<template>
    <div class="time-arrival-map-page">
        <div class="time-header">
            <div class="time-header-title">
                <div class="route-name">綠幹線</div>
                <div class="btn-group">
                    <router-link to="/timeArrival">
                        <i class="fa fa-list-ul" aria-hidden="true"/>
                    </router-link>
                    <router-link to="/schedule">
                        <i class="fa fa-info" aria-hidden="true"/>
                    </router-link>
                </div>
            </div>
            <switch-button :color-group="'time-arrival-switch-group'"/>
        </div>
        <l-map ref="myMap"
               :zoom="zoom"
               :minZoom="zoom - 1"
               :center="center"
               :options="options"
               style="height: calc(100vh - 218px)">
            <!-- 載入圖資 -->
            <l-tile-layer :url="url" :attribution="attribution"/>

            <!-- 自己所在位置 -->
            <l-marker ref="location" :lat-lng="center">
                <l-popup>
                    你的位置
                </l-popup>
            </l-marker>
            <!-- 創建標記點 -->
            <l-marker :lat-lng="item.StopPosition" v-for="item in data" :key="item.id">
                <!-- 標記點樣式判斷 -->
                <l-icon class-name="bus-stop-icon">
                    <div class="bus-stop-circle">
                        {{ item.id }}
                    </div>
                </l-icon>
                <!-- 彈出視窗 -->
                <l-popup>
                    <div>{{ item.StopName }}</div>
                    <div>
                        即將進站
                    </div>
                </l-popup>
            </l-marker>
            <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
        </l-map>
    </div>
</template>

<script>
    import _ from 'lodash';
    import SwitchButton from '@/components/Common/SwitchButton';
    import {mapState} from 'vuex';

    export default {
        name: "TimeArrivalMapPage",
        computed: {
            ...mapState({
                busRoute: state => state.busRoute
            })
        },
        components: {
            SwitchButton
        },
        data() {
            return {
                // 模擬資料
                TEST: [
                    {
                        "RouteUID": "CYI0716",
                        "RouteID": "0716",
                        "RouteName": {
                            "Zh_tw": "忠孝新民幹線(紅線)",
                            "En": "忠孝新民幹線(紅線)"
                        },
                        "Operators": [
                            {
                                "OperatorID": "45",
                                "OperatorName": {
                                    "Zh_tw": "國光客運",
                                    "En": "Kuo-Kuang Bus Co., Ltd."
                                },
                                "OperatorCode": "KuoKuangBus",
                                "OperatorNo": "1101"
                            }
                        ],
                        "SubRouteUID": "CYI071601",
                        "SubRouteID": "071601",
                        "SubRouteName": {
                            "Zh_tw": "忠孝新民幹線(紅線)",
                            "En": "忠孝新民幹線(紅線)"
                        },
                        "Direction": 0,
                        "City": "Chiayi",
                        "CityCode": "CYI",
                        "Stops": [
                            {
                                "StopUID": "CYI298691",
                                "StopID": "298691",
                                "StopName": {
                                    "Zh_tw": "勞工育樂中心",
                                    "En": "Labor Recreation Center"
                                },
                                "StopBoarding": 1,
                                "StopSequence": 1,
                                "StopPosition": {
                                    "PositionLon": 120.467314,
                                    "PositionLat": 23.465841,
                                    "GeoHash": "wsjtmrcd7"
                                },
                                "StationID": "135241",
                                "StationGroupID": "600－151",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI306181",
                                "StopID": "306181",
                                "StopName": {
                                    "Zh_tw": "興村",
                                    "En": "Xing Village"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 2,
                                "StopPosition": {
                                    "PositionLon": 120.45906,
                                    "PositionLat": 23.45583,
                                    "GeoHash": "wsjtmn585"
                                },
                                "StationID": "138500",
                                "StationGroupID": "600－186",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI306183",
                                "StopID": "306183",
                                "StopName": {
                                    "Zh_tw": "輔仁中學",
                                    "En": "Fu Jen Catholic High School"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 3,
                                "StopPosition": {
                                    "PositionLon": 120.45719,
                                    "PositionLat": 23.4611,
                                    "GeoHash": "wsjtmnfnz"
                                },
                                "StationID": "138498",
                                "StationGroupID": "600－185",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI303110",
                                "StopID": "303110",
                                "StopName": {
                                    "Zh_tw": "大業國中",
                                    "En": "Daye Junior High School"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 4,
                                "StopPosition": {
                                    "PositionLon": 120.455526,
                                    "PositionLat": 23.46398,
                                    "GeoHash": "wsjtmp3p9"
                                },
                                "StationID": "138356",
                                "StationGroupID": "600－179",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI298685",
                                "StopID": "298685",
                                "StopName": {
                                    "Zh_tw": "中油營業所",
                                    "En": "CPC Sales Office"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 5,
                                "StopPosition": {
                                    "PositionLon": 120.45336,
                                    "PositionLat": 23.46922,
                                    "GeoHash": "wsjtsbrqn"
                                },
                                "StationID": "135235",
                                "StationGroupID": "600－146",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI298683",
                                "StopID": "298683",
                                "StopName": {
                                    "Zh_tw": "興業民生",
                                    "En": "Singye Minsheng"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 6,
                                "StopPosition": {
                                    "PositionLon": 120.4471,
                                    "PositionLat": 23.46866,
                                    "GeoHash": "wsjtsb6fu"
                                },
                                "StationID": "135233",
                                "StationGroupID": "600－144",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI303108",
                                "StopID": "303108",
                                "StopName": {
                                    "Zh_tw": "經國新城",
                                    "En": "JingGuo XinCheng"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 7,
                                "StopPosition": {
                                    "PositionLon": 120.4432,
                                    "PositionLat": 23.4683,
                                    "GeoHash": "wsjtsb20c"
                                },
                                "StationID": "138354",
                                "StationGroupID": "600－178",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI305172",
                                "StopID": "305172",
                                "StopName": {
                                    "Zh_tw": "興業西徐州六街路口",
                                    "En": "Xingye West Xuzhou 6th Street  Intersection"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 8,
                                "StopPosition": {
                                    "PositionLon": 120.437411,
                                    "PositionLat": 23.467817,
                                    "GeoHash": "wsjts85vg"
                                },
                                "StationID": "139728",
                                "StationGroupID": "601－006",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI303106",
                                "StopID": "303106",
                                "StopName": {
                                    "Zh_tw": "西區區公所",
                                    "En": "West District Office"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 9,
                                "StopPosition": {
                                    "PositionLon": 120.436192,
                                    "PositionLat": 23.463949,
                                    "GeoHash": "wsjtkx6zq"
                                },
                                "StationID": "138352",
                                "StationGroupID": "600－177",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI305174",
                                "StopID": "305174",
                                "StopName": {
                                    "Zh_tw": "新民南京路口",
                                    "En": "Sinmin Nanjing Road Intersection"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 10,
                                "StopPosition": {
                                    "PositionLon": 120.438579,
                                    "PositionLat": 23.458079,
                                    "GeoHash": "wsjtkwktn"
                                },
                                "StationID": "139730",
                                "StationGroupID": "601－007",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI303104",
                                "StopID": "303104",
                                "StopName": {
                                    "Zh_tw": "嘉大新民校區",
                                    "En": "Chiayi University Sinmin Campus"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 11,
                                "StopPosition": {
                                    "PositionLon": 120.440609,
                                    "PositionLat": 23.463129,
                                    "GeoHash": "wsjtkxq4t"
                                },
                                "StationID": "138350",
                                "StationGroupID": "600－176",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI298681",
                                "StopID": "298681",
                                "StopName": {
                                    "Zh_tw": "京城銀行(新民路)",
                                    "En": "King&#39;s Town Bank(Sinmin Road)"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 12,
                                "StopPosition": {
                                    "PositionLon": 120.440015,
                                    "PositionLat": 23.469952,
                                    "GeoHash": "wsjts8tdr"
                                },
                                "StationID": "135231",
                                "StationGroupID": "600－142",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI304872",
                                "StopID": "304872",
                                "StopName": {
                                    "Zh_tw": "嘉義火車站",
                                    "En": "Chiayi Train Station"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 13,
                                "StopPosition": {
                                    "PositionLon": 120.440943,
                                    "PositionLat": 23.477689,
                                    "GeoHash": "wsjts9yrm"
                                },
                                "StationID": "138408",
                                "StationGroupID": "600－141",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI294975",
                                "StopID": "294975",
                                "StopName": {
                                    "Zh_tw": "林業鐵路車庫園區",
                                    "En": "Forest Railway Garage Park"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 14,
                                "StopPosition": {
                                    "PositionLon": 120.44944,
                                    "PositionLat": 23.484452,
                                    "GeoHash": "wsjtsghwg"
                                },
                                "StationID": "132500",
                                "StationGroupID": "600－100",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI305177",
                                "StopID": "305177",
                                "StopName": {
                                    "Zh_tw": "文化中心(檜意森活村)",
                                    "En": "Cultural Center(Hinoki Village)"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 15,
                                "StopPosition": {
                                    "PositionLon": 120.453533,
                                    "PositionLat": 23.486864,
                                    "GeoHash": "wsjtsgxsf"
                                },
                                "StationID": "139733",
                                "StationGroupID": "600－123",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI305179",
                                "StopID": "305179",
                                "StopName": {
                                    "Zh_tw": "台斗坑",
                                    "En": "Taidoukeng"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 16,
                                "StopPosition": {
                                    "PositionLon": 120.452859,
                                    "PositionLat": 23.491344,
                                    "GeoHash": "wsjtsurng"
                                },
                                "StationID": "134225",
                                "StationGroupID": "600－124",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI294971",
                                "StopID": "294971",
                                "StopName": {
                                    "Zh_tw": "耐斯廣場站",
                                    "En": "NICE PLAZA"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 17,
                                "StopPosition": {
                                    "PositionLon": 120.4518392,
                                    "PositionLat": 23.49717612,
                                    "GeoHash": "wsjtsvw2g"
                                },
                                "StationID": "132498",
                                "StationGroupID": "600－090",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI305181",
                                "StopID": "305181",
                                "StopName": {
                                    "Zh_tw": "後湖",
                                    "En": "Houhu"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 18,
                                "StopPosition": {
                                    "PositionLon": 120.450736,
                                    "PositionLat": 23.499499,
                                    "GeoHash": "wsjtsvvw9"
                                },
                                "StationID": "134227",
                                "StationGroupID": "600－125",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI305183",
                                "StopID": "305183",
                                "StopName": {
                                    "Zh_tw": "宏仁女中",
                                    "En": "Hung Jen Catholic Girls&#39; High School"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 19,
                                "StopPosition": {
                                    "PositionLon": 120.447836,
                                    "PositionLat": 23.506535,
                                    "GeoHash": "wsjtsz5rq"
                                },
                                "StationID": "134231",
                                "StationGroupID": "600－126",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI305185",
                                "StopID": "305185",
                                "StopName": {
                                    "Zh_tw": "荖籘宅",
                                    "En": "Peitengzhai"
                                },
                                "StopBoarding": 0,
                                "StopSequence": 20,
                                "StopPosition": {
                                    "PositionLon": 120.446202,
                                    "PositionLat": 23.509462,
                                    "GeoHash": "wsjtszf0x"
                                },
                                "StationID": "134236",
                                "StationGroupID": "600－127",
                                "LocationCityCode": "CYI"
                            },
                            {
                                "StopUID": "CYI305187",
                                "StopID": "305187",
                                "StopName": {
                                    "Zh_tw": "忠孝北街",
                                    "En": "Zhongxiao North Street"
                                },
                                "StopBoarding": -1,
                                "StopSequence": 21,
                                "StopPosition": {
                                    "PositionLon": 120.442126,
                                    "PositionLat": 23.515812,
                                    "GeoHash": "wsjtu8zm8"
                                },
                                "StationID": "134237",
                                "StationGroupID": "600－128",
                                "LocationCityCode": "CYI"
                            }
                        ],
                        "UpdateTime": "2021-11-26T05:10:34+08:00",
                        "VersionID": 1084
                    }
                ],
                polyline: null,
                data: [],
                zoom: 13,
                center: [23.46922, 120.45336],
                url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
                options: {
                    zoomControl: false
                }
            };
        },
        created() {
            this.data = _.map(this.TEST[0].Stops, (r, i) => {
                return {
                    id: i + 1,
                    StopID: r.StopID,
                    StopName: r.StopName.Zh_tw,
                    StopPosition: [r.StopPosition.PositionLat, r.StopPosition.PositionLon]
                }
            })
            this.polyline = {
                latlngs: _.map(this.data, (t) => t.StopPosition),
                color: '#E8C931',
                weight: 10
            }
        }
    }
</script>

<style scoped lang="scss">
    .time-header{
        background-color: #019EB1;
    }
</style>