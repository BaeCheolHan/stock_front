<template>
  <div v-if="!userInfo.bankAccount" class="account-wrap">
    <div class="empty-account" @click="showRegAccountPop()">
      <p>+ 계좌를 등록해주세요.</p>
    </div>
  </div>
  <Modal v-if="isShowRegAccountPop" @close-modal="isShowRegAccountPop = false">
    <SaveBankAccount msg="" />
  </Modal>
</template>


<script>
import Modal from "@/views/common/Modal";
import SaveBankAccount from "@/views/bankAccount/SaveBankAccount";


export default {
  name: 'Dashboard',
  components: {
    Modal,
    SaveBankAccount
  },
  data: function () {
    return {
      userInfo: null,
      isShowRegAccountPop: false,
    }
  },
  computed: {},
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  },
  methods: {
    showRegAccountPop: function () {
      this.isShowRegAccountPop = true;
    }

  }


// {{userInfo}}

}
</script>
