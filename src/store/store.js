import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        busRoute: null
    },
    mutations: {
        ['UPDATE_BUS_ROUTE'](state, busRoute) {
            state.busRoute = busRoute;
        },
    },
    actions: {},
    getters: {
    },
    modules: {}
});
