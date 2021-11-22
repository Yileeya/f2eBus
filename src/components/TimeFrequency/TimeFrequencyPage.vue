<template>
    <div style="height: 500px">
        <div class="time-header">
            <div class="time-header-title">
                <div class="route-name">綠幹線1</div>
                <div class="btn-group">
                    <i class="fa fa-map" aria-hidden="true"></i>
                    <i class="fa fa-info" aria-hidden="true"></i>
                </div>
            </div>
            <div class="switch-route">
                <div class="switch-button" label="返程" color="red">
                    <input v-model="switchRoute" class="switch-button-checkbox" type="checkbox">
                    <label class="switch-button-label">
                        <span class="switch-button-label-span">去程</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="time-line-area">
            <timeline>
                <timeline-item :hollow="true">
                    <div class="states">5分</div>
                    <div class="stop-name">站前廣場555</div>
                </timeline-item>
                <timeline-item :hollow="true">
                    <div class="bus-group">
                        <span class="bus-number">
                            <i class="fa fa-wheelchair" aria-hidden="true"/>
                            EDF-55
                            <span class="talk"></span>
                        </span>
                        <i class="fa fa-bus" aria-hidden="true"></i>
                    </div>
                    <div class="states-ing">進站中</div>
                    <div class="stop-name">站前廣場站前廣場站前廣場站前廣場站前廣場</div>
                </timeline-item>
                <timeline-item :hollow="true">
                    <div class="states">5分</div>
                    <div class="stop-name">站前廣場555</div>
                </timeline-item>
                <timeline-item :hollow="true">
                    <div class="states-ing">進站中</div>
                    <div class="stop-name">站前廣場</div>
                </timeline-item>
            </timeline>
        </div>


    </div>
</template>

<script>
    import {Timeline, TimelineItem} from 'vue-cute-timeline'

    export default {
        name: "TimeFrequencyPage",
        components: {
            Timeline,
            TimelineItem
        },
        data() {
            return {
                switchRoute: false
            }
        }
    }
</script>

<style scoped lang="scss">
    .time-header{
        background: #019EB1;
        padding:    15px;
        font-size:  1.2em;
        .time-header-title{
            display:         flex;
            justify-content: space-between;
            margin-bottom:   15px;
            .route-name{
                font-weight: bold;
                font-size:   1.2em;
            }
            .btn-group{
                display: flex;
                .fa{
                    background:      #333333;
                    color:           white;
                    border-radius:   5px;
                    width:           35px;
                    height:          35px;
                    display:         flex;
                    justify-content: center;
                    align-items:     center;
                    margin:          0 5px;
                    &:hover, &:focus{
                        cursor:    pointer;
                        opacity:   0.9;
                        transform: scale(0.95);
                    }
                }
            }
        }
    }
    .switch-button{
        background:     #007982;
        border-radius:  30px;
        overflow:       hidden;
        width:          100%;
        text-align:     center;
        letter-spacing: 1px;
        position:       relative;
        padding-right:  50%;
        font-weight:    bold;
        &:before{
            content:         attr(label);
            position:        absolute;
            top:             0;
            bottom:          0;
            right:           0;
            width:           45%;
            display:         flex;
            align-items:     center;
            justify-content: center;
            z-index:         3;
            pointer-events:  none;
            /*color:           white;*/
        }
        &-checkbox{
            cursor:   pointer;
            position: absolute;
            top:      0;
            left:     0;
            bottom:   0;
            width:    100%;
            height:   100%;
            opacity:  0;
            z-index:  2;
            &:checked + .switch-button-label:before{
                transform:  translateX(100%);
                transition: transform 300ms linear;
            }
            & + .switch-button-label{
                position:       relative;
                padding:        5px 0;
                display:        block;
                user-select:    none;
                pointer-events: none;
                margin:         0;
                &:before{
                    content:       "";
                    background:    #F6E04F;
                    height:        100%;
                    width:         100%;
                    position:      absolute;
                    left:          0;
                    top:           0;
                    border-radius: 30px;
                    transform:     translateX(0);
                    transition:    transform 300ms;
                }
                .switch-button-label-span{
                    position: relative;
                }
            }
        }
    }
</style>