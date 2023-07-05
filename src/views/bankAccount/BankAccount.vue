<template>
  <div class="content">
    <h2>계좌</h2>
    <div class="popup-wrap">
      BankAccount
    </div>
  </div>
</template>

<script>
export default {
  name: "BankAccount",
  props: {
    msg: String,
    bankId: Number,
  },
  data: function () {
    return {
      account: null,
      stock: null,
    }
  },
  created: async function () {
    alert(this.bankId)
  },
  watch: {
  },
  methods: {

  }
};
</script>

<style scoped>

</style>
