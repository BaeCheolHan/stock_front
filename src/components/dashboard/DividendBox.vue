<template>
  <div class="content">
    <v-card class="mg-b-5" v-for="dividend in dividends" :key="dividend.id">
      <v-card-text>
        <div>
          <div style=" font-size: 12px;">
            <div>
              <p class="mg-r-10">{{dividend.year}}년 {{dividend.month}}월 {{dividend.day}}일</p>
              <div class="flex" style="justify-content: space-between">
                <div>
                  <p style="width: 200px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-break: break-all;
                            ">{{ dividend.name }}({{ dividend.symbol }})</p>
                </div>
                <div>
                  <p class="t-a-r">{{dividend.national !== 'KR' ? '$' : ''}}{{ dividend.dividend.toLocaleString('ko-KR')}} {{dividend.national == 'KR' ? '원' : ''}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>

export default {
  name: "dividendBox",
  components: {},
  props: {
    dividends: [],
  },
  data: function () {
    return {
      isShowRegStockPop: false,
      isShowStockDetailPop: false,
      stockName: '',
      selectedStock: null,
    }
  },
  watch: {},
  created: async function () {
  },
  methods: {}
};
</script>

<style scoped>

</style>
