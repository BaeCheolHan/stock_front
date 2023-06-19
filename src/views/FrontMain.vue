<template>
    <TheHeader v-if="userInfo"/>
    <div v-else>
        <div>
            <div class="kakao-login" v-on:click="kakaoLoginBtn"></div>
        </div>
    </div>

</template>
<script>

import TheHeader from "@/components/TheHeader";

export default {
    name: 'FrontMain',
    components: {
      TheHeader,
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
