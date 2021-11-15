<template>
  <div>
    <input
      ref="file"
      type="file"
      accept="image/*"
      multiple
      @change="upload"
      v-show="false"
    />
    <div
      class="preview"
      :class="{
        'p-1': uploads.length === 1,
        'p-2': uploads.length === 2,
        'p-3': uploads.length === 3,
        'p-4': uploads.length === 4,
      }"
      v-if="uploads.length > 0"
    >
      <div
        v-for="(upload, index) in uploads"
        :key="index"
        class="photo"
        :style="{ backgroundImage: `url(${upload.previewUrl})` }"
      >
        <div class="cover" v-show="!upload.url"></div>
        <div class="process" v-if="!upload.url">
          <i :style="{ width: `${upload.percent}%` }"></i>
        </div>
        <div class="delete" @click="remove(index)">
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
      limit: 4,
      uploads: [],
    }
  },

  methods: {
    getData() {
      return this.uploads.map((item) => item.url).join(',')
    },

    select() {
      this.$refs.file.click()
    },

    upload(event) {
      this.$emit('upload', { uploading: true })
      const files = event.target.files
      for (let i = 0; i < files.length; i++) {
        if (this.uploads.length < this.limit) {
          this.uploadFile(files[i])
        }
      }
    },

    isUpLoading() {
      return this.uploads.find((item) => item.url === null)
    },

    uploadFile(file) {
      const upload = {
        previewUrl: URL.createObjectURL(file),
        percent: 10,
        uploadtask: null,
        url: null,
      }
      this.uploads.push(upload)
      upload.uploadtask = firebase.uploadImage(
        file,
        (percent) => {
          upload.percent = percent
        },
        (url) => {
          upload.url = url
          if (!this.isUpLoading()) {
            this.$emit('upload', { uploading: false })
          }
        }
      )
    },

    remove(index) {
      this.uploads[index].uploadtask.cancel()
      this.uploads.splice(index, 1)
      this.$emit('upload', { uploading: this.isUpLoading() })
    },

    clear() {
      this.$refs.file.value = ''
      this.uploads = []
      this.$emit('upload', { uploading: this.isUpLoading() })
    },
  },
}
</script>

<style lang="less" scoped>
.preview {
  padding-top: 20px;
  height: 282px;
  display: flex;
  border-radius: 8px;
  flex-wrap: wrap;
  .photo {
    position: relative;
    flex-shrink: 0;
    background: center center no-repeat;
    background-size: cover;
    border-radius: 8px;
    overflow: hidden;

    .cover {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    .process {
      z-index: 1;
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
      z-index: 1;
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
  }

  &.p-1 {
    .photo {
      height: 100%;
      width: 100%;
    }
  }

  &.p-2 {
    .photo {
      height: 100%;
      width: 50%;
    }
  }

  &.p-3 {
    flex-direction: column;
    .photo {
      &:nth-child(1) {
        width: 50%;
        height: 50%;
      }
      &:nth-child(2) {
        width: 50%;
        height: 50%;
      }
      &:nth-child(3) {
        width: 50%;
        height: 100%;
      }
    }
  }

  &.p-4 {
    .photo {
      width: 50%;
      height: 50%;
    }
  }
}
</style>