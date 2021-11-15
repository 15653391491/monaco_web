<template>
  <div class="warpper">
    <div
        class="Row"
        v-for="info in tableData"
        :key="info.rankNum">
      <div
          class="col1">
        <span
            class="fontStyleNum rankNum">
        {{ info.rankNum }}
        </span>
      </div>
      <div class="col2">
        <img
            class="profile"
            :src="info.imgUrl"
            alt="头像"/>
      </div>
      <div class="col3">
        <span class="fontStyleName">{{ info.name }}</span>
      </div>
      <div class="col4">
        <span class="fontStyleWealth">{{ info.wealth }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import People from "../../../utils/Icon/rank/People";
// import AiXin from "../../../utils/Icon/rank/AiXin";

export default {
  name: 'rankTable',
  components: {
    // People,
    // AiXin
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
      //  ------------------ 样式 --------
    }
  },
  methods: {
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
    }
  }
}
</script>

<style>
/*------------- 其他 ------------------*/
.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  border: 1px solid transparent;
  border-bottom-color: #2E2E2E !important
}

.el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: #1F1F1F;
}

.el-table tr {
  background-color: transparent;
}
</style>
<style scoped>
.warpper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}

.Row {
  margin: 0 auto;
  width: 336px;
  height: 66px;

  border-bottom: 1px solid rgba(46, 46, 46, 1);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
}

/*----------- 字体 ----------------*/
/*排名编号*/
.fontStyleNum {
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 400;
  color: #BDA28D;
  line-height: 18px;
}

.fontStyleName {
  font-size: 12px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 16px;
}

.fontStyleWealth {
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 500;
  color: rgba(189, 162, 141, 1);
  line-height: 16px;
}

/*------------- 第一列 ----------------*/
.col1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-end;

  width: 12px;
}

.rankNum {
  width: 11px;
  margin-left: 1px;
}

/*----------- 第二列 --------------*/
.col2 {
  margin-left: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

/*头像*/
.profile {
  width: 42px;
  height: 42px;
}

/*------------ 第三列 ----------------*/
.col3 {
  text-align: left;
  width: 120px;
  margin-left: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

/*------------ 第四列 ---------------*/

.col4 {
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bigHead {
  width: 75px;
  height: 75px;
}

.top {
  margin: -32px 0 14px 37px;
  width: 51px;
  height: 32px;
  z-index: 100;
}

.rankNum {
  width: 11px;
  height: 16px;

  font-size: 16px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: normal;
  color: #BDA28D;
  line-height: 16px;
}

/*--------------------------------------------*/
.rankTable {
  width: 315px;
  height: 892px;

  background-color: #1F1F1F;
  border-bottom-color: #1F1F1F;
  overflow: hidden;
}


.userName {
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 30px;*/
  width: 182px;
  height: 460px;
}

.userName2 {
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 14px;*/
}

.wealthStyle {
  width: 90px;
  height: 18px;
  font-size: 14px;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-weight: 400;
  color: #BDA28D;
  line-height: 18px;
}


.topOne {
  /*position: absolute;*/
  /*left: 61px;*/
  /*top: 60px;*/
  width: 51px;
  height: 460px;

  z-index: 100;
}

.topTwo {
  /*position: absolute;*/
  /*left: 61px;*/
  /*top: 158px;*/
  width: 51px;
  height: 460px;

  z-index: 100;
}

.topThree {
  /*position: absolute;*/
  /*left: 61px;*/
  /*top: 258px;*/
  width: 51px;
  height: 460px;

  z-index: 100;
}

.num1Big {
  /*position: absolute;*/
  /*left: 13px;*/
  /*top: 56px;*/
  width: 47px;
  height: 18px;
}

.num2Big {
  /*position: absolute;*/
  /*left: 138px;*/
  /*top: 56px;*/
  width: 47px;
  height: 18px;
}

.num1Small {
  /*position: absolute;*/
  /*left: 13px;*/
  /*top: 38px;*/
  width: 47px;
  height: 18px;
}

.num2Small {
  /*position: absolute;*/
  /*left: 138px;*/
  /*top: 38px;*/
  width: 47px;
  height: 18px;
}

.people1Big {
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 58px;*/
  width: 11px;
  height: 14px;
}

.people1Small {

  /*position: absolute;*/
  /*left: 0;*/
  /*top: 40px;*/
  width: 11px;
  height: 14px;
}

.aixin1Big {
  /*position: absolute;*/
  /*left: 120px;*/
  /*top: 58px;*/
  width: 11px;
  height: 14px;
}

.aixin1Small {
  /*position: absolute;*/
  /*left: 120px;*/
  /*top: 40px;*/
  width: 11px;
  height: 14px;
}
</style>
