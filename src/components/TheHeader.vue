<template>
    <header>

    </header>
    <div v-if="userInfo" class="flex header">
        <div class="profile-wrap" style="font-size: 15px;">
            <li class="ti-menu-alt mg-l-10 mg-r-15" @click="openNav" style="cursor:pointer"></li>
        </div>
        <div class="exchange-rate-wrap">
            <p class="red font-weight-bold"> {{ userInfo.exchangeRate.basePrice }}원 ({{ userInfo.exchangeRate.date }} :
                {{ userInfo.exchangeRate.time }})</p>
            <span class="mg-r-30">살때 : {{ userInfo.exchangeRate.cashBuyingPrice }}</span>
            <span>팔때 : {{ userInfo.exchangeRate.cashSellingPrice }}</span>
        </div>
    </div>

    <div id="mySidenav" class="sidenav">
        <div>
            <div class="flex">
                <div class="profile-wrap">
                    <img class="profile-thumbnail" :src="userInfo.profile.thumbnail_image_url">
                    <div class="profile-nickname">
                        <span>{{ userInfo.profile.nickname }}</span>
                    </div>
                </div>
                <div>
                    <a href="#" class="closer" @click="closeNav()">&times;</a>
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
                <div class="flex" style="">
                    <a target="_blank" style="font-size: 12px" class="pd-0" href="https://icons8.com/icon/68906/collectibles">Collectibles</a>
                    <span>&nbsp;icon by&nbsp;</span>
                    <a target="_blank" style="font-size: 12px" class="pd-0" href="https://icons8.com">Icons8</a>
                </div>
                <div>
                    <a target="_blank" style="font-size: 12px" class="pd-0" href="https://kr.freepik.com/free-vector/buy-and-sell-concept-design-showing-bull-and-bear_2393303.htm#page=5&query=%EC%A3%BC%EC%8B%9D%20%EC%B0%A8%ED%8A%B8&position=44&from_view=keyword&track=ais">작가 starline</a> 출처 Freepik
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
            document.getElementById("mySidenav").style.width = "250px";
        },
        closeNav: function () {
            document.getElementById("mySidenav").style.width = "0";
        }

    }

}
</script>
<style>
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
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
</style>