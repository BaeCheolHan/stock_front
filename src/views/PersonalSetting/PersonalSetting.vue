<template>
  <div class="pd-10">
    <div class="pd-15 border">
      <div class="flex" style="justify-content: space-between; align-items: center">
        <span style="font-weight: bold">등록 계좌 목록</span>
        <div class="tooltip mg-r-5">
          <i class="ti-help-alt"></i>
          <span class="tooltipText Left">
            계좌를 선택시 계좌별 상세 설정이 가능합니다.
          </span>
        </div>
      </div>
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

    <div v-if="this.selectedBank" class="mg-t-15 pd-15 border">
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
      <div class="flex mg-t-15" style="align-items: center;">
        <div class="w-30">
          <span>상세 시장 설정</span>
        </div>
        <div class="w-40">
          <select required class="form-control mg-l-20" v-model="defaultCode" :disabled="defaultNational == null">
            <option value="null">선택</option>
            <option v-for="code in codes" :key="code" :value="code">{{ code }}</option>
          </select>
        </div>
      </div>
      <div class="mg-t-20 btnBox t-a-c">
        <button type="button" :disabled="this.processing" @click="savePersonalBankAccountSetting">등록</button>
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
      processing: false,
      userInfo: null,
      selectedBank: null,
      defaultBankAccountId: null,
      defaultNational: null,
      defaultCode: null,
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
    } else {
      alert("로그인 후 이용해주세요");
      location.replace("/");
    }
  },
  methods: {
    replaceBankDefaultImg(e) {
      e.target.src = './bank-icons/default-bank.png';
    },
    selectBank: async function (bank) {
      this.selectedBank = bank;
      let res = await this.axios.get('/api/personal-setting/'.concat(this.selectedBank.id));
      if (res.data.setting) {
        this.defaultNational = res.data.setting.defaultNational;
        this.defaultCode = res.data.setting.defaultCode;
      } else {
        this.defaultNational = null;
        this.defaultCode = null;
      }

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

    },
    savePersonalBankAccountSetting: async function () {
      this.startProcessing();

      if (!this.defaultNational) {
        alert("시장 국가를 선택 해주세요.");
        return;
      }
      let param = {
        defaultNational: this.defaultNational,
        defaultCode: this.defaultCode
      }

      let res = await this.axios.put('/api/personal-setting/'.concat(this.selectedBank.id), param);
      if (res.data.code === 'SUCCESS') {
        let res = await this.axios.get("/api/bank/member/".concat(JSON.parse(sessionStorage.getItem('userInfo')).memberId));
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        userInfo.bankAccounts = res.data.accounts;
        this.$store.commit('setUserInfo', userInfo);
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        await this.emitter.emit('reloadUserInfo');

        alert("등록 되었습니다.")
      }
      this.endProcessing();
    },
    startProcessing: function () {
      this.processing = true
    },
    endProcessing: function () {
      this.processing = false
    },


  }

}
</script>
