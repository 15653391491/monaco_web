<template>
  <div>
    <div class="post">
      <span class="backIcon">{{ back }}</span>
      <span class="postFont fontStyle1">Post</span>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {
      back: '<',
    }
  },
}
</script>

<style scoped>
.fontStyle1 {
  font-size: 16px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  color: #ffffff;
  line-height: 16px;
}
.post {
  position: absolute;
  height: 43px;
  width: 614px;

  background-color: rgba(31, 31, 31, 1);
  border-bottom: 1px solid rgba(44, 44, 44, 1);
}

.backIcon {
  position: absolute;
  left: 16px;
  top: 0.8vw;
  width: 8px;
  height: 0.92vw;

  color: rgba(255, 255, 255, 1);
}
.postFont {
  position: absolute;
  left: 3.06vw;
  top: 0.97vw;
  width: 35px;
  height: 16px;
}
</style>
