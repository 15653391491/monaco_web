<template>
  <div>
    <head-part
        :flush="headPartFlush"
        @getdetail="getdetail"
        :userid="userid"
        :is-others="true"
        :need-meng-ban="false"
        class="headpart"/>

    <!--  选项卡  -->
    <form class="tabWarpper">
      <label for="nav1" class="tab1">
        <input
            type="radio"
            id="nav1"
            name="tab"
            value="otherPosts"
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
            value="otherNFTS"
            v-model="TabValue"
        />
        <span class="fontStyle3">
          NFTS
        </span>
      </label>
    </form>

    <!-- 消息区 -->
    <router-view @flush="flush" class="messageWarpper"></router-view>
  </div>
</template>

<script>
// ---------------- 自定义组件 -----------------
// import Message from "../../../../utils/components/Message"
import headPart from './headPart'
// ------------------ 图标 -------------------
// import BackGround from "../../../../utils/Icon/profile/BackGround";
// import BackGroundImgG from "../../../../utils/Icon/profile/BackGroundImg";

export default {
  name: 'Middle',
  components: {
    headPart,
  },
  data() {
    return {
      TabValue: 'otherPosts',
      userid: 1,
      headPartFlush: false
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
    flush() {
      this.headPartFlush = !this.headPartFlush
    }
  },
  watch: {
    TabValue: function (val) {
      this.$router.push({name: val})
    }
  },
  mounted() {
    this.userid = this.$route.query.userid
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped>
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
}

label {
  margin: 0;
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
  /*margin-right: 100px;*/
  display: none;
}

input ~ span {
  width: 84px;

  padding-bottom: 10px;
  display: block;
  text-align: center;
  color: #ffffff;
  border-bottom: 2px solid transparent;
}

input:checked ~ span {
  border-bottom-color: #BDA28D;
  color: #BDA28D;
}

.tabWarpper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  margin-top: 31px;
}

/*-------------- message -----------------*/
.messageWarpper {
  margin-top: 12px;
}
</style>
