import moment from 'moment';
import jsSHA from 'jssha';
import Vue from 'vue';
import axios from 'axios';
// import _ from 'lodash';

let ptxUrl    = 'https://ptx.transportdata.tw/MOTC/v2/Bus';
const methods = {
    getAuthorizationHeader() {
        let AppID     = '4ad9f73726a0409a9376afd2b59e59a7';
        let AppKey    = 'iR-j7mJI1CY924a-xfd6vhXZciM';
        let GMTString = new Date().toGMTString();
        let ShaObj    = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        let HMAC          = ShaObj.getHMAC('B64');
        let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
        return {'Authorization': Authorization, 'X-Date': GMTString}
    },
    dateFormat(date, format) {
        if (!date)
            return null;

        if (date instanceof Date) {
            return moment(date).format(format);
        } else {
            date = date.replace(/-/g, '/');
            return moment(date).format(format);
        }
    },
    async getBusRoutes() {
        let url = `${ptxUrl}/Route/City/Chiayi?$select=SubRoutes&$format=JSON`
        let res = await axios.get(url, {
            headers: this.getAuthorizationHeader()
        });
        if (res.status == 200) {
            return res.data
        }
    },
    async getBusSchedule(subRouteUID) {
        let url = `${ptxUrl}/Schedule/City/Chiayi?$filter=SubRouteUID eq '${subRouteUID}'&$top=30&$format=JSON`
        let res = await axios.get(url, {
            headers: this.getAuthorizationHeader()
        });
        if (res.status == 200) {
            return res.data
        }
    },
    async getBusOperator(OperatorID) {
        let url = `${ptxUrl}/Operator/City/Chiayi?$select=OperatorName&$filter=OperatorID eq '${OperatorID}'&$top=30&$format=JSON`
        let res = await axios.get(url, {
            headers: this.getAuthorizationHeader()
        });
        if (res.status == 200) {
            return res.data
        }
    },
    async getStopOfRoute(subRouteUID) {
        let url = `${ptxUrl}/StopOfRoute/City/Chiayi?$filter=SubRouteUID eq '${subRouteUID}'&$format=JSON`
        let res = await axios.get(url, {
            headers: this.getAuthorizationHeader()
        });
        if (res.status == 200) {
            return res.data
        }
    },
    async getEstimatedTimeOfArrival(subRouteUID) {
        let url = `${ptxUrl}/EstimatedTimeOfArrival/City/Chiayi?$filter=SubRouteUID eq '${subRouteUID}'&$format=JSON`
        let res = await axios.get(url, {
            headers: this.getAuthorizationHeader()
        });
        if (res.status == 200) {
            return res.data
        }
    },
    /**
     * 取得票價
     *
     * 測試中
     * */
    async getFareByName(SubRouteName) {

        let url = `${ptxUrl}/RouteFare/City/ChiayiCounty?$filter=SubRouteName eq '${SubRouteName}'&$format=JSON`

        let {status, data} = await axios.get(url, {
            headers: this.getAuthorizationHeader()
        });
        if (status == 200) {
            return data;
        }
    }
};
Vue.mixin({
    methods: methods
});

export default methods;
