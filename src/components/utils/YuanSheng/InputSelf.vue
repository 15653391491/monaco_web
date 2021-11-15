<template>
  <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :style="inputStyle"
  >
</template>

<script>
export default {
  name: 'Input',
  data() {
    return {
      inputStyle: {
        width: this.width,
        height: this.height,
        'padding-left': this.paddingLeft,
        'padding-top': this.paddingTop
      }
    }
  },
  props: {
    placeholder: {
      type: String,
      default: 'content'
    },
    width: {
      type: String,
      default: '469px'
    },
    height: {
      type: String,
      default: '34px'
    },
    paddingLeft: {
      type: String,
      default: '19px'
    },
    paddingTop: {
      type: String,
      default: '32px'
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style scoped>
input {
  width: 574px;
  height: 60px;
  padding-left: 14px;
  padding-top: 25px;
  BACKGROUND-COLOR: transparent;
  border: 1.5px solid rgba(49, 49, 49, 1);
  color: #C4C4C4;
}

input:focus {
  outline: none;
}

input::-webkit-input-placeholder {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 400;
  color: #898989;
  line-height: 16px
}
</style>
