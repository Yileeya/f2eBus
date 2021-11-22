<template>
    <div class="row">
        <div class="col-md-12">
            <div class="scroll-up text-center" style="display: block;">
                <i class="fa fa-arrow-up" aria-hidden="true"></i>
                <p>TOP</p>
            </div>
            <header-view style="margin-bottom: 88px"/>
            <!--            <loading-view v-if="isLoading"/>-->
            <router-view></router-view>
            <footer-view/>
        </div>
    </div>
</template>

<script>
    import HeaderView from '@/components/Common/HeaderView';
    import FooterView from '@/components/Common/FooterView';
    import $ from 'jquery';

    export default {
        name: "AppLayout",
        components: {FooterView, HeaderView},
        mounted() {
            const that = this;
            $(window).scroll(function() {
                if($(this).scrollTop() > 100) {
                    $(that.$el).find('.scroll-up').fadeIn();
                } else {
                    $(that.$el).find('.scroll-up').fadeOut();
                }
            });
            $(this.$el).find('.scroll-up').click(function() {
                $("html, body").animate({scrollTop: 0}, 800);
                return false;
            });
        }
    }
</script>

<style scoped lang="scss">
    .row{
        margin:     0;
        background: #FAFAFA;
        .col-md-12{
            padding: 0 30px;
            .scroll-up{
                width:            70px;
                height:           70px;
                position:         fixed;
                bottom:           50px;
                right:            50px;
                display:          none;
                z-index:          999;
                background-color: #3fb195;
                border-radius:    1em;
                color:            white;
                cursor:           pointer;
                &:hover{
                    i{
                        transform:  scale(1.2);
                    }
                }
                .fa{
                    color:       white !important;
                    padding-top: 15px;
                }
            }
            @media (max-width: 767px){
                .scroll-up{
                    border-bottom: 15px;
                    right:         15px;
                }
            }
        }
    }
</style>