<template>
  <div class="content">
    <v-card v-for="stock in stocks" :key="stock.id">
      <v-card-text>
        <div>
          <div class="flex" style="justify-content: space-between">
            <p>{{ stock.name }} ({{stock.symbol}})</p>
            <p>{{ stock.code }} ({{stock.national}})</p>
          </div>
          <div class="flex" style="justify-content: space-between">
            <p>보유 수량 : {{ stock.quantity.toLocaleString('ko-KR') }}</p>
            <p>평균 가격 : {{ stock.avgPrice.toLocaleString('ko-KR') }}</p>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "StockBox",
  props: {
    stocks: [],
  },
  data: function () {
    return {
    }
  },
  watch: {
  },
  created: async function () {
  },
  methods: {
    generateStockTitle: function (stock) {
      return stock.name.concat('(').concat(stock.symbol).concat(')').concat('<br/>').concat(stock.quantity)
    }

  }
};
</script>

<style scoped>

</style>
