<template>
    <div class="home">
        <div class="county-select">
            <i class="fa fa-map-marker" aria-hidden="true"/>
            <v-select v-model="selectedCounty"
                      :options="counties"
                      :placeholder="'嘉義市'">
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
    export default {
        name: "HomePage",
        data() {
            return {
                selectedCounty: '嘉義市',
                counties: [
                    '嘉義市'
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
</style>