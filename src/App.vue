<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html{
  font-family: 'Poppins', sans-serif;
  font-size: 16px !important;
}
</style>
