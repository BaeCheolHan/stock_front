<template>
  <TheHeader/>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
  <TheFooter/>
</template>

<script>

import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>
<style>
@import url(assets/css/common.css);
@import url(assets/css/themify-icons.css);
</style>