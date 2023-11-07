<template>
  <div style=" max-width: 90%; margin: 0 auto;">
    <h3>국내 거래량 순위</h3>
    <v-card class="mg-b-5 mg-t-10" v-for="stock in data" :key="stock.data_rank" @click="showStockDetail(stock)">
      <v-card-text>
        <div>
          <div class="flex" :style="UiService.isMobileFont()">
            <div>
              <div class="flex" style="justify-content: left;">
                <span class="bold">{{ stock.data_rank }}. </span>
                <span class="bold">{{ stock.hts_kor_isnm }}</span>
                <div :style="UiService.setColorStyle(stock.prdy_vrss_sign)">
                  <span class="mg-l-5">
                    (<span :class="UiService.setUpDownArrowClass(stock.prdy_vrss_sign)"></span>{{ Number(stock.prdy_ctrt).toLocaleString('ko-KR') }}%)
                  </span>
                </div>
              </div>
              <div class="flex">
                <div>
                  <span class="bold">현재가 : </span>
                  <span :style="UiService.setColorStyle(stock.prdy_vrss_sign)">{{ Number(stock.stck_prpr).toLocaleString('ko-KR') }} 원</span>
                </div>
                <div>
                  <span class="mg-l-20 bold">전일 대비 : </span>
                  <span :style="UiService.setColorStyle(stock.prdy_vrss_sign)">
                    <span :class="UiService.setUpDownArrowClass(stock.prdy_vrss_sign)"></span>
                    {{ Number(stock.prdy_vrss).toLocaleString('ko-KR') }} 원
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
  <Modal v-if="isShowStockDetailPop" @close-modal="isShowStockDetailPop = false">
    <DetailStock msg=""/>
  </Modal>
</template>

<script>

import Modal from "@/views/common/Modal";
import DetailStock from "@/components/dashboard/popup/DetailStock";

export default {
  name: "KrVolumeRankBox",
  components: {
    Modal,
    DetailStock
  },
  data: function () {
    return {
      data: null,
      selectedStock: null,
      isShowStockDetailPop: false,
    }
  },
  created: async function () {
    let res = await this.axios.get("/api/dashboard/kr/volume/0000")
    this.data = res.data.data;
  },
  methods: {
    showStockDetail(stock) {
      this.selectedStock = stock;
      this.isShowStockDetailPop = true
    }
  }
};
</script>
