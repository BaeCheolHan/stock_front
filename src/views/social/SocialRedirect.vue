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
    const code = this.$route.query.code;
    let response = await this.axios.get('/sns/login/kakao?code='.concat(code));
    if (response.data) {
      this.$store.commit('setUserInfo', JSON.stringify(response.data))
      sessionStorage.setItem('userInfo', JSON.stringify(response.data))
      location.href = '/'
    }

  },
  methods: {}
}

</script>