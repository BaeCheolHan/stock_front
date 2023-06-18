<template>
    <div>
        This is redirect
    </div>
</template>

<script>

export default {
    name: 'SocialRedirect',
    components: {},
    data: function () {
        return {
        }
    },
    created: function() {
        console.log(this.$route)
        const code = this.$route.query.code;
        console.log(code)
        // let response = await this.axios.get('/oauth2/kakao?code='.concat(code));
        // console.log(response.data)
        // if (token) {
        //     this.store.commit('setToken', token)
        //     sessionStorage.setItem('accessToken', token)
        //     alert('로그인하였습니다.')
        // } else {
        //     console.log("!!")
        // }

    },
    methods: {
    }
}

</script>