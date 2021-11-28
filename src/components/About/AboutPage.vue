<template>
    <div class="about-page">
        <div class="title-header">
            <h3>關於網站</h3>
            <div>
                <a href="https://2021.thef2e.com/" target="_blank">2021 F2E</a><br>
                第三週 全台公車動態時刻查詢應用服務
            </div>
            <div class="link-text">
                資料來源：<a href="https://tdx.transportdata.tw/api-service/swagger" target="_blank">TDX</a>
            </div>
        </div>
        <div class="group-member">
            <h4><b>組員</b></h4>
            <div class="member" v-for="(member, i) in members" :key="i">
                <img :src="member.img">
                <div>
                    <div class="name">{{ member.name }}</div>
                    <div class="work">{{ member.work }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AboutPage",
        data() {
            return {
                // images:[{src:'./1.png'},{./2.png}],
                members: [
                    {
                        name: 'Yilee',
                        work: '程式',
                        img: require('@/assets/images/avatar3.svg')
                    },
                    {
                        name: 'Yiyu',
                        work: '視覺',
                        img: require('@/assets/images/avatar2.svg')
                    },
                    {
                        name: 'Weil',
                        work: '程式',
                        img: require('@/assets/images/avatar1.svg')
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    .title-header, .group-member{
        padding: 15px calc(50% - 9em);
        @media (min-width: 768px){
            padding: 30px 10%;
        }
    }
</style>