<template>
  <div class="content">
    <v-card class="mg-b-5" v-for="stock in stocks" :key="stock.id">
      <v-card-text>
        <div>
          <div class="flex" style="justify-content: space-between">
            <p>{{ stock.name }} ({{ stock.symbol }})</p>
            <p>{{ stock.code }} ({{ stock.national }})</p>
          </div>
          <div class="flex" style="justify-content: space-between">
            <p>보유 수량 : {{ stock.quantity.toLocaleString('ko-KR') }}</p>
            <p>평균 가격 : {{ stock.avgPrice.toLocaleString('ko-KR') }}</p>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-actions>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="showRegStockPop" width="100%" style="text-align: center">
          + 보유 주식을 등록해주세요.
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <Modal v-if="isShowRegStockPop" @close-modal="isShowRegStockPop = false">
    <SaveStock msg=""/>
  </Modal>
</template>


<script>
import Modal from "@/views/common/Modal";
import SaveStock from "@/components/stock/SaveStock";

export default {
  name: "StockBox",
  components: {
    Modal,
    SaveStock,
  },
  props: {
    stocks: [{}],
  },
  data: function () {
    return {
      isShowRegStockPop: false,
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
    }

  }
};
</script>

<style scoped>

</style>
