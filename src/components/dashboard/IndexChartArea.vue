<template>
  <div class="flex mg-t-5" style="justify-content: right;" :style="isMobileFont()">
    <span>* 각 지수는 3분 주기로 갱신합니다.</span>
  </div>
  <div class="flex mg-t-5" style="justify-content: right;">
    <div class="flex" :style="isMobileFont()">
      <button class="mg-r-10" :class="{'redBtn' : chartType === 'D', 'border-radius-8' : chartType !== 'D'}"
              @click="changeChartType('D')">일별
      </button>
      <button class="mg-r-10" :class="{'redBtn' : chartType === 'W', 'border-radius-8' : chartType !== 'W'}"
              @click="changeChartType('W')">주별
      </button>
      <button class="mg-r-10" :class="{'redBtn' : chartType === 'M', 'border-radius-8' : chartType !== 'M'}"
              @click="changeChartType('M')">월별
      </button>
      <button class="mg-r-10" :class="{'redBtn' : chartType === 'Y', 'border-radius-8' : chartType !== 'Y'}"
              @click="changeChartType('Y')">년별
      </button>
    </div>
  </div>
  <div class="mg-t-10">
    <div class="flex" style="flex-wrap: wrap; max-width: 90%; margin: 0 auto; justify-content: space-around">
      <div style="min-width: 165px; width: 40%" v-if="kospi">
        <div class="flex" style="justify-content: flex-start; align-items: center">
          <h4 class="t-a-c mg-r-15">KOSPI</h4>
          <div :class="{'red' : kospi.output1.prdy_vrss_sign == 1 || kospi.output1.prdy_vrss_sign == 2,
                         'blue': kospi.output1.prdy_vrss_sign == 4 || kospi.output1.prdy_vrss_sign == 5 }"
               :style="isMobileFont()">
            <span>{{ kospi.output1.bstp_nmix_oprc }}</span>
            <span v-if="kospi.output1.prdy_vrss_sign == 1 || kospi.output1.prdy_vrss_sign == 2">
            (+
            </span>
            <span v-else-if="kospi.output1.prdy_vrss_sign == 4 || kospi.output1.prdy_vrss_sign == 5">
            (-
            </span>
            <span v-else>
              (
            </span>
            <span>{{ kospi.output1.bstp_nmix_prdy_vrss }})</span>
          </div>
        </div>
        <apexchart type="candlestick" :options="chartOptions" :series="kospiSeries"></apexchart>
      </div>
      <div style="min-width: 165px; width: 40%" v-if="kosdaq">
        <div class="flex" style="justify-content: flex-start; align-items: center">
          <h4 class="t-a-c mg-r-15">KOSDAQ</h4>
          <div :class="{'red' : kosdaq.output1.prdy_vrss_sign == 1 || kosdaq.output1.prdy_vrss_sign == 2,
                        'blue': kosdaq.output1.prdy_vrss_sign == 4 || kosdaq.output1.prdy_vrss_sign == 5 }"
               :style="isMobileFont()">
            <span>{{ kosdaq.output1.bstp_nmix_oprc }}</span>
            <span v-if="kosdaq.output1.prdy_vrss_sign == 1 || kosdaq.output1.prdy_vrss_sign == 2">
            (+
            </span>
            <span v-else-if="kosdaq.output1.prdy_vrss_sign == 4 || kosdaq.output1.prdy_vrss_sign == 5">
            (-
            </span>
            <span v-else>
              (
            </span>
            <span>{{ kosdaq.output1.bstp_nmix_prdy_vrss }})</span>
          </div>
        </div>
        <apexchart type="candlestick" :options="chartOptions" :series="kosdaqSeries"></apexchart>
      </div>
    </div>

    <div class="flex" style="flex-wrap: wrap; max-width: 90%; margin: 0 auto; justify-content: space-around">
      <div style="min-width: 165px; width: 40%" v-if="snp">
        <div class="flex" style="justify-content: flex-start; align-items: center">
          <h4 class="t-a-c mg-r-15">S&P500</h4>
          <div :class="{'red' : snp.output1.prdy_vrss_sign == 1 || snp.output1.prdy_vrss_sign == 2,
                         'blue': snp.output1.prdy_vrss_sign == 4 || snp.output1.prdy_vrss_sign == 5 }"
               :style="isMobileFont()">
            <span>{{ snp.output1.ovrs_prod_oprc }}</span>
            <span v-if="snp.output1.prdy_vrss_sign == 1 || snp.output1.prdy_vrss_sign == 2">
            (+
            </span>
            <span v-else-if="snp.output1.prdy_vrss_sign == 4 || snp.output1.prdy_vrss_sign == 5">
            (-
            </span>
            <span v-else>
              (
            </span>
            <span>{{ snp.output1.ovrs_nmix_prdy_vrss }})</span>
          </div>
        </div>
        <apexchart type="candlestick" :options="chartOptions" :series="snpSeries"></apexchart>
      </div>
      <div style="min-width: 165px; width: 40%" v-if="nasdaq">
        <div class="flex" style="justify-content: flex-start; align-items: center">
          <h4 class="t-a-c mg-r-15">NASDAQ</h4>

          <div :class="{'red' : nasdaq.output1.prdy_vrss_sign == 1 || nasdaq.output1.prdy_vrss_sign == 2,
                         'blue': nasdaq.output1.prdy_vrss_sign == 4 || nasdaq.output1.prdy_vrss_sign == 5 }"
               :style="isMobileFont()">
            <span>{{ nasdaq.output1.ovrs_prod_oprc }}</span>
            <span v-if="nasdaq.output1.prdy_vrss_sign == 1 || nasdaq.output1.prdy_vrss_sign == 2">
            (+
            </span>
            <span v-else-if="nasdaq.output1.prdy_vrss_sign == 4 || nasdaq.output1.prdy_vrss_sign == 5">
            (-
            </span>
            <span v-else>
              (
            </span>
            <span>{{ nasdaq.output1.ovrs_nmix_prdy_vrss }})</span>
          </div>
        </div>
        <apexchart type="candlestick" :options="chartOptions" :series="nasdaqSeries"></apexchart>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "IndexChartArea",
  components: {},
  data: function () {
    return {
      kospi: null,
      kosdaq: null,
      snp: null,
      nasdaq: null,
      chartType: 'D',
      kospiSeries: [{
        data: []
      }],
      kosdaqSeries: [
        {
          data: []
        }
      ],
      snpSeries: [
        {
          data: []
        }
      ],
      nasdaqSeries: [
        {
          data: []
        }
      ],
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
            show: !this.isMobile(),
            formatter: function (val) {
              return val
            }
          }
        },
        yaxis: {
          show: !this.isMobile(),
          tooltip: {
            enabled: false
          }
        }
      },
    }
  },
  watch: {
    'chartType': async function () {
      console.log("!")
      await this.getIndexChartData()
    }
  },
  created: async function () {
    await this.getIndexChartData();
  },
  methods: {
    async getIndexChartData() {
      let res = await this.axios.get('/api/dashboard/index-chart/'.concat(this.chartType));
      this.kospi = res.data.kospi;
      this.kosdaq = res.data.kosdaq;
      this.snp = res.data.snp;
      this.nasdaq = res.data.nasdaq;
      this.kospiSeries[0].data = [];
      this.kosdaqSeries[0].data = [];
      this.snpSeries[0].data = [];
      this.nasdaqSeries[0].data = [];
      this.kospi.output2.forEach(item => this.kospiSeries[0].data.push({
        x: item.stck_bsop_date,
        y: [item.bstp_nmix_oprc, item.bstp_nmix_hgpr, item.bstp_nmix_lwpr, item.bstp_nmix_prpr]
      }))
      this.kosdaq.output2.forEach(item => this.kosdaqSeries[0].data.push({
        x: item.stck_bsop_date,
        y: [item.bstp_nmix_oprc, item.bstp_nmix_hgpr, item.bstp_nmix_lwpr, item.bstp_nmix_prpr]
      }))
      this.snp.output2.forEach(item => this.snpSeries[0].data.push({
        x: item.stck_bsop_date,
        y: [item.ovrs_nmix_oprc, item.ovrs_nmix_hgpr, item.ovrs_nmix_lwpr, item.ovrs_nmix_prpr]
      }))
      this.snp.output2.forEach(item => this.nasdaqSeries[0].data.push({
        x: item.stck_bsop_date,
        y: [item.ovrs_nmix_oprc, item.ovrs_nmix_hgpr, item.ovrs_nmix_lwpr, item.ovrs_nmix_prpr]
      }))
    },
    changeChartType(val) {
      this.chartType = val;
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
      return flag;
    },
    isMobileFont() {
      if (this.isMobile()) {
        return 'font-size: 10px;'
      } else {
        return '';
      }
    }
  }
};
</script>
