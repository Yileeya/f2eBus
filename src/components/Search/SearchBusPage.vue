<template>
    <div style="padding: 2em 0;min-height: calc(100vh - 100px);">
        <div class="search-group">
            <input v-model="search" class="form-control form-control-lg" placeholder="請輸入公車路線關鍵字">
            <i class="fa fa-search fa-2x" aria-hidden="true"></i>
        </div>
        <div class="bus-group">
            <div class="bus-number-title">
                <i class="fa fa-bus fa-2x" aria-hidden="true"/>
                <span class="bus-number">20</span>
            </div>
            <span class="bus-route">火車站-交大</span>
        </div>
        <div class="bus-group">
            <div class="bus-number-title">
                <i class="fa fa-bus fa-2x" aria-hidden="true"/>
                <span class="bus-number">1</span>
            </div>

            <span class="bus-route">火車站-交大</span>
        </div>
        <search-keyboard @search="searchRefresh"/>
    </div>
</template>

<script>
    import SearchKeyboard from '@/components/Search/SearchKeyboard';
    export default {
        name: "SearchBusPage",
        components: {SearchKeyboard},
        data(){
            return{
                search: null
            }
        },
        methods:{
            searchRefresh(searchString){
                this.search = searchString
            }
        }
    }
</script>

<style scoped lang="scss">
    .search-group{
        display:         flex;
        align-items:     center;
        justify-content: center;
        .form-control{
            width:         90%;
            border-radius: 2em;
            box-shadow:    rgba(215, 215, 218, 0.2) 1px 3px 1px 1px;
        }
        .fa-search{
            margin-left: -1.5em;
            color:       #939499;
        }
    }
    .bus-group{
        margin:      1.2em 15%;
        display:     flex;
        align-items: center;
        .bus-number-title{
            width: 7em;
            .bus-number{
                font-size: 1.8em;
                margin:    0 10px;
            }
        }
        .bus-route{
            color:     #939499;
            font-size: 1.4em;
        }
    }
</style>