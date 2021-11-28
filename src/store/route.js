import axios from "../lib/apiget";

let state     = {
    data: null,
};
let getters   = {
    getRoute(status) {
        return status.data
    }
};
let actions   = {
    //重置路徑名稱列表
    async resetRoute({commit}) {
        let {data} = await axios.get('Route/City/ChiayiCounty?$top=100&$format=JSON');

        commit('setRotate', data)
    },
};
let mutations = {
    setRotate(status, data) {
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
