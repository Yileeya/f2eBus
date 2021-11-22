<template>
    <div class="home">
        <div class="gray-box">
            公車動態<br>
            路線班表
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </div>
        <div class="gray-box">
            票價查詢
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomePage"
    }
</script>

<style scoped lang="scss">
    .home{
        /*background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='90px' width='180px'><text x='0' y='85' fill='gainsboro' font-size='100' font-weight='bolder' font-family='fantasy'>BUS</text></svg>")*/
        display:         flex;
        flex-direction:  column;
        align-items:     flex-end;
        justify-content: flex-end;
        padding-bottom:  3em;
        .gray-box{
            font-size:        1.8em;
            font-weight:      bold;
            background-color: #939499;
            width:            fit-content;
            padding:          0.5em 1.5em;
            color:            white;
            margin:           0.5em;
            display:          flex;
            align-items:      center;
            transition:       all 0.2s;
            .fa{
                margin-left: 15px;
            }
            &:hover, &:focus{
                cursor:     pointer;
                opacity:    0.8;
                transform:  scale(0.95);
                transition: all 0.2s;
            }
            @media (max-width: 768px){
                font-size: 1.5em;
            }
        }
    }
</style>