<template>
  <TheHeader/>
  <div>
      <div v-on:click="kakaoLoginBtn">
        <button class="kakao-login"></button>
      </div>
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
    window.Kakao.init('41ad0cc682fed5cec0c7799409ef78ca') // Kakao Developers에서 요약 정보 -> JavaScript 키
  },
  methods: {
    kakaoLoginBtn:function(){

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
