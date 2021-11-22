import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        isLoading: false,
        route: {},
        detailPageData: null,
        selectedCounty: '全台縣市',
        searchKeyword: null
    },
    mutations: {
        ['UPDATE_LOADING'](state, isLoading) {
            state.isLoading = isLoading;
        },
        ['UPDATE_ROUTE'](state, route) {
            state.route = route;
        },
        ['UPDATE_DETAIL_PAGE_DATA'](state, detailPageData) {
            state.detailPageData = detailPageData;
        },
        ['UPDATE_COUNTY'](state, selectedCounty) {
            state.selectedCounty = selectedCounty;
        },
        ['UPDATE_SEARCH_KEYWORD'](state, searchKeyword) {
            state.searchKeyword = searchKeyword;
        }
    },
    actions: {},
    getters: {
        // isLoading(state) {
        //     return state.isLoading;
        // },
    },
    modules: {}
});
