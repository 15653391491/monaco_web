<template>
  <div
      class="colWarpper">
    <!--  返回  -->
    <div :class="{'arrayWarpper':!isEmail&&email!==''}" class="rowWarpper goBackWarpper">
      <div class="arrayGoBack" @click="goback">
        <LeftArray class="array"/>
        <span class="goBack">Back</span>
      </div>
      <div class="haveAccountLogin">
        <span class="haveAccount">Have an account?</span>
        <span @click="gologin" class="login">Login</span>
      </div>
    </div>

    <div
        :class="{'emailWarpper':!isEmail&&email!==''}"
        class="colWarpper">
      <input
          @change="checkEmail"
          v-model="email"
          type="text"
          placeholder="Email address"
          spellcheck="false"
          :class="{'isEmail':isEmail&&email!=='','isNotEmail':!isEmail&&email!==''}"
          class="emailAddress"
          v-on:change="getEmail"/>
      <div class="emailWarpperAfter" :class="{'ehide':isEmail&&email!=='','eshow':!isEmail&&email!==''}">
        format error
      </div>
    </div>

    <button
        @click="goVerify"
        :class="{'disableButton':!isEmail}"
        class="Continue loginButton">
      <span class="theText">Continue</span>
    </button>
  </div>
</template>

<script>
import LeftArray from '@/views/login/Icon/LeftArray'
import request from '../../../common/axios'

export default {
  name: 'LogMode',
  components: {
    LeftArray
  },
  data() {
    return {
      email: '',
      isEmail: false,
      registerEmail: [
        '11111@163.com'
      ],
      type: ''
    }
  },
  methods: {
    /**
     * 返回登录页面
     */
    goback() {
      this.$router.push({name: 'login'})
    },
    /**
     *
     * @param e
     */
    getEmail(e) {
      this.email = e.target.value
    },
    /**
     * 验证email
     */
    checkEmail() {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z])+/
      this.isEmail = reg.test(this.email)
    },
    /**
     * 跳转验证码页面
     */
    goVerify() {
      if (this.isEmail) {
        this.$router.push({name: 'verify', query: {email: this.email, type: this.type}})
      }
    },
    /**
     * 跳转登录界面
     */
    gologin() {
      this.$router.push({name: 'password'})
    },
    /**
     * 发送邮箱验证码
     */
    sendSecurityCode(data) {
      return request({
        url: 'account/sendSecurityCode',
        method: 'post',
        data,
        headers: {'Content-Type': 'application/json'}
      })
    },
    /**
     * 判断输入框内的邮箱是否注册过
     * @returns {boolean} 判断结果
     */
    isInputEmailRegisted() {
      return this.registerEmail.indexOf(this.email) !== -1
    }
  },
  watch: {
    email() {
      this.checkEmail()
    }
  },
  mounted() {
    this.type = this.$route.query.type
  }
}
</script>

<style scoped>
/*--- 返回 ----*/
.goBack {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  width: 100px;
  height: 27px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 27px;
  text-align: center;
  color: rgba(189, 162, 141, 1);
  margin-left: 8px;
}

.goBack:hover {
  cursor: pointer;
}

/*---- 地址和密码 -----*/
input {
  width: 308px !important;
  height: 59px;
  padding-left: 14px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  border: 1.5px solid rgba(66, 66, 66, 1);
  outline: none;
  font-size: 16px;
  color: #8F8F93;
  font-family: avalonregular, poppins, helvetica, sans-serif;
}


.emailAddress {
  margin-top: 16px;
}

.isEmail {
  border: 1.5px solid rgba(189, 162, 141, 1);
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
  font-size: 16px;
  z-index: 100;
  line-height: 16px;
}

.isNotEmail {
  border: 1.5px solid rgba(252, 108, 80, 1);
  color: rgba(252, 108, 80, 1);
}

.emailWarpper {
  /*transform: translateY(32px);*/
}

.emailWarpperAfter {
  content: "format error";
  height: 20px;
  color: rgba(252, 108, 80, 0);
  align-self: flex-start;
  font-size: 14px;
  margin-left: 14px;
  margin-top: 10px;
  font-weight: 400;
}


/*---------- 注释 --------------*/
.notic {
  margin-top: 15px;
  width: 317px;
  height: 16px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
  border-image: linear-gradient(180deg, rgba(189, 162, 141, 1), rgba(166, 135, 126, 1)) 1 1;
}

.Continue {
  margin-top: 40px;
  align-self: center;
  /*margin-bottom: 121px;*/
}

.theText {
  align-self: center;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  width: 83px;
  height: 18px;
  font-size: 18px;
  font-weight: 400;
  color: #000000;
  line-height: 18px;
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

.disableButton {
  background-color: rgba(189, 162, 141, .5);
}

/*.disableButton:hover {*/
/*  cursor: not-allowed;*/
/*}*/

/*--- 返回 ----*/


.goBackWarpper:hover {
  cursor: pointer;
}

.goBack {
  align-self: center;
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
  margin-left: 8px;

}

.eshow {
  color: rgba(252, 108, 80, 1) !important;
}

.ehide {
  color: rgba(0, 0, 0, 0) !important;
}

.array {
  width: 14px;
  height: 27px;
  padding-top: 10px;
  margin-left: 14px;
  align-self: center;
  line-height: normal;
}

.arrayWarpper {
}

.haveAccount {
  font-size: 14px;
  font-weight: 400;
  color: #D4D4D4;
}

.login {
  margin-left: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #BDA28D;
}

.login:hover {
  cursor: pointer;
}

.rowWarpper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arrayGoBack {
  display: flex;
  align-items: center;
}

.haveAccountLogin {
  display: flex;
  align-items: center;
}
</style>
