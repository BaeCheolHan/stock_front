<template>
  <header>

  </header>
  <div class="flex header">
    <div class="profile-wrap" style="font-size: 15px;">
      <li class="ti-angle-double-right mg-l-10 mg-r-15" @click="openNav" style="cursor:pointer"></li>
    </div>
    <div class="exchange-rate-wrap">
      <p class="red font-weight-bold"> {{ exchangeRate.basePrice }}원 ({{ exchangeRate.date }} :
        {{ exchangeRate.time }})</p>
      <span class="mg-r-30">살때 : {{ exchangeRate.cashBuyingPrice }}</span>
      <span>팔때 : {{ exchangeRate.cashSellingPrice }}</span>
    </div>
  </div>

  <div class="overlay-lnb" @click="closeNav" style="display:none;"></div>


  <div id="sidenav-lnb" class="sidenav">
    <div v-if="userInfo">
      <div>
        <div class="flex">
          <div class="profile-wrap" @click="goDashboard">
            <img class="profile-thumbnail" :src="userInfo.profile.thumbnail_image_url">
            <div class="profile-nickname">
              <span>{{ userInfo.profile.nickname }}</span>
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
    <div v-else>
      <div>
        <div class="flex">
          <div class="profile-wrap" @click="goDashboard" v-if="!userInfo">
            <button class="kakao-login-small mg-l-15" v-on:click="kakaoLoginBtn"></button>
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
        </ul>
      </div>
    </div>

    <refferencesArea/>
  </div>


</template>

<script>
import refferencesArea from "@/components/refferencesArea";

export default {
  components: {
    refferencesArea,
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

    if (sessionStorage.getItem('exchangeRate')) {
      this.exchangeRate = JSON.parse(sessionStorage.getItem('exchangeRate'));
    } else {
      let res = await this.axios.get("/api/exchange-rate");
      sessionStorage.setItem('exchangeRate', JSON.stringify(res.data));
    }


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
    kakaoLoginBtn: async function () {
      let res = await this.axios.get('/login/kakao')
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