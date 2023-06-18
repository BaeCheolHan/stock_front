<template>
    <div>
        This is redirect
        {{userInfo}}
        <div>
            <p>nickName : {{userInfo.nickname}}</p>
            <img :src="userInfo.profile_image_url">
        </div>
    </div>
</template>

<script>

export default {
    name: 'SocialRedirect',
    components: {},
    data: function () {
        return {
            userInfo: null
        }
    },
    created: async function() {
        const code = this.$route.query.code;
        let response = await this.axios.get('/oauth/kakao?code='.concat(code));
        if (response.data) {
            // this.store.commit('setUserInfo', response.data)
            // sessionStorage.setItem('setUserInfo', response.data)
            alert('로그인하였습니다.')
            this.userInfo = response.data
        } else {
            console.log("!!")
        }

    },
    methods: {
    }
}

</script>