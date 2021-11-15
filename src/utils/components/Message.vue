<template>
  <div class="contain colWarpper">

    <div v-show="needDario" class="dario rowWarpper">
      <Flash class="flash"/>
      <span>Dario De Siena Repost</span>
    </div>

    <div class="rowWarpper">
      <!--  头像与v  -->
      <div class="profileWarpper colWarpper">
        <div @click="goPersonInfo" class="profile canClick">
          <img-self class="profileImg" :src="info.head"/>
        </div>
        <VipSingal v-show="info.nft_status===1" class="vip"/>
      </div>

      <!--  消息区  -->
      <div class="messageCon colWarpper">

        <!--   名字 时间 财富  文章内容 图片 -->
        <div class="postWarpper rowWarpper">

          <div class="colWarpper">
            <!--    名字    -->
            <div class="nameWarpper rowWarpper">
            <span class="name font-name canClick" @click="goPersonInfo">
              {{ strLimit(info.username, 34) }}
            </span>
              <!--              &lt;!&ndash;   财富  &ndash;&gt;-->
              <!--              <div class="wealth rowWarpper">-->
              <!--                <WealthIcon class="wealthIcon"/>-->
              <!--                <span class="wealthValue font-wealth">$21,378,794</span>-->
              <!--              </div>-->
              <!--              <div @click='del(info.id)'>-->
              <el-popover
                  placement="bottom-end"
                  popper-class="pop"
              >
                <div class="popContent" @click="del(info.id)">
                  <span>Delete</span>
                  <Delete class="delete"/>
                </div>
                <div slot="reference">
                  <More v-show="info.uid===uid" class="more"/>
                </div>
              </el-popover>
            </div>

            <!--  文章内容  -->
            <div @click="goReplyDetail" class="artical font-artical">
              <!--   文章   -->
              <span slot="artical" v-html="info.content">
              </span>
            </div>

            <!--  图片  -->
            <div v-show="info.image_url!==''" class="picture">
              <img-self2 class="pictureImg" v-for="(item,index) in info.image_url" :src="item" :key="index"/>
            </div>

            <!-- 时间 -->
            <span class="time font-time">
            <slot name="time"></slot>
          </span>


          </div>
        </div>

        <!-- 转赞评 -->
        <div class="shareLikeCommentWarpper rowWarpper">

          <div class="noPaddingLike rowWarpper">
            <div @click="like" class="rowWarpper">
              <ai-xin-icon v-show="!likeStatusSelf" class="like"/>
              <like v-show="likeStatusSelf" class="like"/>
            </div>
            <span class="likeNum fontStyle">
                 {{ likeNum }}
           </span>
          </div>

          <div @click="goReplyDetail" class="likeWarpper rowWarpper">
            <PingLunIcon class="comment"/>
            <span class="likeNum fontStyle">
                 {{ info.comment_num }}
          </span>
          </div>

          <div class="likeWarpper rowWarpper">
            <div @click="share">
              <ZhuanFaIcon class="share"/>
            </div>
            <span class="likeNum fontStyle">
             {{ info.share_num }}
           </span>
          </div>

          <div @click="copyArtical" v-clipboard:copy="detailUrl" class="likeWarpper rowWarpper">
            <ShareIcon class="shareSmail"/>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>
<script>
// import VBig from "../Icon/VBig";
// ---------------- 图标 --------------
import AiXinIcon from '../Icon/profile/AiXinIcon'
import PingLunIcon from '../Icon/profile/PingLunIcon'
import ShareIcon from '../Icon/profile/ShareIcon'
import ZhuanFaIcon from '../Icon/profile/ZhuanFaIcon'
import VipSingal from '../../assets/static/svg/home/VipSingal'
import More from '@/assets/static/svg/home/More'
import Flash from '@/views/index/Components/Icon/Flash'
import like from '@/assets/static/svg/like'
import Delete from '@/assets/static/svg/Delete'
// -------------------------------
import imgSelf from '@/components/utils/imgSelf'
import imgSelf2 from '@/components/utils/imgSelf2'
// ------------------------ axios --------------------------------
import {likeReview, share, getArticleTopic, copyUrl, articleDel} from '@/api/monico/home'
// ------------------------- storgy -------------------------------
import {getUid} from '@/utils/tokenTools'

export default {
  name: 'Message',
  components: {
    // VBig,
    AiXinIcon, PingLunIcon, ShareIcon, ZhuanFaIcon,
    VipSingal,
    More,
    Flash,
    like,
    imgSelf,
    imgSelf2,
    Delete
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
      likeStatusSelf: false,
      topics: [],
      likeNum: this.likeArtical,
      uid: getUid(),
      detailUrl: ''
    }
  },
  props: {
    // 总高度
    height: {
      type: String,
      default: '128px'
    },
    // 消息区高度
    messageHeight: {
      type: String,
      default: '128px'
    },
    // 是否展示nft
    showNFT: {
      type: Boolean,
      default: false
    },
    // 点赞数
    likeArtical: {
      type: Number,
      default: 0
    },
    // 评论数
    commentArtical: {
      type: Number,
      default: 0
    },
    // 转发数
    shareArtical: {
      type: Number,
      default: 0
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
    needDario: {
      type: Boolean,
      default: false
    },
    messageId: {
      type: Number,
      request: true
    },
    likeStatus: {
      type: Number,
      default: 0
    },
    userid: {
      type: String,
      request: true
    },
    info: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    /**
     * 点赞
     */
    like() {
      const pd = {
        object_type: 1,
        like_type: this.likeStatusSelf ? 2 : 1,
        id: this.messageId
      }
      this.likeStatusSelf = !this.likeStatusSelf
      let postData = this.$qs.stringify(pd)
      this.likeReview(postData)
      if (this.likeStatusSelf) {
        this.likeNum += 1
      } else {
        this.likeNum -= 1
      }
    },
    /**
     * 分享
     */
    share() {
      const pd = {
        article_id: this.messageId,
        content: 12
      }
      let postData = this.$qs.stringify(pd)
      this.shareReview(postData)
      this.$emit('flush')
    },
    /**
     * 进入个人详情
     */
    goPersonInfo() {
      if (this.info.uid === getUid()) {
        this.$router.push({name: 'posts'})
      } else {
        this.$router.push({name: 'otherPosts', query: {userid: this.userid}})
      }
    },
    /**
     * 进入文章详情
     */
    goReplyDetail() {
      this.$router.push({name: 'postDetail', query: {messageId: this.messageId}})
    },
    /**
     * 复制链接
     */
    copyArtical() {
      let pd = {
        article_id: this.messageId
      }
      this.copyUrl(pd)
      this.$message({
        type: 'info',
        message: '复制成功',
        duration: 5000,
        // customClass: 'messageInfo'
      })
      this.detailUrl = window.location.host + '/postDetail?' + this.$qs.stringify({
        messageId: this.messageId,
        info: this.$qs.stringify(this.info)
      })
    },
    /**
     * 限制字符串长度
     * @param str
     * @param limit 字符串长
     * @returns {*}
     */
    strLimit(str, limit) {
      if (typeof (str) === 'string') {
        return str.length > limit ? str.slice(0, limit - 1) + '...' : str
      } else {
        return str
      }
    },
    /**
     * 寻找@和话题
     * @param str
     */
    findTopic(str) {
      // let result = str.match(/@(\S*)/g)
      // let result2 = str.match(/^\s#(\S*)\s/g)
      // if (result === null || result2 === null) {
      //   return str
      // }
      // for (let i = 0; i <= result.length; i++) {
      //   str = str.replace(result[i], "<a style='color:rgba(50, 194, 255, 1)'>" + result[i] + "</a>")
      // }
      // for (let i = 0; i <= result2.length; i++) {
      //   str = str.replace(result2[i], "<a style='color:rgba(50, 194, 255, 1)'>" + result2[i] + "</a>")
      // }
      return str
    },
    /**
     * 删除文章
     * @param articalId
     */
    del(articalId) {
      const pd = {
        id: articalId
      }
      this.articleDel(pd)
    },
    // --------------------- axios ---------------
    /**
     * 点赞接口
     * @param data
     */
    likeReview(data) {
      let that = this
      likeReview(data)
          .then(res => {
            that.$emit('likeflush')
            console.log(res.data.data)
          })
    },
    /**
     * 分享接口
     * @param pd
     */
    shareReview(pd) {
      share(pd)
          .then(res => {
            console.log(res.data.data)
          })
    },
    /**
     * 文章所用到的话题
     * @param pd
     */
    getArticleTopic(pd) {
      let postData = this.$qs.stringify(pd)
      getArticleTopic(postData)
          .then(res => {
            this.topics = res.data.data
          })
    },
    /**
     * 复制链接
     * @param pd
     */
    copyUrl(pd) {
      copyUrl(this.$qs.stringify(pd))
          .then(res => {
            console.log(res.data.data)
          })
    },
    /**
     * 删除文章
     * @param pd
     */
    articleDel(pd) {
      articleDel(pd)
          .then(res => {
            this.$message.success('删除成功')
            this.$emit('flush')
            console.log(res.data.data)
          })
    }
  },
  watch: {
    /**
     * 点赞状态
     * @param val
     */
    likeStatus: function (val) {
      this.likeStatusSelf = val !== 0
    },
    /**
     * 信息
     * @param val
     */
    info(val) {
      this.likeNum = val.like_num
    }
  },
  mounted() {
    this.likeStatusSelf = this.likeStatus !== 0
    // let pd = {
    //   article_id: this.messageId,
    //   page: 1,
    //   pagesize: 10
    // }
    // this.getArticleTopic(pd)
  }
}
</script>
<style>
.pop {
  margin-top: 0 !important;
  width: 150px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  outline: none;
  border: 4px solid transparent;
  /*box-shadow: 0px 15px 15px 0px rgba(0, 0, 0, 0.58);*/
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  z-index: 1;
  /*filter: blur(2px);*/
  /*filter: blur(2px);*/
}

.popper__arrow {
  display: none !important;
}
</style>
<style scoped>
.canClick:hover {
  cursor: pointer;
}

.delete {
  margin-right: 14px;
}

.delete:hover {
  cursor: pointer;
}

.popContent {
  z-index: 3;
  width: 150px;
  height: 40px;
  background: #161616;
  /*box-shadow: 0 15px 15px 0 rgba(0, 0, 0, 0.58);*/
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popContent > span {
  margin-left: 12px;
  width: 45px;
  height: 20px;
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 400;
  color: #BDA28D;
  line-height: 21px;
  text-shadow: 0px 15px 15px rgba(0, 0, 0, 0.58);
}

.rowWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.colWarpper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/*---------- 字体 ----------------*/
.fontStyle {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #898989;
  line-height: 16px;
}

.font-name {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 24px;
}

.font-wealth {
  font-size: 10px;
  font-weight: 500;
  color: #F5A623;
  line-height: 10px;
}

.font-artical {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: rgba(212, 212, 212, 1);
}

.font-time {
  font-family: avalonregular, poppins, helvetica, sans-serif;;
  font-size: 12px;
  font-weight: 400;
  color: #898989;
  line-height: 16px;
}

/*----------- 背景 ---------------*/
.contain {
  width: 614px;
  background-color: rgba(31, 31, 31, 1);
}

/*---------- 头像 -----------*/
.profileImg {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.profileWarpper {
  width: 80px;
  align-self: flex-start;
}

.profile {
  width: 40px;
  height: 40px;
  margin-top: 20px;
  border-radius: 50%;
}

.vip {
  width: 42px;
  height: 15px;
  margin-top: -8px;
}

/*------------- 消息区 --------------*/
.messageCon {
}

.postWarpper {
  justify-content: space-between;
  width: 534px;
}


/* 名字 财富 */
.nameWarpper {
  width: 504px;
  align-self: flex-start;
  justify-content: space-between;
  margin-top: 21px;
}

.name {
  height: 24px;
}

.wealth {
  margin-left: 8px;
  height: 20px;
  border-radius: 13px;
  background-color: rgba(245, 166, 35, 0.2);
  /*justify-content: space-between;*/
  /*padding: 4px 10px 4px 8px;*/
}

.wealthIcon {
  width: 12px;
  height: 12px;
  /*margin-top: 4px;*/
  margin-left: 8px;
}

.wealthValue {
  /*height: 11px;*/
  /*margin-top: 1px;*/
  margin-left: 6px;
  margin-right: 10px;
}

/*文章内容*/
.artical {
  width: 488px;
  margin-top: 2px;
  align-self: flex-start;
  word-wrap: break-word;
  word-break: normal;
}

.artical > span > p {
  width: 488px;
}

.picture {
  width: 504px;
  overflow: hidden;
  z-index: 100;
  border-radius: 8px;
  margin-top: 10px;
}

/*时间*/
.time {
  width: 247px;
  height: 16px;
  align-self: flex-start;
  margin-top: 4px;
}

/*更多*/
.more {
  align-self: flex-start;
  margin-top: 9px;
  /*align-self: flex-start;*/
  /*margin-top: 30px;*/
  /*margin-right: 30px;*/
  width: 16px;
  height: 4px;
}

.more:hover {
  cursor: pointer;
}

/*----------- 转赞评 ------------*/
.shareLikeCommentWarpper {
  align-self: flex-start;
  margin-top: 16px;
  margin-bottom: 17px;
}

.likeWarpper {
  margin-left: 105px;
}

.like {
  width: 30px;
  height: 30px;
}

.like:hover {
  cursor: pointer;
}

.likeNum {
  align-self: center;
  margin-left: 6px;
  width: 22px;
  height: 16px;
}

.noPaddingLike {
}

.comment {
  width: 17px;
  height: 16px;
}

.comment:hover {
  cursor: pointer;
}

.share {
  width: 16px;
  height: 16px;
}

.share:hover {
  cursor: pointer;
}

.shareSmail {
  width: 13px;
  height: 16px;
}

.shareSmail:hover {
  cursor: pointer;
}

.dario {
  align-self: flex-start;
  background-color: rgba(105, 105, 105, 0.2);
  width: 165px;
  height: 20px;
  border-radius: 4px 0 4px 0;
}

.dario > span {
  color: rgba(137, 137, 137, 1);
  align-self: center;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
}

.flash {
  align-self: flex-start;
  margin: 3px 6px 0 6px;
  width: 11px;
  height: 14px;
}

a {
  color: rgba(50, 194, 255, 1);
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.pictureImg {
  width: 503px;
  /*height: 275px;*/
  overflow: hidden;
}
</style>
