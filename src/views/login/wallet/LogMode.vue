<template>
  <div class="s-container">
    <invitation-dialog :visible="showInvitationDialog" @confirm="confirmInvitationCode" @skip="skipInvitation" />

    <div @click="goback" class="back">← Go back</div>

    <div
      @click="metamaskLogin()"
      class="wallet-btn"
      :class="{ spinner: metamaskLoading }"
    >
      <MateMaskIcon class="icon" />
      <div class="name">MetaMask</div>
    </div>

    <div class="wallet-btn disabled">
      <img class="icon" src="@/assets/page/login/TWT.png" alt="" />
      <span class="name">Trust Wallet</span>
      <span class="info">Coming soon</span>
    </div>

    <div class="wallet-btn disabled">
      <img class="icon" src="@/assets/page/login/rainbow.png" alt="" />
      <span class="name">Rainbow</span>
      <span class="info">Coming soon</span>
    </div>

    <div class="more">*** More coming soon ***</div>
  </div>
</template>

<script>
import MateMaskIcon from '@/utils/Icon/login/MateMask'
import * as metamaskUtils from '@/utils/metamask.js'
import * as walletAPI from '@/api/wallet.js'
import * as tokenTools from '@/utils/tokenTools.js'
import {message as $message} from 'element-ui'
import InvitationDialog from '@/components/InvitationDialog.vue'

export default {
  name: 'LogMode',
  components: {
    MateMaskIcon,
    InvitationDialog,
  },

  data() {
    return {
      metamaskLoading: false,
      showInvitationDialog: false,
    }
  },

  beforeCreate() {
    if (tokenTools.getToken()) {
      this.$router.push({ name: 'home' })
    }
  },

  async mounted() {
    metamaskUtils.getAccount()
  },

  methods: {
    goback() {
      this.$router.push({ name: 'login' })
    },

    async metamaskLogin() {
      if (!metamaskUtils.isInstalled()) {
        return metamaskUtils.startOnboarding()
      }

      if (!(await metamaskUtils.checkChainId())) {
        return
      }

      this.metamaskLoading = true
      const $connectMessage = $message({
        message: 'connecting to your metamask wallet ...',
        duration: 0,
      })
      const addressList = await metamaskUtils.connect()
      if (addressList.length > 0) {
        $connectMessage.close()
        const address = addressList[0]
        tokenTools.setWalletAddress(address)
        const $signMessage = $message({
          message: 'Signing a message to verify you ...',
          duration: 0,
        })
        try {
          const message = await walletAPI.getWalletMessage(address)
          const signedMessage = await metamaskUtils.personalSign(message)

          $signMessage.close()

          if (!signedMessage) {
            this.metamaskLoading = false
            $message({
              message: "There's something wrong when verifying",
              type: 'warning',
            })
            return
          }
          const { token, uid, has_monaco_nft } = await walletAPI.signature(
            address,
            signedMessage
          )
          $message({
            message: 'login successfully',
            type: 'success',
          })
          tokenTools.setUid(uid)
          tokenTools.setToken(token)
          this.metamaskLoading = false

          if (has_monaco_nft) {
            this.$router.push({ name: 'home' })
          } else {
            this.showInvitationDialog = true
          }
        } catch (err) {
          console.log(err)
        }
      }
    },

    confirmInvitationCode() {
      this.showInvitationDialog = false
      this.$router.push({ name: 'home' })
    },

    skipInvitation() {
      this.showInvitationDialog = false
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style lang="less" scoped>
.s-container {
  position: relative;
  width: 327px;
  .back {
    font-size: 16px;
    color: #ffffff;
    line-height: 27px;
    text-shadow: 0px 6px 11px #000000;
    cursor: pointer;
  }

  .wallet-btn {
    position: relative;
    margin-top: 16px;
    padding: 0 26px 0 20px;
    display: flex;
    align-items: center;
    height: 56px;
    background: #181818;
    border: 1px solid;
    cursor: pointer;
    border-image: linear-gradient(
        180deg,
        rgba(189, 162, 141, 1),
        rgba(166, 135, 126, 1)
      )
      1 1;
    font-size: 18px;
    color: #bda28d;

    &:hover {
      background: #181818b9;
      color: #d5bdaa;
    }

    .icon {
      width: 24px;
      height: 24px;
      display: block;
      margin-right: 20px;
    }

    .name {
      flex-grow: 1;
    }

    .info {
      font-size: 16px;
    }

    &.disabled {
      border-image: linear-gradient(
          180deg,
          rgba(189, 162, 141, 1),
          rgba(166, 135, 126, 1)
        )
        1 1;
      color: #bda28d;
      opacity: 0.4;
    }
  }

  .more {
    font-size: 16px;
    color: #5b5048;
    line-height: 18px;
    margin-top: 25px;
    text-align: center;
  }
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner::after {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-bottom: 2px solid #181818;
  animation: spinner 2s linear infinite;
  will-change: true;
}
</style>
