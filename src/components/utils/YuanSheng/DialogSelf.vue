<template>
  <el-dialog
      :show-close="false"
      :visible="visiable"
      :modal="needModel"
      :modal-append-to-body="false"
      :fullscreen="false"
      class="con-dialog"
      :center="true"
      :width="width"
      :top="top"
      :destroy-on-close="destroyOnClose"
      :before-close="closeDialog"
      :custom-class="customClass"
  >
    <div class="rowWarpper headPart">
      <div class="rowWarpper">
        <div @click="closeDialog">
          <CloseIcon class="closeIcon"/>
        </div>
        <span class="Title">
        {{ title }}
      </span>
      </div>
      <div class="headerButton">
        <slot name="headButton">
        </slot>
      </div>
    </div>
    <slot></slot>
  </el-dialog>
</template>

<script>
import CloseIcon from '../../../utils/Icon/profile/CloseIcon'

export default {
  components: {CloseIcon},
  props: {
    visiable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '对话框'
    },
    width: {
      type: String,
      default: '95%'
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: '20vh'
    },
    customClass: {
      type: String,
      default: 'dialogStyle'
    },
    needModel: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    closeDialog: function () {
      this.$emit('close')
    },
  },
}
</script>
<style>
.el-dialog__header {
  padding: 0;
}
</style>
<style scoped>
.headPart {
  justify-content: space-between;
}

.dialogStyle {
  height: 359px;
  background: #161616;
  box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  border: 6px solid rgba(255, 255, 255, 0.1);
}

.v-modal {
  opacity: 1 !important;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.closeIcon {
  height: 16px;
  width: 16px;
  margin: 18px 0 0 14px;
}

.closeIcon:hover {
  cursor: pointer
}

.Title {
  width: 167px;
  height: 25px;
  margin: 13px 0 0 20px;

  font-size: 18px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 27px;
}

.headerButton {
  margin: 12px 20px 0 0;
}
</style>
