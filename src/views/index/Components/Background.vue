<template>
  <div id="bg" class="background">

    <!--  左  -->
    <div class="leftPart">
      <!--  logo  -->
      <div class="logoCon">
        <TitleIcon class="logo"/>
      </div>
      <div class="left">
        <slot name="left"></slot>
      </div>
    </div>

    <!--  中  -->
    <div class="middlePart">
      <!--  标题  -->
      <Title
          :need-sub-title="needSubTitle"
          :title="title"
          :sub-title="subTitle"
          class="title"/>
      <div class="middle">
        <slot name="middle"></slot>
      </div>
    </div>

    <!--  右  -->
    <div class="rightPart">
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>

  </div>
</template>

<script>
import TitleIcon from '../../../utils/Icon/profile/TitleIcon'
import Title from './Title'

export default {
  name: 'background',
  components: {
    TitleIcon,
    Title
  },
  data() {
    return {
      needMenu: true
    }
  },
  props: {
    needSubTitle: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Home'
    },
    subTitle: {
      type: String,
      default: '10 posts'
    }
  },
  mounted() {
    let that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
        that.needMenu = window.screenWidth >= 1353
      })()
    }
  }
}
</script>

<style scoped>
.rowWarpper{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.colWarpper{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.background {
  overflow: scroll;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  background: #161616;
  height: 100vh;
}


.right {
  /*position: absolute;*/
  width: 370px;
  /*height: 972px;*/
  /*left: 972px;*/
  /*top: 43px;*/
}

.middle {
  /*position: absolute;*/
  /*left: 344px;*/
  /*top: 76px;*/
  /*background: #1F1F1F;*/
  width: 614px;
  height: 140vh;
}

.leftPart {
  position: sticky;
  top: 0;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;

}

.logoCon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.logo {
  width: 136px;
  height: 37px;
  margin: 0 auto;
}

.left {
  width: 240px;
  height: 939px;
  margin-top: 14px;
   border-radius: 4px 4px 0 0;
  background: #1F1F1F;
}

.middlePart {
  padding: 38px 14px;
  /*position: sticky;*/
  /*top: 0;*/
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}

.title {
  /*position: absolute;*/
  /*left: 352px;*/
  /*top: 38px;*/
}

.middle {
  padding-top: 10px;
}

.rightPart {
  position: sticky;
  top: 0;
  padding-top: 41px;
}
</style>
