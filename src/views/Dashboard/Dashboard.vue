<template>
  <div v-if="!userInfo.bankAccount" class="account-wrap">
    <div class="empty-account">
      +
    </div>
  </div>
</template>
<script>


export default {
  name: 'Dashboard',
  components: {
  },
  data: function () {
    return {
      userInfo: null,
    }
  },
  computed: {},
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  },
  methods: {

  }


// {{userInfo}}

}
</script>
