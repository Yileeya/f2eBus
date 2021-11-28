import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        busRoute: null,
        direction0RouteHeadSign: []
    },
    mutations: {
        ['UPDATE_BUS_ROUTE'](state, busRoute) {
            state.busRoute = busRoute;
        },
        ['UPDATE_DIRECTION_0_ROUTE_HEAD_SIGN'](state, direction0RouteHeadSign) {
            state.direction0RouteHeadSign = direction0RouteHeadSign;
        }
    },
    actions: {},
    getters: {
    },
    modules: {}
});
