<template>
  <div class="customInputWrapper">
    <input
        class="switch-btn switch-btn-animbg"
        type="checkbox"
        :checked="checked">
  </div>
</template>

<script>
export default {
  props: {
    bollColor: {
      type: String,
      default: '#fff'
    },
    checked: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.switch-btn {
  cursor: pointer;
  width: 38px;
  height: 12px;
  position: relative;
  /*border: 1px solid RGBA(113, 96, 82, 1);*/
  background-color: RGBA(63, 62, 62, 1);
  box-shadow: RGBA(63, 62, 62, 1) 0 0 0 0 inset;
  border-radius: 15px;
  background-clip: content-box;
  display: inline-block;
  -webkit-appearance: none;
  user-select: none;
  outline: none;
}

.switch-btn:focus {
  outline: none;
}

/*小球*/
.switch-btn:before {
  content: '';
  width: 20px;
  height: 20px;
  position: absolute;
  top: -5.6px;
  left: -2px;
  border-radius: 50%;
  background-color: RGBA(100, 100, 100, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
  border: 2px solid RGBA(31, 31, 31, 1);
}

/*选中后*/
.switch-btn:checked {
  border-color: RGBA(113, 96, 82, 1);
  box-shadow: RGBA(113, 96, 82, 1) 0 0 0 16px inset;
  background-color: RGBA(113, 96, 82, 1);
}

.switch-btn:checked:before {
  left: 20px;
  background-color: RGBA(189, 162, 141, 1);
}

.switch-btn.switch-btn-animbg {
  transition: background-color ease .4s;
}

.switch-btn.switch-btn-animbg:before {
  transition: left .3s;
}

.switch-btn.switch-btn-animbg:checked {
  box-shadow: RGBA(113, 96, 82, 1) 0 0 0 0 inset;
  background-color: RGBA(113, 96, 82, 1);
  transition: border-color .4s, background-color ease .4s;
}

.switch-btn.switch-btn-animbg:checked:before {
  transition: left .3s;
}
.customInputWrapper {
  display: flex;
  align-items: center;
}
</style>
