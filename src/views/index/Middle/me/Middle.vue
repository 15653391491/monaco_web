<template>
  <div class="warpper">
    <head-part
        @getdetail="getdetail"
        :is-vip="false"
        class="headpart"/>
    <!--      <BackGround slot="background"/>-->

    <!--  选项卡  -->
    <form class="tabWarpper">
      <label for="nav1" class="tab1">
        <input
            type="radio"
            id="nav1"
            name="tab"
            value="posts"
            checked="checked"
            v-model="TabValue"
        />
        <span class="fontStyle3">
          Posts
        </span>
      </label>
      <label for="nav2" class="tab2">
        <input
            type="radio"
            id="nav2"
            name="tab"
            value="NFTS"
            v-model="TabValue"
        />
        <span class="fontStyle3">
          NFTS
        </span>
      </label>
    </form>

    <!-- 消息区 -->
    <router-view class="messageWarpper"></router-view>
  </div>
</template>

<script>
// ---------------- 自定义组件 -----------------
import headPart from './headPart'
// ------------------ 图标 -------------------
// import BackGround from "../../../../utils/Icon/profile/BackGround";

// ------------------------- axios -----------------------
import {detail} from '@/api/monico/profile'

export default {
  name: 'Middle',
  components: {
    headPart,
  },
  data() {
    return {
      TabValue: 'posts',
      info: {}
    }
  },
  watch: {
    TabValue: function (val) {
      this.$router.push({name: val})
    }
  },
  methods: {
    getdetail(val) {
      const pd = {
        title: val.username,
        subTitle: String(val.article_num) + ' posts',
        needSubTitle: true
      }
      this.$emit('pathChange', pd)
    },
    //  --------------------- axios ------------------------------
    detail(pd) {
      detail(pd)
          .then(res => {
            this.info = res.data.data
          })
    }
  }
}
</script>

<style scoped>
.warpper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}

.tabWarpper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  margin-top: 31px;
  height: 28px;
}

/*-------------- 字体 -------------*/

.fontStyle3 {
  font-size: 18px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  color: #898989;
  line-height: 18px;
}

/*----------------- 位置 ---------------*/
.headpart {
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 0;*/
}

.tab1 {
  margin-left: 100px;
  width: 100px;
  height: 18px;

}

.tab2 {
  margin-right: 100px;
  width: 100px;
  height: 18px;
}

input {
  display: none;
}

input ~ span {
  width: 84px;

  display: block;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 2px solid transparent;
  transition: border-bottom-color .5s;
}

input:checked ~ span {
  border-bottom-color: #BDA28D;
  text-align: center;
  color: #BDA28D;
}

.messageWarpper {
  margin-top: 2px;
}
</style>
