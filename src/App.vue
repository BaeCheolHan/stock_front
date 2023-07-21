<template>
    <v-app :class="{'login-background': !userInfo}">
        <v-main >
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',

    data: function () {
        return {
            userInfo: null,
        }
    },
    computed: {},
    created() {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
}
</script>
<style>
@import url(assets/css/common.css);
@import url(assets/css/themify-icons.css);
</style>