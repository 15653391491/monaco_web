<template>
  <div class="background">
    <!--  logo  -->
    <TitleIcon class="logo" />

    <!--  左  -->
    <div class="left">
      <slot name="left"></slot>
    </div>

    <!--  中  -->
    <div class="middle">
      <slot name="middle"></slot>
    </div>

    <!--  右  -->
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import TitleIcon from '../../Icon/profile/TitleIcon'

export default {
  name: 'background',
  components: {
    TitleIcon,
  },
}
</script>

<style scoped>
.background {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #161616;
}

.logo {
  position: fixed;
  left: 140px;
  top: 25px;
  width: 136px;
  height: 37px;
}

.left {
  position: fixed;
  left: 90px;
  top: 76px;
  width: 239px;
  bottom: 0;
  background: #1f1f1f;
}

.right {
  position: absolute;
  width: 635px;
  bottom: 0;
  left: 727px;
  top: 20px;
  background: #1f1f1f;
}

.middle {
  position: absolute;
  width: 375px;
  bottom: 0;
  left: 342px;
  top: 20px;
  background: #1f1f1f;
}
</style>
