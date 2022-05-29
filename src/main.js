import Vue from 'vue'
import App from './App.vue'
import router from './router/router';
import store from './store/store';
import 'jquery/src/jquery';
import 'bootstrap';
import 'lodash';
import "./assets/scss/app.scss";
import './store/mixin';

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import { BootstrapVue } from 'bootstrap-vue';
Vue.use(BootstrapVue);

// 載入 vue2-leaflet，依照自己需要載入組件
import { LMap, LTileLayer, LMarker, LPopup, LIcon , LPolyline} from "vue2-leaflet";
// 載入 css
import "leaflet/dist/leaflet.css";

// 啟用載入的各組件
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-popup", LPopup);
Vue.component("l-icon", LIcon);
Vue.component("l-polyline", LPolyline);

// 設定預設 icon
import { Icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
Vue.config.productionTip = false;

import vSelect from 'vue-select';
Vue.component('v-select', vSelect);

import 'fontawesome-4.7';
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
