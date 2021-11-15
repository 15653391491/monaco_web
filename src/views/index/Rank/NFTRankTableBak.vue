<template>
  <div class="warpper colWarpper">
    <div
        :class="{heightRow:index<=2,row:index>2}"
        v-for="(info,index) in tableData"
        class="rowWarpper"
        :key="info.uid">

      <div class="col1 colWarpper">
        <!-- 1-3 -->
        <div class="profile colWarpper" v-show="index<=2">
          <div class="colWarpper" @click="gotoOthersDetail(info.uid)">
            <img-self :src="info.bg_image" alt="头像" class="bigProfile canClick"/>
          </div>
          <!--          <img-->
          <!--              class="bigProfile"-->
          <!--              :src="info.bg_image" alt="头像"/>-->
          <img class="rankImg"
               :src="topMessage(index)"
               alt="排名"/>
        </div>
        <!--    3-10    -->
        <div
            class="rowWarpper profile2 doubleCol"
            v-show="index>2">
          <div
              class="rankNum">{{ index + 1 }}
          </div>
          <div  @click="gotoOthersDetail(info.uid)" class="rowWarpper">
            <img-self :src="info.bg_image" alt="头像" class="smallProfile canClick"/>
          </div>
        </div>

      </div>

      <div
          :class="{col2:index<=2,col2another:index>2}"
          class="colWarpper">
        <!--        名字-->
        <span  @click="gotoOthersDetail(info.uid)" class="fontStyle name canClick">{{ strLimit(info.username, 12) }}</span>
        <!--        关注-->
        <div
            :class="{condition:index<=2,conditionAnother:index>2}"
            class="rowWarpper">
          <div class="follow rowWarpper">
            <People class="people"/>
            <span class="font-people">{{ info.followers }}</span>
          </div>
          <div class="wealth rowWarpper">
            <AiXin class="aixin"/>
            <span class="font-people">{{ info.likes }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import People from '../../../utils/Icon/rank/People'
import AiXin from '../../../utils/Icon/rank/AiXin'
import {influentials} from '@/api/monico/home'
import imgSelf from '@/components/utils/imgSelf'

export default {
  name: 'rankTable',
  components: {
    People,
    AiXin,
    imgSelf
  },
  data() {
    return {
      tableData: [
        {
          rankNum: 1,
          name: 'Cindy Zhou',
          wealth: '$ 1,223,87',
          imgUrl: require('../../../assets/static/Group 21075(1).png'),
          topUrl: require('../../../assets/page/rank/top1.png')
        }, {
          rankNum: 2,
          name: 'Bożenka Malina Kuen',
          wealth: '$ 1,223,87',
          imgUrl: require('../../../assets/static/Group 21075(2).png'),
          topUrl: require('../../../assets/page/rank/top2.png')
        }, {
          rankNum: 3,
          name: 'Bożenka Malina Kuen',
          wealth: '$ 1,223,87',
          imgUrl: require('../../../assets/static/Group 21075(3).png'),
          topUrl: require('../../../assets/page/rank/top3.png')
        }, {
          rankNum: 4,
          name: 'Bożenka Malina Kuen',
          wealth: '$ 1,223,87',
          imgUrl: require('../../../assets/static/Group 21075(4).png')
        }, {
          rankNum: 5,
          name: 'Bożenka Malina Kuen',
          wealth: '$ 1,223,87',
          imgUrl: require('../../../assets/static/Group 21075(5).png')
        }, {
          rankNum: 6,
          name: 'Bożenka Malina Kuen',
          wealth: '$ 1,223,87',
          imgUrl: require('../../../assets/static/Group 21075(6).png')
        }, {
          rankNum: 7,
          name: 'Bożenka Malina Kuen',
          wealth: '$ 1,223,87',
          imgUrl: require('../../../assets/static/Group 21075.png')
        }, {
          rankNum: 8,
          name: 'Bożenka Malina Kuen',
          wealth: '$ 1,223,87',
          imgUrl: require('../../../assets/static/Group 21075.png')
        }, {
          rankNum: 9,
          name: 'Bożenka Malina Kuen',
          wealth: '$ 1,223,87',
          imgUrl: require('../../../assets/static/Group 21075.png')
        }, {
          rankNum: 10,
          name: 'Bożenka Malina Kuen',
          wealth: '$ 1,223,87',
          imgUrl: require('../../../assets/static/Group 21075.png')
        }],
      top1: require('../../../assets/page/rank/top1.png'),
      top2: require('../../../assets/page/rank/top2.png'),
      top3: require('../../../assets/page/rank/top3.png'),

      //  ------------------ 样式 --------
    }
  },
  methods: {

    /**
     * 限制字符串长度
     * @param str
     * @param limit 字符串长
     * @returns {*}
     */
    strLimit(str, limit) {
      if (typeof (str) === String) {
        return str.length > limit ? str.slice(0, limit) + '...' : str
      } else {
        return str
      }
    },
    /**
     * 跳转其他人的详情页
     * @param uid
     */
    gotoOthersDetail(uid) {
      this.$router.push({name: 'otherPosts', query: {userid: uid}})
    },
    //  ------------- 样式回调函数 -----------------

    /**
     * 单元格样式回调a
     * @returns {{}}
     */
    cellStyle(obj) {
      if (obj.rowIndex < 3 && obj.columnIndex === 0) {
        return {
          'text-align': 'center',
          height: '80px !important',
          'background-color': '#1F1F1F',
          'padding': '0px',
          'border-bottom-color': '1px solid #2E2E2E !important',
        }
      }

      return {
        'background-color': '#1F1F1F',
        'padding': '0px',
        'border-bottom-color': '1px solid #2E2E2E !important',
      }
    },
    topMessage(index) {
      switch (index) {
        case 0:
          return this.top1
        case 1:
          return this.top2
        case 2:
          return this.top3
      }
    },
    /**
     * 行样式回调
     * @returns {{}}
     */
    rowStyle(obj) {
      if (obj.rowIndex < 3) {
        return {
          'height': '106px',
          'padding': '0px',
          'border-bottom-color': '1px solid #2E2E2E !important',
        }
      }
      return {
        'height': '64px',
        'padding': '0px',
        'border-bottom-color': '1px solid #2E2E2E !important',

      }
    },
    /**
     *
     * @param obj
     * @returns {{colspan: number, rowspan: number}}
     */
    arraySpanMethod(obj) {
      if (obj.rowIndex < 3 && obj.columnIndex === 0) {
        return {
          rowspan: 1,
          colspan: 2
        }
      }
      if (obj.rowIndex < 3 && obj.columnIndex === 1) {
        return {
          rowspan: 1,
          colspan: 0
        }
      }
      return {
        rowspan: 1,
        colspan: 1
      }
    },
    influentials() {
      const pd = {
        limit: 10
      }
      influentials(pd)
          .then(res => {
            this.tableData = res.data.data.list
          })
    },
    imgError(item) {
      console.log('111', item)
    }
  },
  mounted() {
    this.influentials()
  }
}
</script>

<style scoped>
.canClick:hover {
  cursor: pointer;
}

.colWarpper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.rowWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.warpper {
  width: 370px;
}

/*1-3行*/
.heightRow {
  height: 105px;
  width: 316px;
  border-bottom: 1px solid rgba(46, 46, 46, 1);
}

/*3-10行*/
.row {
  width: 316px;
  height: 70px;
  border-bottom: 1px solid rgba(46, 46, 46, 1);

}

/*------------- 第一列 ----------------*/
.col1 {
  height: 100%;
}

/*1-3头像*/
.profile {
  width: 85px;
}

.bigProfile {
  margin-top: 14px;
  border-radius: 50%;
  margin-left: -3px;
  /*align-self: flex-start;*/
  width: 75px;
  height: 75px;
}

/*排名*/
.rankNum {
  width: 11px;
  height: 16px;
  font-size: 16px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 700;
  color: #BDA28D;
  line-height: 16px;
  margin-left: 1px;
  align-self: center;
}

.profile2 {
  width: 78px;
}

.smallProfile {
  border-radius: 50%;
  width: 42px;
  height: 42px;
  margin-left: 24px;
}

.rankImg {
  align-self: flex-end;
  margin-top: -26px;
  width: 50px;
  height: 27px;
}

.doubleCol {
  height: 100%;
}

/*----------------------- 第二列 ---------------------*/
.col2 {
  margin-left: 17px;
}

.col2another {
  margin-left: 26px;
}

.name {
  align-self: flex-start;
  width: 182px;
}

.condition {
  width: 100%;
  margin-top: 10px;
  justify-content: space-between;
}

.conditionAnother {
  width: 100%;
  margin-top: 8px;
  justify-content: space-between;
}

.people {
  width: 11px;
  height: 14px;
}

.follow {
}

.follow > span {
  margin-left: 6px;
}

.wealth {
  justify-content: flex-start;
  width: 79px;
}

.wealth > span {
  margin-left: 6px;
}

.people + span {
}

.aixin {
  width: 14px;
  height: 14px;
}

.aixin + span {
}

/*----------- 字体 ----------------*/
.fontStyle {
  font-size: 16px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 16px;
}

.font-people {
  align-self: baseline;
  letter-spacing: 0.5px;
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 400;
  color: #BDA28D;
  line-height: 18px;
}

</style>
