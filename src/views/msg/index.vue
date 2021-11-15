<template>
  <Background>
    <MenuPart slot="left"/>
    <div slot="middle">
      <SideMenu/>
    </div>
    <Box slot="right"/>
  </Background>
</template>

<script>
import Background from '../../utils/components/msg/background'
import MenuPart from '../index/Menu/MenuBak'
import SideMenu from './components/sideMenu.vue'
import Box from './components/box.vue'

export default {
  name: 'msg',
  components: {
    Background,
    MenuPart,
    SideMenu,
    Box,
  },
}
</script>
