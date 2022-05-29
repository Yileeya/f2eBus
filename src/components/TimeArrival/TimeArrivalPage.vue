<template>
    <div>
        <switch-route-header @switchDirection="switchDirection"
                             :show-map.sync="showMap"
                             :show-schedule-modal.sync="showScheduleModal"/>
        <div class="update-time text-right">
            資料更新時間 <b>{{ updateTime }}</b>
            <span class="small">({{ time }}秒後更新)</span>
        </div>
        <div class="row">
            <arrival-time-line-view v-show="!isPhoneSize || !showMap"
                                    :class="[isPhoneSize ? 'col-md-12' : 'col-md-6']"
                                    :bus-today-schedule="busTodaySchedule"
                                    :busses="busses"
                                    :time-table="timeTable"/>
            <arrival-map-view v-show="!isPhoneSize || showMap"
                              :class="[isPhoneSize ? 'col-md-12' : 'col-md-6']"
                              :time-table="timeTable"
                              :busses-in-map="bussesInMap"
                              :stop-of-route="stopOfRoute"/>
        </div>
        <schedule-modal v-model="showScheduleModal" :bus-schedule="busSchedule"/>
    </div>
</template>

<script>
    import SwitchRouteHeader from '@/components/Common/SwitchRouteHeader';
    import _ from 'lodash';
    import ArrivalTimeLineView from '@/components/TimeArrival/ArrivalTimeLineView';
    import moment from 'moment';
    import {mapState} from 'vuex';
    import ScheduleModal from '@/components/Schedule/ScheduleModal';
    import ArrivalMapView from '@/components/TimeArrival/ArrivalMapView';

    export default {
        name: "TimeArrivalPage",
        components: {ArrivalMapView, ArrivalTimeLineView, ScheduleModal, SwitchRouteHeader},
        computed: {
            ...mapState({
                selectedBusRouteId: state => state.selectedBusRoute.SubRouteID
            })
        },
        data() {
            return {
                isPhoneSize: false,
                stopOfRoute: [],
                timeOfArrival: [],
                timeTable: [],
                busses: [],
                bussesInMap: [],
                busSchedule: [],
                busTodaySchedule: [],
                updateTime: null,
                timer: null,
                time: 40,
                showScheduleModal: false,
                showMap: false
            }
        },
        mounted() { //偵測螢幕大小
            const screenSize = window.matchMedia('(max-width: 768px)');
            this.isPhoneSize = screenSize.matches;
            screenSize.onchange = (e) => {
                this.isPhoneSize = e.matches;
            }
        },
        async created() {
            if(!this.selectedBusRouteId)
                await this.$router.push('/');
        },
        methods: {
            async fetchData() {
                clearInterval(this.timer);
                this.$store.commit('UPDATE_IS_LOADING', true);
                this.timeTable = [];
                this.busses = [];
                await this.fetchStopOfRoute(this.selectedBusRouteId);
                await this.fetchEstimatedTimeOfArrival(this.selectedBusRouteId);
                await this.fetchRealTimeByFrequency(this.selectedBusRouteId);// 拿到公車的位置
                this.$store.commit('UPDATE_IS_LOADING', false);
                this.time = 40;
                this.timer = setInterval(this.countdown, 1000);
            },
            async switchDirection(route) {
                this.$store.commit('UPDATE_SELECTED_BUS_ROUTE', route);
                let result = await this.fetchTodayBusSchedule(this.selectedBusRouteId);
                if(result === false) { //獲取失敗
                    await this.$router.push('/');
                    return
                }
                await this.fetchData();
            },
            async fetchTodayBusSchedule(subRouteID) {
                let dayOfWeek = moment().day();
                let BusSchedule = await this.getBusSchedule(subRouteID);
                if(!BusSchedule.length)
                    return false

                const busScheduleTimetables = BusSchedule[0].Timetables;
                this.busSchedule = _.sortBy(busScheduleTimetables, function(o) {
                    return Number(o.TripID);
                });
                let busServiceDay = _.filter(busScheduleTimetables, (schedule) => {
                    let ServiceDay = Object.values(schedule.ServiceDay); //轉array
                    return ServiceDay[dayOfWeek] == 1
                })
                busServiceDay = _.sortBy(busServiceDay, (o) => Number(o.TripID));
                this.busTodaySchedule = _.map(busServiceDay, (r) => {
                    return {
                        StopID: r.StopTimes[0].StopID,
                        StopName: r.StopTimes[0].StopName.Zh_tw,
                        ArrivalTime: r.StopTimes[0].ArrivalTime
                    }
                })
            },
            async fetchStopOfRoute(subRouteID) { //站牌順序
                let StopOfRoute = await this.getStopOfRoute(subRouteID);
                if(!StopOfRoute.length)
                    return
                this.stopOfRoute = StopOfRoute[0].Stops
            },
            async fetchEstimatedTimeOfArrival(subRouteID) {
                let timeOfArrival = this.timeOfArrival = await this.getEstimatedTimeOfArrival(subRouteID);
                this.updateTime = timeOfArrival.length ? timeOfArrival[0].UpdateTime.substring(11, 19) : this.dateFormat(new Date(), 'HH:mm:ss');

                _.forEach(this.stopOfRoute, (stop) => {
                    let matchIndex = _.find(timeOfArrival, (r) => r.StopID === stop.StopID);
                    if(typeof matchIndex == 'undefined') {
                        let stopInfo = {
                            StopName: stop.StopName.Zh_tw,
                            StopID: stop.StopID,
                            EstimateTime: -1 //不存在
                        }
                        this.timeTable.push(stopInfo)
                    } else {
                        let matchBus = _.findIndex(this.busses, (bus) => bus.PlateNumb === matchIndex.PlateNumb)
                        if(matchBus == -1) {
                            this.busses.push({
                                PlateNumb: matchIndex.PlateNumb,
                                CurrentStop: matchIndex.CurrentStop
                            })
                        }

                        let EstimateTime = null;
                        if(typeof matchIndex.EstimateTime !== 'undefined') {
                            EstimateTime = Math.floor(Number(matchIndex.EstimateTime) / 60)
                        }
                        let stopInfo = {
                            StopName: stop.StopName.Zh_tw,
                            StopID: stop.StopID,
                            EstimateTime: EstimateTime,
                            PlateNumb: matchIndex.PlateNumb,
                            IsLastBus: matchIndex.IsLastBus
                        }
                        this.timeTable.push(stopInfo)
                    }
                })
            },
            async fetchRealTimeByFrequency(subRouteID) {
                let busPosition = await this.getRealTimeByFrequency(subRouteID)
                this.bussesInMap = _.map(busPosition, (bus) => {
                    return {
                        PlateNumb: bus.PlateNumb,
                        BusPosition: [bus.BusPosition.PositionLat, bus.BusPosition.PositionLon]
                    }
                })
            },
            countdown() {
                if(this.time === 0) {
                    this.fetchData();
                    clearInterval(this.timer)
                    return
                }
                this.time--;
                // console.log(this.time)
            }
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped lang="scss">
    .update-time{
        margin: 0 15px;
        .small{
            margin-left: 5px;
        }
    }
</style>