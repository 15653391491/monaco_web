<template>
  <div class="colWarpper">

    <!--  返回  -->
    <div @click="goback" class="rowWarpper goBackWarpper">
      <LeftArray class="array"/>
      <span class="goBack">Back</span>
    </div>

    <!--  邮箱  -->
    <input
        v-model="email"
        type="text"
        placeholder="email"/>

    <!--  密码  -->
    <div
        class="colWarpper"
        :class="{'passwordWrong':!passwordCheckResult&&password!==''}">
      <div
          class="rowWarpper passwordWarpper">
        <input
            @change="checkPassWord"
            v-model="password"
            :type="passwordInputType"
            placeholder="password"/>
        <div
            @click="needShowPassword"
            class="showPassword colWarpper">
          <CanSeeIcon v-show="showPassword"/>
          <CanNotSee v-show="!showPassword"/>
        </div>
      </div>
    </div>
    <!--  忘记密码  -->
    <span
        @click="goVerify"
        class="forgotPassword"> forgot password</span>
    <!--  提交  -->
    <button
        @click="login"
        class="Continue loginButton">
      <span class="theText">Continue</span>
    </button>

    <!--  忘记密码  -->
    <DialogSelf
        custom-class="dialogClass"
        title="Set password"
        :visiable="isForgetPasswordVisiable"
        @close="isForgetPasswordVisiable=false">
      <button class="saveButton" slot="headButton">
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
              <see-icon v-show="passowrordCanSee" class="canSeeIcon"/>
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
              <see-icon v-show="passowrordRepetCanSee" class="canSeeIcon"/>
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
// --------------- svg图标 ----------------------
import LeftArray from '@/views/login/Icon/LeftArray'
import CanNotSee from '@/views/login/Icon/CanNotSee'
import CanSeeIcon from '@/views/login/Icon/CanSeeIcon'
import SeeIcon from '@/utils/Icon/profile/SeeIcon'
// ------------------------ 自定义组件 --------------------------
import DialogSelf from '@/components/utils/YuanSheng/DialogSelf'
// -------------------- axios -------------------
import {forgetPassword, updatePassword, login} from '@/api/monico/login'
// import * as metamaskUtils from '@/utils/metamask.js'
// import * as walletAPI from '@/api/wallet.js'
import * as tokenTools from '@/utils/tokenTools.js'

export default {
  name: 'LogMode',
  components: {
    SeeIcon,
    LeftArray,
    CanNotSee,
    CanSeeIcon,
    DialogSelf
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      passwordInputType: 'password',
      passwordCheckResult: true,
      isForgetPasswordVisiable: false,
      //  ------------------- 弹窗 -------------------
      passowrordCanSee: false,
      passowrordRepetCanSee: false,
      dialogPassword: '',
      dialogPasswordRepet: '',
      dialogPasswordInputType: 'password',
      dialogPasswordRepetInputType: 'password',
      passwordMatch: true
    }
  },
  methods: {
    /**
     * 返回登录页面
     */
    goback() {
      this.$router.push({name: 'email'})
    },
    /**
     * 检查验证码
     * @returns {boolean} 检查结构
     */
    checkPassWord() {
      return this.password === '123456'
    },
    /**
     * 登录
     */
    login() {
      const pd = {
        email: this.email,
        password: this.password
      }
      this.loginAxios(pd)
    },
    /**
     * 密码是否可见
     */
    needShowPassword() {
      this.showPassword = !this.showPassword
      if (this.showPassword) {
        this.passwordInputType = 'text'
      } else {
        this.passwordInputType = 'password'
      }
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
     * 跳转邮箱界面
     */
    goVerify() {
      this.$router.push({name: 'email', query: {email: this.email, type: 'resetPassword'}})
    },
    //   ----------------------- axios --------------------------
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
    },
    /**
     * 邮箱登录
     * @param pd
     */
    loginAxios(pd) {
      login(this.$qs.stringify(pd))
          .then(res => {
            console.log(res.data.data.token)
            console.log(tokenTools)
            tokenTools.setToken(res.data.data.token)

            this.$router.push({name: 'home'})
          })
    }
  },
  mounted() {
    this.email = this.$route.query.email
  },
  watch: {
    password: function () {
      this.passwordCheckResult = this.checkPassWord()
    },
    dialogPasswordRepet(val) {
      this.passwordMatch = this.dialogPassword === val
    },
    dialogPassword(val) {
      this.passwordMatch = this.dialogPasswordRepet === val
    }
  }
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
/*--- 返回 ----*/
.goBackWarpper {
  height: 27px;
  width: 100%;
}

.goBackWarpper:hover {
  cursor: pointer;
}

.goBackWarpper {
  width: 100%;
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
  margin-left: 14px;
  align-self: center;
  line-height: normal;
}

/*---- 账号密码 -----*/
input {
  width: 308px !important;
  height: 59px !important;
  align-self: center;
  padding-left: 14px;
  background: rgba(0, 0, 0, 0.6);
  border: 1.5px solid rgba(66, 66, 66, 1);
  border-radius: 4px;
  margin-top: 16px;
  font-size: 16px;
  color: #8F8F93;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  outline: none;
}

.verifyButton > span {
  align-self: center;
  text-align: center;
  width: 109px;
}

.passwordWarpper {
  margin-top: 16px;
  width: 324px;
  height: 61px !important;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  border: 1.5px solid rgba(66, 66, 66, 1);
}

.passwordWarpper > input {
  width: 272px;
  margin-top: 0;
  border-color: transparent;
  background-color: transparent;
}

.showPassword {
  margin-right: 19px;
  align-self: center;

}

.showPassword:hover {
  cursor: pointer;
}

.passwordWrong > div {
  border: 1.5px solid rgba(252, 108, 80, 1);
}

.passwordWrong > div > input {
  color: rgba(252, 108, 80, 1);
}

.passwordWrong:after {
  content: "Incorrect password";
  color: rgba(252, 108, 80, 1);
  margin-top: 10px;
  align-self: flex-start;
  height: 20px;
  font-size: 14px;
  padding-left: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
}

.passwordWrong + span {
  margin-top: -22px;
}

/*----------- 忘记密码 ------------*/
.forgotPassword {
  font-size: 14px;
  color: rgba(189, 162, 141, 1);
  font-family: avalonregular, poppins, helvetica, sans-serif;
  align-self: flex-end;
  margin-top: 8px;
  height: 20px;
}

.forgotPassword:hover {
  cursor: pointer;
}

/*-------------- 提交按钮 ---------------*/
.Continue {
  margin-top: 40px;
  align-self: center;
}

.verifyButton > span:hover {
  cursor: pointer;
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
  margin-bottom: 49px;

}

.passwordWrongButton {
  background: rgba(189, 162, 141, .7);
}

.passwordWrongButton:hover {
  cursor: not-allowed;
}
</style>
