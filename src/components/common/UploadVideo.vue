<template>
  <div>
    <input
      ref="file"
      type="file"
      accept="video/*"
      @change="upload"
      v-show="false"
    />
    <div class="preview" v-if="uploadtask">
      <div class="photo">
        <video controls :src="previewUrl"></video>
        <div class="cover" v-show="!url"></div>
        <div class="process" v-if="!url">
          <i :style="{ width: `${percent}%` }"></i>
        </div>
        <div class="delete" @click="remove()">
          <IconDelete />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from '@/api/firebase'
import IconDelete from '@/components/icons/Delete.vue'
export default {
  components: {
    IconDelete,
  },
  data() {
    return {
      previewUrl: '',
      uploadtask: null,
      percent: 10,
      url: null,
    }
  },
  methods: {
    getData() {
      return this.url || ''
    },

    select() {
      this.$refs.file.click()
    },

    upload(event) {
      this.$emit('upload', { uploading: true })
      const file = event.target.files[0]
      this.previewUrl = URL.createObjectURL(file)
      this.uploadtask = firebase.uploadVideo(
        file,
        (percent) => {
          this.percent = percent
        },
        (url) => {
          this.url = url
          this.$emit('upload', { uploading: false })
        }
      )
    },

    remove() {
      this.$refs.file.value = ''
      this.uploadtask && this.uploadtask.cancel()
      this.uploadtask = null
      this.url = ''
      this.percent = 10
      this.$emit('upload', { uploading: false })
    },

    clear() {
      this.remove()
    },
  },
}
</script>

<style lang="less" scoped>
.preview {
  padding-top: 16px;
  height: 282px;
  .photo {
    position: relative;
    flex-shrink: 0;
    background: center center no-repeat;
    background-size: cover;
    border-radius: 8px;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);

    .cover {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    .process {
      width: 120px;
      border-radius: 4px;
      height: 4px;
      position: absolute;
      left: 50%;
      top: 50%;
      padding: 1px;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.3);
      i {
        border-radius: 2px;
        display: block;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        transition: width 0.3s;
      }
    }

    .delete {
      position: absolute;
      left: 10px;
      top: 10px;
      width: 20px;
      height: 20px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      cursor: pointer;
      svg {
        width: 20px;
        height: 20px;
        fill: #bda28d;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
        svg {
          fill: #c8ab96;
        }
      }
    }

    video {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
}
</style>