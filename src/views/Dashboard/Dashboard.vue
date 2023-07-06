<template>
  <div v-if="userInfo.bankAccounts" class="account-wrap">
    <v-tabs v-model="tab" color="red-accent-4" align-tabs="end">
      <v-tab v-for="account in userInfo.bankAccounts" :key="account.id" :value="account.id">
        <img class="bank-icon" :src="'./bank-icons/'.concat(account.bankInfo.bankCode).concat('.jpg')" @error="replaceBankDefaultImg" alt="bank-icon">
        {{account.alias}}
      </v-tab>
    </v-tabs>
    <v-card>
      <v-window v-model="tab">
        <v-window-item
            v-for="account in userInfo.bankAccounts"
            :key="account.id"
            :value="account.id"
        >
          <v-container fluid>
            {{account.bankInfo.bankName}}
          </v-container>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
  <div class="account-wrap">
    <div class="empty-account" @click="showRegAccountPop()">
      <p>+ 계좌를 등록해주세요.</p>
    </div>
  </div>

  <Modal v-if="isShowRegAccountPop" @close-modal="isShowRegAccountPop = false">
    <SaveBankAccount msg=""/>
  </Modal>
  <Modal v-if="isShowAccountPop" @close-modal="isShowAccountPop = false">
    <BankAccount msg="" :bankId="bankId"/>
  </Modal>
</template>


<script>
import Modal from "@/views/common/Modal";
import SaveBankAccount from "@/views/bankAccount/SaveBankAccount";
import BankAccount from "@/views/bankAccount/BankAccount";


export default {
  name: 'Dashboard',
  components: {
    Modal,
    SaveBankAccount,
    BankAccount,
  },
  data: function () {
    return {
      userInfo: null,
      isShowRegAccountPop: false,
      isShowAccountPop: false,
      bankId: null,
      tab: null,
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
    showAccountPop(account) {
      this.bankId = account.id;
      this.isShowAccountPop = true;
    },


  }

}
</script>
