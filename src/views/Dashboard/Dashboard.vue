<template>
  <div v-if="userInfo.bankAccounts.length > 0" class="account-wrap">
    <v-tabs v-model="tab" color="#e00000" align-tabs="end">
      <v-tab :key="'all'" :value="'all'">
        <img class="bank-icon mg-r-5" :src="'./bank-icons/default-bank.png'" alt="bank-icon">
        전체
      </v-tab>
      <v-tab v-for="account in userInfo.bankAccounts" :key="account.id" :value="account.id">
        <img class="bank-icon mg-r-5" :src="'./bank-icons/'.concat(account.bankInfo.bankCode).concat('.jpg')"
             @error="replaceBankDefaultImg" alt="bank-icon">
        {{ account.alias }}
      </v-tab>
      <div class="flex mg-r-10" style="align-items: center;">
          <i class="ti-plus" @click="showRegAccountPop()"></i>
      </div>
    </v-tabs>
    <div class="pd-5">
      <v-card p>
        <v-window v-model="tab">
          <v-window-item :value="'all'">
            <v-container fluid>
              <div v-if="this.stocks.length === 0" class="empty-account" @click="showRegStockPop()">
                <p>+ 보유 주식을 등록해주세요.</p>
              </div>
            </v-container>
          </v-window-item>
          <v-window-item
              v-for="account in userInfo.bankAccounts"
              :key="account.id"
              :value="account.id"
          >
            <v-container fluid>
              <div v-if="this.stocks.length === 0" class="empty-account" @click="showRegStockPop()">
                <p>+ 보유 주식을 등록해주세요.</p>
              </div>
            </v-container>
          </v-window-item>
        </v-window>
      </v-card>
    </div>
  </div>
  <div v-else class="account-wrap">
    <div class="empty-account" @click="showRegAccountPop()">
      <p>+ 계좌를 등록해주세요.</p>
    </div>
  </div>

  <Modal v-if="isShowRegAccountPop" @close-modal="isShowRegAccountPop = false">
    <SaveBankAccount msg=""/>
  </Modal>
  <Modal v-if="isShowRegStockPop" @close-modal="isShowRegStockPop = false">
    <SaveStock msg=""/>
  </Modal>
</template>


<script>
import Modal from "@/views/common/Modal";
import SaveBankAccount from "@/components/bankAccount/SaveBankAccount";
import SaveStock from "@/components/stock/SaveStock";


export default {
  name: 'Dashboard',
  components: {
    Modal,
    SaveBankAccount,
    SaveStock,
  },
  data: function () {
    return {
      userInfo: null,
      isShowRegAccountPop: false,
      isShowRegStockPop: false,
      isShowAccountPop: false,
      bankId: null,
      tab: null,
      stocks: [],
    }
  },
  watch: {
    'tab': async function () {
      let memberId = this.userInfo.memberId
      let url;
      if (this.tab !== 'all') {
        url = "/api/stock/".concat(memberId).concat("/").concat(this.tab);
      } else {
        url = "/api/stock/".concat(memberId);
      }
      let res = await this.axios.get(url);
      this.stocks = res.data.stocks;
    }
  },
  computed: {},
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  },
  methods: {
    showRegAccountPop: function () {
      this.isShowRegAccountPop = true;
    },
    replaceBankDefaultImg(e) {
      e.target.src = './bank-icons/default-bank.png';
    },
    showRegStockPop: function () {
      this.isShowRegStockPop = true;
    }


  }

}
</script>
