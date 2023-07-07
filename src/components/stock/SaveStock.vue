<template>
  <div class="content">
    <h2>계좌</h2>
    <div class="popup-wrap">

      <div class="mg-t-10" v-if="!this.selectedBank">
        <div class="searchSelect searchBankSelect">
          <input class="form-control" placeholder="계좌 별칭" @focus="bankSelectFocus" @keyup="searchBank($event)">
          <i class="ti-angle-down"></i>
        </div>
        <ul class="searchSelectBox searchBankSelectBox" @blur="closeBankDropDown" @focus="bankSelectFocus">
          <li v-for="bank in copiedBankAccounts" :key="bank" @click="selectBank(bank)">
            <img class="bank-icon" :src="'./bank-icons/'.concat(bank.bankInfo.bankCode).concat('.jpg')"
                 @error="replaceBankDefaultImg">
            <span>{{ bank.alias }}</span>
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
        <div class="flex">
          <select required class="form-control mg-r-5" v-model="national">
            <option value="KR">국내</option>
            <option value="US">미국</option>
            <option value="JP">일본</option>
            <option value="CN">중국</option>
            <option value="HK">홍콩</option>
            <option value="VN">베트남</option>
          </select>

          <select required class="form-control" v-model="selectedCode">
            <option v-for="code in codes" :key="code" :value="code">{{ code }}</option>
          </select>
        </div>
        <div class="mg-t-10" v-if="!this.selectedStock">
          <div class="searchSelect searchStockSelect">
            <input class="form-control" placeholder="종목명" @focus="stockSelectFocus" @keyup="searchStock($event)">
            <i class="ti-angle-down"></i>
          </div>
          <ul class="searchSelectBox searchStockSelectBox" @blur="closeStockDropDown" @focus="stockSelectFocus">
            <li v-for="stock in copyStocks" :key="stock" @click="selectStock(stock)">
              <span>{{ stock.name }} ({{ stock.symbol }})</span>
            </li>
          </ul>
        </div>
        <div v-else class="mg-t-10">
          <div class="selected-bank-wrap" @click="cancelSelectStock">
            <li>
              <span style="vertical-align: middle;">{{ selectedStock.name }} ({{ selectedStock.code }})</span>
            </li>
          </div>
        </div>
        <div class="mg-t-10">
          <input type="number" class="form-control" placeholder="구입 가격" v-model="price">
        </div>
        <div class="mg-t-10">
          <input type="number" class="form-control" placeholder="수량" v-model="quantity">
        </div>
        <div class="mg-t-10 btnBox t-a-c">
          <button type="button" :disabled="this.processing" @click="saveStock">등록</button>
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
      processing: false,
      userInfo: null,
      bankAccounts: null,
      copiedBankAccounts: null,
      selectedBank: null,
      national: '',
      stocks: null,
      copyStocks: null,
      selectedStock: null,
      copiedBanks: null,
      codes: [],
      selectedCode: null,
      quantity: null,
      price: null,
    }
  },
  watch: {
    'national': async function () {
      this.closeStockDropDown();
      let res = await this.axios.get("/api/stocks/code/".concat(this.national))
      this.codes = res.data.codes;
    },
    'selectedCode': async function () {
      let res = await this.axios.get("/api/stocks/".concat(this.selectedCode))
      this.stocks = res.data.stocksList;
      this.copyStocks = this.stocks.slice();
    }
  },
  created: async function () {
    this.national = 'KR'
    this.userInfo = await JSON.parse(sessionStorage.getItem('userInfo'));
    this.bankAccounts = this.userInfo.bankAccounts;
    this.copiedBankAccounts = this.bankAccounts.slice();
    this.closeBankDropDown();
    this.closeStockDropDown();
  },
  methods: {
    startProcessing: function () {
      this.processing = true
    },
    endProcessing: function () {
      this.processing = false
    },
    saveStock: async function () {
      if (!this.selectedBank) {
        alert("계좌를 선택해주세요")
        return;
      }

      if (!this.selectedStock) {
        alert("종목을 선택해주세요")
        return;
      }

      if (!this.price || this.price === 0) {
        alert("구입 가격을 입력해주세요")
        return;
      }

      if (!this.quantity || this.quantity === 0) {
        alert("수량을 입력해주세요")
        return;
      }

      let param = {
        bankId: this.selectedBank.id,
        symbol: this.selectedStock.symbol,
        quantity: this.quantity,
        price: this.price
      }
      this.startProcessing();
      let res = await this.axios.post('/api/stock', param);

      if (res.data.code === 'SUCCESS') {
        alert("등록되었습니다.");
        this.endProcessing();
        this.$parent.$parent.isShowRegStockPop = false;
        await this.emitter.emit('reloadStock');
      }

    },
    searchBank: function (event) {
      this.copiedBankAccounts = this.bankAccounts.filter(item => {
        return item.alias.replace(' ', '').includes(event.target.value)
      });
    },
    searchStock: function (event) {
      this.copyStocks = this.stocks.filter(item => {
        return item.name.toString().replace(' ', '').includes(event.target.value)
      });
    },
    replaceBankDefaultImg(e) {
      e.target.src = './bank-icons/default-bank.png';
    },
    closeBankDropDown: function () {
      document.getElementsByClassName('searchBankSelectBox')[0].style.display = "none";
    },
    closeStockDropDown: function () {
      document.getElementsByClassName('searchStockSelectBox')[0].style.display = "none";
    },
    bankSelectFocus: function () {
      document.getElementsByClassName('searchBankSelectBox')[0].style.display = "";
    },
    stockSelectFocus: function () {
      document.getElementsByClassName('searchStockSelectBox')[0].style.display = "";
    },
    selectBank: function (bank) {
      document.getElementsByClassName('searchBankSelectBox')[0].style.display = "none";
      this.selectedBank = bank;
    },
    selectStock: function (stock) {
      document.getElementsByClassName('searchStockSelectBox')[0].style.display = "none";
      this.selectedStock = stock;
    },
    cancelSelectBank: function () {
      this.selectedBank = null;
    },
    cancelSelectStock: function () {
      this.selectedStock = null;
    },
  }
};
</script>

<style scoped>

</style>
