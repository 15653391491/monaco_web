<template>
  <div class="wrapper rowWarpper">
    <!-- 头像 -->
    <div class="profile colWarpper">
      <img class="profileImg" src="../../../assets/page/位图.png" alt="">
      <singal-icon class="singalIcon"/>
    </div>

    <!-- 发送消息 -->
    <div class="addPost colWarpper">
      <input
          placeholder="What’s happening?"
          type="text"
          class="addPostInput"/>
      <div class="rowWarpper">
        <div class="rowWarpper iconWarp">
          <laugh-icon class="laugh"/>
          <page-icon class="page"/>
        </div>
        <TikTokIcon class="post"/>
      </div>
    </div>
  </div>
</template>

<script>
// --------------- 图标 ------------------
import pageIcon from './Icon/Map'
import laughIcon from './Icon/Laugth'
import TikTokIcon from '../../../utils/Icon/TikTokIcon'
import SingalIcon from '../../../utils/Icon/profile/SingalIcon'
import {TicTok as log} from '../../../assets/page/TikTok+ Icon.svg'
// import TitleIcon from "@/utils/Icon/profile/TitleIcon";

export default {
  name: 'Top',
  components: {
    // TitleIcon,
    pageIcon,
    laughIcon,
    TikTokIcon,
    SingalIcon
  },
  data() {
    return {
      log: log
    }
  }
}
</script>

<style scoped>
.rowWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.colWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.wrapper {
  width: 614px;
  height: 131px;

  background-color: rgba(31, 31, 31, 1);
}

.iconWarp {

}

/*---------- 头像 --------------*/
.profile {
  width: 79px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.profileImg {
  align-self: flex-start;
  width: 40px;
  height: 40px;
  margin-top: 20px;
  margin-left: 22px;
  /*margin: 20px 0 0 22px;*/

  border-radius: 50%;
}

.singalIcon {
  width: 42px;
  height: 15px;
  align-self: flex-start;
  margin-top: -8px;
  margin-left: 21px;
  /*margin: -8px 0 0 21px;*/
}

/*----------- 发送消息 -----------*/
.addPost {
  width: 535px;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.addPost > div {
  width: 100%;
}

.addPostInput {
  align-self: flex-start;
  width: 502px;
  height: 16px;
  margin-top: 37px;
  padding: 0 0 19px 0;
  margin-left: 3px;
  background-color: transparent;
  outline: none;
  border: 0;
  border-bottom: 1px solid rgba(46, 46, 46, 1);
}

input {
  padding-bottom: 19px;
}

input:focus {
  color: #ffffff;
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 400;
  line-height: 16px;
}

input::-webkit-input-placeholder {
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 400;
  line-height: 16px;
  color: #898989;
}

.iconWarp {
  margin-top: 17px;
  height: 18px;
}

.addPostInput + div {
  justify-content: space-between;
}

.addPostInput + div > div {
  align-self: flex-start;
}

.laugh {
  width: 18px;
  height: 18px;
}

.page {
  width: 18px;
  height: 16px;
  margin-left: 12px;
}

.post {
  width: 64px;
  height: 52px;
  align-self: flex-start;
  /*background-color: #ffffff;*/
  margin-top: 8px;
  margin-right: 18px;
}
</style>
