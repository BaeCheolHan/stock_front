<template>
  <div class="content" v-if="detail">
    <h2>{{ $parent.$parent.selectedStock.hts_kor_isnm }}({{ $parent.$parent.selectedStock.mksc_shrn_iscd }})</h2>
    <div class="popup-wrap" style="padding: 10px 0 0;!important;">

      <div v-if="series" id="chart">
        <div class="flex">
          <button class="mg-r-10" :class="{'redBtn' : chartType === 'D', 'border-radius-8' : chartType !== 'D'}"
                  @click="changeChartType('D')">일별
          </button>
          <button class="mg-r-10" :class="{'redBtn' : chartType === 'W', 'border-radius-8' : chartType !== 'W'}"
                  @click="changeChartType('W')">주별
          </button>
          <button class="mg-r-10" :class="{'redBtn' : chartType === 'M', 'border-radius-8' : chartType !== 'M'}"
                  @click="changeChartType('M')">월별
          </button>
          <button v-if="$parent.$parent.selectedStock.national == 'KR'"
                  :class="{'redBtn' : chartType === 'Y', 'border-radius-8' : chartType !== 'Y'}"
                  @click="changeChartType('Y')">년별
          </button>
        </div>
        <apexchart type="candlestick" :options="chartOptions" :series="series"></apexchart>
      </div>
      <div class="pd-10 border">
        <div class="flex" style="justify-content: space-between;">
          <div>
            <p class="bold">시가 : {{ detail.stck_oprc.toLocaleString("ko-KR") }}</p>
            <p class="bold">최고가 : {{ detail.stck_hgpr.toLocaleString("ko-KR") }}</p>
            <p>PER : {{ detail.per }}</p>
            <p>EPS : {{ detail.eps }}</p>
          </div>
          <div>
            <p class="bold" :style="UiService.setColorStyle(detail.prdy_vrss_sign)">
              현재가 : {{ detail.stck_prpr.toLocaleString("ko-KR") }}
              <span :style="UiService.setColorStyle(detail.prdy_vrss_sign)">
                (<span :class="UiService.setUpDownArrowClass(detail.prdy_vrss_sign)"></span> {{ detail.prdy_vrss.toLocaleString("ko-KR") }}원)
              </span>
            </p>
            <p class="bold">최저가 : {{ detail.stck_lwpr.toLocaleString("ko-KR") }}</p>
            <p>PBR : {{ detail.pbr }}</p>
            <p>BPS : {{ detail.bps }}</p>
          </div>
        </div>
        <v-divider class="mg-t-10 mg-b-10"></v-divider>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "DetailStock",
  components: {},
  props: {
    msg: String,
  },
  data: function () {
    return {
      detail: null,
      totalPrice: 0,
      totalQuantity: 0,
      rateOfReturn: 0,
      chartType: 'D',
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
            show: this.isMobile(),
            formatter: function (val) {
              return val
            }
          }
        },
        yaxis: {
          show: this.isMobile(),
          tooltip: {
            enabled: true
          }
        }
      },


    }
  },
  watch: {
    chartType: async function () {
      let res = await this.axios.get('/api/stock/chart/'.concat(this.chartType)
          .concat('/KR')
          .concat('/').concat(this.$parent.$parent.selectedStock.mksc_shrn_iscd));
      this.series[0].data = [];
      res.data.chartData.forEach(item => this.series[0].data.push({
        x: item.date,
        y: [item.open, item.high, item.low, item.close]
      }))
    }
  },
  created: async function () {
    await this.init();
  },
  methods: {
    init: async function () {
      let res = await this.axios.get("/api/stock"
          .concat("?symbol=").concat(this.$parent.$parent.selectedStock.mksc_shrn_iscd))
      this.detail = res.data.detail;
      this.series[0].name = this.$parent.$parent.selectedStock.name
      res.data.chartData.forEach(item => this.series[0].data.push({
        x: item.date,
        y: [item.open, item.high, item.low, item.close]
      }))
    },

    changeChartType: function (chartType) {
      this.chartType = chartType;
    },
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
      return !flag;
    },
  }
};
</script>
