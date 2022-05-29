<template>
    <div class="time-line-area">
        <timeline>
            <timeline-item :hollow="true"
                           v-for="(stop, i) in timeTable"
                           :key="stop.StopID">
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
</template>

<script>
    import {Timeline, TimelineItem} from 'vue-cute-timeline'
    import _ from 'lodash';

    export default {
        name: "ArrivalTimeLineView",
        props: {
            busses: {
                type: Array,
                default: () => []
            },
            busTodaySchedule: {
                type: Array,
                default: () => []
            },
            timeTable: {
                type: Array,
                default: () => []
            }
        },
        components: {
            Timeline,
            TimelineItem
        },
        methods: {
            countdown() {
                if(this.time == 0) {
                    this.fetchData();
                    return
                }
                this.time--;
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
        }
    }
</script>

<style scoped lang="scss">
</style>