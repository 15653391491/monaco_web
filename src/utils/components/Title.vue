<template>
<div class="title">{{ title }}</div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: 'Home'
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  width: 105px;
  height: 22px;
  left: 352px;
  top: 37px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 22px;
  text-align: center;
  color: #BDA28D;

}
</style>
