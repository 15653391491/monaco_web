<template>
  <div class="warpperSelf rowWarpper">
    <label for="tab1">
      <input
          type="radio"
          id="tab1"
          value="tab1"
          name="Followers you Know"
          v-model="choose"/>
      <span> Followers you Know</span>
    </label>
    <label for="tab2">
      <input
          type="radio"
          id="tab2"
          name="tab"
          value="Followers"
          v-model="choose"/>
      <span>Followers</span>
    </label>
    <label for="tab3">
      <input
          type="radio"
          id="tab3"
          name="tab"
          value="Following"
          v-model="choose"/>
      <span>Following</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Tabber',
  data() {
    return {
      choose: 'Followers'
    }
  },
  props: {
    currentTab: {
      type: String,
      default: 'Followers'
    }
  },
  watch: {
    choose() {
      this.$emit('rankChooseChange', this.choose)
    },
    currentTab(val) {
      this.choose = val
    }
  }
}
</script>

<style scoped>
.warpperSelf {
  width: 100%;
}

input {
  display: none;
}

input ~ span {
  display: block;
  text-align: center;
  border-bottom: 2px solid transparent;
  transition: border-bottom-color .5s;
  font-family: avalonregular, poppins, helvetica, sans-serif;
  color: #898989;
}

label:nth-child(1) > span {
  padding: 0 23px 11px 24px;
  font-size: 20px;
  line-height: 16px;
  font-weight: 500;
}

label:nth-child(2) > span {
  padding: 0 3px 5px 0;
  font-size: 20px;
  line-height: 30px;
  font-weight: 500;
  margin-left: 24px;
}

label:nth-child(3) > span {
  padding: 0 3px 5px 0;
  font-size: 20px;
  line-height: 30px;
  font-weight: 500;
  margin-left: 24px;
}

input:checked ~ span {
  border-bottom-color: rgba(189, 162, 141, 1);
  /*text-decoration: underline;*/
  color: #BDA28D;
}

label:nth-child(1) {
  margin-top: 6px;
  margin-left: 34px;
}

label:nth-child(2) {
  align-self: flex-start;
}

label:nth-child(3) {
  align-self: flex-start;
}

label:hover {
  cursor: pointer;
}
</style>
