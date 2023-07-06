<template>
  <div class="content">
    <h2>계좌</h2>
    <div class="popup-wrap">
      <div class="mg-t-10"  v-if="!this.selectedBank">
        <div class="searchSelect">
          <input class="form-control" placeholder="계좌 별칭" @focus="bankSelectFocus"
                 v-model="alias" @keyup="searchBank">
          <i class="ti-angle-down"></i>
        </div>
        <ul class="searchSelectBox" @blur="closeDropDown" @focus="bankSelectFocus">
          <li v-for="bank in bankAccounts" :key="bank" @click="selectBank(bank)">
            <img class="bank-icon" :src="'./bank-icons/'.concat(bank.bankInfo.bankCode).concat('.jpg')"
                 @error="replaceBankDefaultImg">
            <span>{{bank.alias}}</span>
          </li>
        </ul>
      </div>
      <div v-else class="mg-t-10">
        <div class="selected-bank-wrap" @click="cancelSelectBank">
          <li>
            <img class="bank-icon" :src="'./bank-icons/'.concat(selectedBank.bankInfo.bankCode).concat('.jpg')"
                 @error="replaceBankDefaultImg">
            <span style="vertical-align: middle;">{{ selectedBank.alias }}</span>
          </li>
        </div>
      </div>
      <div class="col-1 mg-t-10">
        <select required class="form-control" v-model="national">
          <option value="KR">국내</option>
          <option value="OVERSEA">해외</option>
        </select>

        <div class="mg-t-10"  v-if="!this.selectedBank">
          <div class="searchSelect">
            <input class="form-control" placeholder="계좌 별칭" @focus="bankSelectFocus"
                   v-model="alias" @keyup="searchBank">
            <i class="ti-angle-down"></i>
          </div>
          <ul class="searchSelectBox" @blur="closeDropDown" @focus="bankSelectFocus">
            <li v-for="bank in bankAccounts" :key="bank" @click="selectBank(bank)">
              <img class="bank-icon" :src="'./bank-icons/'.concat(bank.bankInfo.bankCode).concat('.jpg')"
                   @error="replaceBankDefaultImg">
              <span>{{bank.alias}}</span>
            </li>
          </ul>
        </div>
        <div v-else class="mg-t-10">
          <div class="selected-bank-wrap" @click="cancelSelectBank">
            <li>
              <img class="bank-icon" :src="'./bank-icons/'.concat(selectedBank.bankInfo.bankCode).concat('.jpg')"
                   @error="replaceBankDefaultImg">
              <span style="vertical-align: middle;">{{ selectedBank.alias }}</span>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaveStock",
  props: {
    msg: String,
  },
  data: function () {
    return {
      userInfo: null,
      alias: null,
      bankAccounts: null,
      selectedBank: null,
      national: ''
    }
  },
  created: async function () {
    this.national = 'KR'
    this.userInfo = await JSON.parse(sessionStorage.getItem('userInfo'));
    this.bankAccounts = this.userInfo.bankAccounts;
    this.closeDropDown();
  },
  watch: {
    'national' : async function () {
      let res = await this.axios.get("/api/stocks/".concat(this.national))
      console.log(res)
    }
  },
  methods: {
    searchBank: function () {
      this.copiedBanks = this.banks.filter(item => {
        return item.alias.includes(this.alias)
      });
    },
    replaceBankDefaultImg(e) {
      e.target.src = './bank-icons/default-bank.png';
    },
    closeDropDown: function () {
      document.getElementsByClassName('searchSelectBox')[0].style.display = "none";
    },
    bankSelectFocus: function () {
      document.getElementsByClassName('searchSelectBox')[0].style.display = "";
    },
    selectBank: function (bank) {
      document.getElementsByClassName('searchSelectBox')[0].style.display = "none";
      this.selectedBank = bank;
    },
    cancelSelectBank: function () {
      this.selectedBank = null;
    },
  }
};
</script>

<style scoped>

</style>
