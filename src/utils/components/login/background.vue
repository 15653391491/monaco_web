<template>
  <div class="loginCon">
    <div class="inside">
      <Logo class="logo"/>
      <LogMode class="logMode"/>
    </div>
  </div>
</template>

<script>
import Logo from '../../Icon/login/Logo'
// --------------------- 子组件 ---------------
import LogMode from '../../../views/login/home/LogMode'

export default {
  name: 'login',
  components: {
    Logo,
    LogMode
  }
}
</script>

<style scoped>
.loginCon {
  height: 100vh;
  width: 100vw;
  background-image: url("../../../assets/page/login/background.png");
  background-repeat: no-repeat;
  backdrop-filter: grayscale(30%);
  background-size: 100% 100%
}

.inside {
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(20px);
  background: linear-gradient(180deg, #000000 22.4%, rgba(0, 0, 0, 0.05) 53.99%, #000000 100%);
}
</style>
