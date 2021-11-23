<template>
    <div class="time-arrival-page">
        <div class="time-header">
            <div class="time-header-title">
                <div class="route-name">綠幹線1</div>
                <div class="btn-group">
                    <i class="fa fa-map" aria-hidden="true"/>
                    <router-link to="/schedule">
                        <i class="fa fa-info" aria-hidden="true"/>
                    </router-link>
                </div>
            </div>
            <switch-button :color-group="'time-arrival-switch-group'"/>
        </div>
        <div class="time-line-area">
            <timeline>
                <timeline-item :hollow="true">
                    <div class="states">5分</div>
                    <div class="stop-name">站前廣場555</div>
                </timeline-item>
                <timeline-item :hollow="true">
                    <div class="bus-group">
                        <span class="bus-number">
                            <i class="fa fa-wheelchair" aria-hidden="true"/>
                            EDF-55
                            <span class="talk"></span>
                        </span>
                        <i class="fa fa-bus" aria-hidden="true"></i>
                    </div>
                    <div class="states-ing">進站中</div>
                    <div class="stop-name">站前廣場站前廣場站前廣場站前廣場站前廣場</div>
                </timeline-item>
                <timeline-item :hollow="true">
                    <div class="states">5分</div>
                    <div class="stop-name">站前廣場555</div>
                </timeline-item>
                <timeline-item :hollow="true">
                    <div class="states-ing">進站中</div>
                    <div class="stop-name">站前廣場</div>
                </timeline-item>
            </timeline>
        </div>
    </div>
</template>

<script>
    import {Timeline, TimelineItem} from 'vue-cute-timeline'
    import SwitchButton from '@/components/Common/SwitchButton';

    export default {
        name: "TimeArrivalPage",
        components: {
            SwitchButton,
            Timeline,
            TimelineItem
        },
        data() {
            return {
                switchRoute: false
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