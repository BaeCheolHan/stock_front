<template>


  <div v-if="userInfo.bankAccounts.length > 0" class="account-wrap">
    <div>
      <v-tabs v-model="chartTab" color="#e00000" align-tabs="end">
        <v-tab :value="'investmentProportion'">
          <img class="bank-icon mg-r-5" :src="'./icons/collectibles.png'" alt="bank-icon">
          투자 비중
        </v-tab>
        <v-tab :value="'dividend'">
          <img class="bank-icon mg-r-5" :src="'/icons/dividend-icon.png'" alt="bank-icon">
          배당 현황
        </v-tab>
      </v-tabs>
      <!--  chart 영역 -->
      <!-- 투자비중 chart -->
      <DashboardTreemapChart v-if="investmentProportionChart" :chartData="treemapChartData"
                             :chartOptions="treemapChartDataOptions"/>
      <!-- 월별 배당현황 chart -->
      <DividendMonthlyChart v-if="dividendChart" :chartData="dividendChartSeries" :chartOptions="dividendChartOption"/>
    </div>

    <div v-if="investmentProportionChart">
      <!-- tab 영역 -->
      <v-tabs v-model="bankAccountTab" color="#e00000" align-tabs="end">
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
          <v-window v-model="bankAccountTab">
            <!-- 계좌 전체 영역 -->
            <v-window-item :value="'all'">
              <v-container fluid>
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
      <div v-if="!userInfo.bankAccounts || userInfo.bankAccounts.length === 0" class="account-wrap">
        <div class="empty-account" @click="openRegAccountPop()">
          <p>+ 계좌를 등록해주세요.</p>
        </div>
      </div>
    </div>

    <div v-if="dividendChart">
      <v-card>
        <v-window>
          <v-window-item>
            <v-container fluid>
              <!-- 배당금 추가 버튼 -->
              <DividendIcon class="mg-l-10" @click="openDividendPop"/>
              <v-data-table-virtual
                  :headers="headers"
                  :items="desserts"
                  class="elevation-1 mg-t-10 mg-l-10"
                  item-value="name"
              ></v-data-table-virtual>
            </v-container>
          </v-window-item>

        </v-window>
      </v-card>
    </div>

  </div>


  <Modal v-if="isShowRegAccountPop" @close-modal="isShowRegAccountPop = false">
    <SaveBankAccount msg=""/>
  </Modal>
  <Modal v-if="isSnowDividendRegPop" @close-modal="isSnowDividendRegPop = false">
    <DividendRegPop msg=""/>
  </Modal>
</template>

<script setup>
import {VDataTableVirtual} from 'vuetify/labs/components'
</script>

<script>
import Modal from "@/views/common/Modal";
import SaveBankAccount from "@/components/bankAccount/SaveBankAccount";
import StockBox from "@/components/dashboard/StockBox";
import DashboardTreemapChart from "@/components/dashboard/chart/DashboardTreemapChart.vue";
import DividendMonthlyChart from "@/components/dashboard/chart/DividendMonthlyChart";
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
      investmentProportionChart: true,
      dividendChart: false,
      checkSpin: false,
      userInfo: null,
      isShowRegAccountPop: false,
      isShowAccountPop: false,
      isSnowDividendRegPop: false,
      bankId: null,
      bankAccountTab: null,
      chartTab: null,
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
          categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "" + val.toLocaleString('ko-KR') + " 원"
            }
          }
        }
      },


      page: 1,
      itemsPerPage: 10,
      pageCount: 1,
      headers: [
        {title: '년도', align: 'start', key: 'name', sortable: false, width: "65px"},
        {title: '합계', align: 'end', key: 'total', width: "150px"},
        {title: '월평균', align: 'end', key: 'avg', width: "100px"},
        {title: '증감률', align: 'end', key: 'changeRate', width: "90px"},
        {title: '1월', align: 'end', key: 'Jan', width: "120px"},
        {title: '2월', align: 'end', key: 'Feb', width: "120px"},
        {title: '3월', align: 'end', key: 'Mar', width: "120px"},
        {title: '4월', align: 'end', key: 'Apr', width: "120px"},
        {title: '5월', align: 'end', key: 'May', width: "120px"},
        {title: '6월', align: 'end', key: 'Jun', width: "120px"},
        {title: '7월', align: 'end', key: 'Jul', width: "120px"},
        {title: '8월', align: 'end', key: 'Aug', width: "120px"},
        {title: '9월', align: 'end', key: 'Sept', width: "120px"},
        {title: '10월', align: 'end', key: 'Oct', width: "120px"},
        {title: '11월', align: 'end', key: 'Nov', width: "120px"},
        {title: '12월', align: 'end', key: 'Dec', width: "120px"},
      ],
      desserts: [],

    }
  },
  computed: {},
  watch: {
    'bankAccountTab': async function () {
      this.checkSpin = true;
      let memberId = this.userInfo.memberId
      let url;
      if (this.bankAccountTab !== 'all') {
        url = "/api/stock/".concat(memberId).concat("/").concat(this.bankAccountTab);
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

    },
    'chartTab': async function () {
      if (this.chartTab === 'dividend') {
        await this.getDividendChartData();
        this.dividendChart = true;
        this.investmentProportionChart = false;
      } else {
        this.dividendChart = false;
        this.investmentProportionChart = true;
      }
    }
  },
  mounted() {
    this.emitter.on('reloadStock', this.reloadStock)
  },
  created: async function () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
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
    getDividendChartData: async function () {
      let res = await this.axios.get("/api/dividend/".concat(this.userInfo.memberId).concat("/chart"))
      this.dividendChartSeries = res.data.series;

      for (let i = 0; i < res.data.series.length; i++) {
        let data = {
          name: res.data.series[i].name,
          total: res.data.series[i].total.toLocaleString('ko-KR').concat('원'),
          avg: res.data.series[i].avg.toLocaleString('ko-KR').concat('원'),
          changeRate: res.data.series[i].changeRate == null ? '-' : res.data.series[i].changeRate.toString().concat('%'),
          Jan: Math.ceil(res.data.series[i].data[0]).toLocaleString('ko-KR').concat('원'),
          Feb: Math.ceil(res.data.series[i].data[1]).toLocaleString('ko-KR').concat('원'),
          Mar: Math.ceil(res.data.series[i].data[2]).toLocaleString('ko-KR').concat('원'),
          Apr: Math.ceil(res.data.series[i].data[3]).toLocaleString('ko-KR').concat('원'),
          May: Math.ceil(res.data.series[i].data[4]).toLocaleString('ko-KR').concat('원'),
          Jun: Math.ceil(res.data.series[i].data[5]).toLocaleString('ko-KR').concat('원'),
          Jul: Math.ceil(res.data.series[i].data[6]).toLocaleString('ko-KR').concat('원'),
          Aug: Math.ceil(res.data.series[i].data[7]).toLocaleString('ko-KR').concat('원'),
          Sept: Math.ceil(res.data.series[i].data[8]).toLocaleString('ko-KR').concat('원'),
          Oct: Math.ceil(res.data.series[i].data[9]).toLocaleString('ko-KR').concat('원'),
          Nov: Math.ceil(res.data.series[i].data[10]).toLocaleString('ko-KR').concat('원'),
          Dec: Math.ceil(res.data.series[i].data[11]).toLocaleString('ko-KR').concat('원'),
        };
        this.desserts.push(data);
      }

    },
    reloadStock: async function () {
      let memberId = this.userInfo.memberId
      let url;
      if (this.bankAccountTab !== 'all') {
        url = "/api/stock/".concat(memberId).concat("/").concat(this.bankAccountTab);
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
