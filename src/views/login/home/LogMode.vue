<template>
  <div class="colWarpper">
    <button class="walletLogin" @click="loginWithWallet">
      <div class="icon rowWarpper">
        <wallet style="align-self: center"/>
      </div>
      <span class="font-button-black">Login with Wallet</span>
    </button>

    <button class="emailLogin" @click="loginWithEmail">
      <div class="icon rowWarpper">
        <Email style="align-self: center"/>
      </div>
      <span class="font-button-gold">Login with Email</span>
    </button>

    <div class="skip">
      <span @click="goHome" class="font-skip">
        Skip for now
      </span>
      <img class="rightArray" src="../../../../src/assets/static/png/rightArray.png" alt="右箭头"/>
    </div>
  </div>
</template>

<script>
import '@/styles/login/login.css'
import wallet from '@/utils/Icon/login/wallet'
import Email from '@/utils/Icon/login/Email'

export default {
  name: 'LogMode',
  components: {
    wallet, Email
  },
  methods: {
    /**
     * 钱包登录
     */
    loginWithWallet() {
      this.$router.push({name: 'wallet'})
    },
    /**
     * 邮箱登录
     */
    loginWithEmail() {
      this.$router.push({name: 'email', query: {type: 'register'}})
    },
    goHome() {
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style scoped>

.walletLogin {
  width: 327px;
  height: 56px;
  outline: none;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  background-color: rgba(189, 162, 141, 0.8);
  border-radius: 4px;
  transition: background-color .5s;
}

.walletLogin > span {
  margin-left: 12px;
}

.walletLogin:hover {
  background-color: rgba(189, 162, 141, 1);
}

.walletLogin > span {
  color: rgba(0, 0, 0, 1);
}

.icon {
  width: 98px;
  height: 24px;
  justify-content: flex-end;
}


.emailLogin {
  padding: 0;
  margin-top: 31px;
  width: 329px !important;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border: 1.5px solid rgba(189, 162, 141, 0.5);
  transition: border .5s;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 4px;
}

.emailLogin > span {
  margin-left: 12px;
}

.emailLogin:hover {
  border: 1.5px solid rgba(189, 162, 141, 1);
}

.notes {
  margin-top: 10px;
  width: 317px;
  height: 16px;

  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
}

.skip {
  align-self: center;
  margin-top: 70px;
  /*width: 152px;*/
  height: 27px;
  text-align: center;
  color: #FFFFFF;
}

.skip:hover {
  cursor: pointer;
}

.rightArray {
  width: 14px;
  height: 8px;
  align-self: center;
}
</style>
