<template>
  <div class="pd-10">
    <div class="pd-15" style="border: 1px solid #ced4da !important; border-radius: 10px;">
      <span style="font-weight: bold">등록 계좌 목록</span>
      <v-divider class="mg-t-10 mg-b-10"></v-divider>

      <div v-if="userInfo && userInfo.bankAccounts && userInfo.bankAccounts.length > 0">
        <div v-for="bank in userInfo.bankAccounts" :key="bank.id" class="mg-t-15 flex"
             style="justify-content: space-between">
          <div @click="selectBank(bank)">
            <img class="bank-icon" :src="'./bank-icons/'.concat(bank.bankInfo.bankCode).concat('.jpg')"
                 @error="replaceBankDefaultImg">
            <span class="mg-l-5 blue">{{ bank.alias }}</span><span v-if="bank.id == defaultBankAccountId">(대표 계좌)</span>
          </div>
          <div class="flex">
            <div class="mg-r-10" v-if="defaultBankAccountId != bank.id">
              <span @click="saveDefaultBankAccount(bank.id)">대표 계좌 등록</span>
            </div>
            <div>
              <span class="red" @click="removeBankAccount(bank.id)">삭제</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <span>등록된 계좌가 존재하지 않습니다.</span>
      </div>
    </div>

    <div v-if="this.selectedBank" class="mg-t-20 pd-15"
         style="border: 1px solid #ced4da !important; border-radius: 10px;">
      <span style="font-weight: bold">계좌별 설정</span>
      <v-divider class="mg-t-10 mg-b-10"></v-divider>
    </div>
  </div>

</template>
<script>

export default {
  name: 'PersonalSetting',
  components: {
    // Modal,
  },
  data: function () {
    return {
      userInfo: null,
      selectedBank: null,
      defaultBankAccountId: null,
    }
  },
  computed: {},
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    if(this.userInfo) {
      this.defaultBankAccountId = this.userInfo.defaultBankAccountId;
    }
  },
  methods: {
    replaceBankDefaultImg(e) {
      e.target.src = './bank-icons/default-bank.png';
    },
    selectBank(bank) {
      this.selectedBank = bank;
    },
    bankSelectFocus: function () {
      document.getElementsByClassName('searchBankSelectBox')[0].style.display = "";
    },
    closeBankDropDown: function () {
      document.getElementsByClassName('searchBankSelectBox')[0].style.display = "none";
    },
    saveDefaultBankAccount: async function(id) {
      if(confirm("대표 계좌로 등록 하시겠습니까?")) {
        let res = await this.axios.put('/api/default-bank/'.concat(this.userInfo.memberId).concat('/').concat(id));
        if(res.data.code === 'SUCCESS') {
          this.userInfo.defaultBankAccountId = id;
          sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
          this.defaultBankAccountId = id;
        }

      }

    },
    removeBankAccount: async function(id) {
      if(confirm("정말 삭제 하시겠습니까? 해당 계좌에 등록된 주식 정보도 함께 삭제됩니다.")) {
        let res = await this.axios.delete('/api/bank/'.concat(id));
        console.log(res)
        this.userInfo.bankAccounts = res.data.accounts;
        if(this.userInfo.defaultBankAccountId == id) {
          this.userInfo.defaultBankAccountId = null;
          this.defaultBankAccountId = null;
        }

        this.$store.commit('setUserInfo', this.userInfo);
        sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        await this.emitter.emit('reloadUserInfo');
      }



    }


  }

}
</script>
