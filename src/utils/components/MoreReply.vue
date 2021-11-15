<template>
  <div>
    <span class="fontStyle">Other&nbsp;</span>
    <span class="fontStyle fontYellow">{{ num }}&nbsp;</span>
    <span class="fontStyle">{{ type }}</span>
    <span class="fontWite"> <i :class="direction"></i></span>
  </div>
</template>

<script>
export default {
  name: 'MoreReply',
  data() {
    return {
      Num: this.num,
    }
  },
  props: {
    num: {
      type: Intl,
      default: 10
    },
    type: {
      type: String,
      default: 'Replies'
    },
    direction: {
      type: String,
      default: 'el-icon-arrow-down'
    }
  }
}
</script>

<style scoped>
.fontStyle {
  width: 135px;
  height: 16px;
  font-size: 13px;
  color: #C4C4C4;
  font-family: avalonregular, poppins, helvetica, sans-serif;
}

.fontYellow {
  color: #BDA28D !important;
}

.fontWite {
  color: #C4C4C4;
}
</style>
