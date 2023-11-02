<template>
</template>


<script>
export default {
  name: 'Dashboard',
  components: {
  },
  data: function () {
    return {
      kospi: null,
      kosdaq: null,
    }
  },
  created: async function () {
    let res = await this.axios.get('/api/dashboard/index-chart');
    this.kospi = res.data.kospi;
    this.kosdaq = res.data.kosdaq;
  },
  methods: {
  }
}
</script>
