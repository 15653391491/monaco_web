<template>
  <div class="loginCon">
    <div class="inside colWarpper">
      <div class="warpper colWarpper">
        <Logo class="logo"/>
        <router-view class="logMode"/>
      </div>
    </div>
  </div>
</template>

<script>
// 图标
import Logo from '@/utils/Icon/login/Logo'
// --------------------- 子组件 ---------------
// import LogMode from "../../../views/login/home/LogMode";

export default {
  name: 'login',
  components: {
    Logo,
    // LogMode
  }
}
</script>
<style>
.rowWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
}

.colWarpper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}

</style>
<style scoped>
.loginCon {
  height: 100vh;
  width: 100%;
  background-image: url("../../assets/page/login/background.png");
  background-repeat: no-repeat;
  backdrop-filter: grayscale(30%);
  background-size: 100% 100%
}

.inside {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(20px);
  background: linear-gradient(180deg, #000000 22.4%, rgba(0, 0, 0, 0.05) 53.99%, #000000 100%);
}

.warpper {
  width: 370px;
  height: 100%;
  align-self: center;
  justify-content: space-between !important;
}

.logo {
  align-self: center;
  margin-top:180px;
  width: 255px;
  height: 70px;
}

.logMode {
  align-self: center;
  margin-bottom: 180px;
  /*margin-top: 38.18%;*/
  /*margin-top: 379px;*/
}
</style>
