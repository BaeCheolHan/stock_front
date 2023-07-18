<template>
  <div>
    <span>월별 배당 현황</span>
  </div>
  <div>
      <apexchart type="bar" height="350" :options="chartOptions" :series="chartData"></apexchart>
  </div>
</template>


<script>

export default {
  name: "DashboardTreemapChart",
  components: {
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  },
  data: function () {
    return {
    }
  },
  created: async function () {
  },
  methods: {

  }
};
</script>

<style scoped>

</style>
