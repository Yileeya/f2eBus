<template>
    <div class="switch-group" :class="colorGroup" v-if="direction0RouteHeadSign.length">
            <span class="go"
                  :class="[{'white': direction0}, {'pointer': direction0}]"
                  @click="direction0 = false">
                往{{ direction0RouteHeadSign[0] }}
            </span>
        <label class="switch">
            <input type="checkbox" v-model="direction0">
            <span class="slider"></span>
        </label>
        <span class="back"
              :class="[{'white': !direction0}, {'pointer': !direction0}]"
              @click="direction0 = true">
               往{{ direction0RouteHeadSign[1] }}
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
                busRoute: state => state.busRoute,
                direction0RouteHeadSign: state => state.direction0RouteHeadSign
            })
        },
        watch: {
            direction0(newVal) {
                let routeId = this.busRoute.subRouteUID.slice(0, -1);
                if(newVal == true) {// direction = 0
                    routeId = routeId + '1';
                } else { // direction = 1
                    routeId = routeId + '2';
                }

                let busRoute = {
                    subRouteUID: routeId,
                    subRouteName: this.busRoute.subRouteName,
                    direction: this.direction0 ? 0 : 1
                }
                this.$store.commit('UPDATE_BUS_ROUTE', busRoute);
                this.$emit('switch')
            }
        },
        data() {
            return {
                direction0: true
            }
        },
        created() {
            this.direction0 = !this.busRoute.direction
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