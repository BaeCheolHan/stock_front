<template>
  <div class="content" v-if="detail">
    <h2>{{ $parent.$parent.selectedStock.name }}({{ $parent.$parent.selectedStock.symbol }})</h2>
    <div class="popup-wrap" style="padding: 10px 0 0;!important;">

      <div class="pd-10 border">
        <div class="flex" style="justify-content: space-between;">
          <div>
            <p class="bold">시가 : {{ detail.startPrice.toLocaleString("ko-KR") }}</p>
            <p class="bold">최고가 : {{ detail.highPrice.toLocaleString("ko-KR") }}</p>
            <p>PER : {{ detail.per }}</p>
            <p>EPS : {{ detail.eps }}</p>
            <p class="bold" :style="setPlusMinusColor(detail.nowPrice - Math.floor(totalPrice / totalQuantity))" v-if="$parent.$parent.selectedStock.national == 'KR'">평균가 : {{Math.floor(totalPrice / totalQuantity).toLocaleString("ko-KR")}}원</p>
            <p class="bold" v-else>평균가 : ${{Math.floor(totalPrice / totalQuantity).toLocaleString("ko-KR")}}</p>
          </div>
          <div>
            <p  class="bold" :style="setColor()">
              현재가 : {{ detail.nowPrice.toLocaleString("ko-KR") }} ({{
                detail.compareToYesterdaySign === 'plus' ? '+' : ''
              }}{{ detail.compareToYesterday }})
            </p>
            <p class="bold">최저가 : {{ detail.lowPrice.toLocaleString("ko-KR") }}</p>
            <p>PBR : {{ detail.pbr }}</p>
            <p>BPS : {{ detail.bps }}</p>
            <p class="bold">총 수량 : {{totalQuantity}} 주</p>
          </div>
        </div>
        <v-divider class="mg-t-10 mg-b-10"></v-divider>
        <div class="flex" style="justify-content: space-between">
          <div>
            <p class="bold">총 구매 가격 : </p>
            <p class="bold" :style="setPlusMinusColor(rateOfReturn)">현재 자산 가치 : </p>
          </div>
          <div class="t-a-r">
            <p class="bold" v-if="$parent.$parent.selectedStock.national == 'KR'">{{ totalPrice.toLocaleString("ko-KR") }}원</p>
            <p class="bold" v-else>$ {{ Math.floor(totalPrice) }}</p>
            <p class="bold" v-if="$parent.$parent.selectedStock.national == 'KR'" :style="setPlusMinusColor(rateOfReturn)">{{Math.floor( (this.detail.nowPrice * this.totalQuantity)).toLocaleString('ko-KR')}}원 ({{rateOfReturn.toLocaleString("ko-KR")}}원)</p>
            <p class="bold" v-else :style="setPlusMinusColor(rateOfReturn)">${{Math.floor( (this.detail.nowPrice * this.totalQuantity)).toLocaleString('ko-KR')}} (${{rateOfReturn.toLocaleString("ko-KR")}})</p>
          </div>

         </div>
      </div>

      <v-divider class="mg-t-10 mg-b-10"></v-divider>
      <div class="mg-t-10">
        <v-card class="mg-b-5" v-for="stock in detail.stocks" :key="stock.id">
          <v-card-text style="padding: 3px 5px 5px 5px; !important;">
            <div>
              <div class="flex" style="justify-content: space-between">
                <p>구매일: {{ yyyyMMdd(stock.createdDate) }}</p>
                <i class="ti-trash" @click="removeHistory(stock.id)"></i>
              </div>
              <div class="flex" style="justify-content: space-between">
                <p v-if="$parent.$parent.selectedStock.national == 'KR'">구매가: {{ stock.price.toLocaleString("ko-KR") }} 원</p>
                <p v-else>구매가: $ {{ stock.price.toLocaleString("ko-KR") }}</p>
                <p>수량: {{ stock.quantity }}</p>
              </div>
            </div>

          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailStock",
  props: {
    msg: String,
  },
  data: function () {
    return {
      detail: null,
      totalPrice: 0,
      totalQuantity: 0,
      rateOfReturn: 0,
    }
  },
  watch: {},
  created: async function () {
    await this.init();
  },
  methods: {
    init: async function () {
      let res = await this.axios.get("/api/stock/"
          .concat(JSON.parse(sessionStorage.getItem('userInfo')).memberId)
          .concat("/").concat(this.$parent.$parent.selectedStock.national)
          .concat("/").concat(this.$parent.$parent.selectedStock.code)
          .concat("?symbol=").concat(this.$parent.$parent.selectedStock.symbol))
      this.detail = res.data.detail;
      this.detail.stocks.forEach(item => this.totalPrice += (item.quantity * item.price))
      this.detail.stocks.forEach(item => this.totalQuantity += item.quantity)
      this.rateOfReturn = Math.floor( (this.detail.nowPrice * this.totalQuantity) - this.totalPrice);
    },
    setColor: function () {
      if (this.detail.compareToYesterdaySign == 'minus') {
        return 'color: blue;'
      } else if (this.detail.compareToYesterdaySign == 'plus') {
        return 'color: red;'
      } else {
        return 'color: black;'
      }
    },
    yyyyMMdd: function (value) {
      if (value == '') return '';
      let jsDate = new Date(value);
      jsDate.setHours(jsDate.getHours() + 9);
      return jsDate.toISOString().replace('T', ' ').substring(0, 10);
    },
    removeHistory: async function (id) {
      if (confirm("삭제하시겠습니까?")) {
        await this.axios.delete("/api/stock/".concat(id));
        await this.init();
      }
    },
    setPlusMinusColor: function (amount) {
      return Number(amount) > 0 ? 'color: red' : 'color: blue'
    },
  }
};
</script>
