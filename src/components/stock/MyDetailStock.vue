<template>
  <div class="content" v-if="detail">
    <h2>{{ $parent.$parent.selectedStock.name }}({{ $parent.$parent.selectedStock.symbol }})</h2>
    <div class="popup-wrap" style="padding: 10px 0 0;!important;">

      <div v-if="series" id="chart">
        <div class="flex">
          <button class="mg-r-10" :class="{'redBtn' : chartType === 'D', 'border-radius-8' : chartType !== 'D'}" @click="changeChartType('D')">일별</button>
          <button class="mg-r-10" :class="{'redBtn' : chartType === 'W', 'border-radius-8' : chartType !== 'W'}" @click="changeChartType('W')">주별</button>
          <button class="mg-r-10" :class="{'redBtn' : chartType === 'M', 'border-radius-8' : chartType !== 'M'}" @click="changeChartType('M')">월별</button>
          <button v-if="$parent.$parent.selectedStock.national == 'KR'" :class="{'redBtn' : chartType === 'Y', 'border-radius-8' : chartType !== 'Y'}" @click="changeChartType('Y')">년별</button>
        </div>
        <apexchart type="candlestick" :options="chartOptions" :series="series"></apexchart>

      </div>
      <div class="pd-10 border">
        <div class="flex" style="justify-content: space-between;">
          <div>
            <p class="bold">시가 : {{ detail.startPrice.toLocaleString("ko-KR") }}</p>
            <p class="bold">최고가 : {{ detail.highPrice.toLocaleString("ko-KR") }}</p>
            <p>PER : {{ detail.per }}</p>
            <p>EPS : {{ detail.eps }}</p>
            <p class="bold" :style="setPlusMinusColor(detail.nowPrice - Math.floor(totalPrice / totalQuantity))" v-if="$parent.$parent.selectedStock.national == 'KR'">
              평균가 : {{ Math.floor(totalPrice / totalQuantity).toLocaleString("ko-KR") }}원
            </p>
            <p class="bold" v-else>평균가 : ${{ Math.floor(totalPrice / totalQuantity).toLocaleString("ko-KR") }}</p>
          </div>
          <div>
            <div>
              <span class="bold" :style="UiService.setColorStyle(detail.compareToYesterdaySign)">현재가 : {{ detail.nowPrice.toLocaleString("ko-KR") }}(</span>
              <span class="bold" :style="UiService.setColorStyle(detail.compareToYesterdaySign)" :class="UiService.setUpDownArrowClass(detail.compareToYesterdaySign)">{{ detail.compareToYesterday.toLocaleString("ko-KR") }})</span>
            </div>
            <p class="bold">최저가 : {{ detail.lowPrice.toLocaleString("ko-KR") }}</p>
            <p>PBR : {{ detail.pbr }}</p>
            <p>BPS : {{ detail.bps }}</p>
            <p class="bold">총 수량 : {{ totalQuantity }} 주</p>
          </div>
        </div>
        <v-divider class="mg-t-10 mg-b-10"></v-divider>
        <div class="flex" style="justify-content: space-between">
          <div>
            <p class="bold">총 구매 가격 : </p>
            <p class="bold red">총 수령 배당금 : </p>
            <p class="bold" :style="setPlusMinusColor(rateOfReturn)">현재 자산 가치 : </p>
          </div>
          <div class="t-a-r">
            <p class="bold" v-if="$parent.$parent.selectedStock.national == 'KR'">
              {{ totalPrice.toLocaleString("ko-KR") }}원
            </p>
            <p class="bold" v-else>$ {{ Math.floor(totalPrice).toLocaleString("ko-KR") }}</p>

            <p class="bold red" v-if="$parent.$parent.selectedStock.national == 'KR'"> {{ detail.totalDividend.toLocaleString('ko-KR') }}원</p>
            <p class="bold red" v-else> ${{ detail.totalDividend.toLocaleString('ko-KR') }}</p>

            <p class="bold" v-if="$parent.$parent.selectedStock.national == 'KR'" :style="setPlusMinusColor(rateOfReturn)">
              {{ Math.floor((this.detail.nowPrice * this.totalQuantity)).toLocaleString('ko-KR') }}원 ({{ rateOfReturn.toLocaleString("ko-KR") }}원)
            </p>
            <p class="bold" v-else :style="setPlusMinusColor(rateOfReturn)">
              ${{ Math.floor((this.detail.nowPrice * this.totalQuantity)).toLocaleString('ko-KR') }} (${{ rateOfReturn.toLocaleString("ko-KR") }})
            </p>
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
                <p v-if="$parent.$parent.selectedStock.national == 'KR'">구매가: {{ stock.price.toLocaleString("ko-KR") }}
                  원</p>
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
  name: "MyDetailStock",
  components: {
  },
  props: {
    msg: String,
  },
  data: function () {
    return {
      detail: null,
      totalPrice: 0,
      totalQuantity: 0,
      rateOfReturn: 0,
      chartType:'D',
      series: [{
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'candlestick',
          toolbar: {
            show: false
          }
        },
        title: {
          text: '',
          align: 'left'
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: '#fa0202',
              downward: '#0213fa'
            }
          }
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          type: 'category',
          labels: {
            show: !this.UiService.isMobile(),
            formatter: function(val) {
              return val
            }
          }
        },
        yaxis: {
          show: !this.UiService.isMobile(),
          tooltip: {
            enabled: true
          }
        }
      },


    }
  },
  watch: {
    chartType: async function() {
      let res = await this.axios.get('/api/stock/chart/'.concat(this.chartType)
          .concat('/').concat(this.$parent.$parent.selectedStock.national)
          .concat('/').concat(this.$parent.$parent.selectedStock.symbol));
      this.series[0].data = [];
      res.data.chartData.forEach(item => this.series[0].data.push({x: item.date, y: [item.open, item.high, item.low, item.close]}))
    }
  },
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
      this.rateOfReturn = Math.floor((this.detail.nowPrice * this.totalQuantity) - this.totalPrice);
      this.series[0].name = this.$parent.$parent.selectedStock.name
      res.data.detail.chartData.forEach(item => this.series[0].data.push({x: item.date, y: [item.open, item.high, item.low, item.close]}))
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
    changeChartType: function (chartType) {
      this.chartType = chartType;
    },
  }
};
</script>
