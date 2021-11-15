<template>
  <div class="warpperMenu colWarpper">
    <!--  钱包栏  -->
    <div class="wallet colWarpper" :class="{'walletLogOut':down}">
      <div class="walletMain rowWarpper">
        <!-- 头像 -->
        <div class="profile colWarpper">
          <img src="../../../assets/page/profile/Head.png"
               alt="头像"
               class="headIconStyle"/>
          <SingalIcon class="singalIcon"/>
        </div>

        <!-- 资料区 -->
        <div class="info colWarpper">

          <div class="rowWarpper name">
            <div class="rowWarpper metMaskNameWarp ">
              <span class="MetMaskName fontStyle3">Jon Snow</span>
            </div>
            <div @click="goDown" class="rowWarpper iconWarpper">
              <DownIcon v-show="!down" class="down"/>
              <UpIcon v-show="down" class="down"/>
            </div>
          </div>

          <div class="infoAddress rowWarpper">
            <FoxIcon class="logType"/>
            <span class="typeInfo font-typeInfo">with Metamask</span>
          </div>
          <div class="rowWarpper">
            <div class=" rowWarpper metMaskWarp">
              <span class="numInfo fontStyle5">0x16d1…689V</span>
            </div>
            <div class="iconWarpperFuzhi rowWarpper">
              <FuZhiIcon class="fuzhi"/>
            </div>
          </div>
        </div>
      </div>

      <div class="logOutCon colWarpper">
        <div class="line" v-show="down"></div>
        <!--   logout   -->
        <div class="logoutBefore rowWarpper">
          <span v-show="down" class="logOut fontStyle">Logout</span>
          <div class="logOutIcon rowWarpper" @click="logOut">
            <LogOutIcon v-show="down"/>
          </div>
        </div>
      </div>
    </div>

    <!--  导航区  -->
    <div class="menu colWarpper">

      <!--home-->
      <div
          :class="{'downForY':down}"
          class="homeItem menuItem ForTransform rowWarpper">
        <div class="iconWarp colWarpper">
          <HomeIcon
              :fill-color="homeColor"
              class="HomeIcon"/>
        </div>
        <div class="labelWarp">
          <label for="home">
            <input
                type="radio"
                id="home"
                class="radioInput"
                v-model="index"
                value="home"
                checked/>
            <span
                class="Home fontStyle">
            Home
          </span>
          </label>
        </div>
      </div>

      <div
          :class="{'downForY':down}"
          class="discoverItem menuItem ForTransform rowWarpper">
        <div class="colWarpper iconWarp">
          <FaXianIcon
              :fill-color="faXianIcon"
              class="FaXianIcon "/>
        </div>
        <label for="discover">
          <input
              type="radio"
              id="discover"
              class="radioInput"
              v-model="index"
              value="discover"
              checked/>
          <span
              class="Discover fontStyle ">
            Discover
          </span>
        </label>
      </div>

      <div
          :class="{'downForY':down}"
          class="messageItem menuItem ForTransform rowWarpper">
        <div class="iconWarp colWarpper">
          <InBoxIcon
              :fill-color="messageColor"
              class="InBoxIcon"/>
        </div>
        <label
            for="Message">
          <input
              type="radio"
              id="Message"
              class="radioInput"
              v-model="index"
              value="message"
              checked/>
          <span
              class="Message fontStyle">Message</span>
        </label>
      </div>

      <div
          :class="{'downForY':down}"
          class="meItem menuItem ForTransform rowWarpper">
        <div class="colWarpper iconWarp">
          <MeIcon
              :fill-color="meColor"
              class="MeIcon"/>
        </div>
        <label
            for="Profile">
          <input
              type="radio"
              id="Profile"
              class="radioInput"
              v-model="index"
              value="profile"
              checked/>
          <span
              :class="{'downForY':down}"
              class="Me fontStyle ForTransform">Profile</span>
        </label>
      </div>

      <div
          :class="{'downForY':down}"
          class="settingItem menuItem ForTransform rowWarpper">
        <div class="iconWarp colWarpper">
          <SettingsIcon
              :fill-color="settingsColor"
              class="SettingsIcon"/>
        </div>
        <label
            for="Settings">
          <input
              type="radio"
              id="Settings"
              class="radioInput"
              v-model="index"
              value="Settings"
              checked/>
          <span
              :class="{'downForY':down}"
              class="settings fontStyle ForTransform">Settings</span>
        </label>
      </div>
      <div
          :class="{'downForY':down}"
          class="settingItem menuItem ForTransform rowWarpper">
        <div class="iconWarp colWarpper">
          <CodeIcon
              :fill-color="codeColor"
              class="CodeIcon"/>
        </div>
        <label
            for="Code">
          <input
              type="radio"
              id="Code"
              class="radioInput"
              v-model="index"
              value="Code"
              checked/>
          <span
              :class="{'downForY':down}"
              class="code fontStyle ForTransform">Invitation Code</span>
        </label>
      </div>
    </div>

  </div>
</template>

<script>
import FaXianIcon from '../../../utils/Icon/profile/FaXianIcon'
import HomeIcon from '../../../utils/Icon/profile/HomeIcon'
import InBoxIcon from '../../../utils/Icon/profile/InBoxIcon'
import MeIcon from '../../../utils/Icon/profile/MeIcon'
import SettingsIcon from '../../../utils/Icon/profile/SettingsIcon'
import DownIcon from '../../../utils/Icon/profile/DownIcon'
import FuZhiIcon from '../../../utils/Icon/profile/FuZhiIcon'
import LogOutIcon from '../../../utils/Icon/profile/LogOutIcon'
import FoxIcon from '../../../assets/static/svg/Menu/MateMask'
import SingalIcon from '../../../utils/Icon/profile/SingalIcon'
import UpIcon from '../../../utils/Icon/Menu/UpIcon'
import CodeIcon from '../../../utils/Icon/profile/CodeIcon'

export default {
  components: {
    FaXianIcon,
    HomeIcon,
    InBoxIcon,
    MeIcon,
    SettingsIcon,
    DownIcon,
    FuZhiIcon,
    LogOutIcon,
    FoxIcon,
    SingalIcon,
    UpIcon,
    CodeIcon,
  },
  data() {
    return {
      down: false,
      index: 'home',
      homeColor: '#ffffff',
      messageColor: '#BDA28D',
      meColor: '#BDA28D',
      settingsColor: '#BDA28D',
      faXianIcon: '#BDA28D',
      codeColor: '#BDA28D'
    }
  },
  watch: {
    index(val) {
      let params = {
        type: 'home',
        userid: 1
      }
      switch (val) {
        case 'home':
          this.$emit('pageChange', params)
          this.$router.push({name: 'home'})
          //  -----------------------------------------
          this.homeColor = '#ffffff'
          this.faXianIcon = '#BDA28D'
          this.messageColor = '#BDA28D'
          this.meColor = '#BDA28D'
          this.settingsColor = '#BDA28D'
          this.codeColor = '#BDA28D'
          break
        case 'discover':
          params.type = 'discover'
          this.$emit('pageChange', params)
          this.$router.push({name: 'discover'})
          this.homeColor = '#BDA28D'
          this.faXianIcon = '#ffffff'
          this.messageColor = '#BDA28D'
          this.meColor = '#BDA28D'
          this.settingsColor = '#BDA28D'
          this.codeColor = '#BDA28D'
          break
        case 'message':
          params.type = 'message'
          this.$emit('pageChange', params)
          // this.$router.push({name: "otherPosts", params: {userid: 10}})
          this.homeColor = '#BDA28D'
          this.faXianIcon = '#BDA28D'
          this.messageColor = '#ffffff'
          this.meColor = '#BDA28D'
          this.settingsColor = '#BDA28D'
          this.codeColor = '#BDA28D'
          break
        case 'profile':
          params.type = 'profile'
          this.$emit('pageChange', params)
          this.$router.push({name: 'me'})
          this.homeColor = '#BDA28D'
          this.faXianIcon = '#BDA28D'
          this.messageColor = '#BDA28D'
          this.meColor = '#ffffff'
          this.settingsColor = '#BDA28D'
          this.codeColor = '#BDA28D'
          break
        case 'Settings':
          params.type = 'settings'
          this.$emit('pageChange', params)
          this.$router.push({name: 'Settings'})
          this.homeColor = '#BDA28D'
          this.faXianIcon = '#BDA28D'
          this.messageColor = '#BDA28D'
          this.meColor = '#BDA28D'
          this.settingsColor = '#ffffff'
          this.codeColor = '#BDA28D'
          break
        case 'Code':
          params.type = 'code'
          this.$emit('pageChange', params)
          this.$router.push({name: 'invitationCode'})
          this.homeColor = '#BDA28D'
          this.faXianIcon = '#BDA28D'
          this.messageColor = '#BDA28D'
          this.meColor = '#BDA28D'
          this.settingsColor = '#BDA28D'
          this.codeColor = '#ffffff'
          break
        default:
          this.messageColor = '#BDA28D'
          this.faXianIcon = '#BDA28D'
          this.meColor = '#BDA28D'
          this.settingsColor = '#BDA28D'
          this.homeColor = '#BDA28D'
          this.codeColor = '#BDA28D'
          break
      }
    }
  },
  methods: {
    /**
     * 登录下拉
     */
    goDown() {
      this.down = !this.down
    },
    /**
     * 登出
     */
    logOut() {
      // this.$router.push({name: "login"})
    }
  },
  mounted() {
    let index = this.$route.path.split('/')[1]
    if (index === 'others') index = 'message'
    if (index === 'me') index = 'profile'
    this.index = index
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}


/* ------------- 登录状态 -------------*/
/*钱包*/
.wallet {
  width: 200px;
  height: 78px;
  background: transparent;
  border-bottom: 1px solid rgba(46, 46, 46, 1);
  margin-top: 20px;
}

.wallet:hover {
  background-color: rgba(22, 22, 22, 1);
  /*border: none;*/
  border-bottom-color: transparent;
}

.walletLogOut {
  background-color: rgba(22, 22, 22, 1);
  height: 119px;
}


.walletMain {
  width: 100%;
}


/*头像*/
.headIconStyle {
  width: 36px;
  height: 36px;
  align-self: flex-start;
  margin-left: 12px;
  margin-top: 10px;
}

.singalIcon {
  width: 42px;
  height: 15px;
  align-self: flex-start;
  margin-top: -7px;
  margin-left: 9px;
}

.profile {
  width: 61px;
  height: 100%;
}

.name {
  width: 119px;
}

/*------------- 资料 ---------------*/
.info {
  margin-top: 14px;
}

.metMaskWarp {
  margin-top: 6px;
  width: 107px;
  align-self: flex-start;
  height: 14px;
}

.metMaskNameWarp {
  width: 107px;
  align-self: flex-start;
  height: 14px;
}

.MetMaskName {
}

.iconWarpper {
  width: 12px;
  height: 14px;
  /*margin-top: 6px;*/
}

.iconWarpperFuzhi {
  width: 12px;
  height: 14px;
  margin-top: 6px;
}

.infoAddress {
  align-self: flex-start;
  margin-top: 5px;
}

.numInfo {
  /*margin-top: 6px;*/
  /*width: 100px;*/
  height: 12px;
  align-self: center;
}

.down {
  width: 10px;
  height: 6px;
  z-index: 10;
  align-self: center;
  /*margin-top: 5px;*/
}

.down:hover {
  cursor: pointer;
}


.fuzhi {
  align-self: center;
  width: 12px;
  height: 12px;
  /*margin-top: 8px;*/
}

/*下拉*/
.logOutCon {
  margin-top: 16px;
  width: 100%;
}

.logOut {
  margin-left: 16px;
  align-self: center;
}

.line {
  width: 168px;
  border-top: .5px solid rgba(46, 46, 46, 1);
}

.logOutIcon {
  width: 14px;
  margin-right: 16px;
  align-self: center;
}

.logOutIcon:hover {
  cursor: pointer;
}

.logoutBefore {
  width: 100%;
  height: 32px;
  align-self: flex-start;
  justify-content: space-between;
}

/*-------------- 导航区 --------------*/
.menu {
  margin-top: 25px;
  width: 100%;
}

.downForY {
  transform: translateY(4px);
}

.menuItem {
  width: 102px;
  margin-left: 53px;
}

.iconWarp {
  width: 25px;
}

.labelWarp {

}

.homeItem {
  align-self: flex-start;
}

.discoverItem {
  align-self: flex-start;
  margin-top: 34px;
}

.messageItem {
  align-self: flex-start;
  margin-top: 28px;
}

.meItem {
  align-self: flex-start;
  margin-top: 29px;
}

.settingItem {
  align-self: flex-start;
  margin-top: 29px;
}

.typeInfo {
  height: 10px;
  margin-left: 4px;
}

.radioInput + span {
}

.radioInput + span:hover {
  cursor: pointer;
}

/*------------------ 字体 ----------------*/
.fontStyle {
  font-family: avalonregular, poppins, helvetica, sans-serif;;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 13px;
  text-align: center;
  color: #BDA28D;
  white-space: nowrap;
}

.fontStyle3 {
  font-family: avalonregular, poppins, helvetica, sans-serif;;
  font-style: normal;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 14px;
  white-space: nowrap;
}

.font-typeInfo {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: #898989;
  line-height: 10px;
  white-space: nowrap;

}

.fontStyle5 {
  font-size: 12px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 400;
  color: #BDA28D;
  line-height: 12px;
  letter-spacing: 1px;
  white-space: nowrap;
}

/*-------------- 位置 -------------------*/

.ForTransform {
  transition: transform .5s;
}

.ForTransform:hover {
  cursor: pointer;
}


/*图标*/
.HomeIcon {
  align-self: center;
  width: 25px;
  height: 23px;
}

.FaXianIcon {
  /**/
  /*left: 50px;*/
  /*top: 184px;*/
  align-self: center;
  width: 24px;
  height: 24px;
}

.InBoxIcon {
  /**/
  /*left: 51px;*/
  /*top: 236px;*/
  align-self: center;
  width: 20px;
  height: 22px;
}

.MeIcon {
  /**/
  /*left: 53px;*/
  /*top: 286px;*/
  align-self: center;
  width: 19px;
  height: 22px;
}

.SettingsIcon {
  /**/
  /*left: 52px;*/
  /*top: 338px;*/
  align-self: center;
  width: 20px;
  height: 22px;
}

.logType {
  width: 13px;
  height: 13px;
}

label {
  margin-left: 10px;
}

/*文本*/
.Home {
  width: 42px;
  height: 20px;
}

.Discover {
  width: 60px;
  height: 20px;
}

.Message {
  /**/
  /*left: 85px;*/
  /*top: 237px;*/
  width: 63px;
  height: 20px;
}

.Me {
  /**.D
  /*left: 85px;*/
  /*top: 288px;*/
  width: 43px;
  height: 20px;
}

.settings {
  width: 57px;
  height: 20px;
}

.radioInput {
  display: none;
}

.radioInput ~ span {
  line-height: normal;
}

label {
}

.radioInput:checked ~ span {
  color: rgba(255, 255, 255, 1)
}



</style>
