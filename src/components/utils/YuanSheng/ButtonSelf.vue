<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonSelf'
}
</script>

<style scoped>
button {
  background-color: transparent;
  border: 1.5px solid rgba(189, 162, 141, 1);
  border-radius: 33px;
}
</style>
