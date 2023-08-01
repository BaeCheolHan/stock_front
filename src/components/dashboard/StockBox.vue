<template>
  <div class="content">
    <StockIcon class="mg-b-10" @click="showRegStockPop"/>

    <v-card class="mg-b-5" v-for="stock in stocks" :key="stock.id" @click="showStockDetail(stock)">
      <v-card-text>
        <div>
          <div class="flex" style="justify-content: space-between; font-size: 12px;">
            <div class="w-50">
              <div class="flex bold" style="justify-content: left;">
              <p style="overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        max-width: 55%;
                        word-break: break-all;">{{ stock.name }}</p><p>({{ stock.symbol }})</p>
              </div>
              <p>보유 수량 : {{ stock.quantity.toLocaleString('ko-KR') }}</p>
              <p class="bold">수익률</p>
              <p>총 수령 배당금</p>
              <p class="bold">단순 수익 계산</p>
            </div>
            <div class="t-a-r w-55">
              <p class="bold">{{ stock.code }} ({{ stock.national }})</p>
              <p v-if="stock.national === 'KR'" :style="setPriceColor(stock)">평단 : {{ Math.floor(Number(stock.avgPrice)).toLocaleString('ko-KR') }}
                ({{ stock.national == 'KR' ? stock.nowPrice.toLocaleString('ko-KR') : stock.nowPrice }})</p>
              <p v-else :style="setPriceColor(stock)">평단 : {{ stock.avgPrice.toLocaleString('ko-KR') }}
                ({{ stock.national == 'KR' ? stock.nowPrice.toLocaleString('ko-KR') : stock.nowPrice }})</p>
              <p :style="setRateOfReturnPerColor(stock)" class="bold">
                {{ (Number(stock.quantity) * Number(stock.nowPrice) - (Number(stock.quantity) * Number(stock.avgPrice)))
                  .toLocaleString('ko-KR')}} ({{ Number(stock.rateOfReturnPer).toFixed(2).toLocaleString('ko-KR') }}%)
              </p>
              <p class="red" v-if="stock.national === 'KR'">{{ stock.totalDividend.toLocaleString('ko-KR') }}원</p>
              <p v-else class="red">${{ stock.totalDividend.toLocaleString('ko-KR') }}</p>

              <p v-if="stock.national === 'KR'" :style="setTotalPriceColor(stock)" class="bold">
                {{(Number(stock.totalDividend) + (Number(stock.quantity) * Number(stock.nowPrice) - (Number(stock.quantity) * Number(stock.avgPrice)))).toLocaleString('ko-KR')}}원
              </p>
              <p v-else :style="setTotalPriceColor(stock)" class="bold">
                ${{(Number(stock.totalDividend) + (Number(stock.quantity) * Number(stock.nowPrice) - (Number(stock.quantity) * Number(stock.avgPrice)))).toLocaleString('ko-KR')}}
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
import StockIcon from "@/components/button/stockicon";

export default {
  name: "StockBox",
  components: {
    Modal,
    SaveStock,
    DetailStock,
    StockIcon
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
    setTotalPriceColor: function(stock) {
      return (Number(stock.totalDividend) + (Number(stock.quantity) * Number(stock.nowPrice) - (Number(stock.quantity) * Number(stock.avgPrice)))) > 0 ? 'color: red' : 'color: blue'
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
