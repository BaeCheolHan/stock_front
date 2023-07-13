<template>
  <div class="content">
    <v-card class="mg-b-5" v-for="stock in stocks" :key="stock.id" @click="showStockDetail(stock)">
      <v-card-text>
        <div>
          <div class="flex" style="justify-content: space-between">
            <div class="w-50">
              <div class="flex" style="justify-content: left">
              <p style="overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        max-width: 60%;
                        word-break: break-all;">{{ stock.name }}</p><p>({{ stock.symbol }})</p>
              </div>
              <p>보유 수량 : {{ stock.quantity.toLocaleString('ko-KR') }}</p>
              <p>수익률</p>
            </div>
            <div class="t-a-r w-50">
              <p>{{ stock.code }} ({{ stock.national }})</p>
              <p :style="setPriceColor(stock)">평단 : {{ stock.avgPrice.toLocaleString('ko-KR') }}
                ({{ stock.national == 'KR' ? stock.nowPrice.toLocaleString('ko-KR') : stock.nowPrice }})</p>
              <p :style="setRateOfReturnPerColor(stock)">
                {{ (Number(stock.quantity) * Number(stock.nowPrice) - (Number(stock.quantity) * Number(stock.avgPrice)))
                  .toLocaleString('ko-KR')}} ({{ Number(stock.rateOfReturnPer).toFixed(2).toLocaleString('ko-KR') }}%)
              </p>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-actions>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="showRegStockPop" width="100%"
               style="text-align: center">
          + 보유 주식을 등록해주세요.
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <Modal v-if="isShowRegStockPop" @close-modal="isShowRegStockPop = false">
    <SaveStock msg=""/>
  </Modal>
  <Modal v-if="isShowStockDetailPop" @close-modal="isShowStockDetailPop = false">
    <DetailStock msg=""/>
  </Modal>
</template>


<script>
import Modal from "@/views/common/Modal";
import SaveStock from "@/components/stock/SaveStock";
import DetailStock from "@/components/stock/DetailStock";

export default {
  name: "StockBox",
  components: {
    Modal,
    SaveStock,
    DetailStock
  },
  props: {
    stocks: [],
  },
  data: function () {
    return {
      isShowRegStockPop: false,
      isShowStockDetailPop: false,
      stockName: '',
      selectedStock: null,
    }
  },
  watch: {},
  created: async function () {
  },
  methods: {
    generateStockTitle: function (stock) {
      return stock.name.concat('(').concat(stock.symbol).concat(')').concat('<br/>').concat(stock.quantity)
    },
    showRegStockPop: function () {
      this.isShowRegStockPop = true;
    },
    setPriceColor: function (stock) {
      return Number(stock.avgPrice) > Number(stock.nowPrice) ? 'color: blue' : 'color: red'
    },
    setRateOfReturnPerColor: function (stock) {
      return Number(stock.rateOfReturnPer) > 0 ? 'color: red' : 'color: blue'
    },
    showStockDetail: function (stock) {
      this.selectedStock = stock
      this.isShowStockDetailPop = true
    }

  }
};
</script>

<style scoped>

</style>
