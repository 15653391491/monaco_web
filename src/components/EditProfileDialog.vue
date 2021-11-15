<template>
  <el-dialog
      custom-class="monaco-dialog"
      width="614px"
      :show-close="false"
      :visible="visible"
      :before-close="() => $emit('update:visible', false)"
  >
    <div slot="title" class="header">
      <button type="button" class="close-button" @click="$emit('update:visible', false)"/>
      <div class="title">
        My profile
      </div>
      <button @click="update" type="button" class="save-button">
        Save
      </button>
    </div>
    <div class="container">
      <div class="bg" :style="{
        backgroundImage: `url(${bgUrl})`,
      }">
        <div class="add-bg-button" @click="addingImage = 'bg'"/>
      </div>
      <div class="form">
        <div class="avatar" :style="{
          backgroundImage: `url(${avatarUrl})`,
        }">
          <div class="add-avatar-button" @click="addingImage = 'avatar'"/>
        </div>
        <el-dialog
            custom-class="monaco-dialog"
            width="400px"
            append-to-body
            :show-close="false"
            :visible="!!addingImage"
            :before-close="() => addingImage = ''"
        >
          <div slot="title" class="header">
            <button type="button" class="close-button" @click="addingImage = ''"/>
            <div class="title">
              Select picture
              <div class="desc">
                Pick where you want to upload your picture from
              </div>
            </div>
          </div>
          <div>
            <el-upload
              class="button-control"
              action="#"
              accept="image/*"
              :show-file-list="false"
              :before-upload="uploadPhoto"
            >
              <button type="button" class="button">
                Select from photos
              </button>
            </el-upload>
            <div class="button-control">
              <button type="button" class="button" @click="selectingFromNft = true">
                Select from NFT
              </button>
            </div>
          </div>
        </el-dialog>
        <el-dialog
            custom-class="monaco-dialog"
            width="614px"
            append-to-body
            :show-close="false"
            :visible="selectingFromNft"
            :before-close="() => selectingFromNft = false"
        >
          <div slot="title" class="header">
            <button type="button" class="close-button" @click="selectingFromNft = false"/>
            <div class="title">
              Select from NFT
            </div>
            <button type="button" class="save-button" @click="confirmNftPhoto">
              Confirm
            </button>
          </div>
          <div class="nft-items">
            <div v-for="item in nftItems" :key="item.imageUrl" class="nft-item" :class="{
              dimmed: selectedNftItem && selectedNftItem.imageUrl !== item.imageUrl,
            }" @click="() => selectedNftItem = item">
              <img class="nft-image" :src="item.imageUrl" alt=""/>
              <div class="nft-name">
                {{ item.name }}
              </div>
            </div>
          </div>
        </el-dialog>
        <div class="gender">
          <el-radio-group v-model="gender">
            <el-radio label="male"><span class="icon __male"/> Male</el-radio>
            <el-radio label="female"><span class="icon __female"/> Female</el-radio>
          </el-radio-group>
        </div>
        <label class="input-control">
          <div class="label">
            Name
          </div>
          <el-autocomplete popper-class="monaco-suggestion" placeholder="edit or select from ENS" v-model="name"/>
        </label>
        <label class="input-control">
          <div class="label">
            User ID
          </div>
          <el-input placeholder="@" v-model="userId"/>
        </label>
        <div class="input-control">
          <div class="label">
            Bio
          </div>
          <el-input type="textarea" rows="5" resize="none" show-word-limit placeholder="..." v-model="bio"/>
        </div>
        <label class="input-control">
          <div class="label">
            Website
          </div>
          <el-input placeholder="" v-model="website"/>
        </label>
        <div class="switch-control">
          <div class="label">
            Show NFT
          </div>
          <el-switch :width="38" v-model="showNft"/>
        </div>
        <div class="switch-control">
          <div class="label">
            Show cryptocurrency
          </div>
          <el-switch :width="38" v-model="showCryptocurrency"/>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import * as firebase from '@/api/firebase'
import { updateDetail } from '@/api/monico/profile'
import { getNft } from '@/api/wallet'

export default {
  components: {},
  props: {
    userInfo: {
      type: Object,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible(newVal) {
      if (newVal && this.userInfo) {
        this.bgUrl = this.userInfo.bg_image
        this.avatarUrl = this.userInfo.head
        this.gender = this.userInfo.gender === 1 ? 'male' : 'female'
        this.name = this.userInfo.username
        this.userId = String(this.userInfo.uid)
        this.bio = this.userInfo.bio
        this.showNft = this.userInfo.show_nft === 2
        this.showCrypto = this.userInfo.show_crypto === 2

        this.loadNft()
      }
    },
  },
  data() {
    return {
      bgUrl: '',
      avatarUrl: '',
      gender: 'male',
      name: '',
      userId: '',
      bio: '',
      website: '',
      showNft: false,
      showCryptocurrency: false,

      addingImage: '',
      selectingFromNft: false,

      nftItems: [],

      selectedNftItem: {},
    }
  },
  methods: {
    uploadPhoto(file) {
      this.uploadFile(file).then((url) => {
        if (this.addingImage === 'bg') {
          this.bgUrl = url
          this.addingImage = ''
        } else if (this.addingImage === 'avatar') {
          this.avatarUrl = url
          this.addingImage = ''
        } else {
          new Error('operation unknown')
        }
      })

      return false
    },

    confirmNftPhoto() {
        if (this.addingImage === 'bg') {
          this.bgUrl = this.selectedNftItem.imageUrl
          this.selectingFromNft = false
          this.addingImage = ''
        } else if (this.addingImage === 'avatar') {
          this.avatarUrl = this.selectedNftItem.imageUrl
          this.selectingFromNft = false
          this.addingImage = ''
        } else {
          new Error('operation unknown')
        }
    },

    loadNft() {
      getNft().then((data) => {
        this.nftItems = data.map((item) => ({
          imageUrl: item.nft_list[0].image,
          name: item.nft_platform_name,
        }))
      })
    },

    uploadFile(file) {
      return new Promise((resolve, reject) => {
        firebase.uploadImage(
          file,
          () => {},
          resolve,
          reject,
        )
      })
    },

    update() {
      let pd = {
        bg_image: this.bgUrl,
        head: this.avatarUrl,
        username: this.name,
        user_number: this.userId,
        bio: this.bio,
        gender: this.gender === 'male' ? 1 : 2,
        show_nft: this.showNft ? 2 : 1,
        show_crypto: this.showCryptocurrency ? 1 : 2
      }
      this.updateDetail(pd)
    },
    // ----------------------- axios --------------------------
    /**
     * 修改个人信息
     * @param pd
     */
    updateDetail(pd) {
      updateDetail(this.$qs.stringify(pd))
          .then(res => {
            console.log(res.data.data)
            this.$emit('editSuccess')
          })
    }
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

  .container {
    height: 558px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .bg {
    width: 614px;
    height: 177px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(../assets/images/dialog/profile_bg.png) center/cover no-repeat;

    .add-bg-button {
      width: 30px;
      height: 30px;
      background: url(../assets/icons/dialog/add_bg.png) center/contain no-repeat;
    }
  }

  .form {
    padding: 25px 20px;
    position: relative;

    .avatar {
      border: 4px solid #191919;
      border-radius: 72px;
      box-sizing: content-box;
      width: 136px;
      height: 136px;
      position: absolute;
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #393939 center/cover no-repeat;
      transform: translateY(-25px) translateY(-50%);

      .add-avatar-button {
        width: 18px;
        height: 18px;
        background: url(../assets/icons/dialog/add_avatar.png) center/contain no-repeat;
      }
    }

    .gender {
      margin: 10px 0 30px;
      display: flex;
      justify-content: flex-end;

      .icon {
        margin-bottom: 2px;
        width: 18px;
        height: 18px;
        display: inline-block;
        vertical-align: middle;

        &.__male {
          background: url(../assets/icons/dialog/male.png) center/contain no-repeat;
        }

        &.__female {
          background: url(../assets/icons/dialog/female.png) center/contain no-repeat;
        }
      }
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

      .label {
        padding: 10px 14px 0;
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
        color: #BDA28D;
      }
    }

    .switch-control {
      margin-top: 14px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      background: #1A1A1A;

      .label {
        padding: 10px 14px;
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
        color: #BDA28D;
      }
    }
  }

  .button-control {
    margin: 40px;

    .button {
      margin: auto;
      border: none;
      border-radius: 33px;
      outline: none;
      width: 250px;
      height: 40px;
      display: block;
      background: #BDA28D;
      font-size: 16px;
      font-weight: 500;
      color: black;
    }
  }

  .nft-items {
    height: 558px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
    overflow-x: hidden;
    overflow-y: auto;

    .nft-item {
      margin-top: 10px;
      width: 188px;

      &.dimmed {
        opacity: 0.5;
      }

      .nft-image {
        border-radius: 4px;
        width: 188px;
        height: 188px;
        display: block;
      }

      .nft-name {
        margin-top: 4px;
        font-size: 14px;
        line-height: 20px;
        color: #FFFFFF;
      }
    }
  }
}
</style>
