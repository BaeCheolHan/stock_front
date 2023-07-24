<template>
  <div class="pd-10">
    <div class="pd-15 border">
      <span style="font-weight: bold">등록 계좌 목록</span>
      <v-divider class="mg-t-10 mg-b-10"></v-divider>

      <div v-if="userInfo && userInfo.bankAccounts && userInfo.bankAccounts.length > 0">
        <div v-for="bank in userInfo.bankAccounts" :key="bank.id" class="mg-t-15 flex"
             style="justify-content: space-between">
          <div @click="selectBank(bank)">
            <img class="bank-icon" :src="'./bank-icons/'.concat(bank.bankInfo.bankCode).concat('.jpg')"
                 @error="replaceBankDefaultImg">
            <span class="mg-l-5 blue">{{ bank.alias }}</span><span
              v-if="bank.id == defaultBankAccountId">&nbsp;(대표 계좌)</span>
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

    <div v-if="this.selectedBank" class="mg-t-20 pd-15 border">
      <div class="flex" style="justify-content: space-between; align-items: center;">
        <div class="w-50 flex">
          <span style="font-weight: bold">계좌별 설정</span>
          <div class="mg-l-20">
            <img class="bank-icon" :src="'./bank-icons/'.concat(this.selectedBank.bankInfo.bankCode).concat('.jpg')"
                 @error="replaceBankDefaultImg">
            <span class="mg-l-5 blue">{{ this.selectedBank.alias }}</span>
          </div>
        </div>
        <div class="tooltip mg-r-5">
          <i class="ti-help-alt"></i>
          <span class="tooltipText Left">
            해당 계좌로 주식 등록시 기본 설정된 값이 선택됩니다.
          </span>
        </div>
      </div>
      <v-divider class="mg-t-10 mg-b-10"></v-divider>
      <div class="flex" style="align-items: center;">
        <div class="w-30">
          <span>시장 국가 설정</span>
        </div>
        <div class="w-40">
          <select required class="form-control mg-l-20" v-model="defaultNational">
            <option value="null">선택</option>
            <option value="KR">국내</option>
            <option value="US">미국</option>
            <option value="JP">일본</option>
            <option value="CN">중국</option>
            <option value="HK">홍콩</option>
            <option value="VN">베트남</option>
          </select>
        </div>
      </div>
      <div class="flex mg-t-20" style="align-items: center;">
        <div class="w-30">
          <span>상세 시장 설정</span>
        </div>
        <div class="w-40">
          <select required class="form-control mg-l-20" v-model="defaultMarket" :disabled="defaultNational == null">
            <option value="null">선택</option>
            <option v-for="code in codes" :key="code" :value="code">{{ code }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  name: 'PersonalSetting',
  components: {},
  data: function () {
    return {
      userInfo: null,
      selectedBank: null,
      defaultBankAccountId: null,
      defaultNational: null,
      defaultMarket: null,
      codes: [],
    }
  },
  computed: {},
  watch: {
    'defaultNational': async function () {
      let res = await this.axios.get("/api/stocks/code/".concat(this.defaultNational))
      this.codes = res.data.codes;
    },
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    if (this.userInfo) {
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
    saveDefaultBankAccount: async function (id) {
      if (confirm("대표 계좌로 등록 하시겠습니까?")) {
        let res = await this.axios.put('/api/default-bank/'.concat(this.userInfo.memberId).concat('/').concat(id));
        if (res.data.code === 'SUCCESS') {
          this.userInfo.defaultBankAccountId = id;
          sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
          this.defaultBankAccountId = id;
        }
      }

    },
    removeBankAccount: async function (id) {
      if (confirm("정말 삭제 하시겠습니까? 해당 계좌에 등록된 주식 정보도 함께 삭제됩니다.")) {
        let res = await this.axios.delete('/api/bank/'.concat(id));
        this.userInfo.bankAccounts = res.data.accounts;
        if (this.userInfo.defaultBankAccountId == id) {
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
