<template >
  <div v-if="!isClickLoginBtn">
<!--      <a :href="kakaoLoginLink" alt="kakao login">-->
        <div class="kakao-login" v-on:click="kakaoLoginBtn"></div>
<!--      </a>-->
  </div>
  <div v-html="htmlContents">

  </div>
</template>
<script>


export default {
  name: 'front-main',
  components: {
  },
  data: function () {
    return {
      isClickLoginBtn: false,
      htmlContents: null,
    }
  },
  computed: {

  },
  beforeCreate() {
  },
  methods: {
    kakaoLoginBtn: async function(){

      let res = await this.axios.get('/login/kakao')
      console.log(res.data)
      location.href = res.data.loginUri
    },
  }

}
</script>
