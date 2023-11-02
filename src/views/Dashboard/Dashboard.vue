<template>
  <div v-if="isLogin()">
    <SignInDashboard/>
  </div>
  <div v-if="!isLogin()">
    <p>no signin-in</p>
  </div>
</template>


<script>


import SignInDashboard from "@/components/dashboard/siginin/SiginInDashboard";

export default {
  name: 'Dashboard',
  components: {
    SignInDashboard
  },
  created() {
  },
  methods: {
    isLogin: function () {
      if (sessionStorage.getItem("userInfo")) {
        return true;
      } else {
        return false;
      }
    }
  }

}
</script>
