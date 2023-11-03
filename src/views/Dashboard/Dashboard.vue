<template>
  <div class="flex pd-20" style="flex-wrap: wrap; max-width: 90%; margin: 0 auto; justify-content: space-around">
    <div style="min-width: 350px; width: 40%">
      <h2>KOSPI</h2>
      <apexchart type="candlestick" :options="chartOptions" :series="kospiSeries"></apexchart>
    </div>
    <div style="min-width: 350px; width: 40%">
      <h2>KOSDAQ</h2>
      <apexchart type="candlestick" :options="chartOptions" :series="kosdaqSeries"></apexchart>
    </div>
  </div>

  <div class="flex pd-20" style="flex-wrap: wrap; max-width: 90%; margin: 0 auto; justify-content: space-around">
    <div style="min-width: 350px; width: 40%">
      <h2>S&P500</h2>
      <apexchart type="candlestick" :options="chartOptions" :series="snpSeries"></apexchart>
    </div>
    <div style="min-width: 350px; width: 40%">
      <h2>NASDAQ</h2>
      <apexchart type="candlestick" :options="chartOptions" :series="nasdaqSeries"></apexchart>
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
            formatter: function(val) {
              return val
            }
          }
        },
        yaxis: {
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
    this.kospi.output2.forEach(item => this.kospiSeries[0].data.push({x: item.stck_bsop_date, y: [item.bstp_nmix_oprc, item.bstp_nmix_hgpr, item.bstp_nmix_lwpr, item.bstp_nmix_prpr]}))
    this.kosdaq.output2.forEach(item => this.kosdaqSeries[0].data.push({x: item.stck_bsop_date, y: [item.bstp_nmix_oprc, item.bstp_nmix_hgpr, item.bstp_nmix_lwpr, item.bstp_nmix_prpr]}))
    this.snp.output2.forEach(item => this.snpSeries[0].data.push({x: item.stck_bsop_date, y: [item.ovrs_nmix_oprc, item.ovrs_nmix_hgpr, item.ovrs_nmix_lwpr, item.ovrs_nmix_prpr]}))
    this.snp.output2.forEach(item => this.nasdaqSeries[0].data.push({x: item.stck_bsop_date, y: [item.ovrs_nmix_oprc, item.ovrs_nmix_hgpr, item.ovrs_nmix_lwpr, item.ovrs_nmix_prpr]}))
  },
  methods: {}
}
</script>
