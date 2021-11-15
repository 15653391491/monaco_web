<template>
  <div style="width: 614px">

    <reply @sendSuccess="sendSuccess" :artical-info="articalInfo" :info="info"></reply>

    <div class="wrapper" v-for="(item,index) in reviews" :key="index">

      <div class="PostWrapper">
        <!-- ====================== 推文作者头像 ========================= -->
        <div class="imgWrapper">
          <img src="../../../../assets/static/png/postProfile.png" alt="">
        </div>
        <div class="contentArea">
          <!-- ====================== 头像和财富 ========================= -->
          <div class="nameFortune">
            <span class="username">{{ item.username }}</span>
            <!--            <div class="netWorth">-->
            <!--              <wealth-icon></wealth-icon>-->
            <!--              <span class="netWorthNumber">$21,378,794</span>-->
            <!--            </div>-->
          </div>

          <!-- ====================== 回复内容 ========================= -->
          <div class="replyContent" v-html="item.content">
            <span>{{ item.content }}</span>
          </div>

          <!-- ====================== 时间 点赞 评论 ========================= -->
          <div class="timeLikeComment">
            <div class="replyTimeWrapper">
              <span class="replyTime">{{ getLocalTime(item.create_time) }}</span>
            </div>
            <div class="replyLikeCommentWrapper">
              <div class="replyLikeWrapper">
                <AiXinIcon></AiXinIcon>
                <span class="likeNumber">{{ item.like_num }}</span>
              </div>
              <div class="replyCommentWrapper">
                <PingLunIcon></PingLunIcon>
                <span class="commentNumber">{{ item.comment_num }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// ---------------- 自定义组件 -----------------
import reply from '@/utils/components/reply'
import AiXinIcon from '../../../../utils/Icon/profile/AiXinIcon'
import PingLunIcon from '../../../../utils/Icon/profile/PingLunIcon'
// import WealthIcon from "../../../../utils/Icon/profile/WealthIcon";
import {replyReview, nextReview} from '@/api/monico/home'
import {detail} from '@/api/monico/profile'
import {commentsDetail} from '@/api/monico/home'

export default {
  name: 'Middle',
  components: {
    reply,

    AiXinIcon,
    PingLunIcon,
    // WealthIcon
  },
  data() {
    return {
      info: {},
      articalInfo: {},
      reviews: [],
      head: '',
      showNft: false
    }
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
    sendSuccess() {
      let pd = {
        pid: this.info.id,
        page: 1,
        limit: 10
      }
      this.nextReview(pd)
    },
    //   ------------------------------ axios ------------------------------
    /**
     * 回复
     * @param pd
     */
    replyReview(pd) {
      replyReview(this.$qs.stringify(pd))
          .then(res => {
            this.reviews = res.data.data.list
          })
    },
    /**
     *
     * @param pd
     */
    nextReview(pd) {
      nextReview(pd)
          .then(res => {
            this.reviews = res.data.data.list
          })
    },
    /**
     * 个人详情
     * @param pd
     */
    detail(pd) {
      detail(pd)
          .then(res => {
            let info = res.data.data
            this.head = info.head
            this.showNft = info.nft_status !== 0
          })
    },
    /**
     * 评论详情
     * @param pd
     */
    commentsDetail(pd) {
      commentsDetail(pd)
          .then(res => {
            console.log(res.data.data)
          })
    }
  },
  mounted() {
    this.info = this.$qs.parse(this.$route.query.info)
    this.articalInfo = this.$qs.parse(this.$route.query.articalInfo)
    console.log(this.articalInfo)
    let pd = {
      pid: this.info.id,
      page: 1,
      limit: 10
    }
    this.nextReview(pd)
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


/*-------------- message -----------------*/
.message {
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
  margin-bottom: 32px;
}

.nameFortune {
  display: flex;
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
  -webkit-text-stroke: 0px #C4C4C4;
  text-stroke: 0px #C4C4C4;
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
  -webkit-text-stroke: 0px #C4C4C4;
  text-stroke: 0px #C4C4C4;
  -webkit-background-clip: text;
}
</style>
