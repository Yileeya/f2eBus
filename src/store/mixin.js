import moment from 'moment';
import jsSHA from 'jssha';
import Vue from 'vue';
import axios from 'axios';
// import _ from 'lodash';

let ptxUrl = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/';
const methods = {
    getAuthorizationHeader() {
        let AppID = '4ad9f73726a0409a9376afd2b59e59a7';
        let AppKey = 'iR-j7mJI1CY924a-xfd6vhXZciM';
        let GMTString = new Date().toGMTString();
        let ShaObj = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        let HMAC = ShaObj.getHMAC('B64');
        let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
        return {'Authorization': Authorization, 'X-Date': GMTString}
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
    async getScenicSpots(filter, topNumber, skipNumber) {
        let url = `${ptxUrl}/ScenicSpot?$filter=(Picture/PictureUrl1 ne null)${filter ? 'and' + filter : ''}&$top=${topNumber}${skipNumber ? '&$skip=' + skipNumber : ''}&$format=JSON`
        let res = await axios.get(url, {
            headers: this.getAuthorizationHeader()
        });

        if(res.status == 200) {
            return res.data
        }
    },
    async getActivities(filter, topNumber, skipNumber) {
        let url = `${ptxUrl}/Activity?$filter=(Picture/PictureUrl1 ne null)${filter ? 'and' + filter : ''}&$top=${topNumber}${skipNumber ? '&$skip=' + skipNumber : ''}&$format=JSON`
        let res = await axios.get(url, {
            headers: this.getAuthorizationHeader()
        });

        if(res.status == 200) {
            return res.data
        }
    },
    async getRestaurants(filter, topNumber, skipNumber) {
        let url = `${ptxUrl}/Restaurant?$filter=(Picture/PictureUrl1 ne null)${filter ? 'and' + filter : ''}&$top=${topNumber}${skipNumber ? '&$skip=' + skipNumber : ''}&$format=JSON`
        let res = await axios.get(url, {
            headers: this.getAuthorizationHeader()
        });

        if(res.status == 200) {
            return res.data
        }
    },
    async getHotels(filter, topNumber, skipNumber) {
        let url = `${ptxUrl}/Hotel?$filter=(Picture/PictureUrl1 ne null)${filter ? 'and' + filter : ''}&$top=${topNumber}${skipNumber ? '&$skip=' + skipNumber : ''}&$format=JSON`
        let res = await axios.get(url, {
            headers: this.getAuthorizationHeader()
        });
        if(res.status == 200) {
            return res.data
        }
    }
};
Vue.mixin({
    methods: methods
});

export default methods;
