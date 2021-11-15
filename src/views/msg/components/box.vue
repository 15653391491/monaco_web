<template>
  <div class="s-container">
    <div class="name">Tian</div>
    <div class="box">
        <Message
            v-for="(item, index) in messageList"
            :key="index"
            :avatar="item.avatar"
            :message="item.message"
            :isMe="item.isMe" />
    </div>
  </div>
</template>

<script>
import Message from './message.vue'
export default {
  components: {
    Message
  },
  data() {
    return {
      messageList: [
        {
          avatar: 1,
          isMe: false,
          message:
            'I commented on Figma, I want to add some fancy icons. Do you have any icon set?',
        },
        {
          isMe: true,
          message:
            'I am in a process of designing some. When do you need them?',
        },
        {
          avatar: 1,
          isMe: false,
          message: 'Next month?',
        },
        {
          isMe: true,
          message:
            'I am almost finish. Please give me your email, I will ZIP them and send you as son as im finish.',
        },
        {
          avatar: 1,
          isMe: false,
          message: 'maciej.kowalski@email.com',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.s-container {
  .name {
    padding: 20px;
    font-size: 24px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #bda28d;
  }
}
</style>