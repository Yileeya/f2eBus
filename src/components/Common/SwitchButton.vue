<template>
    <div class="switch-group" :class="colorGroup">
            <span class="go"
                  :class="[{'white': isStartStop}, {'pointer': isStartStop}]"
                  @click="isStartStop = false">
                往{{ startAndEndStop[0] }}
            </span>
        <label class="switch">
            <input type="checkbox" v-model="isStartStop">
            <span class="slider"></span>
        </label>
        <span class="back"
              :class="[{'white': !isStartStop}, {'pointer': !isStartStop}]"
              @click="isStartStop = true">
               往{{ startAndEndStop[1] }}
            </span>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "SwitchButton",
        props: {
            colorGroup: String
        },
        computed: {
            ...mapState({
                busRoute: state => state.busRoute
            })
        },
        watch: {
            isStartStop(newVal) {
                let routeId = this.busRoute.subRouteUID.slice(0, -1);
                let headSign = null;
                if(newVal == true) {
                    routeId = routeId + '1';
                    headSign = this.startAndEndStop[0] + '→' + this.startAndEndStop[1]
                } else {
                    routeId = routeId + '2';
                    headSign = this.startAndEndStop[1] + '→' + this.startAndEndStop[0]
                }

                let busRoute = {
                    subRouteUID: routeId,
                    subRouteName: this.busRoute.subRouteName,
                    headSign: headSign
                }
                this.$store.commit('UPDATE_BUS_ROUTE', busRoute);
                this.$emit('switch')
            }
        },
        data() {
            return {
                isStartStop: true,
                startAndEndStop: []
            }
        },
        created() {
            this.startAndEndStop = this.busRoute.headSign.split('→');
        }
    }
</script>

<style scoped lang="scss">
    .switch-group{
        display:     flex;
        align-items: center;
        width:       100%;
        font-size:   0.85em;
        .switch{
            position: relative;
            display:  inline-block;
            width:    100%;
            height:   2.2em;
            margin:   0;
            & input{
                opacity: 0;
                width:   0;
                height:  0;
            }
        }
        .slider{
            position:           absolute;
            top:                0;
            left:               0;
            right:              0;
            bottom:             0;
            -webkit-transition: .4s;
            transition:         .4s;
            border-radius:      2em;
            &:before{
                position:      absolute;
                content:       "";
                height:        2.2em;
                width:         50%;
                transition:    .4s;
                border-radius: 2em;
            }
        }
        input:checked + .slider:before{
            -webkit-transform: translateX(100%);
            -ms-transform:     translateX(100%);
            transform:         translateX(100%);
        }
        .go, .back{
            position:    absolute;
            z-index:     2;
            text-align:  center;
            font-weight: bold;
        }
        .back{
            right: 2.5%;
            width: 50%;
        }
        .go{
            width: 50%;
        }
        .white{
            color: white;
        }
        .pointer{
            cursor: pointer;
        }
    }
    .schedule-switch-group{
        .slider{
            background-color: #E8C931;
            &:before{
                background-color: #019EB1;
            }
        }
    }
    .time-arrival-switch-group{
        .slider{
            background-color: #007982;
            &:before{
                background-color: #F6E04F;
            }
        }
    }
</style>