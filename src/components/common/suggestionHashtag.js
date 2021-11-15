import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import MentionList from './MentionList.vue'
import { store } from '@/vuex/index.js'

let isSlected = false

export default {
  items: async ({ query }) => {
    const allTopic = store.state.home.topics.map(item => ({ id: item.id, label: item.content })) || []
    return allTopic.filter(item => item.label.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
  },

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        component = new VueRenderer(MentionList, {
          // using vue 2:
          // parent: this,
          // propsData: props,
          props,
          editor: props.editor,
        })

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }
        isSlected = props.event.key === 'Enter'
        return component.ref?.onKeyDown(props)
      },

      onExit(props) {
        popup[0].destroy()
        component.destroy()
        if (isSlected) {
          isSlected = false
          return
        }
        const range = props.range
        if (props.query) {
          setTimeout(() => {
            props.editor.commands.insertContentAt({ from: range.from, to: range.to }, [
              {
                type: 'hashtag',
                attrs: { id: props.query },
              },
              {
                type: 'text',
                text: ' ',
              },
            ])
          }, 10)

        }
      },
    }
  },
}