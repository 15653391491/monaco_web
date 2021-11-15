<template>
  <MessageMe v-if="isMe" :message="message"/>
  <MessageHe v-else :avatar="avatar" :message="message"/>
</template>

<script>
import MessageMe from './messageMe.vue'
import MessageHe from './messageHe.vue'
export default {
  components: {
    MessageMe,
    MessageHe,
  },
  props: {
    avatar: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    isMe: {
      type: Boolean,
      default: true,
    },
  },
}
</script>