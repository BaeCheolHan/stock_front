<template>
  <TheHeader v-if="userInfo"/>
  <div v-else>
    <div class="sns-btn-wrap">
      <div class="kakao-login" v-on:click="kakaoLoginBtn"></div>
      <div class="naver-login mg-t-5" v-on:click="naverLoginBtn"></div>
    </div>
  </div>

  <Dashboard/>

</template>
<script>

import TheHeader from "@/components/TheHeader";
import Dashboard from "@/views/Dashboard/Dashboard";

export default {
  name: 'FrontMain',
  components: {
    TheHeader,
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
