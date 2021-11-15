<template>
  <el-row class="con1">

    <!--  名字  -->
    <span class="title">What's happening?</span>

    <!--  头像  -->
    <img class="head" src="../../../../assets/page/位图.png"/>

    <!--  v-背景  -->
    <img class="v-background" src="../../../../assets/page/Oval.png"/>

    <!--  v  -->
    <img class="v-icon" src="../../../../assets/page/v.png"/>

    <!--  icon-group  -->
    <laugh-icon class="icon1"/>

    <page-icon class="icon2"/>

    <video-icon class="icon3"/>

    <AiteIcon class="icon4"/>
    <a>
      <DingWeiIcon class="icon5"/>
    </a>
    <!--  TikTokIcon  -->
<!--    <TikTokIcon class="tikTokIcon"/>-->
    <button class="tikTokIcon">
      <TikTokIcon />
    </button>
  </el-row>
</template>

<script>
// --------------- 图标 ------------------
import pageIcon from '../../../../utils/Icon/pageIcon'
import laughIcon from '../../../../utils/Icon/laughIcon'
import videoIcon from '../../../../utils/Icon/videoIcon'
import AiteIcon from '../../../../utils/Icon/Aite'
import DingWeiIcon from '../../../../utils/Icon/DingWei'
import TikTokIcon from '../../../../utils/Icon/TikTokIcon'

import {TicTok as log} from '../../../../assets/page/TikTok+ Icon.svg'
export default {
  name: 'Top',
  components: {
    pageIcon, laughIcon, videoIcon, AiteIcon, DingWeiIcon,TikTokIcon
  },
  data(){
    return {
      log: log
    }
  }
}
</script>

<style scoped>
.con1 {
  position: absolute;
  width: 614px;
  height: 117px;
  left: 352px;
  top: 74px;

  background: #1F1F1F;
}

.title {
  /* Kingson */


  position: absolute;
  width: 136px;
  height: 16px;
  left: 86px;
  top: 39px;

  font-family: Poppins,DM_Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height, or 114% */


  /* dark mode/white 60 */

  color: #636363;

}

.head {
  position: absolute;
  left: 18.34px;
  top: 29.54px;

  border-radius: 25px
}

/*------------ v-背景 -------------*/
.v-background {
  position: absolute;
  left: 49px;
  top: 55px;
}

/*----------- v ------------*/
.v-icon {
  position: absolute;
  left: 53px;
  top: 60.5px;
}

/*----------- 图标 ---------------*/
.icon1 {
  position: absolute;
  top: 80px;
  left: 88px;
}

.icon2 {
  position: absolute;
  top: 80px;
  left: 114px;
}

.icon3 {
  position: absolute;
  top: 80px;
  left: 140px;
}

.icon4 {
  position: absolute;
  top: 80px;
  left: 166px;
}

.icon5 {
  position: absolute;
  top: 80px;
  left: 192px;
}

.tikTokIcon {
  position: absolute;
  top: 65px;
  left: 530px;
  height: 0;
  width: 0;
  border-color: rgba(0,0,0,0);
  background-color: rgba(0,0,0,0);
}
</style>
