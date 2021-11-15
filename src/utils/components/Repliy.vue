<template>
  <div>
    <!--  头像  -->
    <img class="head" src="@/assets/page/位图.png" alt="头像"/>

    <!--  v-背景  -->
    <img class="v-background" src="@/assets/page/Oval.png" alt="背景"/>

    <img class="v-icon" src="@/assets/page/v.png" alt="图标"/>

    <laugh-icon class="icon1"/>

    <page-icon class="icon2"/>
    <input
        type="text"
        name="repliy"
        placeholder="Your Comment..."
    >
    <button class="send">
      <span class="sendFont">Send</span>
      <SendIcon class="sendIcon"/>
    </button>
  </div>
</template>

<script>
import SendIcon from '../../utils/Icon/SendIcon'
import laughIcon from '../Icon/laughIcon'
import pageIcon from '../Icon/pageIcon'

export default {
  name: 'Repliy',
  components: {
    SendIcon, laughIcon, pageIcon
  }
}
</script>

<style scoped>
input {
  position: absolute;
  padding-left: 20px;
  left: 19px;
  width: 469px;
  height: 34px;

  BACKGROUND-COLOR: transparent;
  border: solid;
  border-radius: 17px;
  border-color: #BDA28D;

  color: #C4C4C4;
}

.send {
  position: absolute;
  left: 401px;
  top: 45px;

  width: 84px;
  height: 32px;
  background: #BDA28D;
  border-radius: 16px;
  outline: none;
  border: none

}

.sendFont {
  position: absolute;
  left: 14px;
  top: 6px;
  width: 36px;
  height: 20px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  font-size: 14px;
}

.sendIcon {
  position: absolute;
  left: 55px;
  top: 8px;
  height: 15px;
  width: 12px;
}

.head {
  position: absolute;
  left: -26px;
  top: 2px;
  height: 28px;
  width: 28px;

  border-radius: 25px;
}

.v-background {
  position: absolute;
  left: -6px;
  top: 22px;
  height: 12.5px;
  width: 12.5px;

}

.v-icon {
  position: absolute;
  left: -3px;
  top: 26px;
  height: 6.6px;
  width: 6.9px;

}

.icon1 {

  position: absolute;
  left: 25px;
  top: 42px;
}

.icon2 {

  position: absolute;
  left: 61px;
  top: 42px;
}
</style>
