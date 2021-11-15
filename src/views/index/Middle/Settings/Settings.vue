<template>
  <div class="wrapper">
    <div class="settingsWrapper">
      <div class="addressWrapper">
        <div class="addressDiv">
          <span class="address">Address</span>
        </div>
        <input
            placeholder="0xwu15…12p8"
            type="text"/>
      </div>
      <div class="showNFTWrapper">
        <span class="showNFT">Show NFT</span>
        <SwitchSelf class="switch1"/>
      </div>
      <div class="showCryptWrapper">
        <span
            class="showCrypt">
        Show Cryptocurrency
      </span>
        <SwitchSelf
            class="switch2"
            :checked="false"/>
      </div>
      <div class="passwordWrapper">
        <span class="passwordSpan">Password</span>
        <div class="passwordChangeWarpper">
          <input
              placeholder="****************"
              type="text"/>
          <span
              @click="changePassWord"
              class="changeSPan">change</span>
        </div>
      </div>
      <div class="versionWrapper">
        <div class="versionDiv">
          <span class="version">V 1.0.0</span>
        </div>
        <div class="copyrightDiv">
          <span class="copyright">@2021 Monaco, Inc.</span>
        </div>
      </div>
    </div>
    <div class="logoutButton">
      <span class="logout">Log out</span>
    </div>

    <!--  弹窗  -->
    <DialogSelf
        custom-class="dialogClass"
        width="38.37rem"
        top="30vh"
        title="Change password"
        :need-model="true"
        :visiable="isChangePassWordDialogVisiable"
        @close="isChangePassWordDialogVisiable=false">

      <button @click="save" class="saveButton" slot="headButton">
        Save
      </button>

      <div class="colWarpper">

        <!--    当前密码    -->
        <div
            class="colWarpper inputWrapper">
          <span>Current password</span>
          <div class="rowWarpper">
            <input
                :type="currentPwType"/>
            <div class="rowWarpper" @click="seeCurrentPw">
              <can-see-icon v-show="currentPasswordCanSee" class="canSeeIcon"/>
              <can-not-see v-show="!currentPasswordCanSee" class="canSeeIcon"/>
            </div>
          </div>
        </div>

        <!--    forgetPassword    -->

        <span class="newPassword">Forgot Password</span>


        <!--    新密码    -->
        <div
            class="colWarpper inputWrapper">
          <span>New password</span>
          <div class="rowWarpper">
            <input :type="newPwType" v-model="newPw"/>
            <div class="rowWarpper" @click="seeNewPw">
              <can-see-icon v-show="newPasswordCanSee" class="canSeeIcon"/>
              <can-not-see v-show="!newPasswordCanSee" class="canSeeIcon"/>
            </div>
          </div>
        </div>

        <!--    重复新密码    -->
        <div
            class="colWarpper inputWrapper">
          <span>Confirm new password</span>
          <div class="rowWarpper">
            <input :type="repetNewPwType" v-model="repetNewPw"/>
            <div class="rowWarpper" @click="seeRepetPw">
              <can-see-icon v-show="repetNewPasswordCanSee" class="canSeeIcon"/>
              <can-not-see v-show="!repetNewPasswordCanSee" class="canSeeIcon"/>
            </div>
          </div>
        </div>

      </div>

    </DialogSelf>
  </div>
</template>

<script>
import SwitchSelf from '../../../../components/utils/SwitchSelf'
// ------------- element-ui -------------------
import DialogSelf from '../../../../components/utils/YuanSheng/DialogSelf'
// ---------------- 图标 ----------------------------
import CanSeeIcon from '@/assets/static/svg/CanSeeIcon'
import CanNotSee from '@/assets/static/svg/CanNotSee'
// --------------- axios ------------------------
// import {sendResetLink} from '@/api/monico/login'
import request from '@/common/axios'

export default {
  components: {
    SwitchSelf,
    DialogSelf,
    CanSeeIcon,
    CanNotSee
  },
  data() {
    return {
      showNft: false,
      isChangePassWordDialogVisiable: false,
      //  ------------------- 弹窗 ------------------------
      currentPasswordCanSee: false,
      newPasswordCanSee: false,
      repetNewPasswordCanSee: false,
      currentPwType: 'password',
      newPwType: 'password',
      repetNewPwType: 'password',
      newPw: '',
      repetNewPw: ''
    }
  },
  methods: {
    /**
     * 注销
     */
    logout() {
      this.$router.push({name: 'login'})
    },
    /**
     * 修改密码
     */
    changePassWord() {
      this.isChangePassWordDialogVisiable = !this.isChangePassWordDialogVisiable
    },
    /**
     * 显示密码
     */
    seeCurrentPw() {
      this.currentPasswordCanSee = !this.currentPasswordCanSee
      this.currentPwType = this.currentPasswordCanSee ? 'text' : 'password'
    },
    seeNewPw() {
      this.newPasswordCanSee = !this.newPasswordCanSee
      this.newPwType = this.newPasswordCanSee ? 'text' : 'password'
    },
    seeRepetPw() {
      this.repetNewPasswordCanSee = !this.repetNewPasswordCanSee
      this.repetNewPwType = this.repetNewPasswordCanSee ? 'text' : 'password'
    },
    /**
     * 保存
     */
    save() {
      const pd = {
        // 'email': 'gybond1995@foxmail.com',
        'password': this.newPw,
        'password_repeat': this.repetNewPw
      }
      this.sendResetLink(pd)
    },
    //  ----------------------- axios ----------------------------
    sendResetLink(pd) {
      return request({
        url: 'account/setPassword',
        method: 'get',
        params: pd,
        headers: {'Content-Type': 'application/json'}
      })
    }
  }
}
</script>
<style>

.dialogClass {
  width: 614px !important;
  height: 371px;
  background: #161616;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  border: 6px solid rgba(255, 255, 255, 0.1);
}

.el-dialog--center .el-dialog__body {
  padding: 0;
}
</style>
<style scoped>

.saveButton {
  width: 70px;
  height: 32px;
  background: #BDA28D;
  border-radius: 16px;
  opacity: 0.7;
  outline: none;
  border: none;

  font-size: 16px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  color: #161616;
  line-height: 25px;
}


.saveButton:hover {
  cursor: pointer;
  opacity: 1;
}

.wrapper {
  width: 574px;
  height: 478px;
  background: #1F1F1F;
  border-radius: 4px;
  padding: 20px 20px 0 20px;
}

.addressWrapper {
  width: 574px;
  height: 60px;
  background: #1A1A1A;
  border-radius: 4px;
  border: 2px solid #313131;
  margin-bottom: 28px;
}

.addressDiv {
  margin-left: 14px;
  margin-top: 10px;
  width: 62px;
  height: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #BDA28D;
  line-height: 16px;
}

.addressWrapper input {
  height: 16px;
  font-size: 14px;
  font-weight: 400;
  color: #898989;
  line-height: 16px;
  background: #1A1A1A;
  border: 0;
  margin-left: 14px;
}

.showNFTWrapper {
  margin-left: 14px;
  width: 574px;
  height: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 28px;


}

.showCryptWrapper {
  margin-left: 14px;
  width: 574px;
  height: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 28px;

}

.passwordWrapper {
  width: 574px;
  height: 60px;
  padding-top: 10px;
  background: #1A1A1A;
  border-radius: 4px;
  border: 2px solid #313131;
}

.versionWrapper {
  width: 574px;
  margin-top: 30px;
}

.showNFT {
  width: 67px;
  height: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #BDA28D;
  line-height: 16px;
  margin-right: 16px;
}

.showCrypt {
  width: 153px;
  height: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #BDA28D;
  line-height: 16px;
  margin-right: 16px;
}

.passwordSpan {
  width: 72px;
  height: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #BDA28D;
  line-height: 16px;
  margin-left: 14px;
}

.passwordWrapper input {
  width: 109px;
  height: 16px;
  font-size: 14px;
  font-weight: 400;
  color: #898989;
  line-height: 16px;
  background: #1A1A1A;
  border: 0;
  margin-left: 14px;
}

.passwordChangeWarpper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;
}

.changeSPan {
  width: 55px;
  font-size: 14px;
  font-weight: 400;
  color: #BDA28D;
  margin-right: 14px;
}

.versionWrapper {
  width: 574px;
  height: 36px;
}

.version {
  height: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #898989;
  line-height: 16px;
}

.versionDiv {
  margin-left: 14px;
}

.copyrightDiv {
  height: 16px;
  font-size: 12px;
  font-weight: 500;
  color: #898989;
  line-height: 16px;
  margin-left: 14px;
}

.logoutButton {
  width: 95px;
  height: 36px;
  border-radius: 33px;
  border: 2px solid #BDA28D;
  background: #161616;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 78px;

}

.logout {
  width: 59px;
  height: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #BDA28D;
  line-height: 16px;
}

/* ----------------------- 弹窗部分 －－－－－－－－－－－－－－－*/
.inputWrapper {
  width: 574px;
  height: 56px;
  background: #1A1A1A;
  border-radius: 4px;
  border: 2px solid #313131;
}

.inputWrapper > span {
  align-self: flex-start;
  width: 127px;
  height: 16px;
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  color: #BDA28D;
  line-height: 16px;
  margin: 10px 0 0 14px;
}

.inputWrapper > div {
  justify-content: space-between;
  width: 574px;
  height: 34px;
}

.inputWrapper > div > div {
  height: 34px;
}

.inputWrapper > div > input {
  /*width: 545px;*/
  height: 16px;
  background-color: transparent;
  border-color: transparent;
  outline: none;
  padding-left: 14px;

  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 400;
  color: #898989;
  line-height: 16px;
}

.inputWrapper:nth-child(1) {
  margin-top: 32px;
}

.inputWrapper:nth-child(3) {
  margin-top: 20px;
}

.inputWrapper:nth-child(4) {
  margin-top: 14px;
}

.newPassword {
  align-self: flex-end;
  margin: 12px 20px 0 0;
}

.canSeeIcon {
  width: 16px;
  height: 14px;
  align-self: flex-end;
  margin: 0 13px 12px 0;
}

.canSeeIcon:hover {
  cursor: pointer;
}

</style>
