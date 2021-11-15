<template>
  <div class="contain">
    <div class="infoWarpper">
      <span class="NftNum fontStyle1">86</span>
      <span class="Nft fontStyle2">NFTs</span>
      <!--      <span class="Wealth fontStyle3">$21,378,794</span>-->
    </div>

    <div class="PictureGroup">
      <div class="row">
        <div class="col">
          <img
              class="picture"
              src="../../../../../../assets/page/profile/NFtPicture.png"
              alt="nft"/>
          <span class="introduce fontStyle4">
            Pudgy Penguin V2 Pudgy Penguin #0
          </span>
        </div>
        <div class="col">
          <img
              class="picture"
              src="../../../../../../assets/page/profile/NFtPicture.png"
              alt="nft"/>
          <span class="introduce fontStyle4">
            Pudgy Penguin #1234
          </span>
        </div>
        <div class="col">
          <img
              class="picture"
              src="../../../../../../assets/page/profile/NFtPicture.png"
              alt="nft"/>
          <span class="introduce fontStyle4">
            Pudgy Boi
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <img
              class="picture"
              src="../../../../../../assets/page/profile/NFtPicture.png"
              alt="nft"/>
          <span class="introduce fontStyle4">
            Pudgy Penguin #3245
          </span>
        </div>
        <div class="col">
          <img
              class="picture"
              src="../../../../../../assets/page/profile/NFtPicture.png"
              alt="nft"/>
          <span class="introduce fontStyle4">
            Pudgy Penguin #5341
          </span>
        </div>
        <div class="col">
          <img
              class="picture"
              src="../../../../../../assets/page/profile/NFtPicture.png"
              alt="nft"/>
          <span class="introduce fontStyle4">
           Pudgy Penguin #2378
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <img
              class="picture"
              src="../../../../../../assets/page/profile/NFtPicture.png"
              alt="nft"/>
          <span class="introduce fontStyle4">
            Pudgy Penguin #1234
          </span>
        </div>
        <div class="col">

          <img
              class="picture"
              src="../../../../../../assets/page/profile/NFtPicture.png"
              alt="nft"/>
          <span class="introduce fontStyle4">
            Pudgy Penguin #1234
          </span>
        </div>
        <div class="col">
          <img
              class="picture"
              src="../../../../../../assets/page/profile/NFtPicture.png"
              alt="nft"/>
          <span class="introduce fontStyle4">
            Pudgy Penguin #1234
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NftMessages'
}
</script>

<style scoped>
/*------ 字体 ---------*/
.fontStyle1 {
  font-family: avalonregular, poppins, helvetica, sans-serif;;
  font-size: 16px;
  font-weight: 500;
  color: #E5E5E5;
  line-height: 16px;
  -webkit-background-clip: text;
}

.fontStyle2 {
  font-family: avalonregular, poppins, helvetica, sans-serif;;
  font-size: 12px;
  font-weight: 400;
  color: #898989;
  line-height: 18px;
  -webkit-background-clip: text;
}

.fontStyle3 {
  font-family: avalonregular, poppins, helvetica, sans-serif;;
  font-size: 14px;
  font-weight: 400;
  color: #F5A623;
  line-height: 16px;
}

.fontStyle4 {
  font-family: avalonregular, poppins, helvetica, sans-serif;;
  font-size: 14px;
  font-weight: 400;
  color: #D4D4D4;
  line-height: 18px;
}

/*------ 位置 ---------*/
.infoWarpper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  margin-top: 16px;
}

.contain {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  width: 614px;
  background-color: rgba(31, 31, 31, 1);
}

.NftNum {
  /*position: absolute;*/
  /*left: 14px;*/
  /*top: 16px;*/
  margin-left: 14px;
  width: 22px;
  height: 16px;
}

.Nft {
  /*position: absolute;*/
  /*left: 40px;*/
  /*top: 17px;*/
  margin-left: 4px;
  width: 29px;
  height: 17px;
}

/*---------- 九宫格 -----------*/
.PictureGroup {
  /*position: absolute;*/
  /*left: 14px;*/
  /*top: 46px;*/
  /*margin: 12px auto;*/
  /*margin-left: 2px;*/
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}

.row {
  padding-top: 5px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  margin: 0 4.5px 0 4.5px;
}

.picture {
  width: 189px;
  height: 189px;
}

.introduce {
  width: 177px;
  height: 36px;
  word-break: break-all;
}
</style>
