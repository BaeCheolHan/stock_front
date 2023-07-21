<template>
    <header>

    </header>
    <div v-if="userInfo" class="flex header">
        <div class="profile-wrap">
            <li class="ti-angle-double-right mg-l-10 mg-r-15" @click="openNav" style="cursor:pointer"></li>
            <img class="profile-thumbnail" :src="userInfo.profile.thumbnail_image_url">
            <div class="profile-nickname">
                <span>{{ userInfo.profile.nickname }}</span>
            </div>
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
            <a href="#" class="closer" @click="closeNav()">&times;</a>
            <a href="#"></a>
            <a href="#"></a>
        </div>
        <div class="mg-l-10 mg-b-20">
            <p>Made by 배철한</p>
            <p>Email: joker10421@gmail.com</p>
            <div class="flex"><span>github:&nbsp;</span><a href="https://github.com/BaeCheolHan" target="_blank" style="font-size: 12px; color: blue" class="pd-0">https://github.com/BaeCheolHan</a></div>
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
    padding-top: 60px;
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
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
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