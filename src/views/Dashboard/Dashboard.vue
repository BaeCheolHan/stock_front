<template>
  <div v-if="userInfo.bankAccounts" class="account-wrap">
    <div v-for="account in userInfo.bankAccounts" :key="account.id">
      <div class="account mg-b-10" style="padding: 10px" @click="showAccountPop(account)">
        <img class="bank-icon" :src="'./bank-icons/'.concat(account.bankValue.bankCode).concat('.jpg')"
             @error="replaceBankDefaultImg" alt="bank-icon">
        <span class="mg-l-10">{{ account.bankValue.bankName }} ({{account.alias}})</span>
      </div>
    </div>
  </div>
  <div class="account-wrap">
    <div class="empty-account" @click="showRegAccountPop()">
      <p>+ 계좌를 등록해주세요.</p>
    </div>
  </div>

  <Modal v-if="isShowRegAccountPop" @close-modal="isShowRegAccountPop = false">
    <SaveBankAccount msg="" />
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
