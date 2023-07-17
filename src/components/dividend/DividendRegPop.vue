<template>
  <div class="content">
    <h2>배당금 입력</h2>
    <div class="popup-wrap">
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
      <div class="datepicker mg-t-10">
        <div class="calendar">
          <Datepicker v-model="date" autoApply :locale="locale"
                      :enableTimePicker="false" format="yyyy-MM-dd"
                      :clearable="false" placeholder="배당 지급일" hideInputIcon />
        </div>
      </div>
      <div class="mg-t-10">
        <input type="number" class="form-control" placeholder="배당금" v-model="dividend">
      </div>
      <div class="mg-t-10 btnBox t-a-c">
        <button type="button" :disabled="this.processing" @click="saveDividend">등록</button>
      </div>


    </div>
  </div>
</template>

<script>

import {reactive} from 'vue';

import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker';
import {ko} from 'date-fns/locale'

export default {
  name: "SaveStock",
  props: {
    msg: String,
  },
  components: {
    Datepicker
  },
  setup() {
    const locale = reactive(ko);
    return {locale}
  },
  data: function () {
    return {
      processing: false,
      userInfo: null,
      stocks: null,
      selectedStock: null,
      copyStocks: null,
      dividend: null,
      date: null,
    }
  },
  watch: {
  },
  created: async function () {
    this.userInfo = await JSON.parse(sessionStorage.getItem('userInfo'));
    let res = await this.axios.get('/api/stock/'.concat(this.userInfo.memberId));
    this.stocks = res.data.stocks;
    this.copyStocks = this.stocks.slice();
  },
  methods: {
    startProcessing: function () {
      this.processing = true
    },
    endProcessing: function () {
      this.processing = false
    },
    stockSelectFocus: function () {
      document.getElementsByClassName('searchStockSelectBox')[0].style.display = "";
    },
    selectStock: function (stock) {
      document.getElementsByClassName('searchStockSelectBox')[0].style.display = "none";
      this.selectedStock = stock;
    },
    cancelSelectStock: function () {
      this.selectedStock = null;
    },
    searchStock: function (event) {
      this.copyStocks = this.stocks.filter(item => {
        return item.name.toString().replace(' ', '').includes(event.target.value)
      });
    },
    closeStockDropDown: function () {
      document.getElementsByClassName('searchStockSelectBox')[0].style.display = "none";
    },
    saveDividend: async function () {
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
  }
};
</script>

<style scoped>

</style>
