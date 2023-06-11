<template>
  <TheHeader/>
  <div>
    this is main
  </div>
  <TheFooter></TheFooter>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";

export default {
  components: {TheFooter, TheHeader},
  date: function () {
    return {

    }
  },
  methods: {

  }

}
</script>