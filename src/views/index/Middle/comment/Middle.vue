<template>
  <div class="minPost">
    <Top />
  </div>
</template>

<script>
import Top from './Top'

export default {
  name: 'Middle',
  components: {
    Top,
  },
}
</script>

<style scoped>
.minPost {
  width: 614px;

  background-color: rgba(31, 31, 31, 1);
}
</style>
