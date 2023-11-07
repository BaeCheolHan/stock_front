<template>
  <div class="flex mg-t-5" style="justify-content: right;" :style="UiService.isMobileFont()">
    <span>* 각 지수는 3분 주기로 갱신합니다.</span>
  </div>
  <div class="flex mg-t-5" style="justify-content: right;">
    <div class="flex" :style="UiService.isMobileFont()">
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
          <div :class="UiService.setColorClass(kospi.output1.prdy_vrss_sign)"
               :style="UiService.isMobileFont()">
            <span>{{ kospi.output1.bstp_nmix_prpr }}</span>
            <span>
              (<span :class="UiService.setUpDownArrowClass(kospi.output1.prdy_vrss_sign)"></span>
            </span>
            <span>{{ kospi.output1.bstp_nmix_prdy_vrss }})</span>
          </div>
        </div>
        <apexchart type="candlestick" :options="chartOptions" :series="kospiSeries"></apexchart>
      </div>
      <div style="min-width: 165px; width: 40%" v-if="kosdaq">
        <div class="flex" style="justify-content: flex-start; align-items: center">
          <h4 class="t-a-c mg-r-15">KOSDAQ</h4>
          <div :class="UiService.setColorClass(kosdaq.output1.prdy_vrss_sign)"
               :style="UiService.isMobileFont()">
            <span>{{ kosdaq.output1.bstp_nmix_prpr }}</span>
            <span>
              (<span :class="UiService.setUpDownArrowClass(kosdaq.output1.prdy_vrss_sign)"></span>
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
          <div :class="UiService.setColorClass(snp.output1.prdy_vrss_sign)" :style="UiService.isMobileFont()">
            <span>{{ snp.output1.ovrs_nmix_prpr }}</span>
            <span>
              (<span :class="UiService.setUpDownArrowClass(snp.output1.prdy_vrss_sign)"></span>
            </span>
            <span>{{ snp.output1.ovrs_nmix_prdy_vrss }})</span>
          </div>
        </div>
        <apexchart type="candlestick" :options="chartOptions" :series="snpSeries"></apexchart>
      </div>
      <div style="min-width: 165px; width: 40%" v-if="nasdaq">
        <div class="flex" style="justify-content: flex-start; align-items: center">
          <h4 class="t-a-c mg-r-15">NASDAQ</h4>
          <div :class="UiService.setColorClass(nasdaq.output1.prdy_vrss_sign)"
               :style="UiService.isMobileFont()">
            <span>{{ nasdaq.output1.ovrs_nmix_prpr }}</span>
            <span>
              (<span :class="UiService.setUpDownArrowClass(nasdaq.output1.prdy_vrss_sign)"></span>
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
            show: !this.UiService.isMobile(),
            formatter: function (val) {
              return val
            }
          }
        },
        yaxis: {
          show: !this.UiService.isMobile(),
          tooltip: {
            enabled: false
          }
        }
      },
    }
  },
  watch: {
    'chartType': async function () {
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
  }
};
</script>
