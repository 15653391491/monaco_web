<template>
  <div class="contain colWarpper">
    <div v-show="needDario" class="dario rowWarpper">
      <Flash class="flash"/>
      <span>Dario De Siena Repost</span>
    </div>
    <div class="rowWarpper">
      <!--  头像与v  -->
      <div class="profileWarpper colWarpper">
        <div class="profile">
          <slot name="profile"></slot>
        </div>
        <VipSingal v-show="IsV" class="vip"/>
      </div>

      <!--  消息区  -->
      <div class="messageCon colWarpper">

        <!--   名字 时间 财富  文章内容 图片 -->
        <div class="postWarpper rowWarpper">
          <div class="colWarpper">
            <!--    名字    -->
            <div class="nameWarpper rowWarpper">
            <span class="name font-name" @click="goPersonInfo">
              <slot name="name"></slot>
            </span>
              <!--   财富  -->
              <div class="wealth rowWarpper">
                <WealthIcon class="wealthIcon"/>
                <span class="wealthValue font-wealth">$21,378,794</span>
              </div>
            </div>

            <!--  文章内容  -->
            <div class="artical font-artical">
              <slot @click="goReplyDetail" name="artical"></slot>
              <div class="rowWarpper">
                <span v-for="(info,index) in topics" :key="index">
                <a># {{ info.content }}</a>
              </span>
              </div>
            </div>
            <div class="postedWrapper">
              <div class="postedprofileName">
                <div class="postedProfileWrapper">
                  <img class="postedProfile" src="../../assets/page/Avatar.png" />
                </div>
                <div class="postedNameWrapper">
                  <span>nala crypto art</span>
                </div>
              </div>
              <div class="posted">
                <span>
                  Lorem ipsum dolor sit amet illiet es ail consectetur adipiscing elit. Ultrices et pulvinar id convallis quis luctus fo rza
                </span>
              </div>
              <div v-if="picCount === 1" class="postedPicArea">
                <img class="postedPicOne" src="../../assets/static/png/repost/pic1.png" />
              </div>
              <div v-else-if="picCount === 2">
                <div class="postedPicTwo">
                  <img class="postedPicTwoL" src="../../assets/static/png/repost/pic2-1.png" />
                  <img class="postedPicTwoR" src="../../assets/static/png/repost/pic2-2.png" />
                </div>
              </div>
              <div v-else-if="picCount === 3" class="postedPicArea">

                    <img class="postedPicThreeL" src="../../assets/static/png/repost/pic2-1.png" />

                  <div class="postedPicThreeRightWrapper">
                    <img class="postedPicThreeU" src="../../assets/static/png/repost/pic3-2.png" />
                    <img class="postedPicThreeD" src="../../assets/static/png/repost/pic3-3.png" />
                  </div>

              </div>
              <div v-else-if="picCount === 4" class="postedPicAreaFour">
                <div class="postedPicFourUWrapper">
                  <img class="postedPicFourUL" src="../../assets/static/png/repost/pic4-1.png" />
                  <img class="postedPicFourUR" src="../../assets/static/png/repost/pic3-2.png" />
                </div>
                <div class="postedPicFourDWrapper">
                  <img class="postedPicFourDL" src="../../assets/static/png/repost/pic4-3.png" />
                  <img class="postedPicFourDR" src="../../assets/static/png/repost/pic4-4.png" />
                </div>
              </div>
              <div v-else>

              </div>
            </div>

            <!--  图片  -->
            <div v-show="needPicture" class="picture">
              <slot name="picture"></slot>
            </div>

            <!-- 时间 -->
            <span class="time font-time">
            <slot name="time"></slot>
          </span>
          </div>
          <More class="more"/>
        </div>

        <!-- 转赞评 -->
        <div class="shareLikeCommentWarpper rowWarpper">

          <div class="noPaddingLike rowWarpper">
            <div @click="like" class="rowWarpper">
              <ai-xin-icon v-show="!likeStatusSelf" class="like"/>
              <like v-show="likeStatusSelf" class="like"/>
            </div>
            <span class="likeNum fontStyle">
                 {{ likeArtical }}
           </span>
          </div>

          <div @click="goReplyDetail" class="likeWarpper rowWarpper">
            <PingLunIcon class="comment"/>
            <span class="likeNum fontStyle">
                 {{ commentArtical }}
          </span>
          </div>

          <div class="likeWarpper rowWarpper">
            <div @click="share">
              <ZhuanFaIcon class="share"/>
            </div>
            <span class="likeNum fontStyle">
             {{ shareArtical }}
           </span>
          </div>

          <div @click="copyArtical" v-clipboard:copy="messageId" class="likeWarpper rowWarpper">
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
import WealthIcon from '../Icon/profile/WealthIcon'
import ZhuanFaIcon from '../Icon/profile/ZhuanFaIcon'
import VipSingal from '../../assets/static/svg/home/VipSingal'
import More from '@/assets/static/svg/home/More'
import Flash from '@/views/index/Components/Icon/Flash'
import like from '@/assets/static/svg/like'
//
import {likeReview, share, getArticleTopic, copyUrl} from '@/api/monico/home'


export default {
  name: 'repost',
  components: {
    // VBig,
    AiXinIcon, PingLunIcon, ShareIcon, WealthIcon, ZhuanFaIcon,
    VipSingal,
    More,
    Flash,
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
      likeStatusSelf: false,
      topics: []
    }
  },
  props: {
    // 总高度
    height: {
      type: String,
      default: '128px'
    },
    picCount: {
      type: Number,
      default: 4
    },
    // 消息区高度
    messageHeight: {
      type: String,
      default: '128px'
    },
    // 是否加v
    IsV: {
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
      type: Number,
      request: true
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
      this.$emit('flush')
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
      this.$router.push({name: 'otherPosts', params: {userid: this.userid}})
    },
    /**
     * 进入文章详情
     */
    goReplyDetail() {
      this.$router.push({name: 'postDetail', params: {messageId: this.messageId}})
    },
    copyArtical() {
      let pd = {
        article_id: this.messageId
      }
      this.copyUrl(pd)
      this.$message.info('复制成功')
    },
    // --------------------- axios ---------------
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
    }
  },
  watch: {
    /**
     * 点赞状态
     * @param val
     */
    likeStatus: function (val) {
      this.likeStatusSelf = val !== 0
    }
  },
  mounted() {
    this.likeStatusSelf = this.likeStatus !== 0
    let pd = {
      article_id: this.messageId,
      page: 1,
      pagesize: 10
    }
    this.getArticleTopic(pd)
  }
}
</script>

<style scoped>
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
  align-self: flex-start;
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
  margin-bottom: 10px;
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
  margin-top: 30px;
  margin-right: 30px;
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
.postedprofileName {
  display: flex;
  align-items: center;
  margin: 12px 14px 4px 14px;
}
.postedProfile {
  width: 25px;
  width: 25px;
}
.postedNameWrapper {
  height: 16px;
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 16px;
  -webkit-background-clip: text;
  margin-left: 12px;
}
.postedProfileWrapper {
  display: flex;
  align-items: center;
}
.posted {
  font-size: 16px;
  font-weight: 400;
  color: #D4D4D4;
  line-height: 22px;
  margin: 0px 14px 12px 14px;
}
.postedWrapper {
  width: 484px;
  border-radius: 8px;
  border: 1px solid #56585E;
  /*padding: 12px 14px 14px 14px;*/
  margin-bottom: 14px;
}
.postedPicArea {
  width: 484px;
  height: 229px;
  background: #1F1F1F;;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
}
.postedPicOne {
  width: 484px;
  height: 229px;
}
.postedPicTwoL {
  width: 239px;
  height: 229px;
}
.postedPicTwoR {
  margin-left: 6px;
  width: 239px;
  height: 229px;
}
.postedPicTwo {
  width: 484px;
  height: 229px;
}
.postedPicThreeL {
  width: 239px;
  height: 229px;
}
.postedPicThreeRightWrapper {
  width: 239px;
  height: 229px;
  margin-left: 6px;
}
.postedPicThreeU {
  width: 239px;
  height: 111px;
}
.postedPicThreeD {
  width: 239px;
  height: 111px;
}
.postedPicFourUWrapper {
  display: flex;
  align-items: center;
  margin-bottom: 7px;

}
.postedPicFourDWrapper {
  display: flex;
  align-items: center;
}
.postedPicFourUL {
  width: 239px;
  height: 111px;
}
.postedPicFourUR {
  margin-left: 6px;
  width: 239px;
  height: 111px;
}
.postedPicFourDL {
  width: 239px;
  height: 111px;
}
.postedPicFourDR {
  margin-left: 6px;
  width: 239px;
  height: 111px;
}
.postedPicAreaFour {
  width: 484px;
  height: 229px;
 }

</style>
