<template>
  <el-row>
    <!--  Settings  -->
    <Settings class="settings"/>
  </el-row>
</template>

<script>
// ---------------- 自定义组件 -----------------
import Settings from './Settings'
// ------------------ 图标 -------------------

export default {
  name: 'Middle',
  components: {Settings},
  data() {
    return {
      TabValue: 'posts'
    }
  },
  watch: {
    TabValue: function (val) {
      this.$router.push({name: val})
    }
  }
}
</script>

<style scoped>
input {
  display: none;
}

input:checked ~ div {
  width: 100px;
  border-bottom: 2px solid #BDA28D;
  color: #BDA28D;
}

.settings {
}
</style>
