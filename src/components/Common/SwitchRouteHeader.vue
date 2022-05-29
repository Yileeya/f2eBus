<template>
    <div class="switch-header">
        <section class="title-header">
            <h4>
                {{ selectedBusRoute.SubRouteName }}
                <span class="to-text">往</span>
                <b class="arrival-to">
                    {{ headSign[selectedBusRoute.Direction] }}
                    <!--                    {{ arrivalTo }}-->
                </b>
            </h4>
            <div class="btn-group">
                <i v-show="showMap" class="fa fa-code-fork" @click="showMode(false)"/>
                <i v-show="!showMap" class="fa fa-map" @click="showMode(true)"/>
                <i class="fa fa-lg fa-info" @click="openScheduleModal"/>
            </div>
        </section>
        <section class="switch-btn-group">
            <div class="switch-btn" :class="selectedBusRoute.Direction === 0 ? 'right': 'left'"></div>
            <div class="toggle"
                 :class="[{'cursor-pointer': selectedBusRoute.Direction !== (index - 1)}]"
                 v-for="index in 2"
                 :key="index"
                 @click="selectedBusRoute.Direction !== (index - 1) && switchDirection(index - 1)">
                <span :class="[{'transparent-bg-color': selectedBusRoute.Direction === (index - 1)}]">
                    {{ headSign[index - 1] }}
                </span>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import _ from 'lodash';

    export default {
        name: "SwitchRouteHeader",
        computed: {
            ...mapState({
                busRoutes: state => state.busRoutes,
                selectedBusRoute: state => state.selectedBusRoute
            })
        },
        props: {
            showScheduleModal: {
                type: Boolean,
                default: false
            },
            showMap: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                routes: [], //去返程
                headSign: []
            }
        },
        async created() {
            this.$store.commit('UPDATE_IS_LOADING', true);
            this.routes = _.filter(this.busRoutes, (route) => {
                if(route.RouteID === this.selectedBusRoute.RouteID && route.SubRouteName === this.selectedBusRoute.SubRouteName) {
                    if(route.Direction === 1) { //分解標題
                        this.headSign = route.Headsign.split('→');
                    }
                    return route
                }
            });
            await this.switchDirection(0);
        },
        methods: {
            async switchDirection(direction) {
                let route = _.find(this.routes, (route) => route.Direction === direction);
                this.$emit('switchDirection', route);
            },
            openScheduleModal() {
                this.$emit('update:showScheduleModal', true)
            },
            showMode(mode) { //true: 地圖，false:時刻表
                this.$emit('update:showMap', mode)
            }
        }
    }
</script>

<style scoped lang="scss">
    .switch-header{
        background-color: #019EB1;
        z-index:          -2;
        padding-bottom:   2em;
        .title-header{
            display:         flex;
            justify-content: space-between;
            padding:         15px 15px 15px 72px;
            .to-text{
                margin-left: 0.5em;
                font-size:   0.8em;
            }
            .arrival-to{
                margin-left: 0.5em;
            }
            .btn-group{
                .fa{
                    background:      #333333;
                    color:           white;
                    border-radius:   5px;
                    width:           35px;
                    height:          35px;
                    display:         flex;
                    justify-content: center;
                    align-items:     center;
                    margin:          0 5px;
                    &:hover, &:focus{
                        cursor:    pointer;
                        opacity:   0.9;
                        transform: scale(0.95);
                    }
                }
            }
        }
        .switch-btn-group{
            display:          flex;
            align-items:      center;
            width:            95%;
            position:         relative;
            background-color: #007982;
            z-index:          0;
            margin:           auto;
            border-radius:    2em;
            .toggle{
                width:          50%;
                font-size:      1.2em;
                font-weight:    bold;
                letter-spacing: 1px;
                padding:        10px 1.5em;
                text-align:     center;
                &.cursor-pointer{
                    cursor: pointer;
                }
            }
        }
        .switch-btn{
            position:         absolute;
            height:           100%;
            width:            50%;
            transition:       0.5s;
            background-color: #F6E04F;
            z-index:          -1;
            top:              0;
            border-radius:    2em;
            &.right{
                transform: translate(101%, 0);
            }
            &.left{
                transform: translate(0, 0);
            }
        }
    }
    .transparent-bg-color{
        background-color: transparent;
        color:            white;
    }
    @media (min-width: 768px){
        .fa-map, .fa-code-fork{
            display: none !important;
        }
    }
    @media (max-width: 768px){
        .switch-header{
            padding-bottom: 1em;
            .title-header{
                flex-direction: column-reverse;
                padding:        10px 6px !important;
                h4{
                    padding:   10px 20px 0;
                    font-size: 1.1em;
                }
                .btn-group{
                    justify-content: flex-end;
                }
            }
            .switch-btn-group{
                font-size: 0.8em;
            }
        }
    }
</style>