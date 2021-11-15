<template>
  <div class="warpper colWarpper">
    <div class="rowWarpper row1">

      <div @click="topicArtical(topic[0])" class="col1 colWarpper">
        <div class="col-title rowWarpper">
          <span class="font-title">Trending</span>
          <img class="col-img"
               src="../../../../assets/page/discover/top4.png" alt=""/>
        </div>
        <div class="col-contain">
          <span class="font-contain">#{{ topic[0].content }}</span>
        </div>
      </div>

      <div @click="topicArtical(topic[1])" class="col2 colWarpper">
        <div class="col-title rowWarpper">
          <span class="font-title">Trending</span>
          <img class="col-img"
               src="../../../../assets/page/discover/top3.png" alt=""/>
        </div>
        <div class="col-contain rowWarpper">
          <span class="font-contain">#{{ topic[1].content }}</span>
        </div>
      </div>

    </div>
    <div class="rowWarpper row2">

      <div @click="topicArtical(topic[2])" class="col3 colWarpper">
        <div class="col-title rowWarpper">
          <span class="font-title">Trending</span>
          <img class="col-img"
               src="../../../../assets/page/discover/top1.png" alt=""/>
        </div>
        <div class="col-contain">
          <span class="font-contain">#{{ topic[2].content }}</span>
        </div>
      </div>

      <div @click="topicArtical(topic[3])" class="col4 colWarpper">
        <div class="col-title rowWarpper">
          <span class="font-title">Trending</span>
          <img class="col-img"
               src="../../../../assets/page/discover/top2.png" alt=""/>
        </div>
        <div class="col-contain">
          <span class="font-contain">#{{ topic[3].content }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// --------------- 图标 ------------------
import {topicList} from '@/api/monico/home'

export default {
  name: 'Top',
  components: {
    // pageIcon, laughIcon,
    // // videoIcon,
    // // AiteIcon,
    // // DingWeiIcon,
    // TikTokIcon
  },
  data() {
    return {
      topic: [{id: 0, content: ''}, {id: 0, content: ''}, {id: 0, content: ''}, {id: 0, content: ''}]
    }
  },
  methods: {
    /**
     * 按话题进入详情
     * @param topicInfo
     */
    topicArtical(topicInfo) {
      this.$emit('getTopicArtical', topicInfo)
    },
    // --------------------- axios -----------------------
    /**
     * 获取话题
     */
    topicList() {
      const pd = {
        page: 1,
        limit: 10
      }
      topicList(pd)
          .then(res => {
            this.topic = res.data.data.list
          })
    },
  },
  mounted() {
    this.topicList()
  }
}
</script>

<style scoped>
/*字体*/
.font-title {
  width: 45px;
  height: 15px;
  font-size: 10px;
  color: rgba(34, 211, 171, 1);
  font-family: avalonregular, poppins, helvetica, sans-serif;
}

.font-contain {
  width: 303px;
  height: 15px;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  font-family: avalonregular, poppins, helvetica, sans-serif;
}

/**/
.col-title {

  width: 291px;
  margin-left: 12px;
  margin-top: 10px;
  justify-content: space-between !important;
}

.col-contain {
  margin-left: 12px;
  margin-top: 5px;
  width: 303px;
}

.col-img {
  width: 16px;
  height: 16px;
  margin-right: 15px;
  margin-top: 2px;
}

.warpper {
  width: 614px;
  height: 117px;

  /*background: #1F1F1F;*/
}

.rowWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
}

.colWarpper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}

.col1 {
  background-color: rgba(34, 211, 171, 0.2);
  width: 303px;
  height: 61px;
  border-radius: 4px;
}

.col2 {
  background-color: rgba(153, 142, 255, 0.3);
  margin-left: 8px;
  width: 303px;
  height: 61px;
  border-radius: 4px;
}

.col3 {
  background-color: rgba(83, 176, 219, 0.3);
  width: 303px;
  height: 61px;
  border-radius: 4px;
}

.col4 {
  background-color: rgba(245, 166, 35, 0.3);
  margin-left: 8px;
  width: 303px;
  height: 61px;
  border-radius: 4px;
}

.row2 {
  margin-top: 8px;
}

.title {
  position: absolute;
  width: 514px;
  height: 16px;
  left: 86px;
  top: 39px;

  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #636363;
  border-bottom: 1px solid rgba(46, 46, 46, 1);
  text-align: left;
  /*padding-bottom: 3.5vh;*/
}

.head {
  position: absolute;
  left: 22px;
  top: 20px;
  width: 40px;
  height: 40px;

  border-radius: 25px
}

/*------------ v-背景 -------------*/
.v-background {
  position: absolute;
  left: 49px;
  top: 55px;
}

/*----------- v ------------*/
.v-icon {
  position: absolute;
  left: 53px;
  top: 60px;
}

/*----------- 图标 ---------------*/
.icon1 {
  position: absolute;
  top: 80px;
  left: 88px;
}

.icon2 {
  position: absolute;
  top: 80px;
  left: 114px;
}


.tikTokIcon {
  position: absolute;
  top: 65px;
  left: 530px;
  height: 0;
  width: 0;
  border-color: rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
}
</style>
