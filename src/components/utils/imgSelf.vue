<template>
  <img :src="imgSrc" :alt="alt" @error="errImg"/>
</template>

<script>
export default {
  name: 'imgSelf',
  data() {
    return {
      imgSrc: '',
      defaultImg: ''
    }
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: '图片'
    },
    defaultType: {
      type: Number,
      default: 1
    }
  },
  methods: {
    errImg() {
      this.imgSrc = require('@/assets/static/png/default/default.png')
    }
  },
  watch: {
    src(val) {
      this.imgSrc = val
    }
  },
  mounted() {
    this.imgSrc = this.src
  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>
