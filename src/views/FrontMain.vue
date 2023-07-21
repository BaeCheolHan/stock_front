<template>
    <TheHeader v-if="userInfo"/>
    <div v-else>
        <div class="sns-btn-wrap">
            <div class="kakao-login" v-on:click="kakaoLoginBtn"></div>
        </div>
    </div>
    <Dashboard v-if="userInfo"/>
    <TheFooter/>
</template>
<script>

import TheHeader from "@/components/TheHeader";
import Dashboard from "@/views/Dashboard/Dashboard";
import TheFooter from "@/components/TheFooter";

export default {
    name: 'FrontMain',
    components: {
        TheHeader,
        TheFooter,
        Dashboard,
    },
    data: function () {
        return {
            userInfo: null,
        }
    },
    computed: {},
    created() {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    methods: {
        kakaoLoginBtn: async function () {
            let res = await this.axios.get('/login/kakao')
            location.replace(res.data.loginUri);
        },
    }


// {{userInfo}}

}
</script>
