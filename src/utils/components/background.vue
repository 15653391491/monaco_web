<template>
  <div class="background">
    <!--  logo  -->
    <TitleIcon class="logo"/>

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
import TitleIcon from '../Icon/profile/TitleIcon'

export default {
  name: 'background',
  components: {
    TitleIcon
  }
}
</script>

<style scoped>
.background {

  position: relative;
  width: 100vw;
  height: 200vh;

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
  top: 5.28vw;
  width: 239px;
  height: 974px;

  background: #1F1F1F;
}

.right {
  position: fixed;
  width: 374px;
  height: 974px;
  left: 987px;
  top: 5.28vw;

  background: #1F1F1F;
}

.middle {
  position: absolute;
  left: 0;
  height: 140vh;
}
</style>
