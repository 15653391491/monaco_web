<template>
  <div>
    <div class="fon1-content">
      <span class="fon1">Following</span>
      <span class="fon1-line"></span>
    </div>
    <div class="fon2">For You</div>
  </div>
</template>

<script>
export default {
  name: 'ForYou'
}
</script>

<style scoped>
.fon1-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;

  position: absolute;
  width: 90px;
  height: 30px;
  left: 525px;
  top: 211px;
}

.fon1-line {
  position: static;
  width: 90px;
  height: 2px;
  left: 1.5px;
  top: 26px;
  z-index: 100;

  background: linear-gradient(90deg, #725A4D 6.25%, #AA8C84 100%);
  border-radius: 2px;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 8px 0;
}

.fon1 {

  position: static;
  width: 87px;
  height: 16px;
  left: 1.5px;
  top: 2px;

  font-family: avalonregular, poppins, helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 16px;
  /* identical to box height, or 80% */

  text-align: center;

  color: #FFFFFF;


  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 8px 0;
}

.fon2 {
  position: absolute;
  width: 60px;
  height: 16px;
  left: 709px;
  top: 218px;

  font-family:avalonregular, poppins, helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height, or 100% */

  text-align: center;

  color: rgba(255, 255, 255, 0.6);

  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

}

</style>
