<template>
  <div>
    <apexchart type="area" height="350" :options="chartOptions" :series="chartData"></apexchart>
  </div>
</template>


<script>

export default {
  name: "AssetChart",
  components: {},
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => {
      }
    }
  },
  data: function () {
    return {}
  },
  created: async function () {
  },
  methods: {}
};
</script>
