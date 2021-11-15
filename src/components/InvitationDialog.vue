<template>
  <el-dialog
      custom-class="monaco-dialog"
      width="614px"
      append-to-body
      :show-close="false"
      :visible="visible"
      :before-close="() => $emit('skip')"
  >
    <div slot="title" class="header">
      <button type="button" class="close-button" @click="$emit('skip')"/>
      <div class="title">
        Invite
      </div>
      <button type="button" class="save-button" @click="confirm">
        Confirm
      </button>
    </div>
    <div class="form">
      <div class="desc">
        Hey, we’re still in private beta, you have to hold yacht NFT or join with an invite from an existing user!
      </div>
      <label class="input-control">
        <div class="label">
          Invitation Code
        </div>
        <el-input v-model="invitationCode" />
      </label>
      <div class="input-error">
        {{ invitationCodeError }}
      </diV>
      <div class="skip-action" @click="$emit('skip')">
        Enter without invitation code →
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { submitInviteCode } from '@/api/user'

export default {
  components: {

  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      invitationCode: '',
      invitationCodeError: '',
    }
  },
  methods: {
    submitInvitationCode() {
      return submitInviteCode(this.invitationCode).then(({
        code,
        msg,
      }) => {
        return new Promise((resolve, reject) => {
          // error
          if (code === 0) {
            reject(new Error(msg))
          } else {
            resolve()
          }
        })
      })
    },

    confirm() {
      this.submitInvitationCode().then(() => {
        this.$emit('confirm')
      }).catch((err) => {
        this.invitationCodeError = err.message
      })
    },
  },
}
</script>

<style lang="less">
.monaco-dialog {
  border: 6px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-sizing: content-box;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.8);
  background: #161616;

  .el-dialog__header {
    padding: 12px 14px;
  }

  .el-dialog__body {
    padding: 0;
  }

  .el-radio__inner {
    border: 3px solid #BDA28D !important;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    background: transparent !important;

    &::after {
      width: 10px;
      height: 10px;
      background: #BDA28D;
    }
  }

  .el-radio__label {
    font-size: 14px;
    color: white !important;
  }

  .el-input__inner, .el-textarea__inner {
    margin: 0 !important;
    padding: 10px 14px !important;
    border: none !important;
    outline: none;
    background: transparent !important;
    font-size: 14px;
    color: #898989 !important;

    &::placeholder {
      color: #898989 !important;
    }
  }

  .el-switch.is-checked {
    .el-switch__core {
      background: #716052;

      &::after {
        margin-left: -20px;
        background: #BDA28D;
      }
    }
  }

  .el-switch__core {
    border: none;
    height: 11px;
    background: #3F3E3E;

    &::after {
      border: 3px solid #191919;
      box-sizing: content-box;
      width: 14px;
      height: 14px;
      left: 0;
      top: -4px;
      background: #646464;
    }
  }

  .el-upload {
    display: block;
  }
}

.monaco-suggestion {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.8);
  background: #161616;

  li:hover {
    background: transparent !important;
  }

  .popper__arrow {
    display: none;
  }
}
</style>

<style lang="less" scoped>
.monaco-dialog {
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .close-button {
      border: none;
      outline: none;
      width: 16px;
      height: 16px;
      background: url(../assets/icons/dialog/close.png) center/contain no-repeat;
    }

    .title {
      margin-left: 20px;
      position: relative;
      flex: 1;
      font-size: 18px;
      font-weight: 500;
      color: #FFFFFF;

      .desc {
        position: absolute;
        left: 0;
        bottom: -12px;
        font-size: 12px;
        color: #898989;
      }
    }

    .save-button {
      padding: 5px 14px 4px 15px;
      border: none;
      outline: none;
      border-radius: 16px;
      background: #BDA28D;
      font-size: 16px;
      font-weight: 500;
      color: #161616;
      opacity: 0.7;
    }

    .save-button:hover {
      cursor: pointer;
    }
  }

  .form {
    padding: 25px 20px;
    position: relative;

    .desc {
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      color: #898989;
    }

    .input-control {
      margin-top: 14px;
      border: 2px solid #313131;
      border-radius: 4px;
      display: block;
      background: #1A1A1A;
      transition: all 0.3s;

      &:hover {
        border-color: #BDA28D;
      }

      &.error {
        border-color: #FC6C50;
      }

      .label {
        padding: 10px 14px 0;
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
        color: #BDA28D;
      }
    }

    .input-error {
      margin: 8px 16px 0;
      height: 15px;
      line-height: 15px;
      font-size: 12px;
      color: #FC6C50;
    }

    .skip-action {
      margin: 30px 0 0;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      text-shadow: 0px 6px 11px #000000;
      line-height: 27px;
      color: #FFFFFF;
      cursor: pointer;
    }
  }
}
</style>
