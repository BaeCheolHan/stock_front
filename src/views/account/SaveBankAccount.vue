<template>
    <div class="content">
        <h2>계좌 등록</h2>
        <div class="mg-t-10" v-if="!this.selectedBank">
            <div class="searchSelect">
                <input class="form-control" placeholder="증권사를 검색해주세요" @focus="bankSelectFocus"
                       v-model="bankName" @keyup="searchBank">
                <i class="ti-angle-down"></i>
            </div>
            <ul class="searchSelectBox"  @blur="closeDropDown" @focus="bankSelectFocus">
                <li v-for="bank in copiedBanks" v-bind:key="bank"  @click="selectBank(bank)">
                    <img class="bank-icon" :src="'./bank-icons/'.concat(bank.bankCode).concat('.jpg')"
                         @error="replaceBankDefaultImg">
                    <span >{{ bank.bankName }}</span>
                </li>
            </ul>
        </div>
        <div v-else class="mg-t-10">
            <div class="selected-bank-wrap" @click="cancelSelectBank">
                <li>
                    <img class="bank-icon" :src="'./bank-icons/'.concat(selectedBank.bankCode).concat('.jpg')"
                         @error="replaceBankDefaultImg">
                    <span style="vertical-align: middle;">{{ selectedBank.bankName }}</span>
                </li>
            </div>
        </div>
        <div>
            <span>계좌 별칭</span>
        </div>

    </div>
</template>

<script>
export default {
    name: "SaveBankAccount",
    props: {
        msg: String,
    },
    data: function () {
        return {
            banks: null,
            copiedBanks: null,
            bankName: null,
            selectedBank: null,
        }
    },
    created: async function () {
        let res = await this.axios.get("/api/banks");
        this.banks = res.data;
        this.copiedBanks = this.banks.slice();
        this.closeDropDown();
    },
    methods: {
        replaceBankDefaultImg(e) {
            e.target.src = './bank-icons/default-bank.png';
        },
        closeDropDown: function () {
            document.getElementsByClassName('searchSelectBox')[0].style.display = "none";
        },
        bankSelectFocus: function () {
            document.getElementsByClassName('searchSelectBox')[0].style.display = "";
        },
        searchBank: function () {
            this.copiedBanks = this.banks.filter(item => {
                return item.bankName.includes(this.bankName)
            });
        },
        selectBank: function (bank) {
            document.getElementsByClassName('searchSelectBox')[0].style.display = "none";
            this.selectedBank = bank;
        },
        cancelSelectBank: function () {
            this.selectedBank = null;
        }
    }
};
</script>

<style scoped>

</style>
