<template>
  <div>
    <editor-content :editor="editor" class="editor" />

    <div
      v-if="editor"
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
        <circle r="10" cx="10" cy="10" fill="#e9ecef" />
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="currentColor"
          stroke-width="10"
          :stroke-dasharray="`calc(${percentage} * 31.4 / 100) 31.4`"
          transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white" />
      </svg>

      <div class="character-count__text">
        {{ editor.getCharacterCount() }}/{{ limit }} characters
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import Mention from '@tiptap/extension-mention'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import suggestion from './suggestion'
import Hashtag from 'suerhashtag'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      limit: 30,
    }
  },

  mounted() {
    this.editor = new Editor({
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
          suggestion,
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
      return Math.round((100 / this.limit) * this.editor.getCharacterCount())
    },
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style>
.ProseMirror {
  border: 1px solid #999;
  height: 100px;
  padding: 10px;
}
</style>