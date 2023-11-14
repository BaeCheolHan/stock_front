<template>
  <div class="content">
    <h2>계좌 등록</h2>
    <div class="popup-wrap">
      <div class="mg-t-10" v-if="!this.selectedBank">
        <div class="searchSelect">
          <input class="form-control" placeholder="증권사를 검색해주세요" @focus="bankSelectFocus" @keyup="searchBank($event)">
          <i class="ti-angle-down"></i>
        </div>
        <ul class="searchSelectBox" @blur="closeDropDown" @focus="bankSelectFocus">
          <li v-for="bank in copiedBanks" :key="bank" @click="selectBank(bank)">
            <img class="bank-icon" :src="'./bank-icons/'.concat(bank.bankCode).concat('.jpg')"
                 @error="replaceBankDefaultImg">
            <span>{{ bank.bankName }}</span>
          </li>
        </ul>
      </div>
      <div v-else class="mg-t-10">
        <div class="selected-bank-wrap" @click="cancelSelectBank">
          <li>
            <img class="bank-icon" :src="'./bank-icons/'.concat(selectedBank.bankCode).concat('.jpg')"
                 @error="replaceBankDefaultImg">
            <span style="vertical-align: middle;">{{ selectedBank.bankName }}</span>
          </li>
        </div>
      </div>
      <div class="mg-t-10 flex inputBox">
        <input class="form-control" type="text" v-model="alias" placeholder="계좌 별칭을 입력해주세요.">
      </div>
      <div class="btnBox t-a-c">
        <button type="button" @click="saveBank">등록</button>
      </div>
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
      selectedBank: null,
      alias: null,
      timeout: null,
      isUpdating: false,
    }
  },
  beforeMount: async function () {
    let res = await this.axios.get("/api/banks");
    this.banks = JSON.parse(JSON.stringify(res.data));
    this.copiedBanks = this.banks.slice();
    this.closeDropDown();
  },
  watch: {
    isUpdating(val) {
      clearTimeout(this.timeout)

      if (val) {
        this.timeout = setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
  },
  methods: {
    replaceBankDefaultImg(e) {
      e.target.src = './bank-icons/default-bank.png';
    },
    closeDropDown: function () {
      document.getElementsByClassName('searchSelectBox')[0].style.display = "none";
    },
    bankSelectFocus: function () {
      document.getElementsByClassName('searchSelectBox')[0].style.display = "";
    },
    searchBank: function (event) {
      this.copiedBanks = this.banks.filter(item => {
        return item.bankName.includes(event.target.value)
      });
    },
    selectBank: function (bank) {
      document.getElementsByClassName('searchSelectBox')[0].style.display = "none";
      this.selectedBank = bank;
    },
    cancelSelectBank: function () {
      this.selectedBank = null;
    },
    saveBank: async function () {
      if (!this.selectedBank) {
        alert("증권사를 선택해주세요")
        return;
      }

      if (!this.alias) {
        alert("계좌 별칭을 입력해주세요")
        return;
      }

      let param = {
        memberId: JSON.parse(sessionStorage.getItem('userInfo')).memberId,
        bank: this.selectedBank.code,
        alias: this.alias
      }
      let res = await this.axios.post('/api/account', param);
      if (res.data.code === 'SUCCESS') {
        alert("등록되었습니다.");
        await this.getBankAccount();
        this.$parent.$parent.isShowRegAccountPop = false;
      }
    },
    getBankAccount: async function () {
      let res = await this.axios.get("/api/bank/member/".concat(JSON.parse(sessionStorage.getItem('userInfo')).memberId));
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      userInfo.bankAccounts = res.data.accounts;
      this.$store.commit('setUserInfo', userInfo);
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      await this.emitter.emit('reloadUserInfo');
    },

  }
};
</script>
