<template>
    <div class="home">
        <div class="county-select">
            <i class="fa fa-map-marker" aria-hidden="true"/>
            <v-select v-model="selectedCounty"
                      label="name"
                      :options="counties">
                <template #option="{ name }">
                    {{ name }}
                </template>
                <template #no-options>
                    無符合選項
                </template>
            </v-select>
        </div>
        <div class="gray-box">
            <router-link to="/search">
                公車動態<br>
                路線班表
                <i class="fa fa-arrow-right" aria-hidden="true"/>
            </router-link>
        </div>
        <div class="gray-box">
            <router-link to="/">
                票價查詢
                <i class="fa fa-arrow-right" aria-hidden="true"/>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import _ from 'lodash';

    export default {
        name: "HomePage",
        computed: {
            ...mapState({
                county: state => state.county
            })
        },
        watch: {
            selectedCounty(newVal) {
                if(newVal) {
                    this.$store.commit('UPDATE_COUNTY', newVal.value)
                }
            }
        },
        data() {
            return {
                selectedCounty: null,
                counties: [
                    {name: '臺北市', value: 'Taipei'},
                    {name: '新北市', value: 'NewTaipei'},
                    {name: '桃園市', value: 'Taoyuan'},
                    {name: '臺中市', value: 'Taichung'},
                    {name: '臺南市', value: 'Tainan'},
                    {name: '高雄市', value: 'Kaohsiung'},
                    {name: '基隆市', value: 'Keelung'},
                    {name: '新竹市', value: 'Hsinchu'},
                    {name: '新竹縣', value: 'HsinchuCounty'},
                    {name: '苗栗縣', value: 'MiaoliCounty'},
                    {name: '彰化縣', value: 'ChanghuaCounty'},
                    {name: '南投縣', value: 'NantouCounty'},
                    {name: '雲林縣', value: 'YunlinCounty'},
                    {name: '嘉義縣', value: 'ChiayiCounty'},
                    {name: '嘉義市', value: 'Chiayi'},
                    {name: '屏東縣', value: 'PingtungCounty'},
                    {name: '宜蘭縣', value: 'YilanCounty'},
                    {name: '花蓮縣', value: 'HualienCounty'},
                    {name: '臺東縣', value: 'TaitungCounty'},
                    {name: '金門縣', value: 'KinmenCounty'},
                    {name: '澎湖縣', value: 'PenghuCounty'},
                    {name: '連江縣', value: 'LienchiangCounty'}
                ]
            }
        },
        created() {
            this.selectedCounty  = _.find(this.counties, (county) => county.value == this.county)
        }
    }
</script>

<style scoped lang="scss">
</style>