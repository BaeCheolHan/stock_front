<template>
    <div v-if="!isClickLoginBtn">
        <!--      <a :href="kakaoLoginLink" alt="kakao login">-->
        <div class="kakao-login" v-on:click="kakaoLoginBtn"></div>
        <!--      </a>-->
    </div>
</template>
<script>


export default {
    name: 'FrontMain',
    components: {},
    data: function () {
        return {
            isClickLoginBtn: false,
            htmlContents: null,
        }
    },
    computed: {},
    methods: {
        kakaoLoginBtn: async function () {
            let res = await this.axios.get('/login/kakao')
            console.log(res.data.loginUri)
            location.replace(res.data.loginUri);
        },
    }

}
</script>
