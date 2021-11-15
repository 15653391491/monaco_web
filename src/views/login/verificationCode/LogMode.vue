<template>
  <div class="colWarpper">

    <!--  返回  -->
    <div @click="goback" class="rowWarpper goBackWarpper">
      <LeftArray class="array"/>
      <span class="goBack">Back</span>
    </div>

    <!--  提示  -->
    <div class="colWarpper tipsWarpper">
      <span class="tips">We have send a verification code to </span>
      <span class="tips">{{ email }}</span>
    </div>

    <!--  验证码  -->
    <div
        :class="{'verifyWrong':!verifyCheckResult&&inputVerifuCode!==''}"
        class="colWarpper">

      <div class="rowWarpper verifyWarpper">
        <input
            v-model="inputVerifuCode"
            type="text"
            oninput="value=value.replace(/[^\d]/g,'')"
            placeholder="Input verify code"
            v-on:change="getVeriCode"/>
        <div class="verifyButton rowWarpper">
          <div class="rowWarpper sendVerifyCon">
            <span
                @click="sendCode"
                v-show="!handsSendCode"
                class="fontStyleSendCode">
              Send code
            </span>
            <span class="sendVerify" v-show="handsSendCode">
              {{ countDown }}s Resend
            </span>
          </div>
        </div>
      </div>

      <div
          :class="{'verifyWrongShow':!verifyCheckResult&&inputVerifuCode!==''}"
          class="verifyWrongAfter">
        The verification code you entered do not match
      </div>
    </div>

    <!--  提交  -->
    <button
        :class="{'verifyWrongButton':!verifyCheckResult&&inputVerifuCode!==''}"
        @click="login"
        class="Continue loginButton">
      <span class="theText">Continue</span>
    </button>
    <!--  弹窗 -->
    <DialogSelf
        custom-class="dialogClass"
        title="Set password"
        :visiable="isForgetPasswordVisiable"
        @close="closeDialog">
      <button @click="resetOrSetPassword" class="saveButton" slot="headButton">
        Save
      </button>
      <div class="colWarpper dialogWrapper">
        <!--    密码    -->
        <div
            :class="{passwordNotMatch:!passwordMatch}"
            class="colWarpper inputWrapper">
          <span class="title">New password</span>
          <div class="rowWarpper">
            <input
                v-model="dialogPassword"
                :type="dialogPasswordInputType"
                class="input"/>
            <div @click="dialogIputPasswordCansee" class="rowWarpper">
              <can-see-icon v-show="passowrordCanSee" class="canSeeIcon"/>
              <can-not-see v-show="!passowrordCanSee" class="canSeeIcon"/>
            </div>
          </div>
        </div>
        <!--    重复密码    -->
        <div
            :class="{passwordNotMatch:!passwordMatch}"
            class="colWarpper inputWrapper">
          <span class="title">Confirm new password</span>
          <div class="rowWarpper">
            <input
                v-model="dialogPasswordRepet"
                :type="dialogPasswordRepetInputType"
                class="input"/>
            <div @click="dialogIputPasswordRepetCansee" class="rowWarpper">
              <can-see-icon v-show="passowrordRepetCanSee" class="canSeeIcon"/>
              <can-not-see v-show="!passowrordRepetCanSee" class="canSeeIcon"/>
            </div>
          </div>
        </div>
        <!--    错误提示    -->
        <span v-show="!passwordMatch" class="dialogTips">The two passwords do not match</span>
      </div>
    </DialogSelf>
  </div>
</template>

<script>
// -------------------- svg图标 ----------------------
import LeftArray from '@/views/login/Icon/LeftArray'
import CanNotSee from '@/views/login/Icon/CanNotSee'
import CanSeeIcon from '@/views/login/Icon/CanSeeIcon'
// ------------------------ 自定义组件 --------------------------
import DialogSelf from '@/components/utils/YuanSheng/DialogSelf'
// -------------------- axios -------------------
import {forgetPassword, updatePassword} from '@/api/monico/login'
import request from '@/common/axios'
import {setPassword, sendResetLink} from '@/api/monico/login'

export default {
  name: 'LogMode',
  components: {
    LeftArray,
    DialogSelf,
    CanNotSee,
    CanSeeIcon
  },
  data() {
    return {
      email: 'abc***@gmail.com',
      verifyCode: 0,
      inputVerifuCode: null,
      handsSendCode: false,
      countDown: 60,
      t: undefined,
      verifyCheckResult: true,
      type: '',
      //  ------------------- 弹窗 -------------------
      isForgetPasswordVisiable: false,
      passowrordCanSee: false,
      passowrordRepetCanSee: false,
      dialogPassword: '',
      dialogPasswordRepet: '',
      dialogPasswordInputType: 'password',
      dialogPasswordRepetInputType: 'password',
      passwordMatch: true
    }
  },
  mounted() {
    this.email = this.$route.query.email
    this.type = this.$route.query.type
  },
  methods: {
    /**
     * 返回登录页面
     */
    goback() {
      this.$router.push({name: 'email'})
    },
    /**
     * 发送验证码
     */
    sendCode() {
      this.handsSendCode = !this.handsSendCode
      let that = this
      this.t = setInterval(() => {
        that.countDown = that.countDown - 1
      }, 1000)
      let data = {
        'email': this.email,
        'type': 'sign_up'
      }
      const pd = {
        'email': this.email
      }
      if (this.type === 'register') {
        this.sendSecurityCode(data)
      } else if (this.type === 'resetPassword') {

        this.sendResetEmail(pd)
      }
    },
    /**
     * 获取验证码
     */
    getVeriCode(e) {
      this.inputVerifuCode = e.target.value
    },
    signUp(data) {
      return request({
        url: 'account/signUp',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/json'}
      })
    },
    /**
     * 检查验证码
     * @returns {boolean} 检查结构
     */
    checkVerify() {
      // this.verifyCheckResult = (this.verifyCode - this.inputVerifuCode === 0)
      // return this.verifyCode - this.inputVerifuCode === 0
    },
    /**
     * 发送邮箱验证码
     */
    sendSecurityCode(data) {
      return request({
        url: 'account/sendSecsurityCode',
        method: 'get',
        params: data,
        headers: {'Content-Type': 'application/json'}
      })
    },
    closeDialog() {
      this.isForgetPasswordVisiable = false
    },
    /**
     * 登录
     */
    login() {
      // if (this.checkVerify()) {
      //   let data = {
      //     'email': this.email,
      //     'security_code': this.inputVerifuCode
      //   }
      //   let res = this.signUp(data)
      //   this.$router.push({name: 'home'})
      // }
      let data = {
        'email': this.email,
        'security_code': this.inputVerifuCode
      }
      this.signUp(data).then(
          res => {
            if (res) {
              if (res.data.code === 0) {
                this.verifyCheckResult = false
              } else {
                this.openDialog()
                // this.$router.push({name: 'home'})
              }
            }
          }
      )
    },
    openDialog() {
      this.isForgetPasswordVisiable = true
    },
    /***
     * 弹窗中密码框是否可见
     */
    dialogIputPasswordCansee() {
      this.passowrordCanSee = !this.passowrordCanSee
      if (this.passowrordCanSee) {
        this.dialogPasswordInputType = 'text'
      } else {
        this.dialogPasswordInputType = 'password'
      }
    },
    /***
     * 弹窗中重复密码框是否可见
     */
    dialogIputPasswordRepetCansee() {
      this.passowrordRepetCanSee = !this.passowrordRepetCanSee
      if (this.passowrordRepetCanSee) {
        this.dialogPasswordRepetInputType = 'text'
      } else {
        this.dialogPasswordRepetInputType = 'password'
      }
    },
    /**
     * 设置或重置密码
     */
    resetOrSetPassword() {
      const pd = {
        email: this.email,
        time: '14039483828',
        sign: this.verifyCode,
        password: this.dialogPassword,
        password_repeat: this.dialogPasswordRepet
      }
      if (this.type === 'resetPassword') {
        this.setPassword(pd)
      } else if (this.type === 'register') {
        this.sendResetLink(pd)
      }
    },
    // ---------------------- axios ---------------------
    /**
     * 设置密码
     * @param pd
     */
    setPassword(pd) {
      setPassword(pd)
          .then(res => {
            this.$router.push({name: 'home'})
            console.log(res.data.data)
          })
    },
    /**
     * 重置密码
     * @param pd
     */
    sendResetLink(pd) {
      sendResetLink(pd)
          .then(res => {
            this.$router.push({name: 'home'})
            console.log(res.data.data)
          })
    },
    /**
     * 发送重置密码邮件
     * @param pd
     */
    sendResetEmail(pd) {
      let res = sendResetLink(pd)
          .then(res => {
            console.log('send code res now', res)
          })
        console.log(res)
    },
    /**
     * 忘记密码
     * @param pd
     */
    forgetPassword(pd) {
      forgetPassword(this.$qs.stringify(pd))
          .then(res => {
            console.log(res.data.data)
          })
    },
    /**
     * 修改密码
     * @param pd
     */
    updatePassword(pd) {
      updatePassword(this.$qs.stringify(pd))
          .then(res => {
            console.log(res.data.data)
          })
    }
  },
  watch: {
    countDown: function (val) {
      if (val <= 1) {
        clearInterval(this.t)
        this.handsSendCode = !this.handsSendCode
        this.countDown = 60
      }
    },
    inputVerifuCode: function (val) {
      if (val > 999) {
        this.checkVerify()
      }
    }
  },
}
</script>

<style>
.dialogClass {
  width: 626px !important;
  height: 372px;
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
/*----------------- 弹窗样式 ----------------------*/
.dialogWrapper {
  justify-content: flex-start;
  width: 578px;
  margin-left: 20px;
  margin-top: 69px;
}

.inputWrapper {
  background-color: rgba(0, 0, 0, 0.8);
  width: 574px;
  height: 60px;
  /*background: #1A1A1A;*/
  border-radius: 4px;
  border: 2px solid #BDA28D;
}

.inputWrapper > div {
  justify-content: space-between;
  height: 33px;
}

.inputWrapper:nth-child(2) {
  margin-top: 14px;
}

.title {
  align-self: flex-start;
  margin: 10px 0 0 14px;
  height: 16px;
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  color: #BDA28D;
  line-height: 16px;
}

.input {
  margin-top: 0;
  height: 16px !important;
  border: 0 solid transparent;
  padding-left: 14px;
}

.canSeeIcon {
  width: 18px;
  height: 16px;
  align-self: flex-end;
  margin: 0 11px 8px 0;
}

.canSeeIcon:hover {
  cursor: pointer;
}

.dialogTips {
  width: 234px;
  height: 14px;
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 400;
  color: #FC6C50;
  line-height: 14px;
  margin: 10px 0 0 14px;
}

.passwordNotMatch {
  border: 2px solid #FC6C50
}

.passwordNotMatch > div > input {
  color: #FC6C50;
}

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

/*------------- 字体 --------------*/
.fontStyleSendCode {
  margin-left: 3px;
  width: 75px !important;
  line-height: 14px;
  align-self: center;

  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  color: rgba(189, 162, 141, 1);
}

/*--- 返回 ----*/
.goBackWarpper {
  width: 100%;
  height: 27px;
}

.goBackWarpper:hover {
  cursor: pointer;
}

.goBack {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  width: 100px;
  height: 27px;
  font-style: normal;
  font-weight: normal;
  margin-left: 5px;
  font-size: 16px;
  line-height: 27px;
  text-align: left;
  color: rgba(189, 162, 141, 1);
  align-self: center;

}

.array {
  width: 14px;
  height: 27px;
  padding-top: 10px;
  align-self: center;
  margin-left: 14px;
  line-height: normal;
}

/*---- 验证码 -----*/
.verifyWarpper {
  width: 324px;
  height: 61px;
  background: rgba(0, 0, 0, 0.6);
  border: 1.5px solid rgba(66, 66, 66, 1);
  margin-top: 14px;
  border-radius: 4px;
}

input {
  width: 212px;
  height: 32px;
  align-self: center;
  padding-left: 14px;
  letter-spacing: 5px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid transparent;
  font-size: 16px;
  color: #8F8F93;
  font-family: avalonregular, poppins, helvetica, sans-serif;
}

input::-webkit-input-placeholder {
  letter-spacing: 0;
}

input:focus {
  border-color: transparent;
  outline: none;
}

.verifyButton {
  align-self: center;
  height: 25px;
  width: 109px;
  border-left: 1px solid rgba(137, 137, 137, 1);
  color: rgba(189, 162, 141, 1);
}

.verifyButton > span {
  align-self: center;
  text-align: center;
  width: 109px;
}

.verifyButton > span:hover {
  cursor: pointer;
}

.verifyWrong > .verifyWarpper {
  width: 324px;
  border: 1.5px solid rgba(252, 108, 80, 1);
  color: rgba(252, 108, 80, 1);
}

.verifyWrong > div > input {
  color: rgba(252, 108, 80, 1);
}


.verifyWrongAfter {
  width: 313px;
  color: rgba(252, 108, 80, 0);
  font-size: 14px;
  margin-left: 14px;
  margin-top: 8px;
  font-weight: 400;
}

.verifyWrongShow {
  color: rgba(252, 108, 80, 1);
}

.verifyWrongHide {
  color: rgba(252, 108, 80, 0)
}

/*------------------------------------*/
.verifyWrongButton {
  /*margin-top: 26px !important;*/
}

.Continue {
  margin-top: 26px;
  align-self: center;
}

.theText {
  width: 83px;
  height: 18px;
  font-size: 18px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  color: rgba(0, 0, 0, 1);
  line-height: 18px
}

.loginButton {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  width: 327px;
  height: 56px;
  background: rgba(189, 162, 141, 1);
  box-shadow: 0 6px 11px 0 #000000;
  border: 1px solid rgba(189, 162, 141, .5);
  transition: background-color .5s;
  border-radius: 4px;

}

.loginButton:hover {
  cursor: pointer;
}

.tips {
  color: #Ffffff;
  font-size: 14px;
  font-weight: normal;
  align-self: flex-start;
  link: 21px;
  margin-left: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
}

.tipsWarpper {
  width: 100%;
  margin-top: 16px;
}

.sendVerify {
  height: 14px;
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  color: #BDA28D;
  line-height: 14px;
  align-self: center;
}

.sendVerifyCon {
  margin-left: 14px;
  width: 95px;
}
</style>
