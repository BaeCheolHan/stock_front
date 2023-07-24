<template>

</template>
<script>

import Modal from "@/views/common/Modal";

export default {
    name: 'PersonalSetting',
    components: {
      Modal,
    },
    data: function () {
        return {
            userInfo: null,
        }
    },
    computed: {},
    created() {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    methods: {

    }

}
</script>
