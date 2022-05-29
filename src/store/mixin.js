import moment from 'moment';
import Vue from 'vue';
import store from './store';
import axios from 'axios';
import {mapGetters} from 'vuex';
import qs from 'qs';
import _ from 'lodash';

let tdxUrl = 'https://tdx.transportdata.tw';
let tdxApiUrl = 'https://tdx.transportdata.tw/api/basic/v2/Bus';
const methods = {
    async getToken() {
        let $store = null;
        if(typeof this.$store !== 'undefined')
            $store = this.$store;
        else
            $store = store;

        let clientData = qs.stringify({
            grant_type: 'client_credentials',
            client_id: 'yileefrontend-163e8add-96da-4ac3',
            client_secret: '6f30a2fa-3367-41ac-a7f4-1aa0c4bd217c'
        });
        let res = await axios.post(`${tdxUrl}/auth/realms/TDXConnect/protocol/openid-connect/token`, clientData, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });
        res = res.data;
        // console.log('access_token', res.access_token)
        $store.commit('UPDATE_ACCESS_TOKEN', res.access_token);
    },
    dateFormat(date, format) {
        if(!date)
            return null;

        if(date instanceof Date) {
            return moment(date).format(format);
        } else {
            date = date.replace(/-/g, '/');
            return moment(date).format(format);
        }
    },
    async getBusRoutes() {
        let $store = null;
        if(typeof this.$store !== 'undefined')
            $store = this.$store;
        else
            $store = store;

        let url = `${tdxApiUrl}/Route/City/${this.county}?$select=RouteID, SubRoutes&$format=JSON`
        let res = await axios.get(url, {
            headers: {"authorization": "Bearer " + this.accessToken}
        });
        if(res.status == 200) {
            let apiBusRoutes = _.map(res.data, (route) => {
                let directionSubRoutes = _.map(route.SubRoutes, (subRoute) => {
                    return {
                        SubRouteID: subRoute.SubRouteID,
                        SubRouteName: subRoute.SubRouteName.Zh_tw,
                        Headsign: subRoute.Headsign,
                        Direction: subRoute.Direction,
                    }
                })
                return {
                    RouteID: route.RouteID,
                    SubRoutes: directionSubRoutes
                }
            })

            let busRoutes = [];
            _.each(apiBusRoutes, (busRoute) => {
                _.each(busRoute.SubRoutes, (subRoute) => {
                    subRoute.RouteID = busRoute.RouteID;
                    busRoutes.push(subRoute)
                })
            })

            $store.commit('UPDATE_BUS_ROUTES', busRoutes);
        }
    },
    async getBusSchedule(SubRouteID) {
        let url = `${tdxApiUrl}/Schedule/City/${this.county}?$filter=SubRouteID eq '${SubRouteID}'&$top=30&$format=JSON`
        try {
            let res = await axios.get(url, {
                headers: {"authorization": "Bearer " + this.accessToken}
            });
            if(res.status == 200) {
                return res.data
            }
        } catch(error) {
            console.log('getBusSchedule', error)
            return []
        }
    },
    async getStopOfRoute(SubRouteID) {
        let url = `${tdxApiUrl}/StopOfRoute/City/${this.county}?$filter=SubRouteID eq '${SubRouteID}'&$format=JSON`
        try {
            let res = await axios.get(url, {
                headers: {"authorization": "Bearer " + this.accessToken}
            });
            if(res.status == 200) {
                return res.data
            }
        } catch(error) {
            console.log('getStopOfRoute', error)
            return []
        }
    },
    async getEstimatedTimeOfArrival(SubRouteID) {
        let url = `${tdxApiUrl}/EstimatedTimeOfArrival/City/${this.county}?$filter=SubRouteID eq '${SubRouteID}'&$format=JSON`
        try {
            let res = await axios.get(url, {
                headers: {"authorization": "Bearer " + this.accessToken}
            });
            if(res.status == 200) {
                return res.data
            }
        } catch(error) {
            console.log('getEstimatedTimeOfArrival', error)
            return []
        }
    },
    async getRealTimeByFrequency(SubRouteID) {
        let url = `${tdxApiUrl}/RealTimeByFrequency/City/${this.county}?$filter=SubRouteID eq '${SubRouteID}'&$format=JSON`
        try {
            let res = await axios.get(url, {
                headers: {"authorization": "Bearer " + this.accessToken}
            });
            if(res.status == 200) {
                return res.data
            }
        } catch(error) {
            console.log('getRealTimeByFrequency', error)
            return []
        }
    }
};
Vue.mixin({
    computed: {
        ...mapGetters({
            county: 'county',
            accessToken: 'accessToken'
        })
    },
    methods: methods
});

export default methods;
