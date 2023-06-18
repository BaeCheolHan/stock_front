<template>


    <div v-if="userInfo">
        <div>
            <p>nickName : {{ userInfo.nickname }}</p>
            <img :src="userInfo.thumbnail_image_url">
        </div>
    </div>
    <div v-else>
        <div>
            <div class="kakao-login" v-on:click="kakaoLoginBtn"></div>
        </div>
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
            userInfo: null,
        }
    },
    computed: {},
    created() {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        console.log(this.userInfo)
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
