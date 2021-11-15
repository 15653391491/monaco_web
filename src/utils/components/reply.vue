<template>
  <div class="wrapper">

    <!--  原文章  -->
    <div class="PostWrapper">
      <!-- ====================== 推文作者头像 ========================= -->
      <div class="imgWrapper">
        <!--        <img :src="articalInfo.head" alt="">-->
        <img-self :src="articalInfo.head" class="icon"/>
      </div>
      <div class="contentArea">
        <!-- ====================== 头像和财富 ========================= -->
        <div class="nameFortune">
          <span class="username icon">{{ info.u_username }}</span>
        </div>

        <!-- ====================== 推文内容 ========================= -->
        <div class="postContent" v-html="info.content">
          <span>{{ info.content }}</span>
        </div>
        <!-- ===================== 图片 ========================   -->
        <div v-show="info.image_url!==''" class="picture">
          <img-self2 class="pictureImg" v-for="(item,index) in info.image_url" :src="item" :key="index"/>
        </div>
        <!-- ====================== 时间 ========================= -->
        <div class="timeWrapper">
          <span>10:23 AM · Dec 10, 2021</span>
        </div>
        <!-- ====================== 点赞 评论 分享 复制连接 ========================= -->
        <div class="likeCommentShareCopy">
          <div class="likeWrapper">
            <AiXinIcon v-show="!likeStatus" class="icon"/>
            <like v-show="likeStatus" class="icon"/>
            <span class="likeNumber">{{ info.like_num }}</span>
          </div>
          <div class="commentWrapper">
            <PingLunIcon class="icon"/>
            <span class="commentNumber">{{ info.comment_num }}</span>
          </div>
          <div class="shareWrapper">
            <zhuan-fa-icon class="icon"/>
            <span class="shareNumber">{{ info.share_num }}</span>
          </div>
          <div class="copyWrapper">
            <ShareIcon class="icon"/>
          </div>
        </div>
      </div>
    </div>

    <!--  回复正文  -->
    <div class="PostWrapper">
      <!-- ====================== 推文作者头像 ========================= -->
      <div class="imgWrapper">
        <img-self :src="head"/>
        <!--        <img class="icon" src="../../assets/static/png/postProfile.png" alt="">-->
      </div>
      <div class="contentArea">
        <!-- ====================== 头像和财富 ========================= -->
        <div class="nameFortune">
          <span class="username icon">{{ info.username }}</span>
          <!--          <div class="netWorth">-->
          <!--            <wealth-icon></wealth-icon>-->
          <!--            <span class="netWorthNumber">$21,378,794</span>-->
          <!--          </div>-->
        </div>

        <!-- ====================== 回复内容 ========================= -->
        <div class="replyContent">
          <span>{{ info.content }}.</span>
        </div>

        <!-- ====================== 时间 点赞 评论 ========================= -->
        <div class="timeLikeComment">
          <div class="replyTimeWrapper">
            <span class="replyTime">{{ getLocalTime(info.create_time) }}</span>
          </div>
          <div class="replyLikeCommentWrapper">
            <div class="replyLikeWrapper">
              <AiXinIcon class="icon"/>
              <span class="likeNumber">{{ info.like_num }}</span>
            </div>
            <div class="replyCommentWrapper">
              <PingLunIcon class="icon"/>
              <span class="commentNumber">{{ info.comment_num }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="addComment">
      <!-- 头像 -->
      <div class="profile">
        <div class="profileNFT">
          <div class="commentUserProfile">
            <img-self :src="head"/>
            <!--            <img class="icon" src="../../assets/static/png/postProfile.png" alt="">-->
          </div>
          <singal-icon class="NFTIcon" v-show="showNft"/>
        </div>
      </div>
      <!-- ====================== 评论输入 ========================= -->
      <div class="commentCompWrapper">
        <div class="commentInputWrapper">
          <input
              v-model="review"
              placeholder="Your Comment..."
              type="text"
              class="CommentInput"/>
        </div>
        <div class="inputStatistics">
          <span></span>
        </div>
        <div class="emojiPicCountSend" v-show="true">
          <div class="emojiPic">
            <laugh-icon class="laugh icon"/>
            <page-icon class="page icon"/>
          </div>
          <div class="countSend">
            <span class="count">{{ review.length }}/280</span>
            <span @click="send" class="sendText icon">Send</span>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
// ------------------- 图标 --------------------
import pageIcon from '../../views/index/Components/Icon/Map'
import laughIcon from '../../views/index/Components/Icon/Laugth'
import SingalIcon from '../../assets/static/svg/NFTIcon'
import AiXinIcon from '../Icon/profile/AiXinIcon'
import PingLunIcon from '../Icon/profile/PingLunIcon'
import ShareIcon from '../Icon/profile/ShareIcon'
import ZhuanFaIcon from '../Icon/profile/ZhuanFaIcon'
import like from '@/assets/static/svg/like'
// ------------------ axios -----------------------
import {commentsDetail, replyReview} from '@/api/monico/home'
import {detail} from '@/api/monico/profile'

// ------------------ 组件 ------------------------
import imgSelf from '@/components/utils/imgSelf'
import imgSelf2 from '@/components/utils/imgSelf2'

export default {
  name: 'reply',
  components: {
    pageIcon,
    laughIcon,
    SingalIcon,
    AiXinIcon,
    PingLunIcon,
    ShareIcon,
    // WealthIcon,
    ZhuanFaIcon,
    imgSelf,
    imgSelf2,
    like
  },
  data() {
    return {
      style: {
        // height: this.height
      },
      messageStyle: {
        // height: this.messageHeight
      },
      commentStyle: {
        // top: this.messageHeight
      },
      wealthStyle: {
        left: '100px'
      },
      review: '',
      likeStatus: false,
      head: '',
      showNft: false,
      info: {}
    }
  },
  props: {
    // 是否加v
    IsV: {
      type: Boolean,
      default: false
    },
    // 点赞数
    likeArtical: {
      type: String,
      default: 'Like'
    },
    // 评论数
    commentArtical: {
      type: String,
      default: 'Comment'
    },
    // 转发数
    shareArtical: {
      type: String,
      default: 'Share'
    },
    // 是否展开评论
    isComment: {
      type: Boolean,
      default: false
    },
    // 分享数
    shareNum: {
      type: String,
      default: ''
    },
    needPicture: {
      type: Boolean,
      default: false
    },
    articalInfo: {
      type: Object,
      default: () => {
        return {}
      }
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
    /**
     * 回复文章评论
     */
    send() {
      let pd = {
        type: 2,
        id: this.info.id,
        comments_type: 1,
        content: this.review,
      }
      this.replyReview(pd)
      this.$emit('sendSuccess')
    },
    //   ------------------------------- axios --------------------------------
    /**
     * 回复
     * @param pd
     */
    replyReview(pd) {
      replyReview(this.$qs.stringify(pd))
          .then(res => {
            console.log(res.data.data)
          })
    },
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
            this.info = res.data.data
          })
    }
  },
  mounted() {
    this.likeStatus = this.articalInfo.like_status === '1'
    this.detail({})
    let pd = {
      id: this.$route.query.id
    }
    this.commentsDetail(pd)
  }
}
</script>

<style scoped>
.wrapper {
  background: #1F1F1F;

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

.icon:hover {
  cursor: pointer;
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

.postContent {
  padding-top: 10px;
  color: #D4D4D4;
  width: 507px;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
}

.timeWrapper {
  margin-top: 8px;
  font-size: 12px;
  height: 16px;
  color: #898989;
  line-height: 16px;
}

.likeCommentShareCopy {
  margin-top: 13px;
  height: 20px;
  display: flex;
  align-items: center;
}

.likeWrapper {
  width: 153px;
  display: flex;
  align-items: center;

}

.likeNumber {
  margin-left: 6px;
  height: 16px;
  font-size: 12px;
  color: #898989;
  line-height: 16px;
}

.commentWrapper {
  width: 144px;
  display: flex;
  align-items: center;
}

.commentNumber {
  margin-left: 6px;
  height: 16px;
  font-size: 12px;
  color: #BDA28D;
  line-height: 16px;
}

.shareWrapper {
  width: 144px;
  display: flex;
  align-items: center;
}

.shareNumber {
  margin-left: 6px;
  height: 16px;
  font-size: 12px;
  font-weight: 500;
  color: #898989;
  line-height: 16px;
}

.copyWrapper {
  display: flex;
  align-items: center;
}

.profile {
  width: 80px;
  display: flex;
  justify-content: center;
}

.commentUserProfile {
  width: 42px;
  display: flex;
  justify-content: center;
  margin-bottom: -8px;
}

.commentUserProfile img {
  width: 40px;
  height: 40px;
}

.profileNFT {
  width: 42px;
  height: 15px;
}

.NFTIcon {
  width: 42px;
}

commentInputWrapper {
  width: 504px;
}

.CommentInput {
  width: 470px;
  background: #161616;
  border-radius: 4px;
  border: 1px solid #BDA28D;
  padding: 15px 16px 15px 16px;
  height: 14px;
  color: #ffffff
}

.emojiPicCountSend {
  width: 504px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.emojiPic {
  display: flex;
  align-items: center;
}

.countSend {
  display: flex;
  align-items: center;
}

.laugh {
  margin-left: 2px;
}

.page {
  margin-left: 16px;
}

.sendText {
  margin-left: 12px;
  width: 35px;
  height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #BDA28D;
  line-height: 21px;
}

.count {
  height: 15px;
  font-size: 10px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 16px;
}

.timeLikeComment {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 17px;
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

.addReply {
  display: flex;
  margin-top: 31px;
}

.commentCompWrapper {
  margin-bottom: 30px;
}

.pictureImg {
  width: 503px;
  height: 275px;
}

</style>
