<template>
  <div style="width: 614px">

    <Top @getTopicArtical="getTopicArtical" class="top"/>

    <div class="messageCon">
      <Message
          :info="info"
          :userid="info.uid"
          @flush="flush"
          :like-status="info.like_status"
          :message-id="info.id"
          :key="index"
          v-for="(info,index) in artical"
          class="message"
          :like-artical="info.like_num"
          :comment-artical="info.copy_num"
          :share-artical="info.share_num"
          share-num="48"
          :is-v="true"
          :need-picture="handsPicture(info.image_url)"
      >
<!--        <img-self slot="profile" :src="info.head" alt=""/>-->
        <!--        <img @error="imgError" slot="profile" :src="info.head" alt=""/>-->
        <span slot="name">{{ info.username }}</span>
        <span slot="time">{{ info.create_time }}</span>
        <!--   文章   -->
        <span slot="artical" v-html="info.content">
       {{ info.content }}
        <a>@AliansiSeniNFT #NFTCommunity</a>
      </span>
        <img slot="picture" :src="info.image_url[0]" alt="图"/>
      </Message>
    </div>

  </div>
</template>

<script>
// ---------------- 自定义组件 -----------------
import Top from './Top'
import Message from '@/utils/components/Message'
import {allArticleList, articleList} from '@/api/monico/home'
// import qs from "qs"
// import imgSelf from "@/components/utils/imgSelf";

export default {
  name: 'Middle',
  components: {
    Top,
    Message,
    // imgSelf
  },
  data() {
    return {
      artical: [
        {}
      ]
    }
  },
  methods: {
    /**
     * 刷新页面
     */
    flush() {
      const pd = {
        page: 1,
        limit: 10
      }
      this.allArticleList(pd)
    },
    /**
     * 是否有图片
     * @param img
     * @returns {boolean}
     */
    handsPicture(img) {
      if (typeof (img) === Array) {
        return img.length !== 0
      } else {
        return false
      }
    },
    /**
     *
     * @param topicInfo
     */
    getTopicArtical(topicInfo) {
      this.$router.push({name: 'topicDetail', query: {topicInfo: this.$qs.stringify(topicInfo)}})
    },
    /**
     *
     * @param item
     */
    imgError(item) {
      item.src = require('../../../../assets/page/profile/Head.png')
      item.onerror = null
    },
    // ------------------ axios ------------------------
    /**
     * 话题文章
     * @param pd
     */
    articleList(pd) {
      articleList(pd)
          .then(res => {
            this.artical = res.data.data.list
          })
    },
    /**
     * 所有文章列表
     * @param pd
     */
    allArticleList(pd) {
      allArticleList(pd)
          .then(res => {
            this.artical = res.data.data.list
          })
    },

  },
  mounted() {
    const pd = {
      page: 1,
      limit: 10
    }
    this.allArticleList(pd)
  }
}
</script>

<style scoped>

/*-------------- message -----------------*/
.message {
  margin-top: 14px;
}

.messageCon {
  margin-top: 28px;
}
</style>
