<template>
    <div class="search-keyboard">
        <div class="width-4">
            <div class="radio-group">
                <input v-for="(bus, i) in busNames"
                       :key="i"
                       v-model="selectedBusName"
                       type="radio"
                       :label="bus"
                       :id="i"
                       :value="bus"
                       name="bus-name"
                       :class="{'grey-color': i == busNames.length - 2}">
            </div>
        </div>
        <div class="width-6">
            <div class="checkbox-group">
                <input v-for="i in 9"
                       :key="i"
                       type="checkbox"
                       :label="i"
                       :value="i"
                       @change="addBusNumber(i)">
                <input
                        type="checkbox"
                        :label="0"
                        :value="0"
                        @change="addBusNumber(0)">
                <input class="clean-all"
                       type="checkbox"
                       :label="'全部清除'"
                       @click="clear">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchKeyboard",
        data() {
            return {
                selectedBusName: null,
                selectedBusNumber: [],
                busNames: ['快捷', '藍', '綠', '竹', '觀光', '醫專', '更多', '世博']
            }
        },
        watch: {
            selectedBusName() {
                this.selectedBusNumber = [];
            },
            selectedBusNumber() {
                this.emitSearchString();
            }
        },
        methods: {
            clear() {
                this.selectedBusName = null;
                this.selectedBusNumber = [];
            },
            emitSearchString() {
                let selectedBusName = this.selectedBusName == null ? '' : this.selectedBusName;
                let string = null;
                string = selectedBusName + this.selectedBusNumber.join('');
                this.$emit('search', string)
            },
            addBusNumber(i) {
                this.selectedBusNumber.push(i)
            }
        }
    }
</script>

<style scoped lang="scss">
    .search-keyboard{
        background:  #F6E04F;
        display:     flex;
        align-items: baseline;
        padding:     1em 5px;
        position:    absolute;
        bottom:      0;
        width:       100%;
        .width-4{
            width: calc(100vw * 0.4);
            .radio-group{
                input{
                    width:     50%;
                    padding:   0.5em 0;
                    color:     black;
                    font-size: 1.4em;
                }
                input:focus, input:hover{
                    color: white;
                }
                .grey-color{
                    color: #939499;
                }
            }
        }
        .width-6{
            width: calc(100vw * 0.6);
            .checkbox-group{
                display:     flex;
                flex-wrap:   wrap;
                align-items: center;
                input{
                    width:     calc(100% / 3);
                    padding:   0.25em 0;
                    color:     white;
                    font-size: 1.8em;
                }
            }
            .clean-all{
                width:     calc((100% / 3) * 2) !important;
                font-size: 1.2em !important;
                color:     black !important;
            }
        }
    }
    input{
        appearance:  none;
        cursor:      pointer;
        font-weight: bold;
    }
    input:focus, input:hover{
        background: #007982;
    }
    input:before{
        content:    attr(label);
        display:    inline-block;
        text-align: center;
        width:      100%;
    }
</style>