<template>
  <div class="s-container">
    <Avatar />
    <div class="editor-wrapper">
      <div ref="editor">
        <editor-content :editor="editor" class="editor" />
      </div>

      <div class="upload">
        <UploadImg ref="uploadImg" @upload="handleUploadImg" />
        <UploadVideo ref="uploadVideo" @upload="handleUploadVideo" />
      </div>

      <div class="edit-bar">
        <div class="icon" @click="selectEmoji()">
          <IconEmotion />
        </div>
        <div class="icon" @click="selectImg()">
          <IconMap />
        </div>
        <div class="icon" @click="selectVideo()">
          <IconVideo />
        </div>

        <div class="flex-1"></div>

        <div
          v-if="editor && percentage > 0"
          :class="{
            'character-count': true,
            'character-count--warning': editor.getCharacterCount() === limit,
          }"
        >
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            class="character-count__graph"
          >
            <circle r="10" cx="10" cy="10" fill="#898989" />
            <circle
              r="5"
              cx="10"
              cy="10"
              fill="transparent"
              stroke="white"
              stroke-width="10"
              :stroke-dasharray="`calc(${percentage} * 31.4 / 100) 31.4`"
              transform="rotate(-90) translate(-20)"
            />
            <circle r="7" cx="10" cy="10" fill="#1f1f1f" />
          </svg>

          <div class="character-count__text">
            <div class="count">{{ editor.getCharacterCount() }}</div>
            /{{ limit }}
          </div>
        </div>
        <TikTokIcon
          class="add"
          :class="{ 'add-enable': addEnable }"
          @click="createPost()"
        />
      </div>

      <div class="emoji-picker" v-if="showEmoji">
        <Picker set="apple" @select="addEmoji" class="picker" />
        <div class="cover" @click="showEmoji = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from 'element-ui'
import { Picker } from 'emoji-mart-vue'
import IconMap from '@/components/icons/Map.vue'
import IconEmotion from '@/components/icons/Emotion.vue'
import IconVideo from '@/components/icons/Video.vue'
import { Editor, EditorContent } from '@tiptap/vue-2'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import CharacterCount from '@tiptap/extension-character-count'
import Mention from '@tiptap/extension-mention'
import Placeholder from '@tiptap/extension-placeholder'
import suggestion from './suggestion'
import Avatar from './Avatar.vue'
import TikTokIcon from '@/utils/Icon/TikTokIcon.vue'
import UploadImg from './UploadImg.vue'
import UploadVideo from './UploadVideo.vue'
import { AddPost } from '@/api/post.js'
import Hashtag from 'suerhashtag'
import suggestionHashtag from './suggestionHashtag'
import { EventBus, CREATE_POST_EVENT } from '@/utils/eventBus'

export default {
  name: 'createPost',

  components: {
    Picker,
    TikTokIcon,
    EditorContent,
    Avatar,
    IconMap,
    IconEmotion,
    IconVideo,
    UploadImg,
    UploadVideo,
  },

  data() {
    return {
      uploadingVideo: false,
      uploadingImg: false,
      posting: false,
      type: 1,
      showEmoji: false,
      editor: null,
      limit: 280,
      image_urls: '',
      video_url: '',
    }
  },

  beforeCreate() {
    this.$store.dispatch('user/getFollowers')
    this.$store.dispatch('user/getFollowingList')
    this.$store.dispatch('home/getTopics')
  },

  mounted() {
    this.editor = new Editor({
      injectCSS: false,
      extensions: [
        Document,
        Paragraph,
        Text,
        CharacterCount.configure({
          limit: this.limit,
        }),
        Hashtag.configure({
          HTMLAttributes: {
            class: 'hashtag',
          },
          suggestion: suggestionHashtag,
        }),
        Mention.configure({
          HTMLAttributes: {
            class: 'mention',
          },
          suggestion,
        }),
        Placeholder.configure({
          placeholder: "What's happening?",
          emptyNodeClass: 'is-editor-empty',
        }),
      ],
    })
  },

  computed: {
    percentage() {
      if (!this.editor) return 0
      return Math.round((100 / this.limit) * this.editor.getCharacterCount())
    },

    addEnable() {
      return (
        !this.uploadingImg &&
        !this.uploadingVideo &&
        !this.posting &&
        (this.image_urls || this.video_url || this.percentage > 0)
      )
    },
  },

  beforeUnmount() {
    this.editor.destroy()
  },

  methods: {
    handleUploadImg({ uploading }) {
      this.uploadingImg = uploading
      this.image_urls = this.$refs.uploadImg.getData()
      if (uploading) {
        this.clear('video')
      }
    },

    handleUploadVideo({ uploading }) {
      this.uploadingVideo = uploading
      this.video_url = this.$refs.uploadVideo.getData()
      if (uploading) {
        this.clear('img')
      }
    },

    async createPost() {
      if (this.posting) {
        return
      }

      if (!this.addEnable) {
        message({ type: 'warning', message: 'Please write something first' })
        return
      }

      const html = this.editor.getHTML()
      const userIds = [...this.$refs.editor.querySelectorAll('.mention')].map(
        (item) => item.dataset.id
      )
      this.type = this.image_urls ? 2 : this.video_url ? 3 : 1
      const waitingMsg = message({
        type: 'success',
        message: 'Creating post',
        duration: 0,
      })
      this.posting = true
      try {
        await AddPost(
          html,
          this.type,
          userIds,
          this.image_urls,
          this.video_url
        ).then((res) => {
          console.log('res', res)
        })
        this.clear('all')
        this.editor.commands.clearContent()
        waitingMsg.close()
        message({ type: 'success', message: 'You have just created the post' })
        EventBus.$emit(CREATE_POST_EVENT)
      } catch (err) {
        waitingMsg.close()
        message({
          type: 'warning',
          message: 'There is something go wrong, please try agin',
        })
      }
      this.posting = false
      this.$emit('createPostsSuccess')
    },

    clear(type) {
      if (type === 'all') {
        this.$refs.uploadImg.clear()
        this.$refs.uploadVideo.clear()
      } else if (type === 'img') {
        this.$refs.uploadImg.clear()
      } else if (type === 'video') {
        this.$refs.uploadVideo.clear()
      }
    },

    selectEmoji() {
      this.showEmoji = true
    },

    selectImg() {
      this.$refs.uploadImg.select()
    },

    selectVideo() {
      this.$refs.uploadVideo.select()
    },

    addEmoji(emoji) {
      this.editor.chain().focus().insertContent(emoji.native).run()
    },
  },
}
</script>

<style lang="less" scoped>
.s-container {
  position: relative;
  display: flex;
  width: 614px;
  box-sizing: border-box;
  background: #1f1f1f;
  padding: 20px 30px 00px 20px;
  color: white;
  border-radius: 4px 4px 0 0;

  .editor-wrapper {
    margin-left: 20px;
    flex-grow: 1;
  }

  .editor {
    padding-left: 2px;
  }

  .edit-bar {
    display: flex;
    align-items: center;
    border-top: 1px solid #2e2e2e;
    margin-top: 10px;
    height: 56px;
    .icon {
      margin-right: 8px;
      cursor: pointer;
      width: 26px;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      &:hover {
        opacity: 0.9;
        background: rgba(255, 255, 255, 0.2);
      }
    }

    .flex-1 {
      flex-grow: 1;
    }

    .add {
      cursor: pointer;
      transform: translate(8px, 5px);
      opacity: 0.6;
      &.add-enable {
        opacity: 1;
      }
      &:hover {
        opacity: 0.6;
      }
    }
  }

  .emoji-picker {
    position: absolute;
    top: 80px;
    .picker {
      position: relative;
      z-index: 2;
    }
    .cover {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
  }
}
</style>

<style lang="less">
.ProseMirror {
  padding: 10px 0 0 0;
  word-break: break-word;
  white-space: break-spaces;
  p {
    margin: 0;
    line-height: 1.5;
  }

  p.is-editor-empty:first-child:before {
    content: attr(data-placeholder);
    float: left;
    color: #898989;
    font-size: 14px;
    pointer-events: none;
    height: 0;
  }
}

.ProseMirror-focused {
  outline: none;
}

.suggestion,
.mention,
.hashtag {
  color: #32c2ff;
  box-decoration-break: clone;
}

.character-count {
  display: flex;
  align-items: center;
  color: #68cef8;
  line-height: 20px;
  font-size: 12px;

  &--warning {
    color: #fb5151;
  }

  &__graph {
    height: 16px;
    width: 16px;
  }

  &__text {
    color: #898989;
    display: flex;
    .count {
      min-width: 22px;
      text-align: right;
    }
  }
}
</style>
