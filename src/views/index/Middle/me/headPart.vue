<template>
  <div class="warpper">
    <!--  背景图  -->
    <div class="backGroundWarpper">
      <div class="backGround">
        <img-self :default-img-url="2" :src="info.bg_image" alt="背景图"/>
      </div>
      <!--      <div v-show="needMengBan" class="mengban"></div>-->
    </div>

    <!--  头像 资料 按钮  -->
    <div class="profileInfoButtonWarpper">

      <div class="profileInfoWarpper">
        <!--  头像  -->
        <div class="profileWarpper">
          <img-head class="headImg" :src="info.head" alt="头像"/>
          <SingalIcon v-if="info.nft_status!==0" class="singalIcon"/>
        </div>

        <!--  资料  -->
        <div class="infoWarpper">
          <div class="nameWarpper">
            <span class="name fontStyle">{{ strLimit(info.username, 12) }}</span>
            <Male v-show="info.gender===1" class="VipIcon1"/>
            <Famale v-show="info.gender===2" class="VipIcon1"/>
          </div>
          <span class="aite fontStyle3">@&nbsp;{{ strLimit(info.uid, 10) }}</span>
          <span class="jieshao fontStyle4">
            {{ strLimit(info.bio, 57) }}
          </span>
        </div>
      </div>

      <!--  按钮  -->
      <div class="buttonWarpper">
        <button class="edit" @click="editingProfile = true">
          <EditIcon class="editIcon"/>
          <span class="editText fontStyle5">edit</span>
        </button>
        <edit-profile-dialog :userInfo="info" :visible.sync="editingProfile" @editSuccess="editSuccess"/>
      </div>

    </div>

    <!--  关注 点赞  -->
    <div class="followingFollowerLike">
      <div @click="goFollowing('Following')" class="followingWrapper">
        <span class="followingCount">{{ info.following }}</span>
        <span class="following">Following</span>
      </div>
      <div @click="goFollowing('Followers')" class="followerWrapper">
        <span class="followersCount">{{ info.followers }}</span>
        <span class="followers">Followers</span>
      </div>
      <div class="likeWrapper">
        <span class="likesCount">{{ info.likes }}</span>
        <span class="likes">Likes</span>
      </div>
    </div>

  </div>
</template>

<script>
import SingalIcon from '../../../../utils/Icon/profile/SingalIcon'
import Male from '../../../../assets/static/svg/profile/Male'
import Famale from '@/assets/static/svg/profile/Famale'
import EditIcon from '../../../../utils/Icon/profile/EditIcon'
import EditProfileDialog from '@/components/EditProfileDialog.vue'
import imgSelf from '@/components/utils/imgSelf2'
import imgHead from '@/components/utils/imgSelf'
// ------------------------- axios ------------------------
import {detail} from '@/api/monico/profile'

export default {
  name: 'Head',
  components: {
    SingalIcon,
    Male,
    EditIcon,
    EditProfileDialog,
    Famale,
    imgSelf,
    imgHead
  },
  data() {
    return {
      headImg: require('../../../../assets/page/profile/HeadImage.png'),

      editingProfile: false,
      info: {}
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
  },
  methods: {
    detail(pd) {
      let that = this
      detail(pd)
          .then(res => {
            this.$emit('getdetail', res.data.data)
            that.info = res.data.data
          })
    },
    /**
     * 修改成功
     *
     */
    editSuccess() {
      this.editingProfile = !this.editingProfile
      this.$message.info('修改成功')
      this.detail({})
    },
    /**
     * 限制字符串长度
     * @param str
     * @param limit 字符串长
     * @returns {*}
     */
    strLimit(str, limit) {
      return str.length > limit ? str.slice(0, limit - 1) + '...' : str
    },
    /**
     * 跳转关注页面
     * @param tab
     */
    goFollowing(tab) {
      const params = {
        tab,
        type: 1, // 1-自己 2-别人
        name: this.info.username,
        uid: this.info.uid
      }
      this.$router.push({name: 'followList', query: params})
    }
  },
  mounted() {
    const pd = {}
    let postData = this.$qs.stringify(pd)
    this.detail(postData)
  }
}
</script>

<style scoped>
.canPoint:hover {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.warpper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}

/*背景*/
.backGroundWarpper {
  display: flex;
}

.backGround {
  width: 614px;
  height: 177px;
  overflow: hidden;

  background-repeat: no-repeat;
}

/* 头像 资料 按钮*/
.profileInfoButtonWarpper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
}

.profileInfoWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
}

.profileWarpper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
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
  width: 59px;
  height: 21px;
  z-index: 11;
  margin-top: -14px;
  margin-left: 52px;
}

.infoWarpper {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
}

.nameWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  margin-top: 10px;
}

.name {
  /*width: 97px;*/
  height: 20px;
}

.VipIcon1 {
  width: 18px;
  height: 18px;
  margin-left: 6px;
}

.aite {
  width: 88px;
  height: 12px;
  margin-top: 6px;
}

.jieshao {
  overflow: hidden;
  word-wrap: break-word;
  width: 220px;
  height: 40px;
  margin-top: 10px;
}

.buttonWarpper {
  margin-top: 10px;
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
/*---------- 位置 -------------*/

.edit {
  width: 72px;
  height: 32px;

  background: transparent;
  border-radius: 16px;
  outline: none;
  border: 2px solid #BDA28D;
}

.editIcon {
  width: 14px;
  height: 14px;
}

.editText {
  width: 28px;
  height: 20px;
}

.follow > span {
  height: 17px;

  border-left: 2px solid #898989;
}
.followingFollowerLike {
  display: flex;
  align-items: center;
}
.followingWrapper {
  display: flex;
  align-items: center;
}
.followerWrapper {
  margin-left: 43px;
  display: flex;
  align-items: center;
}
.likeWrapper {
  margin-left: 35px;
  display: flex;
  align-items: center;
}
.followingCount {
  font-size: 16px;
  font-weight: 500;
  color: #E5E5E5;
  line-height: 16px;
  -webkit-background-clip: text;
  margin-left: 9px;
  border-left: 2px solid #898989;
  padding-left: 9px;
}
.followersCount {
  font-size: 16px;
  font-weight: 500;
  color: #E5E5E5;
  line-height: 16px;
  -webkit-background-clip: text;
  margin-left: 9px;
  border-left: 2px solid #898989;
  padding-left: 9px;
}
.likesCount {
  font-size: 16px;
  font-weight: 500;
  color: #E5E5E5;
  line-height: 16px;
  -webkit-background-clip: text;
  margin-left: 9px;
  border-left: 2px solid #898989;
  padding-left: 9px;
}
.following {
  margin-left: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #898989;
  -webkit-background-clip: text;
}
.followers {
  margin-left: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #898989;
  -webkit-background-clip: text;
}
.likes {
  margin-left: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #898989;
  -webkit-background-clip: text;
}
</style>
