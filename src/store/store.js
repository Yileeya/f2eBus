import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        isLoading: false,
        accessToken: null,
        county: 'Chiayi',
        busRoutes: [],
        selectedBusRoute: null
    },
    mutations: {
        ['UPDATE_IS_LOADING'](state, isLoading) {
            state.isLoading = isLoading;
        },
        ['UPDATE_ACCESS_TOKEN'](state, accessToken) {
            state.accessToken = accessToken;
        },
        ['UPDATE_BUS_ROUTES'](state, busRoutes) {
            state.busRoutes = busRoutes;
        },
        ['UPDATE_SELECTED_BUS_ROUTE'](state, selectedBusRoute) {
            state.selectedBusRoute = selectedBusRoute;
        }
    },
    actions: {},
    getters: {
        county(state) {
            return state.county;
        },
        accessToken(state) {
            return state.accessToken
        }
    }
});
