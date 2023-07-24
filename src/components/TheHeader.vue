<template>
    <header>

    </header>
    <div v-if="userInfo" class="flex header">
        <div class="profile-wrap" style="font-size: 15px;">
            <li class="ti-angle-double-right mg-l-10 mg-r-15" @click="openNav" style="cursor:pointer"></li>
        </div>
        <div class="exchange-rate-wrap">
            <p class="red font-weight-bold"> {{ userInfo.exchangeRate.basePrice }}원 ({{ userInfo.exchangeRate.date }} :
                {{ userInfo.exchangeRate.time }})</p>
            <span class="mg-r-30">살때 : {{ userInfo.exchangeRate.cashBuyingPrice }}</span>
            <span>팔때 : {{ userInfo.exchangeRate.cashSellingPrice }}</span>
        </div>
    </div>

  <div class="overlay-lnb" @click="closeNav" style="display:none;"></div>
  <div id="sidenav-lnb" class="sidenav">
        <div>
            <div class="flex">
                <div class="profile-wrap">
                    <img class="profile-thumbnail" :src="userInfo.profile.thumbnail_image_url">
                    <div class="profile-nickname">
                        <span>{{ userInfo.profile.nickname }}</span>
                    </div>
                </div>
                <div>
                    <a href="#" class="closer" @click="closeNav">&times;</a>
                </div>
            </div>
            <div>
                <v-divider class="mg-b-10"></v-divider>
            </div>
        </div>

        <div>
            <a href="#"></a>
            <a href="#"></a>
        </div>
        <div class="mg-l-10 mg-b-20">
            <v-divider class="mg-t-10 mg-b-10"></v-divider>
            <div>
                <p>Made by 배철한</p>
                <p>Email: joker10421@gmail.com</p>
                <div class="flex"><span>github:&nbsp;</span><a href="https://github.com/BaeCheolHan" target="_blank" style="font-size: 12px; color: blue" class="pd-0">https://github.com/BaeCheolHan</a></div>
            </div>
            <div class="mg-t-15">
                <div class="flex">
                    <a target="_blank" style="font-size: 12px" class="pd-0" href="https://icons8.com/icon/3c34EQ6PKOT1/%EB%B0%B0%EB%8B%B9%EA%B8%88">배당금</a>
                    <span>&nbsp;icon by&nbsp;</span>
                    <a target="_blank" class="pd-0" style="font-size: 12px" href="https://icons8.com">Icons8</a>
                </div>
                <div class="flex">
                    <a target="_blank" style="font-size: 12px" class="pd-0" href="https://icons8.com/icon/68906/collectibles">Collectibles</a>
                    <span>&nbsp;icon by&nbsp;</span>
                    <a target="_blank" style="font-size: 12px" class="pd-0" href="https://icons8.com">Icons8</a>
                </div>
                <div class="flex">
                    <a target="_blank" style="font-size: 12px" class="pd-0" href="https://kr.freepik.com/free-vector/bull-and-bear-concept-design-made-with-particles_1209465.htm#page=15&query=%EC%A3%BC%EC%8B%9D%20%EC%B0%A8%ED%8A%B8&position=8&from_view=keyword&track=ais">작가 starline</a>
                    <sapn>&nbsp;출처 Freepik</sapn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            userInfo: null,
        }
    },
    created() {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    methods: {
        openNav: function () {
            document.getElementById("sidenav-lnb").style.width = "250px";
            document.getElementsByClassName('overlay-lnb')[0].style.display="";
        },
        closeNav: function () {
            document.getElementById("sidenav-lnb").style.width = "0";
          document.getElementsByClassName('overlay-lnb')[0].style.display="none";
        }

    }

}
</script>
<style>
.sidenav {
    opacity: 1;
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: white;
    overflow-x: hidden;
    transition: 0.5s;
    justify-content: space-between;
    flex-direction: column;
    display: flex;
}

.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.sidenav .closer {
    //position: absolute;
    //top: 0;
    //right: 25px;
    font-size: 36px;
}

@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }

    .sidenav a {
        font-size: 18px;
    }
}

.overlay-lnb {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}
.overlay-lnb {
  opacity: 0.5;
  background-color: black;
}
</style>