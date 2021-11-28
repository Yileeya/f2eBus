import axios from "../lib/apiget";

let state     = {
    loading: false,

    data: {},
};
let getters   = {
    getData(status) {
        return status.data;
    },
};
let actions   = {
    async getRouteFareByID({commit}, ID) {
        let {data} = await axios.get(`/RouteFare/City/ChiayiCounty?$filter=RouteID eq '${ID}'&$format=JSON`);

        commit('setData', data)
    },

    async getRouteFareByName({commit}, SubRouteName) {

        let {data} = await axios.get(`/RouteFare/City/ChiayiCounty?$filter=SubRouteName eq '${SubRouteName}'&$format=JSON`);

        // console.log(data)
        commit('setData', data)
    },
};
let mutations = {
    setData(status, data) {
        status.data = data;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
