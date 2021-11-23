<template>
    <div class="switch-group" :class="colorGroup">
            <span class="go"
                  :class="[{'white': switchRoute}, {'pointer': switchRoute}]"
                  @click="switchRoute = false">
                往淡水
            </span>
        <label class="switch">
            <input type="checkbox" v-model="switchRoute">
            <span class="slider"></span>
        </label>
        <span class="back"
              :class="[{'white': !switchRoute}, {'pointer': !switchRoute}]"
              @click="switchRoute = true">
                往台北火車站
            </span>
    </div>
</template>

<script>
    export default {
        name: "SwitchButton",
        props: {
            colorGroup: String
        },
        data() {
            return {
                switchRoute: false
            }
        }
    }
</script>

<style scoped lang="scss">
    .switch-group{
        display:     flex;
        align-items: center;
        width:       100%;
        .switch{
            position: relative;
            display:  inline-block;
            width:    100%;
            height:   2.2em;
            margin:   0;
            & input{
                opacity: 0;
                width:   0;
                height:  0;
            }
        }
        .slider{
            position:           absolute;
            top:                0;
            left:               0;
            right:              0;
            bottom:             0;
            -webkit-transition: .4s;
            transition:         .4s;
            border-radius:      2em;
            &:before{
                position:      absolute;
                content:       "";
                height:        2.2em;
                width:         50%;
                transition:    .4s;
                border-radius: 2em;
            }
        }
        input:checked + .slider:before{
            -webkit-transform: translateX(100%);
            -ms-transform:     translateX(100%);
            transform:         translateX(100%);
        }
        .go, .back{
            position:    absolute;
            z-index:     2;
            text-align:  center;
            font-weight: bold;
        }
        .back{
            right: 2.5%;
            width: 50%;
        }
        .go{
            width: 50%;
        }
        .white{
            color: white;
        }
        .pointer{
            cursor: pointer;
        }
    }
    .schedule-switch-group{
        .slider{
            background-color: #E8C931;
            &:before{
                background-color: #019EB1;
            }
        }
    }
    .time-arrival-switch-group{
        .slider{
            background-color: #007982;
            &:before{
                background-color: #F6E04F;
            }
        }
    }
</style>