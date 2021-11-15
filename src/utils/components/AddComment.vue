<template>
  <div class="wrapper">
    <div class="PostWrapper">
      <!-- ====================== 推文作者头像 ========================= -->
      <div class="imgWrapper">
        <img-self :src="head" alt=""/>
      </div>
      <div class="contentArea">
        <!-- ====================== 头像和财富 ========================= -->
        <div class="nameFortune">
          <span class="username">{{ username }}</span>
          <!--          <div class="netWorth">-->
          <!--            <wealth-icon></wealth-icon>-->
          <!--            <span class="netWorthNumber">$21,378,794</span>-->
          <!--          </div>-->
        </div>

        <!-- ====================== 推文内容 ========================= -->
        <div class="postContent" v-html="content">
        </div>
        <!-- ===================== 图片 ========================   -->
        <div v-show="imgUrl!==''" class="picture">
          <img-self2 class="pictureImg" v-for="(item,index) in imgUrl" :src="item" :key="index"/>
        </div>
        <!-- ====================== 时间 ========================= -->
        <div class="timeWrapper">
          <span>{{ createTime }}</span>
        </div>
        <!-- ====================== 点赞 评论 分享 复制连接 ========================= -->
        <div class="likeCommentShareCopy">
          <div @click="like" class="likeWrapper">
            <AiXinIcon class="like" v-show="!likeStatusSelf"/>
            <like class="like" v-show="likeStatusSelf"/>
            <span class="likeNumber">{{ likeNum }}</span>
          </div>
          <div class="commentWrapper">
            <PingLunIcon class="like"/>
            <span class="commentNumber">{{ commentNum }}</span>
          </div>
          <div class="shareWrapper">
            <zhuan-fa-icon class="like"/>
            <span class="shareNumber">{{ copyNum }}</span>
          </div>
          <div @click="copySuccess" class="copyWrapper" v-clipboard:copy="address">
            <ShareIcon class="like"/>
          </div>
        </div>
      </div>
    </div>
    <div class="addComment1">
      <!-- 头像 -->
      <div class="profile1">
        <div class="profileNFT1">
          <div class="commentUserProfile1">
            <img-self :src="head"/>
            <!--            <img src="../../assets/static/png/postProfile.png" alt="">-->
          </div>
          <singal-icon v-show="nftStatus" class="NFTIcon1"/>
        </div>
      </div>
      <!-- ====================== 评论输入 ========================= -->
      <div class="commentCompWrapper1">
        <div class="commentInputWrapper1">
          <input
              :class="{'CommentInput1':!show,'CommentInput2':show}"
              v-model="review"
              placeholder="Your Comment..."
              type="text"/>
        </div>
        <div class="inputStatistics1">
          <span></span>
        </div>
        <div class="emojiPicCountSend1" v-show="show">
          <div class="emojiPic1">
            <laugh-icon class="laugh1"/>
            <page-icon class="page1"/>
          </div>
          <div class="countSend1">
            <span class="count1">{{ review.length }}/280</span>
            <span @click="send" class="sendText1">Send</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import pageIcon from '../../views/index/Components/Icon/Map'
import laughIcon from '../../views/index/Components/Icon/Laugth'
import SingalIcon from '../../assets/static/svg/NFTIcon'
import AiXinIcon from '../Icon/profile/AiXinIcon'
import PingLunIcon from '../Icon/profile/PingLunIcon'
import ShareIcon from '../Icon/profile/ShareIcon'
// import WealthIcon from "../Icon/profile/WealthIcon";
import ZhuanFaIcon from '../Icon/profile/ZhuanFaIcon'
import imgSelf from '@/components/utils/imgSelf'
import {replyReview, likeReview, articleDetail} from '@/api/monico/home'
import like from '@/assets/static/svg/like'
import imgSelf2 from '@/components/utils/imgSelf2'
import {detail} from '@/api/monico/profile'

export default {
  name: 'addComment',
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
    like,
    imgSelf2
  },
  data() {
    return {
      style: {
        // height: this.height
      },
      show: false,
      review: '',
      likeStatusSelf: false,
      likeNum: this.likeNumTurn(),
      commentNum: 0,
      address: '111112222',
      nftStatus: false,
      // --------------------- posts详情 -----------------------------
      head: '',
      messageId: '',
      username: '',
      content: '',
      imgUrl: [],
      createTime: '',
      copyNum: ''
      // info: {}
    }
  },
  props: {
    // 分享数
    shareNum: {
      type: String,
      default: ''
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    comment: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /**
     * 展示下方按钮
     */
    showCon() {
      this.show = true
    },
    /**
     * 回复文章评论
     */
    send() {
      let pd = {
        type: 1,
        id: this.messageId,
        comments_type: 1,
        content: this.review,
      }
      this.replyReview(pd)
    },
    /**
     * 点赞
     */
    like() {
      const pd = {
        object_type: 1,
        like_type: this.likeStatusSelf ? 2 : 1,
        id: this.info.id
      }
      this.likeStatusSelf = !this.likeStatusSelf
      let postData = this.$qs.stringify(pd)
      this.likeReview(postData)
      if (this.likeStatusSelf) {
        this.likeNum += 1
      } else {
        this.likeNum -= 1
      }
      this.$emit('like', {
        likeNum: this.likeNum,
        likeStatus: this.likeStatus
      })
    },
    /**
     * 点赞数转换
     */
    likeNumTurn() {
      if (isNaN(Number(this.info.like_num))) {
        return 0
      } else {
        return Number(this.info.like_num)
      }
    },
    /**
     * 复制成功
     */
    copySuccess() {
      this.$message({
        type: 'info',
        message: '复制成功',
        duration: 5000,
      })
    },
    //  ----------------------- axios --------------------------
    /**
     * 回复评论
     * @param pd
     */
    replyReview(pd) {
      replyReview(this.$qs.stringify(pd))
          .then(res => {
            if (res.data.code === 1) {
              this.commentNum += 1
              this.$emit('replySuccess')
            }
          })
    },
    /**
     * 点赞接口
     * @param data
     */
    likeReview(data) {
      likeReview(data)
          .then(res => {
            console.log(res.data.data)
          })
    },
    /**
     * 个人详细信息
     * @param pd
     */
    detail(pd) {
      detail(this.$qs.stringify(pd))
          .then(res => {
            this.head = res.data.data.head
            this.nftStatus = res.data.data.nft_status !== 0
            // console.log(res.data.data)
          })
    },
    /**
     * 文章详情
     * @param pd
     */
    articleDetail(pd) {
      articleDetail(pd)
          .then(res => {
            let info = res.data.data
            this.head = info.head
            this.commentNum = info.comment_num
            this.content = info.content
            this.copyNum = info.copy_num
            this.createTime = info.create_time
            this.imgUrl = info.image_url
            this.likeNum = info.like_num
            this.likeStatusSelf = info.like_status
            this.username = info.username
          })
    }
  },
  watch: {
    /**
     *
     * @param val
     */
    review(val) {
      this.show = val.length !== 0
    },
    /**
     * 点赞状态
     * @param val
     */
    likeStatus: function (val) {
      this.likeStatusSelf = val !== 0
    },
    /**
     * 内容
     * @param val
     */
    info(val) {
      this.likeStatusSelf = val.like_status === '1'
      this.likeNum = Number(val.like_num)
      this.commentNum = Number(val.comment_num)
    },
    /**
     * 评论数
     * @param val
     */
    comment(val) {
      this.commentNum = val
    }
  },
  mounted() {
    this.address = window.location
    this.detail({})
    this.messageId = this.$route.query.messageId
    this.articleDetail({id: this.messageId})
    // this.likeStatusSelf = this.info.like_status === "1";
    // console.log(this.info)
  }
}
</script>

<style scoped>
.like:hover {
  cursor: pointer;
}

.wrapper {
  background: #1F1F1F;
}

input {
  color: #ffffff;
  outline: none;
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
}

.nameFortune {
  display: flex;
}

.likeCommentShareCopy {
  display: flex;
}

.addComment {
  display: flex;
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

.postContent {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  /*height: 17px;*/
  padding-top: 10px;
  font-size: 20px;
  color: #D4D4D4;
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

.addComment {
  margin-top: 31px;
}

commentInputWrapper {
  width: 504px;
}

.picture {
  width: 504px;
  overflow: hidden;
  z-index: 100;
  border-radius: 8px;
  margin-top: 10px;
}

.CommentInput {
  width: 474px;
  height: 80px;
  background: #161616;
  border-radius: 4px;
  border: 1px solid #BDA28D;
  padding: 12px 14px 12px 14px;
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


.addComment1 {
  display: flex;
  margin-top: 31px;
}

.profile1 {
  width: 80px;
  display: flex;
  justify-content: center;
}

.commentUserProfile1 {
  width: 42px;
  display: flex;
  justify-content: center;
  margin-bottom: -8px;
}

.commentUserProfile1 img {
  width: 40px;
  height: 40px;
}

.profileNFT1 {
  width: 42px;
  height: 15px;
}

.NFTIcon1 {
  width: 42px;
}

commentInputWrapper1 {
  width: 504px;
}

.CommentInput1 {
  width: 470px;
  background: #161616;
  border-radius: 4px;
  border: 1px solid #BDA28D;
  padding: 15px 16px 15px 16px;
  height: 14px;
}

.CommentInput2 {
  width: 470px;
  background: #161616;
  border-radius: 4px;
  border: 1px solid #BDA28D;
  padding: 15px 16px 15px 16px;
  height: 80px;
}

.emojiPicCountSend1 {
  width: 504px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.emojiPic1 {
  display: flex;
  align-items: center;
}

.countSend1 {
  display: flex;
  align-items: center;
}

.laugh1 {
  margin-left: 2px;
}

.page1 {
  margin-left: 16px;
}

.sendText1 {
  margin-left: 12px;
  width: 35px;
  height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #BDA28D;
  line-height: 21px;
}

.sendText1:hover {
  cursor: pointer;
}

.count1 {
  height: 15px;
  font-size: 10px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 16px;
}

.commentCompWrapper1 {
  margin-bottom: 30px;
}

.pictureImg {
  width: 503px;
  height: 275px;
}

</style>
