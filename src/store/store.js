import Vue from 'vue';
import Vuex from 'vuex';

import fare from "./fare";
import route from "./route";


Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        busRoute: null,
        direction0RouteHeadSign: []
    state    : {
        isLoading: false,
        busRoute : null
    },
    mutations: {
        ['UPDATE_BUS_ROUTE'](state, busRoute) {
            state.busRoute = busRoute;
        },
        ['UPDATE_DIRECTION_0_ROUTE_HEAD_SIGN'](state, direction0RouteHeadSign) {
            state.direction0RouteHeadSign = direction0RouteHeadSign;
        }
    },
    actions  : {},
    getters  : {
        // isLoading(state) {
        //     return state.isLoading;
        // },
    },
    modules  : {
        fare,
        route
    }
});
