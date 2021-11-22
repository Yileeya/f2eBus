import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        isLoading: false,
    },
    mutations: {
        ['UPDATE_LOADING'](state, isLoading) {
            state.isLoading = isLoading;
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
