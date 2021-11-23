<template>
    <div class="schedule-page">
        <div class="time-header">
            <div class="time-header-title">
                <div class="route-name">綠幹線1</div>
                <div class="btn-group">
                    <router-link to="/timeArrival">
                        <i class="fa fa-list-ul" aria-hidden="true"/>
                    </router-link>
                </div>
            </div>
            <switch-button :color-group="'schedule-switch-group'"/>
        </div>
        <div>
            <div class="bus-company">營運業者：XX客運</div>
            <div v-for="i in 5" :key="i" class="bus-schedule">
                <span class="index">{{ i }}</span>
                <span class="start-time">6:30</span>
                <span class="bus-schedule-text">每日行駛</span>
            </div>
        </div>
    </div>
</template>

<script>
    import SwitchButton from '@/components/Common/SwitchButton';

    export default {
        name: "SchedulePage",
        components: {SwitchButton},
        data() {
            return {}
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