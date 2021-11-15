<template>
  <div class="ListItemWrapper">

    <!--    头像    -->
    <div class="profileWrapper" @click="gotoOthersProfile">
      <img-self class="head" :src="info.head" alt="头像"/>
    </div>

    <!--    名字 推文    -->
    <div class="nameStatusWrapper">
      <div class="name">
        <span>{{ strLimit(info.username, 26) }}</span>
      </div>
      <div class="status">
        <span>{{ strLimit(info.bio, 20) }}</span>
      </div>
    </div>

    <!--    关注按钮    -->
    <button
        v-show="!isMe"
        class="followButton"
        @click="followOrUnfollow"
        :class="{followWrapper:!followStatus,followWrapperFollowing:followStatus}">
      <span v-show="!followStatus" class="followSpan">Follow</span>
      <span v-show="followStatus" class="followSpanFollowing">Following</span>
    </button>

  </div>
</template>

<script>
// --------------------- css ----------------------
import '@/styles/followList/followList.css'
// ------------------ 组件 --------------------------------
import imgSelf from '@/components/utils/imgSelf'
// -------------------------- axios ------------------------
import {followUser} from '@/api/monico/home'
import {getUid} from '@/utils/tokenTools'

export default {
  name: 'FollowItem',
  components: {
    imgSelf
  },
  data() {
    return {
      followStatus: this.checkFollowStatus(this.info.follow_status),
      isMe: this.isme()
    }
  },
  methods: {
    /**
     * 关注或取消关注
     */
    followOrUnfollow() {
      let type
      if (this.followStatus) {
        this.followStatus = false
        type = 2
      } else {
        type = 1
        this.followStatus = true
      }
      const pd = {
        type,
        follow_uid: this.info.uid
      }
      this.followUser(pd)
    },
    /**
     * 判断关注状态
     * @param val
     * @returns {boolean}
     */
    checkFollowStatus(val) {
      return val === 1
    },
    /**
     * 限制字符串长度
     * @param str
     * @param limit 字符串长
     * @returns {*}
     */
    strLimit(str, limit) {
      if (typeof (str) == 'string') {
        return str.length > limit ? str.slice(0, limit - 1) + '...' : str
      } else {
        return str
      }
    },
    /**
     * 判断关注人或粉丝
     * @returns {boolean}
     */
    isme() {
      return this.info.uid === getUid()
    },
    /**
     * 前往别人主页
     */
    gotoOthersProfile() {
      if (this.isMe) {
        this.$router.push({name: 'posts'})
      } else {

        this.$router.push({name: 'otherPosts', query: {userid: this.info.uid}})
      }
    },
    //  ---------------------------- axios ----------------------
    /**
     * 关注或取消关注
     * @param pd
     */
    followUser(pd) {
      followUser(this.$qs.stringify(pd))
          .then(res => {
            console.log(res.data.data)
          })
    }
  },
  mounted() {
  },
  watch: {
    info(val) {
      console.log('info', val)
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.followButton:hover {
  cursor: pointer;
}
</style>
