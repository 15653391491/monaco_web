<template>
  <el-image :preview-src-list="[imgSrc]" :src="imgSrc" :alt="alt">
    <img :src="defaultImg" alt="" slot="error"/>
  </el-image>
</template>

<script>
export default {
  name: 'imgSelf',
  data() {
    return {
      imgSrc: '',
      defaultImg: require('../../assets/static/png/repost/pic1.png'),

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
      return require('../../assets/static/png/repost/pic1.png')
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

</style>
