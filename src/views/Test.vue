<template>
  <div class="bg">
    <CreatePost />
  </div>
</template>

<script>
import CreatePost from '@/components/common/CreatePost.vue'

export default {
  name: 'Test',
  components: {
    CreatePost,
  },
}
</script>

<style lang="less" scoped>
.bg {
  background: #000;
  height: 100vh;
  overflow: hidden;
}
</style>

