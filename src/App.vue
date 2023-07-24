<template>
  <TheHeader v-if="userInfo"/>
  <v-app :class="{'login-background': !userInfo}">
    <v-main>
      <div class="sns-btn-wrap" v-if="!userInfo">
        <div class="kakao-login" v-on:click="kakaoLoginBtn"></div>
      </div>
      <router-view/>
    </v-main>
  </v-app>
  <TheFooter/>
</template>

<script>

import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
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
}
</script>
<style>
@import url(assets/css/common.css);
@import url(assets/css/themify-icons.css);
</style>