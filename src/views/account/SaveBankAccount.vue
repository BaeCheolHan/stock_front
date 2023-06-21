<template>
  <div class="content">
    <h2>계좌 등록</h2>
    <div v-for="bank in banks" v-bind:key="bank">
      <img class="bank-icon" :src="'./bank-icons/'.concat(bank.bankCode).concat('.jpg')" @error="'./bank-icons/default-bank.png'">
      {{bank.bankCode}}
    </div>
  </div>
</template>

<script>
export default {
  name: "SaveBankAccount",
  props: {
    msg: String,
  },
  data: function () {
    return {
      banks: null,
    }
  },
  created: async function () {
    let res = await this.axios.get("/api/banks");
    console.log(res)
    this.banks = res.data;
  },
  methods: {

  }
};
</script>

<style scoped>
</style>
