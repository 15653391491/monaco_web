<template>
  <div class="wrapper">

    <CreatePost class="createPost"/>
    <!--  转发  -->
    <!--            <repost-->
    <!--                :like-status="0"-->
    <!--                :message-id="1"-->
    <!--                class="message"-->
    <!--                :like-artical="123456"-->
    <!--                :comment-artical="123456"-->
    <!--                :share-artical="123456"-->
    <!--                :share-num="123456"-->
    <!--                :is-v="true"-->
    <!--                :userid="1"-->
    <!--                :need-picture="false"-->
    <!--            >-->
    <!--        &lt;!&ndash;      <img-self :src="info.head" slot="profile"/>&ndash;&gt;-->
    <!--              <img slot="profile" src="../../../../assets/page/Avatar.png" alt=""/>-->
    <!--              <span slot="name">test name</span>-->
    <!--              <span slot="time">19:44 PM · Dec 04, 2021</span>-->
    <!--              &lt;!&ndash;   文章   &ndash;&gt;-->
    <!--              <span slot="artical" >-->
    <!--                ppppppp-->
    <!--                <a>@AliansiSeniNFT #NFTCommunity</a>-->
    <!--              </span>-->
    <!--        &lt;!&ndash;      <img slot="picture" :src="info.image_url[0]" alt="图"/>&ndash;&gt;-->
    <!--            </repost>-->

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
      <span slot="time">{{ info.create_time }}</span>
      <!--      <img slot="picture" :src="info.image_url[0]" alt="图"/>-->
    </Message>

  </div>
</template>

<script>
import CreatePost from '@/components/common/CreatePost.vue'
// import repost from "@/utils/components/repost";
import Message from '@/utils/components/Message'
import imgSelf from '@/components/utils/imgSelf'
// ---------------- axios ----------------------
import {
  getAllArticleList, firstArticleList,
  allArticleList, nextReview, getArticleTopic,
  likeReview
} from '@/api/monico/home'
// ------------------- storge ------------------------
import {EventBus, CREATE_POST_EVENT} from '@/utils/eventBus'

export default {
  name: 'Middle',
  components: {
    // repost,
    CreatePost,
    Message,
    imgSelf
  },
  data() {
    return {
      artical: [
        {}
      ],
    }
  },
  methods: {
    /**
     * 刷新页面
     */
    flush() {
      // location.reload();
      this.firstArticleList()
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
     * @param item
     */
    imgError(item) {
      item.src = require('../../../../assets/page/profile/Head.png')
      item.onerror = null
    },
    /**
     * 发布文章成功
     */
    createPostsSuccess() {
      this.firstArticleList()
    },
    // --------------------- axios -------------------------------
    /**
     * 获取所有文章列表
     */
    getAllArticleList() {
      getAllArticleList()
          .then(res => {
            this.artical = res.data.data
          })
    },
    /**
     * 图片错误
     * @returns {string}
     */
    errimg() {
      return 'this.src="' + require('../../../../assets/page/img.png') + '"'
    },
    /**
     * 关注人的文章列表
     */
    firstArticleList() {
      firstArticleList({}).then(res => {
        this.artical = res.data.data.list
      })
    },
    /**
     * 文章所用到的话题
     * @param pd
     */
    getArticleTopic(pd) {
      getArticleTopic(pd)
          .then(res => {
            console.log(res.data.data)
          })
    },
    /**
     *
     */
    nextReview() {
      const pd = {
        pid: 1,
        page: 1,
        pagesize: 10
      }
      nextReview(pd)
          .then(res => {
            this.artical = res.data.data.list
          })
    },
    /**
     * 点赞
     * @param object_type
     * @param like_type
     * @param id
     */
    likeReview(object_type, like_type, id) {
      const pd = {
        object_type: object_type,
        like_type: like_type,
        id: id
      }
      likeReview(pd)
          .then(res => {
            console.log(res.data.data)
          })
    },
    allArticleList() {
      const pd = {
        page: 1,
        limit: 10
      }
      allArticleList(pd)
          .then(res => {
            this.artical = res.data.data.list
          })
    },
  },
  mounted() {
    EventBus.$on(CREATE_POST_EVENT, this.firstArticleList)
    this.firstArticleList()
  }
}
</script>

<style scoped>
.wrapper {
  width: 614px;
}

.createPost {
  /*position: sticky;*/
  /*top: 0;*/
}

/*-------------- message -----------------*/
.message {
  margin-top: 14px;
}

.link {
  width: 14px;
  height: 14px;
}
</style>
