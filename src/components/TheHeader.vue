<template>
  <header>

  </header>
  <div v-if="userInfo" class="profile-wrap">
    <img class="profile-thumbnail" :src="userInfo.profile.thumbnail_image_url">
    <div class="profile-nickname">
      <span>{{ userInfo.profile.nickname }}</span>
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