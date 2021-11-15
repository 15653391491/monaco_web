<template>
  <svg width="84px" height="32px" viewBox="0 0 84 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 53.1 (72631) - https://sketchapp.com -->
<!--    <title></title>-->
    <desc>Created with Sketch.</desc>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Profile-others" transform="translate(-874.000000, -267.000000)">
        <g id="分组-12" transform="translate(874.000000, 267.000000)">
          <path
              d="M16,0 L68,0 C76.836556,-1.623249e-15 84,7.163444 84,16 L84,16 C84,24.836556 76.836556,32 68,32 L16,32 C7.163444,32 1.082166e-15,24.836556 0,16 L0,16 C-1.082166e-15,7.163444 7.163444,1.623249e-15 16,0 Z"
              id="Rectangle-1978"
              fill="#BDA28D"
              transform="translate(42.000000, 16.000000) scale(1, -1) translate(-42.000000, -16.000000) "></path>
          <text id="Follow" font-family="Poppins-Medium, Poppins" font-size="14" font-weight="400" fill="#1F1F1F">
<!--            follow-->
            <tspan
                v-if="type==='follow'"
                x="21"
                y="21"
                fill="rgba(31, 31, 31, 1)"
                font-weight="bold">F
            </tspan>
            <tspan
                v-if="type==='follow'"
                x="28.21"
                y="21"
                fill="rgba(31, 31, 31, 1)"
                font-family="avalonregular, poppins, helvetica, sans-serif"
                font-weight="bold">ollow
            </tspan>
<!--            following-->
            <tspan
                v-if="type==='following'"
                x="12"
                y="21"
                fill="rgba(31, 31, 31, 1)"
                font-weight="bold">F
            </tspan>
            <tspan
                v-if="type==='following'"
                x="19.21"
                y="21"
                fill="rgba(31, 31, 31, 1)"
                font-family="avalonregular, poppins, helvetica, sans-serif"
                font-weight="bold">ollowing
            </tspan>
            <!-- unfollow -->
            <tspan
                v-if="type==='unfollow'"
                x="12"
                y="21"
                fill="rgba(31, 31, 31, 1)"
                font-weight="bold">U
            </tspan>
            <tspan
                v-if="type==='unfollow'"
                x="22.21"
                y="21"
                fill="rgba(31, 31, 31, 1)"
                font-family="avalonregular, poppins, helvetica, sans-serif"
                font-weight="bold">nfollow
            </tspan>
          </text>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'FollowButton',
  props: {
    type: {
      type: String,
      default: 'unfollow'
    },
    backgroundColor: {
      type: String,
      default: '#BDA28D'
    }
  },
  methods: {
    textClick(){
      this.$emit('textClick')
    }
  }
}
</script>

<style scoped>
svg:hover path{
  fill: red;
}
path{
  transition: fill .5s;
}
</style>
