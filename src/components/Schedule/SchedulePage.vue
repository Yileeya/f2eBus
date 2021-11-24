<template>
    <div class="schedule-page" v-if="busSchedule">
        <div class="time-header">
            <div class="time-header-title">{{subRouteUID}}
                <div class="route-name">{{ busSchedule.SubRouteName.Zh_tw }}</div>
                <div class="btn-group">
                    <router-link to="/timeArrival">
                        <i class="fa fa-list-ul" aria-hidden="true"/>
                    </router-link>
                </div>
            </div>
            <switch-button :color-group="'schedule-switch-group'"/>
        </div>
        <div>
            <!--            <div class="bus-company">營運業者：XX客運</div>-->
            <div v-for="(schedule, i) in timetables" :key="i" class="bus-schedule">
                <span class="index">{{ i+1 }}</span>
                <span class="start-time">{{ schedule.StopTimes[0].ArrivalTime }}</span>
                <span class="bus-schedule-text">{{ serviceDay(schedule.ServiceDay) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import SwitchButton from '@/components/Common/SwitchButton';
    import {mapState} from 'vuex';
    import _ from 'lodash';

    export default {
        name: "SchedulePage",
        components: {SwitchButton},
        computed: {
            ...mapState({
                subRouteUID: state => state.subRouteUID
            })
        },
        data() {
            return {
                busSchedule: null,
                timetables:[]
            }
        },
        async created() {
            let busSchedule = await this.getBusSchedule('CYI071401');
            this.busSchedule = busSchedule[0];
            let Timetables = this.busSchedule.Timetables
            this.timetables =_.sortBy(Timetables, function(o) { return Number(o.TripID); });
        },
        methods: {
            serviceDay(data) {
                let arrayData = Object.values(data);
                let notServiceDay = [];
                let serviceDay = [];

                _.forEach(arrayData, (day, i) => {
                    if(day === 0) {
                        notServiceDay.push(i)
                    } else {
                        serviceDay.push(i)
                    }
                })
                // return {notServiceDay: notServiceDay, serviceDay: serviceDay}
                if(!notServiceDay.length) {
                    return '每日行駛'
                } else if(notServiceDay.includes(0) && notServiceDay.includes(6)) {
                    return '平日行駛'
                } else {
                    let string = serviceDay.join('');
                    let zhString = Number(string).toLocaleString('zh-Hans-CN-u-nu-hanidec')
                    let toArray = (zhString.replace(',', '')).split('');
                    let text = toArray.join('、');

                    return '每週' + text + '行駛'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .time-header{
        background: #F6E04F;
    }
    .bus-schedule{
        background:      #EFEFF0;
        width:           85%;
        margin:          10px auto;
        padding:         0.5em 2em;
        border-radius:   2em;
        display:         flex;
        justify-content: space-between;
    }
    .bus-company{
        margin: 15px;
    }
</style>