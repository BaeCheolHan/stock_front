<template>
  <div v-if="!userInfo.bankAccount" class="account-wrap">
    <div class="empty-account">
      <p>+ 계좌를 등록해주세요.</p>
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
