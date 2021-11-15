<template>
  <div class="s-container">
    <div class="avatar"></div>
    <div class="message-content">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default: '',
    },
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
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: url("~@/assets/page/chat/chat-avatar-1.png") center center
      no-repeat;
    background-size: contain;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    flex-shrink: 0;
    margin-right: 5px;
  }
  .message-content {
    font-size: 14px;
    line-height: 18px;
    font-weight: 300;
    color: white;
    padding: 10px 13px;
    background: #161616;
    border-radius: 5px 20px 20px 5px;
    max-width: 266px;
  }
}
</style>