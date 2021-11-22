<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/">HOME</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item>
                    <router-link to="/search">
                        公車動態
                    </router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/">
                        票價查詢
                    </router-link>
                </b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-navbar-nav right>
                    <b-nav-item class="right-nav-item">
                        <router-link to="/">關於網站</router-link>
                    </b-nav-item>
                    <b-nav-item class="right-nav-item">
                        <router-link to="/">TDX 運輸資料流通服務</router-link>
                    </b-nav-item>
                </b-navbar-nav>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: "HeaderView"
    }
</script>

<style scoped>

</style>