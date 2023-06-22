<template>
  <div class="content">
    <h2>계좌 등록</h2>
    <div class="mg-t-10">
      <div class="searchSelect">
        <input class="form-control" placeholder="증권사를 검색해주세요"  @focus="channelSelectFocus" @blur="closeDropDown" v-model="bankName" @keyup="searchBank">
        <i class="ti-angle-down"></i>
      </div>
      <ul class="searchSelectBox" @blur="closeDropDown" @focus="channelSelectFocus">
        <li  v-for="bank in copiedBanks" v-bind:key="bank">
          <img class="bank-icon" :src="'./bank-icons/'.concat(bank.bankCode).concat('.jpg')" @error="replaceBankDefaultImg">
          <span>{{bank.bankName}}</span>
        </li>
      </ul>
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
      copiedBanks: null,
      bankName: null,
    }
  },
  created: async function () {
    let res = await this.axios.get("/api/banks");
    this.banks = res.data;
    this.copiedBanks = this.banks.slice();
    this.closeDropDown();
  },
  methods: {
    replaceBankDefaultImg(e) {
      e.target.src = './bank-icons/default-bank.png';
    },
    closeDropDown: function () {
      document.getElementsByClassName('searchSelectBox')[0].style.display = "none";
    },
    channelSelectFocus: function () {
      document.getElementsByClassName('searchSelectBox')[0].style.display = "";
    },
    searchBank: function () {
      this.copiedBanks = this.banks.filter(item => {
        return item.bankName.includes(this.bankName)
      });
    },
  }
};
</script>

<style scoped>
</style>
