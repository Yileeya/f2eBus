<template>
    <div class="time-arrival-page" v-if="busRoute">
        <div class="time-header">
            <div class="time-header-title">
                <div class="route-name">{{ busRoute.subRouteName }}</div>
                <div class="btn-group">
                    <i class="fa fa-map" aria-hidden="true"/>
                    <router-link to="/schedule">
                        <i class="fa fa-info" aria-hidden="true"/>
                    </router-link>
                </div>
            </div>
            <switch-button :color-group="'time-arrival-switch-group'" @switch="fetchData"/>
        </div>
        <div class="time-line-area">
            <timeline>
                <timeline-item :hollow="true"
                               v-for="(stop, i) in timeTable"
                               :key="i">
                    <div class="bus-group" v-if="getBus(stop.StopID)">
                        <span class="bus-number">
                            {{ getBus(stop.StopID) }}
                            <i class="fa fa-wheelchair" aria-hidden="true"/>
                            <span class="talk"></span>
                        </span>
                        <i class="fa fa-bus" aria-hidden="true"></i>
                    </div>
                    <div class="states" :class="TimeArrivalCSS(stop.EstimateTime)">
                        {{ TimeArrivalText(stop.EstimateTime) }}
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

    export default {
        name: "TimeArrivalPage",
        computed: {
            ...mapState({
                busRoute: state => state.busRoute
            })
        },
        components: {
            SwitchButton,
            Timeline,
            TimelineItem
        },
        data() {
            return {
                stopOfRoute: [],
                timeOfArrival: [],
                timeTable: []
            }
        },
        async created() {
            if(!this.busRoute) {
                await this.$router.push('/search');
                return
            }
            await this.fetchData();
        },
        methods: {
            async fetchData() {
                this.timeTable = [];
                await this.fetchStopOfRoute();
                await this.fetchEstimatedTimeOfArrival()
            },
            async fetchStopOfRoute() {
                let StopOfRoute = await this.getStopOfRoute(this.busRoute.subRouteUID);
                this.stopOfRoute = StopOfRoute[0].Stops
            },
            async fetchEstimatedTimeOfArrival() {
                let timeOfArrival = this.timeOfArrival = await this.getEstimatedTimeOfArrival(this.busRoute.subRouteUID);
                _.forEach(this.stopOfRoute, (stop) => {
                    let matchIndex = _.find(timeOfArrival, (r) => r.StopID == stop.StopID);
                    if(typeof matchIndex == 'undefined')
                        return
                    else {
                        let EstimateTime = null;
                        if(typeof matchIndex.EstimateTime !== 'undefined') {
                            EstimateTime = Math.floor(Number(matchIndex.EstimateTime) / 60)
                        }
                        let stopInfo = {
                            StopName: stop.StopName.Zh_tw,
                            StopID: stop.StopID,
                            EstimateTime: EstimateTime,
                            BusCurrentStop: matchIndex.CurrentStop
                        }
                        this.timeTable.push(stopInfo)
                    }
                })
            },
            getBus(stopId) {
                let isOnStop = _.findIndex(this.timeOfArrival, (stop) => stop.CurrentStop == stopId)
                if(isOnStop !== -1) {
                    return this.timeOfArrival[isOnStop].PlateNumb
                } else
                    return false
            },
            TimeArrivalText(time) {
                if(!time)
                    return '末班車已駛離'
                else if(Number(time) <= 3) {
                    return '進站中'
                } else
                    return time + '分'
            },
            TimeArrivalCSS(time) {
                if(!time)
                    return 'bus-leaving'

                if(Number(time) <= 3)
                    return 'bus-coming'
            }
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