<template>
  <div class="warpper colWarpper">
    <TabSelf
        class="rankTop"
        @rankChooseChange="rankChooseChange"/>


    <div class="warpperRank">
      <Rank v-show="!rankType"/>
      <NFTRank
          class="nftRank"
          v-show="rankType"/>
    </div>
  </div>
</template>

<script>
import Rank from './Rank'
import TabSelf from './rankTop'
import NFTRank from './NFTRankTableBak'

export default {
  name: 'index',
  components: {
    Rank,
    TabSelf,
    NFTRank
  },
  data() {
    return {
      rankType: true
    }
  },
  methods: {
    /**
     * 排名选择改变
     */
    rankChooseChange() {
      this.rankType = !this.rankType
    }
  }
}
</script>

<style scoped>
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
  align-self: flex-start;
  width: 100%;
}

.warpperRank {
  width: 100%;
  background-color: rgba(31, 31, 31, 1);
  height: 892px;
  border-radius: 4px;
}

.rankTop {
  /*height: 28px;*/
  width: 370px;
}

.nftRank {
  margin-top: 19px;
}
</style>
