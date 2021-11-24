import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        isLoading: false,
        subRouteUID: null
    },
    mutations: {
        ['UPDATE_LOADING'](state, isLoading) {
            state.isLoading = isLoading;
        },
        ['UPDATE_SUB_ROUTE_UID'](state, subRouteUID) {
            state.subRouteUID = subRouteUID;
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
