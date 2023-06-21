<template>
  <div class="content">
    <h2>계좌 등록</h2>
    <div v-for="bank in banks" v-bind:key="bank">
      <img class="bank-icon" :src="'./bank-icons/'.concat(bank.bankCode).concat('.jpg')" @error="replaceBankDefaultImg">
      {{bank.bankName}} - {{bank.bankCode}}
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
    this.banks = res.data;
  },
  methods: {
    replaceBankDefaultImg(e) {

      e.target.src = './bank-icons/default-bank.png';
    }
  }
};
</script>

<style scoped>
</style>
