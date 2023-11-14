<template>
  <header>

  </header>
  <div class="flex header">
    <div class="profile-wrap" style="font-size: 15px;" v-if="userInfo">
      <li class="ti-angle-double-right mg-l-10 mg-r-15" @click="openNav" style="cursor:pointer"></li>
    </div>
    <div class="profile-wrap" v-if="!userInfo">
      <button class="kakao-login-small mg-l-15" v-on:click="snsLoginBtn('kakao')"></button>
      <button class="google-login-small mg-l-15" v-on:click="snsLoginBtn('google')"></button>
    </div>
    <ExchangeRate/>
  </div>

  <div class="overlay-lnb" @click="closeNav" style="display:none;"></div>

  <div id="sidenav-lnb" class="sidenav">
    <div v-if="userInfo">
      <div>
        <div class="flex">
          <div class="profile-wrap" @click="goDashboard">
            <img class="profile-thumbnail" :src="userInfo.profileImgUrl">
            <div class="profile-nickname">
              <span>{{ userInfo.nickname }}</span>
            </div>
          </div>
          <div>
            <button class="closer mg-r-10" @click="closeNav" style="color: #818181;">&times;</button>
          </div>
        </div>
        <div>
          <v-divider class="mg-b-10"></v-divider>
        </div>
      </div>
      <div class="side-menus" style="height: 100%">
        <ul>
          <li @click="goDashboard">홈</li>
          <li @click="goMyStockManage">내 주식 관리</li>
          <li @click="goSettings">설정</li>
          <li @click="logout">로그아웃</li>
        </ul>
      </div>
    </div>
    <refferencesArea/>
  </div>


</template>

<script>
import refferencesArea from "@/components/refferencesArea";
import ExchangeRate from "@/components/header/ExchangeRate.vue";

export default {
  components: {
    refferencesArea,
    ExchangeRate,
  },
  data: function () {
    return {
      userInfo: null,
      exchangeRate: null,
    }
  },
  created: async function () {
    if (sessionStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }

    this.exchangeRate = sessionStorage.getItem('exchangeRate');
  },
  methods: {
    openNav: function () {
      document.getElementById("sidenav-lnb").style.width = "250px";
      document.getElementsByClassName('overlay-lnb')[0].style.display = "";
    },
    closeNav: function () {
      document.getElementById("sidenav-lnb").style.width = "0px";
      document.getElementsByClassName('overlay-lnb')[0].style.display = "none";
    },
    goSettings: function () {
      location.replace('/settings')
    },
    goDashboard: function () {
      location.replace('/')
    },
    goMyStockManage: function () {
      location.replace('/my')
    },
    snsLoginBtn: async function (snsType) {
      let res = await this.axios.get('/login/'.concat(snsType))
      location.replace(res.data.loginUri)
    },
    logout: function () {
      sessionStorage.removeItem('userInfo')
      this.$store.commit('removeUserInfo')
      location.replace('/')
    }
  }

}
</script>