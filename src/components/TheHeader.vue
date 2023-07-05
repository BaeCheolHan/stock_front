<template>
    <header>

    </header>
    <div v-if="userInfo" class="flex header">
        <div class="profile-wrap">
            <img class="profile-thumbnail" :src="userInfo.profile.thumbnail_image_url">
            <div class="profile-nickname">
                <span>{{ userInfo.profile.nickname }}</span>
            </div>
        </div>
        <div class="exchange-rate-wrap">
            <p class="red font-weight-bold"> {{ userInfo.exchangeRate.basePrice }}원  ({{ userInfo.exchangeRate.date }} :
                {{ userInfo.exchangeRate.time }})</p>
            <span class="mg-r-45">살때 : {{ userInfo.exchangeRate.cashBuyingPrice }}</span>
            <span>팔때 : {{ userInfo.exchangeRate.cashSellingPrice }}</span>
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

}
</script>