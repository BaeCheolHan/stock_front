<template>
  <TheHeader/>
  <div>
    <section class="test">
      <div v-on:click="kakaoLoginBtn">카카오 연동</div>
    </section>
  </div>
  <TheFooter></TheFooter>
</template>
<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";

export default {
  components: {TheFooter, TheHeader},
  date: function () {
    return {

    }
  },
  beforeCreate() {
  },
  methods: {
    kakaoLoginBtn:function(){

      window.Kakao.init('41ad0cc682fed5cec0c7799409ef78ca') // Kakao Developers에서 요약 정보 -> JavaScript 키

      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.API.request({
          url: '/v1/user/unlink',
          success: function (response) {
            console.log(response)
          },
          fail: function (error) {
            console.log(error)
          },
        })
        window.Kakao.Auth.setAccessToken(undefined)
      }


      window.Kakao.Auth.login({
        success: function () {
          window.Kakao.API.request({
            url: '/v2/user/me',
            data: {
              property_keys: ["kakao_account.email"]
            },
            success: async function (response) {
              console.log(response);
            },
            fail: function (error) {
              console.log(error)
            },
          })
        },
        fail: function (error) {
          console.log(error)
        },
      })
    }
  }

}
</script>

<style scoped>
.test{ display:flex; justify-content: center; align-items: center; height:100vh; }
div{ width: 200px; height:40px; background-color:#fdd101; color:white; display:flex; align-items: center; justify-content: center; cursor:pointer; }
</style>