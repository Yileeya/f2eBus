<template>
    <div class="schedule-page" v-if="busRoute">
        <div class="time-header">
            <div class="time-header-title">
                <div class="route-name">{{ busRoute.subRouteName }}</div>
                <div class="btn-group">
                    <router-link to="/timeArrival">
                        <i class="fa fa-code-fork" aria-hidden="true"/>
                    </router-link>
                    <router-link to="/timeArrivalMap">
                        <i class="fa fa-map" aria-hidden="true"/>
                    </router-link>
                </div>
            </div>
            <switch-button :color-group="'schedule-switch-group'" @switch="fetchData"/>
        </div>
        <loading-view v-if="loading"/>
        <div v-else>
            <div class="bus-operator">
                營運業者： {{ busOperator }}
            </div>
            <div v-for="(schedule, i) in timetables"
                 :key="i"
                 class="bus-schedule"
                 :class="serviceDayColor(schedule.ServiceDay)">
                <span class="index">{{ i+1 }}</span>
                <span>{{ schedule.StopTimes[0].StopName.Zh_tw }}</span>
                <span class="start-time">{{ schedule.StopTimes[0].ArrivalTime }}</span>
                <span class="bus-schedule-text">{{ showServiceDay(schedule.ServiceDay) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import SwitchButton from '@/components/Common/SwitchButton';
    import {mapState} from 'vuex';
    import _ from 'lodash';
    import LoadingView from '@/components/Common/LoadingView';

    export default {
        name: "SchedulePage",
        components: {LoadingView, SwitchButton},
        computed: {
            ...mapState({
                busRoute: state => state.busRoute
            })
        },
        data() {
            return {
                busSchedule: null,
                timetables: [],
                busOperator: null,
                loading: false
            }
        },
        async created() {
            if(!this.busRoute) {
                await this.$router.push('/search');
                return
            }
            await this.fetchData();
            let busOperator = await this.getBusOperator(this.busSchedule.OperatorID);
            this.busOperator = busOperator[0].OperatorName.Zh_tw
        },
        methods: {
            async fetchData() {
                this.loading = true;
                let busSchedule = await this.getBusSchedule(this.busRoute.subRouteUID);
                this.busSchedule = busSchedule[0];
                let Timetables = this.busSchedule.Timetables;
                this.timetables = _.sortBy(Timetables, function(o) {
                    return Number(o.TripID);
                });
                this.loading = false;
            },
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
                return {notServiceDay: notServiceDay, serviceDay: serviceDay}
            },
            showServiceDay(data) {
                let serviceDay = this.serviceDay(data);

                if(!serviceDay.notServiceDay.length) {
                    return '每日行駛'
                } else if(serviceDay.notServiceDay.includes(0) && serviceDay.notServiceDay.includes(6)) {
                    return '平日行駛'
                } else {
                    let isSunday = false;
                    let matchDayIndex = _.findIndex(serviceDay.serviceDay, (day) => day === 0);
                    if(matchDayIndex !== -1)
                        isSunday = true;

                    let string = serviceDay.serviceDay.join('');
                    let zhString = Number(string).toLocaleString('zh-Hans-CN-u-nu-hanidec')
                    let toArray = (zhString.replace(',', '')).split('');
                    let text = toArray.join('、');
                    return '週' + text + (isSunday ? '、日' : '')
                }
            },
            serviceDayColor(data) {
                let serviceDay = this.serviceDay(data);
                if(serviceDay.notServiceDay.length)
                    return 'red-color'
            }
        }
    }
</script>

<style scoped lang="scss">
    .time-header{
        background:    #F6E04F;
        margin-bottom: 30px;
    }
    .bus-schedule{
        background:      #EFEFF0;
        width:           90%;
        margin:          10px auto;
        padding:         0.5em 1em;
        border-radius:   2em;
        display:         flex;
        flex-wrap:       wrap;
        justify-content: space-between;
        &.red-color{
            color: #D35D78;
        }
    }
    .bus-operator{
        margin: 15px;
    }
</style>