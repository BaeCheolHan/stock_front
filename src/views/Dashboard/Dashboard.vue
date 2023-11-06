<template>
  <IndexChartArea/>
  <v-divider class="mg-t-30 mg-b-30"></v-divider>
  <KrVolumeRankBox/>
</template>

<script>
import IndexChartArea from "@/components/dashboard/IndexChartArea";
import KrVolumeRankBox from "@/components/dashboard/KrVolumeRankBox";

export default {
  name: 'Dashboard',
  components: {
    IndexChartArea,
    KrVolumeRankBox,
  },
  data: function () {
    return {}
  },
  created: async function () {
  },
  methods: {}
}
</script>
