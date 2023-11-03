<template>
  <div class="mg-t-20">
    <div class="flex" style="flex-wrap: wrap; max-width: 90%; margin: 0 auto; justify-content: space-around">
      <div style="min-width: 165px; width: 40%">
        <h3 class="t-a-c">KOSPI 지수</h3>
        <apexchart type="candlestick" :options="chartOptions" :series="kospiSeries"></apexchart>
      </div>
      <div style="min-width: 165px; width: 40%">
        <h3 class="t-a-c">KOSDAQ 지수</h3>
        <apexchart type="candlestick" :options="chartOptions" :series="kosdaqSeries"></apexchart>
      </div>
    </div>

    <div class="flex" style="flex-wrap: wrap; max-width: 90%; margin: 0 auto; justify-content: space-around">
      <div style="min-width: 165px; width: 40%">
        <h3 class="t-a-c">S&P500 지수</h3>
        <apexchart type="candlestick" :options="chartOptions" :series="snpSeries"></apexchart>
      </div>
      <div style="min-width: 165px; width: 40%">
        <h3 class="t-a-c">NASDAQ 지수</h3>
        <apexchart type="candlestick" :options="chartOptions" :series="nasdaqSeries"></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {},
  data: function () {
    return {
      kospi: null,
      kosdaq: null,
      snp: null,
      nasdaq: null,
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
            show: this.isMobile(),
            formatter: function (val) {
              return val
            }
          }
        },
        yaxis: {
          show: this.isMobile(),
          tooltip: {
            enabled: false
          }
        }
      },
    }
  },
  created: async function () {
    let res = await this.axios.get('/api/dashboard/index-chart');
    this.kospi = res.data.kospi;
    this.kosdaq = res.data.kosdaq;
    this.snp = res.data.snp;
    this.nasdaq = res.data.nasdaq;
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
  methods: {
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
    }
  }
}
</script>
