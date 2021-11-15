<template>
  <Background
      class="backgroundCon"
      :title="title"
      :sub-title="subTitle"
      :need-sub-title="needSubTitle">
    <MenuPart @pageChange="pageChange" slot="left"/>
    <router-view @pathChange="pathChange" slot="middle"></router-view>
    <Rank slot="right"></Rank>
  </Background>
</template>

<script>
import Background from './index/Components/Background'
import MenuPart from './index/Menu/MenuBak'
import Rank from './index/Rank/index'
// import {detail} from "@/api/monico/profile";

export default {
  name: 'index',
  components: {
    Background,
    Rank,
    MenuPart
  },
  data() {
    return {
      title: 'Home',
      subTitle: '',
      needSubTitle: false
    }
  },
  methods: {
    /**
     * 导航页面改变
     * @param val
     */
    pageChange(val) {
      switch (val.type) {
        case 'home':
          this.title = 'Home'
          this.subTitle = ''
          this.needSubTitle = false
          break
        case 'discover':
          this.title = 'Discover'
          this.subTitle = ''
          this.needSubTitle = false
          break
        case 'message':
          this.title = 'Bibooooo'
          this.subTitle = '129 posts'
          this.needSubTitle = true
          break
        case 'profile':
          this.title = 'Jon Snow'
          this.subTitle = '49 posts'
          this.needSubTitle = true
          break
        case 'settings':
          this.title = 'Settings'
          this.subTitle = ''
          this.needSubTitle = false
          break
        case 'code':
          this.title = 'Invitation Code'
          this.subTitle = ''
          this.needSubTitle = false
          break
        default:
          break
      }
    },
    /**
     * 路径改变
     * @param val
     */
    pathChange(val) {
      this.title = val.title
      this.subTitle = val.subTitle
      this.needSubTitle = val.needSubTitle
    }
    //  --------------------- axios ----------------------
    //   detail(pd){
    //     detail(this.$qs.stringify(pd))
    //     .then(res=>{
    //       // this.pro
    //     })
    //   }
  },
  mounted() {
  }
}
</script>
<style scoped>
.backgroundCon {
  /*transform: translateX(20vw);*/
  margin: 0 auto;
}
</style>
