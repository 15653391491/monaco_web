<template>
  <div class="warpper">
    <span class="title fontStyle1">{{ strLimit(title, 24) }}</span>
    <span class="subTitle fontStyle2" v-show="needSubTitle">{{ subTitle }}</span>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    needSubTitle: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Home'
    },
    subTitle: {
      type: String,
      default: '10 posts'
    }
  },
  methods: {

    /**
     * 限制字符串长度
     * @param str
     * @param limit 字符串长
     * @returns {*}
     */
    strLimit(str, limit) {
      return str.length > limit ? str.slice(0, limit - 1) + '...' : str
    },
  }
}
</script>

<style scoped>
.warpper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

/*---------- 字体 -------------*/
.fontStyle1 {
  font-size: 20px;
  font-weight: 500;
  color: #BDA28D;
  line-height: 30px;
  align-self: flex-start;
}

.fontStyle2 {
  font-size: 16px;
  font-weight: 500;
  color: #898989;
  line-height: 25px;
}

/*---------- 位置 -------------*/
span:nth-child(1) {
  margin-left: 8px;
}

.title {
  height: 28px;
}

.subTitle {
  /*position: absolute;*/
  /*left: 545px;*/
  /*top: 5px;*/
  /*width: 100px;*/
  height: 23px;
}
</style>
