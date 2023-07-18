<template>
  <div v-if="userInfo.bankAccounts.length > 0" class="account-wrap">
    <!-- tab 영역 -->
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
        <i class="ti-plus" @click="openRegAccountPop()"></i>
      </div>
    </v-tabs>
    <div v-show="checkSpin" class="t-a-c mg-t-30">
      <v-progress-circular color="primary" indeterminate :size="128"></v-progress-circular>
    </div>
    <!-- tab 내용 영역 -->
    <div class="pd-5" v-show="!checkSpin">
      <v-card>
        <v-window v-model="tab">
          <!-- chart 영역 -->
          <DashboardTreemapChart v-if="renderTreemapChart" :chartData="treemapChartData"
                                 :chartOptions="treemapChartDataOptions"/>

          <DividendMonthlyChart v-if="dividendChartSeries" :chartData="dividendChartSeries" :chartOptions="dividendChartOption"/>
          <!-- 계좌 전체 영역 -->
          <v-window-item :value="'all'">
            <v-container fluid>
              <!-- 배당금 추가 버튼 -->
              <DividendIcon class="mg-b-10" @click="openDividendPop"/>
              <!-- 주식 종목 item 영역 -->
              <StockBox :stocks="stocks"/>
            </v-container>
          </v-window-item>
          <!-- 개별 계좌 영역 -->
          <v-window-item v-for="account in userInfo.bankAccounts" :key="account.id" :value="account.id">
            <v-container fluid>
              <!-- 주식 종목 item 영역 -->
              <StockBox :stocks="stocks"/>
            </v-container>
          </v-window-item>
        </v-window>
      </v-card>
    </div>
  </div>
  <div v-else class="account-wrap">
    <div class="empty-account" @click="openRegAccountPop()">
      <p>+ 계좌를 등록해주세요.</p>
    </div>
  </div>

  <Modal v-if="isShowRegAccountPop" @close-modal="isShowRegAccountPop = false">
    <SaveBankAccount msg=""/>
  </Modal>
  <Modal v-if="isSnowDividendRegPop" @close-modal="isSnowDividendRegPop = false">
    <DividendRegPop msg=""/>
  </Modal>
</template>


<script>
import Modal from "@/views/common/Modal";
import SaveBankAccount from "@/components/bankAccount/SaveBankAccount";
import StockBox from "@/components/dashboard/StockBox";
import DashboardTreemapChart from "@/components/dashboard/chart/DashboardTreemapChart.vue";
import DividendMonthlyChart from "@/components/dividend/chart/DividendMonthlyChart";
import DividendIcon from "@/components/button/dividendIcon";
import DividendRegPop from "@/components/dividend/DividendRegPop";

export default {
  name: 'Dashboard',
  components: {
    Modal,
    SaveBankAccount,
    StockBox,
    DashboardTreemapChart,
    DividendMonthlyChart,
    DividendIcon,
    DividendRegPop,
  },
  data: function () {
    return {
      checkSpin: false,
      userInfo: null,
      isShowRegAccountPop: false,
      isShowAccountPop: false,
      isSnowDividendRegPop: false,
      bankId: null,
      tab: null,
      stocks: [],
      renderTreemapChart: true,
      treemapChartDataOptions: {
        legend: {
          show: false
        },
        chart: {
          height: 350,
          type: 'treemap'
        },
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false
          }
        },
      },
      treemapChartData: [
        {
          data: [],
        },
      ],
      dividendChartSeries: null,
      dividendChartOption: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '100%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "" + val + " 원"
            }
          }
        }
      },

    }
  },
  computed: {},
  watch: {
    'tab': async function () {
      this.checkSpin = true;
      let memberId = this.userInfo.memberId
      let url;
      if (this.tab !== 'all') {
        url = "/api/stock/".concat(memberId).concat("/").concat(this.tab);
      } else {
        url = "/api/stock/".concat(memberId);
      }
      let res = await this.axios.get(url);

      if (res.data.stocks) {
        this.renderTreemapChart = false;
        this.stocks = res.data.stocks;
        this.treemapChartData[0].data = []
        await this.stocks.forEach(item => {
          this.treemapChartData[0].data.push({x: item.name, y: item.priceImportance})
        });
        this.renderTreemapChart = true;
      } else {
        this.stocks = [];
        this.renderTreemapChart = false;
      }
      this.checkSpin = false;

    }
  },
  mounted() {
    this.emitter.on('reloadStock', this.reloadStock)
  },
  created: async function() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    let res = await this.axios.get("/api/dividend/".concat(this.userInfo.memberId).concat("/chart"))
    this.dividendChartSeries = res.data.series;
  },
  methods: {
    openRegAccountPop: function () {
      this.isShowRegAccountPop = true;
    },
    openDividendPop: function () {
      this.isSnowDividendRegPop = true;
    },
    replaceBankDefaultImg(e) {
      e.target.src = './bank-icons/default-bank.png';
    },
    reloadStock: async function () {
      let memberId = this.userInfo.memberId
      let url;
      if (this.tab !== 'all') {
        url = "/api/stock/".concat(memberId).concat("/").concat(this.tab);
      } else {
        url = "/api/stock/".concat(memberId);
      }
      let res = await this.axios.get(url);
      if (res.data.stocks) this.stocks = res.data.stocks;
      else this.stocks = [];
    }

  }

}
</script>
