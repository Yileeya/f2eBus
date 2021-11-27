<template>
    <div class="time-arrival-page" v-if="busRoute">
        <div class="time-header">
            <div class="time-header-title">
                <div class="route-name">{{ busRoute.subRouteName }}</div>
                <div class="btn-group">
                    <router-link to="/timeArrivalMap">
                        <i class="fa fa-map" aria-hidden="true"/>
                    </router-link>
                    <router-link to="/schedule">
                        <i class="fa fa-info" aria-hidden="true"/>
                    </router-link>
                </div>
            </div>
            <switch-button :color-group="'time-arrival-switch-group'" @switch="switchDirection"/>
            <div class="time-schedule-info" v-if="busTodaySchedule.length">
                <div class="schedule">
                    <span>首班車：{{ busTodaySchedule[0].ArrivalTime }}</span> /
                    <span>末班車：{{ busTodaySchedule[busTodaySchedule.length - 1].ArrivalTime }}</span>
                </div>
                <div class="update-time">資料更新時間 <b>{{ updateTime }}</b>
                    <span class="small">({{ time }}秒後更新)</span>
                </div>
            </div>
        </div>
        <loading-view v-if="loading"/>
        <div class="time-line-area" v-else>
            <timeline>
                <timeline-item :hollow="true"
                               v-for="(stop, i) in timeTable"
                               :key="i">
                    <div class="bus-group" v-if="getBus(stop.StopID)">
                        <span class="bus-number">
                            {{ getBus(stop.StopID) }}
                            <i class="fa fa-wheelchair" aria-hidden="true"/>
                        </span>
                        <i class="fa fa-bus" aria-hidden="true"></i>
                    </div>
                    <div class="states" :class="TimeArrivalCSS(stop.EstimateTime)">
                        {{ TimeArrivalText(i, stop.EstimateTime, stop.IsLastBus, stop.StopID) }}
                    </div>
                    <div class="stop-name">{{ stop.StopName }}
                    </div>
                </timeline-item>
            </timeline>
        </div>
    </div>
</template>

<script>
    import {Timeline, TimelineItem} from 'vue-cute-timeline'
    import SwitchButton from '@/components/Common/SwitchButton';
    import {mapState} from 'vuex';
    import _ from 'lodash';
    import moment from 'moment';
    import LoadingView from '@/components/Common/LoadingView';

    export default {
        name: "TimeArrivalPage",
        computed: {
            ...mapState({
                busRoute: state => state.busRoute
            })
        },
        components: {
            LoadingView,
            SwitchButton,
            Timeline,
            TimelineItem
        },
        data() {
            return {
                stopOfRoute: [],
                timeOfArrival: [],
                timeTable: [],
                busses: [],
                busTodaySchedule: [],
                updateTime: null,
                timer: null,
                time: 40,
                loading: false
            }
        },
        async created() {
            if(!this.busRoute) {
                await this.$router.push('/search');
                return
            }
            this.loading = true;
            await this.fetchTodayBusSchedule();
            await this.fetchData();
            this.loading = false;
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
                clearInterval(this.timer);
                this.timeTable = [];
                this.busses = [];
                await this.fetchStopOfRoute();
                await this.fetchEstimatedTimeOfArrival();
                this.time = 40;
                this.timer = setInterval(this.countdown, 1000);
            },
            async fetchStopOfRoute() {
                let StopOfRoute = await this.getStopOfRoute(this.busRoute.subRouteUID);
                this.stopOfRoute = StopOfRoute[0].Stops
            },
            async fetchEstimatedTimeOfArrival() {
                let timeOfArrival = this.timeOfArrival = await this.getEstimatedTimeOfArrival(this.busRoute.subRouteUID);
                this.updateTime = timeOfArrival[0].UpdateTime.substring(11, 19);

                _.forEach(this.stopOfRoute, (stop) => {
                    let matchIndex = _.find(timeOfArrival, (r) => r.StopID == stop.StopID);
                    if(typeof matchIndex == 'undefined') {
                        let stopInfo = {
                            StopName: stop.StopName.Zh_tw,
                            StopID: stop.StopID,
                            EstimateTime: -1 //不存在
                        }
                        this.timeTable.push(stopInfo)
                    } else {
                        let matchBus = _.findIndex(this.busses, (bus) => bus.PlateNumb == matchIndex.PlateNumb)
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
            async fetchTodayBusSchedule() {
                let dayOfWeek = moment().day();
                let BusSchedule = await this.getBusSchedule(this.busRoute.subRouteUID);
                let busServiceDay = _.filter(BusSchedule[0].Timetables, (schedule) => {
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
            async switchDirection() {
                this.loading = true;
                await this.fetchTodayBusSchedule();
                await this.fetchData();
                this.loading = false;
            },
            getBus(stopId) {
                let isOnStop = _.findIndex(this.busses, (stop) => stop.CurrentStop == stopId)
                if(isOnStop !== -1)
                    return this.busses[isOnStop].PlateNumb
                else
                    return false
            },
            TimeArrivalText(index, time, IsLastBus, StopID) {
                if(index === 0 && time === null && !IsLastBus) {
                    return this.getNextBusTime(StopID)
                } else if(time === null && !IsLastBus)
                    return '尚未發車'
                else if(Number(time) == -1 || time === null && IsLastBus) {
                    return '末班車已駛離'
                } else if(Number(time) <= 3) {
                    return '即將進站'
                } else
                    return time + '分'
            },
            getNextBusTime(StopID) {
                let nowMoment = this.dateFormat(new Date(), 'HH:mm')

                let nextBusArrivalTime = _.find(this.busTodaySchedule, (schedule => {
                    return (schedule.StopID == StopID) && (schedule.ArrivalTime >= nowMoment)
                }))
                if(typeof nextBusArrivalTime == 'undefined')
                    return '尚未發車'
                else
                    return nextBusArrivalTime.ArrivalTime + '發車'
            },
            TimeArrivalCSS(time) {
                if(time === null || time == -1)
                    return 'bus-leaving'

                if(Number(time) <= 3)
                    return 'bus-coming'
            }
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped lang="scss">
    .time-header{
        background: #019EB1;
        padding:    15px;
        font-size:  1.2em;
    }
</style>