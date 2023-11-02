<template>
  <div class="flex pd-20" style="flex-wrap: wrap; max-width: 90%; margin: 0 auto;">
    <div style="min-width: 350px; width: 50%">
      <h2>KOSPI 지수</h2>
      <apexchart type="area" :options="chartOptions" :series="kospiSeries"></apexchart>
    </div>
    <div style="min-width: 350px; width: 50%">
      <h2>KOSDAQ 지수</h2>
      <apexchart type="area" :options="chartOptions" :series="kosdaqSeries"></apexchart>
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
      kospiSeries: [{
        data: []
      }],
      kosdaqSeries: [
        {
          data: []
        }
      ],
      chartOptions: {
        chart: {
          type: 'area',
          stacked: false,
          height: 500,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: '',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val
            },
          },
          title: {
            text: ''
          },
        },
        xaxis: {
          type: 'string',
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return val
            }
          }
        }
      },
    }
  },
  created: async function () {
    let res = await this.axios.get('/api/dashboard/index-chart');
    this.kospi = res.data.kospi;
    this.kosdaq = res.data.kosdaq;
    this.kospi.output2.forEach(item => this.kospiSeries[0].data.push({x: item.stck_bsop_date, y: item.bstp_nmix_prpr}))
    this.kosdaq.output2.forEach(item => this.kosdaqSeries[0].data.push({x: item.stck_bsop_date, y: item.bstp_nmix_prpr}))
  },
  methods: {}
}
</script>
