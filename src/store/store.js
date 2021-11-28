import Vue from 'vue';
import Vuex from 'vuex';

import fare from "./fare";
import route from "./route";


Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        direction0RouteHeadSign: [],
        isLoading: false,
        busRoute: null,
        county: 'Chiayi'
    },
    mutations: {
        ['UPDATE_BUS_ROUTE'](state, busRoute) {
            state.busRoute = busRoute;
        },
        ['UPDATE_DIRECTION_0_ROUTE_HEAD_SIGN'](state, direction0RouteHeadSign) {
            state.direction0RouteHeadSign = direction0RouteHeadSign;
        },
        ['UPDATE_COUNTY'](state, county) {
            state.county = county;
        }
    },
    actions: {},
    getters: {
        county(state) {
            return state.county;
        },
    },
    modules: {
        fare,
        route
    }
});
