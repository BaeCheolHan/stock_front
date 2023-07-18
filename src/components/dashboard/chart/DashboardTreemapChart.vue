<template>
  <div>
      <apexchart type="treemap" :options="chartOptions" :series="chartData"></apexchart>
  </div>
</template>


<script>

export default {
  name: "DashboardTreemapChart",
  components: {
  },
  props: {
    chartData: {
      type: [],
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
