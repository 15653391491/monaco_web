<template>
    <div class="wrapper">
        <div class="avatar"></div>
        <SingalIcon class="status"/>
    </div>
</template>

<script>
import SingalIcon from '@/utils/Icon/profile/SingalIcon'
export default {
    components: {
        SingalIcon
    }
}
</script>

<style lang="less" scoped>
    .wrapper {
        width: 42px;
        height: 47px;
        position: relative;
        .avatar {
            width: 40px;
            height: 40px;
            background: url('~@/assets/page/profile/Head.png') center center no-repeat;
            background-size: cover;
        }
        .status {
            position: absolute;
            width: 42px;
            top: 32px;
            left: 0;
            right: 0;
            height: 15px;
        }
    }
</style>