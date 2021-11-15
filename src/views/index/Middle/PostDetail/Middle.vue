<template>
  <div style="width: 614px">

    <add-comment
        @like="like"
        :comment="commentNum"
        @replySuccess="replySuccess"
        :info="info"/>

    <div class="replyWarpper">
      <Repily
          @delSuccess="delSuccess"
          :posts-info="info"
          v-for="(item,index) in reviews"
          :key="index"
          :info="item"/>
    </div>

  </div>
</template>

<script>
// ---------------- 自定义组件 -----------------
import AddComment from '@/utils/components/AddComment'
import {replyReview, getReview} from '@/api/monico/home'
import {getUid} from '@/utils/tokenTools'
import Repily from '@/views/index/Middle/PostDetail/Repily'

export default {
  name: 'Middle',
  components: {
    AddComment,
    Repily
  },
  data() {
    return {
      articalId: 1,
      info: {},
      reviews: [],
      selfUid: getUid(),
      commentNum: 0,
      likeNum: 0,
      likeStatus: false
    }
  },
  methods: {
    /**
     * 回复成功
     */
    replySuccess() {
      this.$message.info('评论成功')
      let pd = {
        article_id: this.articalId,
        page: 1,
        pageSize: 10
      }
      this.getReview(pd)
    },
    /**
     * 进入详情页
     */
    gotoRepilyDetail(item, info) {
      this.$router.push({
        name: 'replyDetail',
        query: {info: this.$qs.stringify(item), articalInfo: this.$qs.stringify(info)}
      })
    },
    /**
     * 时间转换
     * @param nS
     * @returns {string}
     */
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    /**
     * 删除成功
     */
    delSuccess() {
      this.articalId = this.$route.params.messageId
      this.info = this.$qs.parse(this.$route.query.info)
      let pd = {
        article_id: this.info.id,
        page: 1,
        pageSize: 10
      }
      this.getReview(pd)
    },
    /**
     * 点赞成功后刷新
     */
    like() {
      // this.info = this.$qs.parse(this.$route.query.info)
      // let pd = {
      //   article_id: this.info.id,
      //   page: 1,
      //   pageSize: 10
      // }
      // this.getReview(pd)
    },
    // --------------------------- axios --------------------
    /**
     *文章评论或回复评论
     * @param pd
     */
    replyReview(pd) {
      replyReview(this.$qs.stringify(pd))
          .then(res => {
            console.log(res.data.data)
          })
    },
    /**
     * 文章评论列表
     * @param pd
     */
    getReview(pd) {
      getReview(this.$qs.stringify(pd))
          .then(res => {
            this.reviews = res.data.data.list
            this.commentNum = res.data.data.count
          })
    },

  },
  mounted() {
    this.articalId = this.$route.query.messageId
    this.info = this.$qs.parse(this.$route.query.info)
    let pd = {
      article_id: this.articalId,
      page: 1,
      pageSize: 10
    }
    this.getReview(pd)
    //  --------------------------- 修改标题 ---------------------------
    const params = {
      title: 'Comment',
      subTitle: '',
      needSubTitle: false
    }
    this.$emit('pathChange', params)
  }
}
</script>

<style scoped>
.iconWrapper:hover {
  cursor: pointer;
}

/*-------------- message -----------------*/
.replyWarpper {
  margin-top: 14px;
}

a {
  color: rgba(50, 194, 255, 1);
}

.wrapper {
  background: #1F1F1F;
}

.wrapper:hover {
  background: #2A2A2A;
}

.imgWrapper {
  width: 80px;
  display: flex;
  justify-content: center;
}

.imgWrapper img {
  width: 40px;
  height: 40px;
  margin-top: 13px;

}

.PostWrapper {
  display: flex;
  /*border-bottom: 1px solid #2E2E2E;*/
  /*margin-bottom: 32px;*/
}

.wrapper {
  border-bottom: 1px solid #2E2E2E;
}

.wrapper:nth-last-child(1) {
  border-bottom-color: transparent;
}

.nameFortune {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.likeCommentShareCopy {
  display: flex;
}

.addComment {
  display: flex;
  margin-top: 31px;
}

.username {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-size: 14px;
  color: #FFFFFF;
}

.nameFortune {
  height: 24px;
  margin-top: 19px;
}

.netWorth {
  margin-left: 8px;
  height: 20px;
  background-color: rgba(245, 166, 35, 0.2);
  border-radius: 13px;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  align-items: center;
}

.netWorthNumber {
  margin-left: 6px;
  font-size: 10px;
  color: #F5A623;
}

.likeNumber {
  margin-left: 6px;
  height: 16px;
  font-size: 12px;
  color: #898989;
  line-height: 16px;
}

.commentNumber {
  margin-left: 6px;
  height: 16px;
  font-size: 12px;
  color: #BDA28D;
  line-height: 16px;
}

.commentUserProfile img {
  width: 40px;
  height: 40px;
}

commentInputWrapper {
  width: 504px;
}

.timeLikeComment {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 17px;
  margin-bottom: 13px;
}

.replyLikeCommentWrapper {
  display: flex;
  align-items: center;
}

.replyContent {
  width: 504px;
  font-size: 20px;
  font-weight: 400;
  color: #D4D4D4;
  line-height: 24px;
  -webkit-text-stroke: 0 #C4C4C4;
  margin-bottom: 8px;
}

.replyLikeWrapper {
  display: flex;
  align-items: center;
  height: 17px;
}

.replyCommentWrapper {
  display: flex;
  align-items: center;
  margin-left: 45px;
}

.replyTime {
  height: 16px;
  font-size: 12px;
  font-weight: 400;
  color: #9F9D9D;
  line-height: 16px;
  -webkit-text-stroke: 0 #C4C4C4;
  -webkit-background-clip: text;
}
</style>
