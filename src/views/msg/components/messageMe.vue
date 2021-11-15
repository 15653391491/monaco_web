<template>
  <div class="s-container">
    <div class="message-content">
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less" scoped>
.s-container {
  display: flex;
  padding-left: 20px;
  margin-top: 10px;
  justify-content: right;
  margin-right: 20px;
  .message-content {
    font-size: 14px;
    line-height: 18px;
    font-weight: 300;
    color: white;
    padding: 10px 13px;
    background: #272a35;
    border-radius: 20px 5px 5px 20px;
    max-width: 266px;
  }
}
</style>