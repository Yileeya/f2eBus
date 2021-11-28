import axios from "axios";
import jsSHA from "jssha";

function getAuthorizationHeader() {
    let AppID     = '4ad9f73726a0409a9376afd2b59e59a7';
    let AppKey    = 'iR-j7mJI1CY924a-xfd6vhXZciM';
    let GMTString = new Date().toGMTString();
    let ShaObj    = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC          = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
    return {'Authorization': Authorization, 'X-Date': GMTString}
}

const instance = axios.create({
    baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus',
    headers: getAuthorizationHeader(),
})

// instance.defaults.headers.comm

export default instance