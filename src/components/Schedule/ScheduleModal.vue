<template>
    <b-modal v-model="showModal"
             id="modal-scrollable"
             size="lg"
             hide-footer
             scrollable
             @hidden="showModal = false">
        <template #modal-title>
            {{ selectedBusRoute.SubRouteName }}
            <span class="to">往</span>
            <b>{{ arrivalTo }}</b>
        </template>
        <div v-for="(schedule, i) in busSchedule"
             :key="schedule.TripID"
             class="bus-schedule row"
             :class="serviceDayColor(schedule.ServiceDay)">
            <div class="index col-md-1">{{ i+1 }}</div>
            <div class="stop-name col-md-5">{{ schedule.StopTimes[0].StopName.Zh_tw }}</div>
            <div class="arrival-time col-md-3">{{ schedule.StopTimes[0].ArrivalTime }}</div>
            <div class="service-day col-md-3">{{ showServiceDay(schedule.ServiceDay) }}</div>
        </div>
    </b-modal>
</template>

<script>
    import _ from 'lodash';
    import {mapState} from 'vuex';

    export default {
        name: "ScheduleModal",
        computed: {
            ...mapState({
                selectedBusRoute: state => state.selectedBusRoute
            }),
            arrivalTo() {
                let headSign = this.selectedBusRoute.Headsign.split('→');
                return headSign[1]
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            busSchedule: {
                type: Array,
                default: () => []
            }
        },
        watch: {
            value(newVal) {
                this.showModal = newVal;
            },
            showModal(newVal) {
                this.$emit('input', newVal)
            }
        },
        data() {
            return {
                showModal: this.value
            }
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
                    if(isSunday)
                        return '週日'

                    return '週' + text + (isSunday ? '、日' : '')
                }
            },
            serviceDayColor(data) {
                let serviceDay = this.serviceDay(data);
                if(serviceDay.notServiceDay.length >= 5)
                    return 'red-color'
            }
        }
    }
</script>

<style scoped lang="scss">
    .to{
        font-size:    0.8em;
        margin-right: 0.5em;
    }
    .bus-schedule{
        background:    #EFEFF0;
        width:         90%;
        margin:        10px auto;
        padding:       0.5em 1em;
        border-radius: 2em;
        &.red-color{
            color: #D35D78;
        }
    }
    @media (max-width: 768px){
        .row{
            display:   flex;
            flex-wrap: wrap;
            .index{
                width: 2em !important;
            }
            .stop-name{
                width: calc(100% - 2em);
            }
            .arrival-time{
                padding-left: 3em;
                width:        7em;
            }
            .service-day{
                width: calc(100% - 10em);
            }
        }
    }
</style>