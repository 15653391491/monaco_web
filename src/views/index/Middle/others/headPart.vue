<template>
  <div class="warpper">
    <!--  背景图  -->
    <div class="backGroundWarpper">
      <div class="backGround">
        <img-self2 :src="bgImage" alt="背景图"/>
      </div>
      <!--      <div v-if="needMengBan" class="mengban"></div>-->
    </div>

    <!--  头像 资料 关注按钮  -->
    <div class="infoWarpper">

      <div class="rowWarpper">
        <!--  头像  -->
        <div class="profileWarpper">
          <img-self class="headImg" :src="head" alt="头像"/>
          <SingalIcon v-if="showNft" class="singalIcon"/>
        </div>

        <!--  资料  -->
        <div class="infoWarpper2">
          <div class="nameWarpper">
            <span class="name fontStyle">{{ strLimit(userName, 5) }}</span>
            <VipIcon1 v-if="gender===1" class="VipIcon1"/>
            <WomanIcon v-if="gender===2" class="VipIcon1"/>
            <!--            <VipIcon2 class="VipIcon2"/>-->
            <!--            <span class="money fontStyle2">{{ wealth }}</span>-->
          </div>
          <span class="aite fontStyle3">@ {{ uid }}</span>
          <span class="jieshao fontStyle4">
            {{ strLimit(bio, 32) }}
        </span>
        </div>
      </div>
      <!--  按钮  -->
      <div class="buttonWarpper">
        <button v-if="!isOthers" class="edit">
          <EditIcon class="editIcon"/>
          <span class="editText fontStyle5">edit</span>
        </button>

        <HandsIcon
            v-show="isFollowed"
            v-if="isOthers" class="handsButton"/>
        <div
            class="followButtonDiv"
            @click="changeTypeToFollow"
            @mouseout="changeTypeToFollowing"
            @mouseover="changeTypeToUnfollow">
          <div
              @click="unfollow">
            <FollowButton
                @textClick="changeTypeToFollow"
                :type="buttonType"
                v-if="isOthers"
                v-show="isFollowed"
                class="followButton"/>
          </div>
          <div
              @click="follow">
            <FollowButton2
                @textClick="changeTypeToFollow"
                class="followButton"
                v-if="isOthers"
                v-show="!isFollowed"/>
          </div>
        </div>
      </div>

    </div>

    <!--  关注 点赞  -->
    <div class="follow">
      <span @click="goFollowing('Following')">
        <span class="Num fontStyle7">{{ following }}</span>
        <span class="canPoint following fontStyle6">Following</span>
      </span>
      <span @click="goFollowing('Followers')">
        <span class="Num fontStyle7">{{ followers }}</span>
        <span class="canPoint Followers fontStyle6">Followers</span>
      </span>
      <span>
        <span class="Num fontStyle7">{{ likes }}</span>
        <span class="Likes fontStyle6">Likes</span>
      </span>
    </div>

    <!-- 谁关注了 -->
    <div class="followWarpper">
      <div
          v-for="(item,index) in commonFansProfiles"
          :key="index">
        <img-self
            :src="item.head"
            v-if="index<=1&&commonFansProfiles.length!==0"
            v-show="isOthers"
            class="followedIcon"/>
      </div>
      <!--      <FollowedIcon2 v-if="isOthers" class="followedIcon2"/>-->
      <span
          @click="goFollowing('tab1')"
          v-show="isOthers"
          v-if="commonFansProfiles.length!==0"
          class="whoFollowed fontStyle8">
          Followed by Nicki and Drizzy
      </span>
    </div>

  </div>
</template>

<script>
import SingalIcon from '../../../../utils/Icon/profile/SingalIcon'
import VipIcon1 from '../../../../assets/static/svg/profile/Male'
// import VipIcon2 from "../../../../utils/Icon/profile/VipIcon2"
import EditIcon from '../../../../utils/Icon/profile/EditIcon'
import WomanIcon from '../../../../utils/Icon/profile/WomanIcon'
import FollowButton from '../../../../utils/Icon/profile/FollowButton'
import HandsIcon from '../../../../utils/Icon/profile/HandsIcon'
// import FollowedIcon1 from '../../../../utils/Icon/profile/FollowedIcon1'
// import FollowedIcon2 from '../../../../utils/Icon/profile/FollowedIcon2'
import FollowButton2 from '../../../../utils/Icon/profile/FollowButton2'
import imgSelf from '@/components/utils/imgSelf'
import imgSelf2 from '@/components/utils/imgSelf2'
// -------------------------------- axios --------------------------------------
import {getUser} from '@/api/monico/profile'
import {followUser} from '@/api/monico/home'
import {commonFans} from '@/api/monico/user'

export default {
  name: 'Head',
  components: {
    SingalIcon,
    VipIcon1,
    // VipIcon2,
    EditIcon,
    WomanIcon,
    FollowButton,
    HandsIcon,
    // FollowedIcon1,
    // FollowedIcon2,
    FollowButton2,
    imgSelf,
    imgSelf2
  },
  data() {
    return {
      headImg: require('../../../../assets/page/profile/head1.png'),
      buttonType: 'following',
      isFollowed: true,
      info: {},
      commonFansProfiles: [],
      //   --------------------- 个人信息 ---------------------
      bgImage: '',
      head: '',
      showNft: false,
      userName: '',
      gender: 1,
      uid: 1,
      bio: '',
      following: 0,
      followers: 0,
      likes: 0
    }
  },
  props: {
    isVip: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'Jon Snow'
    },
    wealth: {
      type: String,
      default: '$21,378,794'
    },
    isMan: {
      type: Boolean,
      default: false
    },
    AiteName: {
      type: String,
      default: '@Jonsnow1107'
    },
    isOthers: {
      type: Boolean,
      default: false
    },
    needMengBan: {
      type: Boolean,
      default: true
    },
    userid: {
      type: Number,
      request: true
    },
    flush: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * 关注类型变为未关注
     */
    changeTypeToUnfollow() {
      this.buttonType = 'unfollow'
    },
    /**
     *关注
     */
    changeTypeToFollowing() {
      this.buttonType = 'following'
    },
    /**
     * 取关
     */
    changeTypeToFollow() {
      this.isFollowed = !this.isFollowed
    },
    //
    /**
     * 关注
     */
    follow() {
      let pd = {
        type: 1,
        follow_uid: this.uid,
        uid: this.uid
      }
      this.followUser(pd)
      this.getUser(pd)
    },
    /**
     * 取消关注
     */
    unfollow() {
      let pd = {
        type: 2,
        follow_uid: this.uid,
        uid: this.uid
      }
      this.followUser(pd)
      this.getUser(pd)
    },
    /**
     * 跳转关注页面
     * @param tab
     */
    goFollowing(tab) {
      const params = {
        tab,
        type: 2, // 1-自己 2-别人
        name: this.info.username,
        uid: this.$route.query.userid
      }
      this.$router.push({name: 'followList', query: params})
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
     * 返回共同关注人列表，长度大于二截取前二
     * @returns {string|*}
     */
    commonFansImg() {
      if (this.commonFansProfiles.length >= 2) {
        return this.commonFansProfiles.slice(0, 1)
      } else {
        return this.commonFansProfiles
      }
    },
    // ------------------------------ axios -----------------------
    /**
     * 获取用户详细
     * @param pd
     */
    getUser(pd) {
      getUser(pd)
          .then(res => {
            this.$emit('getdetail', res.data.data)
            this.isFollowed = res.data.data.type !== 1
            this.info = res.data.data
          })
    },
    /**
     * 关注或取消关注
     * @param pd
     */
    followUser(pd) {
      followUser(this.$qs.stringify(pd))
          .then(res => {
            console.log(res.data.data)
          })
    },
    /**
     * 共同关注
     * @param pd
     */
    commonFans(pd) {
      commonFans(pd)
          .then(res => {
            this.commonFansProfiles = res.data.data.list
          })
    }
  },
  mounted() {
    this.uid = this.$route.query.userid
    let pd = {
      uid: this.uid
    }
    this.getUser(pd)
    this.commonFans(pd)
  },
  watch: {
    userid(val) {
      this.uid = val

      let pd = {
        uid: this.uid
      }
      this.getUser(pd)
    },
    flush() {
      let pd = {
        uid: this.uid
      }
      this.getUser(pd)
    },
    info(val) {
      this.bgImage = val.bg_image
      this.head = val.head
      this.showNft = val.show_nft
      this.userName = val.username
      this.gender = val.gender
      this.bio = val.bio
      this.following = val.following
      this.followers = val.followers
      this.likes = val.likes
    },
    $route() {
      this.uid = this.$route.query.userid
      let pd = {
        uid: this.uid
      }
      this.getUser(pd)
    }
  }
}
</script>

<style scoped>
.canPoint:hover {
  cursor: pointer;
}

/*----------- 字体 ------------*/
.fontStyle {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  text-align: center;
  font-size: 20px;
  -webkit-background-clip: text;
  color: #FFFFFF;
  line-height: 20px;
}

.fontStyle2 {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-style: normal;
  text-align: center;
  -webkit-background-clip: text;
  font-size: 16px;
  font-weight: 500;
  color: #F5A623;
  line-height: 10px;
}

.fontStyle3 {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #898989;
  line-height: 12px;
}

.fontStyle4 {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #D4D4D4;
  line-height: 20px;
  text-align: left;
}

.fontStyle5 {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #BDA28D;
  line-height: 21px;
}

.fontStyle6 {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #898989;
  line-height: 18px;
  -webkit-background-clip: text;
}

.fontStyle7 {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #E5E5E5;
  line-height: 16px;
  -webkit-background-clip: text;
}

.fontStyle8 {
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #D4D4D4;
  line-height: 14px;
}

/*---------- 位置 -------------*/
.warpper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}

.backGroundWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
}

.backGround {
  width: 614px;
  height: 177px;
  overflow: hidden;
  background-repeat: no-repeat;
}

.mengban {
  width: 614px;
  height: 177px;

  backdrop-filter: blur(20px);
}

.infoWarpper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
}

.infoWarpper2 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  margin-left: 14px;
}

.nameWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  margin-top: 10px;
}

.profileWarpper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}

.rowWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
}

.buttonWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  margin-top: 13px;
}

.followWarpper {
  margin-top: 14px;
  margin-left: 14px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.headImg {
  z-index: 10;
  width: 136px;
  height: 136px;
  margin-top: -49px;
  margin-left: 14px;

  border-radius: 78px;
  border: 4px solid rgba(22, 22, 22, 1);
}

.singalIcon {
  z-index: 11;
  width: 59px;
  height: 21px;
  margin-top: -14px;
  margin-left: 52px;
}

.name {
  width: 97px;
  height: 20px;
}

.VipIcon1 {
  margin-left: 6px;
  width: 18px;
  height: 18px;
}

.VipIcon2 {
  width: 16px;
  height: 16px;
  margin-left: 12px;
}

.money {
  width: 92px;
  height: 11px;
  margin-left: 6px;
  padding-top: 4px;
}

.aite {
  margin-top: 6px;
  width: 88px;
  height: 12px;
}

.jieshao {
  margin-top: 10px;
  width: 220px;
  height: 40px;
}

.edit {
  width: 72px;
  height: 460px;

  background: transparent;
  border-radius: 16px;
  outline: none;
  border: 2px solid #BDA28D;
}

.followButton {
  width: 84px;
  height: 32px;
}

.handsButton {
  margin-right: 11px;
  width: 34px;
  height: 34px;
}

.editIcon {
  width: 14px;
  height: 14px;
}

.editText {
  width: 28px;
  height: 20px;
}

.follow {
  margin-top: 25px;
  margin-left: 14px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  width: 28px;
  height: 20px;
}

.follow > span {
  height: 17px;

  border-left: 2px solid #898989;
}

.following {
  padding-right: 43px;
}

.Followers {
  padding-right: 35px;
}

.Num {
  padding-left: 11px;
  padding-right: 4px;
}

.whoFollowed {
  margin-left: 10px;
  width: 198px;
  height: 14px;
}

.whoFollowed:hover {
  cursor: pointer;
}

.followedIcon:nth-child(1) {
  margin-left: 0;
}

.followedIcon {
  width: 30px;
  height: 30px;
  margin-left: -6px;
  border-radius: 15px;
  z-index: 10;
}

.followButtonDiv:hover {
  cursor: pointer;
}
</style>
