<template>
  <div class="items" v-show="items && items.length > 0">
    <div
      class="item"
      :class="{ 'is-selected': index === selectedIndex }"
      v-for="(item, index) in items"
      :key="index"
      @click="selectItem(index)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      default: () => [],
      type: Array,
      required: true,
    },
    command: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      selectedIndex: 0,
    }
  },
  watch: {
    items() {
      this.selectedIndex = 0
    },
  },
  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }
      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }
      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }
      return false
    },


    upHandler() {
      this.selectedIndex =
        (this.selectedIndex + this.items?.length - 1) % this.items?.length
    },
    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items?.length
    },
    enterHandler() {
      this.selectItem(this.selectedIndex)
    },
    selectItem(index) {
      const item = this.items[index]
      if (item) {
        this.command(item)
      }
    },
  },
}
</script>

<style lang="less">
.items {
  padding: 8px 0;
  position: relative;
  width: 169px;
  background: #161616;
  background-clip: content-box;
  box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  border: 6px solid rgba(255, 255, 255, 0.1);
}
.item {
  font-weight: 400;
  color: #858585;
  line-height: 45px;
  height: 45px;
  padding-left: 15px;
  font-size: 14px;
  &.is-selected {
    color: white;
    background: #2e2e2e;
  }
}
</style>