<template>
  <div class="wrapper">

    <div class="PostWrapper">
      <!-- ====================== 推文作者头像 ========================= -->
      <div class="imgWrapper">
        <img-self :src="head"/>
        <!--        <img v-if="head === ''" src="@/assets/static/png/default/default.png" alt="">-->
        <!--        <img v-else :src="head" alt="">-->
      </div>

      <div class="contentArea">
        <!-- ====================== 头像和财富 ========================= -->
        <div class="nameFortune">
          <span v-if="username === '' " class="username">Visitor</span>
          <span v-else class="username">{{ username }}</span>
          <div @click="del(repilyId)">
            <more v-if="reply_user_id === selfUid" class="more"/>
          </div>
          <!--            <div class="netWorth">-->
          <!--              <wealth-icon></wealth-icon>-->
          <!--              <span class="netWorthNumber">$21,378,794</span>-->
          <!--            </div>-->
        </div>

        <!-- ====================== 回复内容 ========================= -->
        <div class="replyContent" v-html="content">
          <span>{{ content }}</span>
        </div>
        <!-- ====================== 时间 点赞 评论 ========================= -->
        <div class="timeLikeComment">
          <div class="replyTimeWrapper">
            <span class="replyTime">{{ getLocalTime(create_time) }}</span>
          </div>
          <div class="replyLikeCommentWrapper">
            <div class="replyLikeWrapper">
              <div class="iconWrapper" @click="like">
                <AiXinIcon v-show="!likeStatus"/>
                <like v-show="likeStatus"/>
              </div>
              <span class="likeNumber">{{ like_num }}</span>
            </div>
            <div class="replyCommentWrapper">
              <div @click="gotoRepilyDetail(info,PostsInfo)" class="iconWrapper">
                <PingLunIcon></PingLunIcon>
              </div>
              <span class="commentNumber">{{ comment_num }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/styles/postsDetail/repily.css'
// ------------------ 图标 -----------------
import More from '@/assets/static/svg/home/More'
import AiXinIcon from '@/utils/Icon/profile/AiXinIcon'
import like from '@/assets/static/svg/like'
import PingLunIcon from '@/utils/Icon/profile/PingLunIcon'

// -------------------- self -----------------------
import {getUid} from '@/utils/tokenTools'
// ------------------ axios -----------------------
import {likeReview, commentsDel} from '@/api/monico/home'
// ----------------- 组件 -------------------
import imgSelf from '@/components/utils/imgSelf'

export default {
  name: 'Repily',
  components: {
    More,
    AiXinIcon,
    PingLunIcon,
    like,
    imgSelf,
  },
  data() {
    return {
      head: '',
      username: '',
      selfUid: getUid(),
      reply_user_id: '',
      content: '',
      create_time: '',
      like_num: 0,
      comment_num: 0,
      likeStatus: false,
      imgUrl: [],
      repilyId: 0
    }
  },
  props: {
    /**
     * 评论信息
     */
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * 文章信息
     */
    PostsInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    info(val) {
      console.log(val)
      this.head = val.head
      this.username = val.username
      this.reply_user_id = val.uid
      this.content = val.content
      this.create_time = val.create_time
      this.like_num = val.like_num
      this.comment_num = val.comment_num
      this.likeStatus = val.like_status !== 0
      this.repilyId = val.id
    }
  },
  mounted() {
    this.head = this.info.head
    this.username = this.info.username
    this.reply_user_id = this.info.uid
    this.content = this.info.content
    this.create_time = this.info.create_time
    this.like_num = this.info.like_num
    this.comment_num = this.info.comment_num
    this.likeStatus = this.info.like_status !== 0
    this.repilyId = this.info.id
  },
  methods: {
    /**
     * 时间转换
     * @param nS
     * @returns {string}
     */
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    /**
     * 进入详情页
     */
    gotoRepilyDetail() {
      this.$router.push({
        name: 'replyDetail',
        query: {id: this.repilyId}
      })
    },
    /**
     * 点赞
     */
    like() {
      if (this.likeStatus) {
        this.like_num -= 1
        const pd = {
          object_type: 2,
          like_type: 2,
          id: this.info.id
        }
        this.likeReview(pd)
      } else {
        const pd = {
          object_type: 2,
          like_type: 1,
          id: this.info.id
        }
        this.likeReview(pd)
        this.like_num += 1
      }
      this.likeStatus = !this.likeStatus
    },
    /**
     * 删除评论
     * @param repilyId
     */
    del(repilyId) {
      const pd = {
        id: repilyId
      }
      this.commentsDel(pd)
      this.$emit('delSuccess')
    },
    //   ---------------------- axios ---------------------------------
    /**
     * 点赞接口
     * @param pd
     */
    likeReview(pd) {
      likeReview(this.$qs.stringify(pd))
          .then(res => {
            console.log(res.data.data)
          })
    },
    /**
     * 删除回复
     * @param pd
     */
    commentsDel(pd) {
      commentsDel(pd)
          .then(res => {
            console.log(res.data.data)
          })
    }
  }
}
</script>

<style scoped>
.more:hover {
  cursor: pointer;
}

.pictureImg {
  width: 503px;
  height: 275px;
}

</style>
