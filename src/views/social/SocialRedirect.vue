<template>
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
  created: async function () {
    try {
      const snsType = this.$route.params.snsType;
      if(snsType == 'kakao') {

        const code = this.$route.query.code;
        let response = await this.axios.get('/sns/login/kakao?code='.concat(code));
        if (response.data) {
          this.$store.commit('setUserInfo', JSON.stringify(response.data))
          sessionStorage.setItem('userInfo', JSON.stringify(response.data))
          location.href = '/my'
        }
      }

      if(snsType == 'google') {
        const code = this.$route.query.code;
        const scope = this.$route.query.scope;
        let response = await this.axios.get('/sns/login/google?code='.concat(code).concat("&scope=").concat(scope));
        if (response.data) {
          this.$store.commit('setUserInfo', JSON.stringify(response.data))
          sessionStorage.setItem('userInfo', JSON.stringify(response.data))
          location.href = '/my'
        }
      }


    } catch (e) {
      // location.href = '/'
    }

  },
  methods: {}
}

</script>