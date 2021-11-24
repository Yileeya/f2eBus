import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        isLoading: false,
        busRoute: null
    },
    mutations: {
        ['UPDATE_LOADING'](state, isLoading) {
            state.isLoading = isLoading;
        },
        ['UPDATE_BUS_ROUTE'](state, busRoute) {
            state.busRoute = busRoute;
        },
    },
    actions: {},
    getters: {
        // isLoading(state) {
        //     return state.isLoading;
        // },
    },
    modules: {}
});
