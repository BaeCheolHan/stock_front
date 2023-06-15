<template >
  <div v-if="!isClickLoginBtn">
<!--      <a :href="kakaoLoginLink" alt="kakao login">-->
        <div class="kakao-login" v-on:click="kakaoLoginBtn"></div>
<!--      </a>-->
  </div>
  <div v-html="htmlContents">

  </div>
</template>
<script>


export default {
  name: 'front-main',
  components: {
  },
  data: function () {
    return {
      isClickLoginBtn: false,
      htmlContents: null,
    }
  },
  computed: {

  },
  beforeCreate() {
  },
  methods: {
    kakaoLoginBtn: async function(){
      this.isClickLoginBtn = true;
      let res = await this.axios.get('/login/kakao')
      // let iframe = document.createElement('iframe');
      // console.log(document.getElementsByClassName('iframe-wrap'))
      console.log(res.data)
      this.htmlContents = res.data;
      // document.getElementsByClassName('iframe-wrap')[0].innerHTML = res.data;
      // iframe.contentWindow.document.open();
      // iframe.contentWindow.document.write(res.data);
      // iframe.contentWindow.document.close();
    },
  }

}
</script>
