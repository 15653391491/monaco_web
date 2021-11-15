<template>
  <div>
    <!--  头部  -->
    <div class="backWrapper">
      <span @click="goback" class="backIcon">&lt;</span>
      <span class="backName">{{ strLimit(name, 8) }}</span>
      <span class="UserIDCustome">@{{ uid }}</span>
    </div>

    <!--  tab  -->
    <div>
      <Tabber :current-tab="currentTab" @rankChooseChange="rankChooseChange">
      </Tabber>
    </div>

    <!--  列表  -->
    <div class="listWrapper">
      <FollowItem v-for="item in followers" :key="item.id" :info="item"/>
    </div>

  </div>
</template>

<script>
import Tabber from '../../../../../src/utils/components/tabber'
// import imgSelf from '@/components/utils/imgSelf'
import FollowItem from '@/views/index/Middle/followList/FollowItem'
// ------------------------ axios -------------------------
import {followersList, followingList, commonFans, getFollowingList, getFollowersList} from '@/api/monico/user'


export default {
  name: 'Middle',
  components: {
    Tabber,
    // imgSelf,
    FollowItem
  },
  data() {
    return {
      followers: [],
      currentTab: 'Followers',
      name: '',
      uid: ''
    }
  },
  methods: {
    /**
     * 粉丝列表tab改变
     * @param val
     */
    rankChooseChange(val) {
      this.currentTab = val
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
     * 关注或取消关注
     * @param info
     */
    followOrUnfollow(info) {
      info.followingStatus = !info.followingStatus
    },
    /**
     * 返回
     */
    goback() {
      this.$router.go(-1)
    },
    /**
     * 判断关注状态
     * @param val
     * @returns {boolean}
     */
    checkFollowStatus(val) {
      return val === 1
    },
    // --------------------- axios ------------------------------
    /**
     * 粉丝列表
     * @param pd
     */
    followingList(pd) {
      followingList(pd)
          .then(res => {
            this.followers = res.data.data.list
          })
    },
    /**
     * 关注人列表
     * @param pd
     */
    followersList(pd) {
      followersList(pd)
          .then(res => {
            this.followers = res.data.data.list
          })
    },
    /**
     * 共同关注
     * @param pd
     */
    commonFans(pd) {
      commonFans(pd)
          .then(res => {
            this.followers = res.data.data.list
          })
    },
    /**
     * 根据uid获取粉丝列表
     * @param pd
     */
    getFollowersList(pd) {
      getFollowersList(pd)
          .then(res => {
            this.followers = res.data.data.list
          })
    },
    /**
     * 根据uid获取关注人列表
     * @param pd
     */
    getFollowingList(pd) {
      getFollowingList(pd)
          .then(res => {
            this.followers = res.data.data.list
          })
    }
  },
  mounted() {
    this.name = this.$route.query.name
    this.uid = this.$route.query.uid
    this.currentTab = this.$route.query.tab
    let pd = {
      page: 1,
      limit: 10,
      uid: this.uid
    }
    if (this.currentTab === 'Following') {
      this.getFollowersList(pd)
    } else if (this.currentTab === 'Followers') {
      this.getFollowingList(pd)
    } else if (this.currentTab === 'tab1') {
      this.commonFans(pd)
    }
  },
  watch: {
    currentTab(val) {
      const pd = {
        page: 1,
        limit: 10,
        uid: this.uid
      }
      if (val === 'Following') {
        this.getFollowersList(pd)
      } else if (val === 'Followers') {
        this.getFollowingList(pd)
      } else if (this.currentTab === 'tab1') {
        this.commonFans(pd)
      }
    }
  }
}
</script>

<style scoped>


.backWrapper {
  width: 614px;
  height: 36px;
  background: #1F1F1F;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.backIcon {
  color: #FFFFFF;
  margin-left: 17px;
}

.backIcon:hover {
  cursor: pointer;
}

.backName {
  width: 78px;
  height: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 16px;
  margin-left: 20px;
}

.UserIDCustome {
  width: 62px;
  height: 12px;
  font-size: 12px;
  font-weight: 400;
  color: #898989;
  line-height: 12px;
  margin-left: 8px;
}

.listWrapper {
  width: 614px;
  background: #1F1F1F;
  border-radius: 4px;
  padding-top: 20px;
}

.ListItemWrapper {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profileWrapper {
  width: 80px;
  height: 54px;
  display: flex;
  justify-content: center;
}

.profileWrapper img {
  width: 40px;
  height: 40px;
}

.nameStatusWrapper {
  width: 429px;
  height: 42px;

}

.name {
  width: 45px;
  height: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 16px;
  -webkit-background-clip: text;
  margin-bottom: 10px;
  margin-top: 6px;
}

.status {
  height: 16px;
  font-size: 12px;
  font-weight: 400;
  color: #D4D4D4;
  line-height: 16px;
}

.followWrapper {
  outline: none;
  border-color: transparent;
  width: 85px;
  height: 35px;
  background: #BDA28D;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.followSpan {
  width: 45px;
  height: 14px;
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  color: #161616;
  line-height: 14px;
}

.followWrapperFollowing {
  width: 85px;
  height: 35px;
  border-radius: 20px;
  background-color: #1F1F1F;
  border: 2px solid #BDA28D;
  display: flex;
  align-items: center;
  justify-content: center;
}

.followSpanFollowing {
  width: 67px;
  height: 14px;
  font-size: 14px;
  font-weight: 500;
  color: #BDA28D;
  line-height: 14px;
}

</style>
