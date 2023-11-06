<template>
  <div style=" max-width: 90%; margin: 0 auto;">
    <h3>국내 거래량 순위</h3>
    <v-card class="mg-b-5" v-for="stock in data" :key="stock.data_rank" >
      <v-card-text>
        <div>
          <div class="flex" :style="isMobileFont()">
            <div>
              <div class="flex" style="justify-content: left;">
                <span class="bold">{{ stock.data_rank }}. </span>
                <span class="bold">{{ stock.hts_kor_isnm }}</span>
                <div :class="setColor(stock.prdy_vrss_sign)">
                  <span class="mg-l-5" v-if="stock.prdy_vrss_sign == 1 || stock.prdy_vrss_sign == 2">
                    (+
                  </span>
                  <span class="mg-l-5" v-else>
                    (
                  </span>
                  <span>
                    {{ Number(stock.prdy_ctrt).toLocaleString('ko-KR') }}%)
                  </span>
                </div>
              </div>
              <div class="flex">
                <div>
                  <span class="bold">현재가 : </span>
                  <span :class="setColor(stock.prdy_vrss_sign)">{{ Number(stock.stck_prpr).toLocaleString('ko-KR') }} 원</span>
                </div>
                <div>
                  <span class="mg-l-20 bold">전일 대비 : </span>
                  <span :class="setColor(stock.prdy_vrss_sign)">{{ Number(stock.prdy_vrss).toLocaleString('ko-KR') }} 원
                  <span :class="upDownArrow(stock.prdy_vrss_sign)"></span>
                </span>
                </div>
              </div>
              <div>
                <span class="bold">거래량 : {{Number(stock.acml_vol).toLocaleString('ko-KR')}}</span>
                <span class="mg-l-5">({{stock.vol_inrt}} %)</span>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>

export default {
  name: "KrVolumeRankBox",
  components: {},
  data: function () {
    return {
      data: null,
    }
  },
  created: async function () {
    let res = await this.axios.get("/api/dashboard/kr/volume/0000")
    this.data = res.data.data;
  },
  methods: {
    isMobile() {
      const info = navigator.userAgent;
      let flag = false;

      if (info.indexOf("iPhone") > -1
          || info.indexOf("Android") > -1
          || info.indexOf("iPad") > -1
          || info.indexOf("iPod") > -1
      ) {
        flag = true;
      }
      return flag;
    },
    isMobileFont() {
      if (this.isMobile()) {
        return 'font-size: 10px;'
      } else {
        return '';
      }
    },
    setColor(prdy_vrss_sign) {
      if(prdy_vrss_sign == 1 || prdy_vrss_sign == 2) {
        return 'red'
      }

      if(prdy_vrss_sign == 4 || prdy_vrss_sign == 5) {
        return 'blue'
      }

      return '';
    },
    upDownArrow(prdy_vrss_sign) {
      if(prdy_vrss_sign == 1 || prdy_vrss_sign == 2) {
        return 'icon-up'
      }

      if(prdy_vrss_sign == 4 || prdy_vrss_sign == 5) {
        return 'icon-down'
      }

      return '';
    }
  }
};
</script>
