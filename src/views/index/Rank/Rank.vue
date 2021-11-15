<template>
  <div class="warpper colWarpper">
    <!--  前三  -->
    <div class="top rowWarpper">

      <div class=" topOne colWarpper">
        <img class="rankHead1" src="../../../assets/static/png/HeadImg.png" alt="头像1"/>
        <shadow94 class="shadow94"/>
        <one class="num"/>
        <span class="rankName font-topName">HarleyQ</span>
        <span class="rankMoney font-topWealth">$ 21,345,71</span>
      </div>

      <div class=" topTow colWarpper">
        <img class="rankHead2" src="../../../assets/static/png/HeadImg2.png" alt="头像2"/>
        <shadow84 class="shadow84"/>
        <two class="num"/>
        <span class="rankName font-topName">Janemo</span>
        <span class="rankMoney font-topWealth">$ 17,512,908</span>
      </div>

      <div class=" topThree colWarpper">
        <img class="rankHead3" src="../../../assets/static/png/HeadImg3.png" alt="头像3"/>
        <shadow84 class="shadow84"/>
        <three class="num"/>
        <span class="rankName font-topName">Kingson</span>
        <span class="rankMoney font-topWealth">$ 13,223,76</span>
      </div>

    </div>
    <!--   排名   -->
    <div class="rankWarpper colWarpper">
      <div
          class="Row rowWarpper"
          v-for="info in tableData"
          :key="info.rankNum">
        <div class="col1 rowWarpper">
          <span class="font-rankNum rankNum">
            {{ info.rankNum }}
          </span>
        </div>
        <div class="col2 rowWarpper">
          <img
              class="profile"
              :src="info.imgUrl"
              alt="头像"/>
        </div>
        <div class="col3 rowWarpper">
          <span class="font-name">{{ info.name }}</span>
        </div>
        <div class="col4 rowWarpper">
          <span class="font-wealth">{{ info.wealth }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../styles/home/rankStyle.css'
import shadow84 from '../../../assets/static/svg/rank/shadow84'
import shadow94 from '../../../assets/static/svg/rank/shadow94'
import one from '@/assets/static/svg/rank/one'
import two from '@/assets/static/svg/rank/two'
import three from '@/assets/static/svg/rank/three'

export default {
  name: 'Rank',
  components: {
    // rankTop
    shadow84,
    shadow94,
    one,
    two,
    three
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
    }
  }
}
</script>

<style scoped>
.warpper {
  width: 370px;
}

/*-------------- 前三 ---------------*/

.top {
  align-self: flex-start;
}

.topOne {
  order: 2;
  margin-left: 17px;
  margin-top: 19px;
  align-self: flex-start;
}

.topTow {
  order: 1;
  margin-left: 35px;
  margin-top: 49px;
  align-self: flex-start;
}

.topThree {
  order: 3;
  margin-left: 18px;
  margin-top: 49px;
  align-self: flex-start;
}

.shadow94 {
  margin-top: -90px;
  width: 96px;
  height: 96px;
}

.shadow84 {
  margin-top: -79px;
  height: 86px;
  width: 86px;
}

.num {
  align-self: flex-end;
  margin-right: 1px;
  height: 30px;
  width: 30px;
  margin-top: -30px;
}

.rankHead1 {
  width: 84px;
  height: 84px;

  border-radius: 50%;
}


.rankHead2 {
  width: 74px;
  height: 74px;

  border-radius: 50%;
}

.rankHead3 {
  width: 74px;
  height: 74px;

  border-radius: 50%;
}

.rankName {
  margin-top: 12px;
}

.rankMoney {
  margin-top: 4px;
}

.rankWarpper {
  margin-top: 29px;
}

/*------- 排名表 ---------------*/
.Row {
  height: 66px;
  width: 315px;
  align-self: flex-start;
  border-bottom: 1px solid rgba(46, 46, 46, 1);
}

/*第一列*/
.col1 {
  width: 17px;
}

.col2 {
  margin-left: 23px;
}

.col3 {
  width: 97px;
  margin-left: 10px;
}

.col4 {
  margin-left: 16px;
}

</style>
