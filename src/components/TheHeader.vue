<template>
  <header>

  </header>
  <div v-if="userInfo" class="flex header">
    <div class="profile-wrap" style="font-size: 15px;">
      <li class="ti-angle-double-right mg-l-10 mg-r-15" @click="openNav" style="cursor:pointer"></li>
    </div>
    <div class="exchange-rate-wrap">
      <p class="red font-weight-bold"> {{ userInfo.exchangeRate.basePrice }}원 ({{ userInfo.exchangeRate.date }} :
        {{ userInfo.exchangeRate.time }})</p>
      <span class="mg-r-30">살때 : {{ userInfo.exchangeRate.cashBuyingPrice }}</span>
      <span>팔때 : {{ userInfo.exchangeRate.cashSellingPrice }}</span>
    </div>
  </div>

  <div class="overlay-lnb" @click="closeNav" style="display:none;"></div>
  <div id="sidenav-lnb" class="sidenav">
    <div>
      <div class="flex">
        <div class="profile-wrap" @click="goDashboard">
          <img class="profile-thumbnail" :src="userInfo.profile.thumbnail_image_url">
          <div class="profile-nickname">
            <span>{{ userInfo.profile.nickname }}</span>
          </div>
        </div>
        <div>
          <li class="closer mg-r-10" @click="closeNav" style="color: #818181;">&times;</li>
        </div>
      </div>
      <div>
        <v-divider class="mg-b-10"></v-divider>
      </div>
    </div>

    <div style="height: 100%">
      <ul>
        <li @click="goDashboard">홈</li>
        <li @click="goSettings">설정</li>
      </ul>
    </div>
    <div class="mg-l-10 mg-b-20">
      <v-divider class="mg-t-10 mg-b-10"></v-divider>
      <div>
        <p>Made by 배철한</p>
        <p>Email: joker10421@gmail.com</p>
        <div class="flex">
          <span>github:&nbsp;</span>
          <a href="https://github.com/BaeCheolHan" target="_blank" style="font-size: 12px; color: blue" class="pd-0">https://github.com/BaeCheolHan</a>
        </div>
      </div>
      <div class="mg-t-15">
        <div class="flex">
          <a target="_blank" style="font-size: 12px" class="pd-0"
             href="https://icons8.com/icon/DczWEdxMlPBl/logbook">Logbook</a>
          <span>&nbsp;icon by&nbsp;</span>
          <a target="_blank" class="pd-0" style="font-size: 12px" href="https://icons8.com">Icons8</a>
        </div>
        <div class="flex">
          <a target="_blank" style="font-size: 12px" class="pd-0"
             href="https://icons8.com/icon/43631/line-chart">Line Chart</a>
          <span>&nbsp;icon by&nbsp;</span>
          <a target="_blank" class="pd-0" style="font-size: 12px" href="https://icons8.com">Icons8</a>
        </div>
        <div class="flex">
          <a target="_blank" style="font-size: 12px" class="pd-0"
             href="https://icons8.com/icon/qNCea0FAtw6n/tips">Tips</a>
          <span>&nbsp;icon by&nbsp;</span>
          <a target="_blank" class="pd-0" style="font-size: 12px" href="https://icons8.com">Icons8</a>
        </div>
        <div class="flex">
          <a target="_blank" style="font-size: 12px" class="pd-0" href="https://icons8.com/icon/68906/collectibles">Collectibles</a>
          <span>&nbsp;icon by&nbsp;</span>
          <a target="_blank" style="font-size: 12px" class="pd-0" href="https://icons8.com">Icons8</a>
        </div>
        <div class="flex">
          <a target="_blank" style="font-size: 12px" class="pd-0"
             href="https://kr.freepik.com/free-vector/bull-and-bear-concept-design-made-with-particles_1209465.htm#page=15&query=%EC%A3%BC%EC%8B%9D%20%EC%B0%A8%ED%8A%B8&position=8&from_view=keyword&track=ais">작가
            starline</a>
          <sapn>&nbsp;출처 Freepik</sapn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userInfo: null,
    }
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
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
    }
  }

}
</script>