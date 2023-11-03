<template>
  <div class="exchange-rate-wrap" v-if="exchangeRate">
    <p class="red font-weight-bold"> {{ exchangeRate.basePrice }}원 ({{ exchangeRate.date }} : {{
        exchangeRate.time
      }})</p>
    <span class="mg-r-30">살때 : {{ exchangeRate.cashBuyingPrice }}</span>
    <span>팔때 : {{ exchangeRate.cashSellingPrice }}</span>
  </div>
</template>

<script>

export default {
  name: 'ExchangeRate',
  components: {},
  data() {
    return {
      exchangeRate: {
        basePrice: '',
        date: '',
        time: '',
        cashBuyingPrice: '',
        cashSellingPrice: '',
      }
    }
  },
  async created() {
    let res = await this.axios.get('/api/exchange-rate');
    this.exchangeRate.basePrice = res.data.basePrice;
    this.exchangeRate.date = res.data.date;
    this.exchangeRate.time = res.data.time;
    this.exchangeRate.cashBuyingPrice = res.data.cashBuyingPrice;
    this.exchangeRate.cashSellingPrice = res.data.cashSellingPrice;

  },
  methods: {}

}
</script>