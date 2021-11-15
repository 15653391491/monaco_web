<template>
  <div style="width: 614px">
    <div class="topicDetailHeaderWrapper">
      <div class="topicWrapper">
        <span @click="gotoDiscover" class="s">&lt;</span>
        <span class="topic">{{ topic }}</span>
      </div>
      <div class="topicImgWrapper">
        <img src="../../../../../src/assets/static/png/topicDetailIcon.png" alt=""/>
      </div>
    </div>

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
        <img-self slot="profile" :src="info.head" alt=""/>
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
import Message from '@/utils/components/Message'
import {allArticleList, articleList} from '@/api/monico/home'
import qs from 'qs'
import imgSelf from '@/components/utils/imgSelf'

export default {
  name: 'Middle',
  components: {
    Message,
    imgSelf
  },
  data() {
    return {
      artical: [
        {}
      ],
      topic: ''
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
     * @param topicId
     */
    getTopicArtical(topicId) {
      const pd = {
        topic_id: topicId
      }
      let postData = qs.stringify(pd)
      this.articleList(postData)
    },
    /**
     *
     * @param item
     */
    imgError(item) {
      item.src = require('../../../../assets/page/profile/Head.png')
      item.onerror = null
    },
    /**
     * 回discover页
     */
    gotoDiscover() {
      this.$router.push({name: 'discover'})
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
    const info = this.$qs.parse(this.$route.query.topicInfo)
    // console.log(info.content)
    this.topic = info.content
    const pd = {
      topic_id: info.id,
      page: 1,
      limit: 10
    }
    this.articleList(pd)
  }
}
</script>

<style scoped>

/*-------------- message -----------------*/
.message {
  margin-top: 14px;
}

.messageCon {
}

.topicDetailHeaderWrapper {
  width: 614px;
  height: 36px;
  background: rgba(83, 176, 219, 0.3);
  border-radius: 4px;
}

.topicDetailHeaderWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topicWrapper {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.topicImgWrapper {
  display: flex;
  align-items: center;
}

.s {
  width: 8px;
  color: #FFFFFF;
}

.s:hover {
  cursor: pointer;
}

.topic {
  margin-left: 20px;
  height: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 16px;
}

.topicImgWrapper {
  margin-right: 14px;
}


</style>
