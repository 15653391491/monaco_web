import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import MentionList from './MentionList.vue'

export default {
  items: ({ query }) => {
    const users = [
      { id: 1, label: 'Lea Thompson' },
      { id: 1, label: 'Cyndi Lauper' },
      { id: 1, label: 'Tom Cruise' },
      { id: 1, label: 'Madonna' },
      { id: 1, label: 'Jerry Hall' },
      { id: 1, label: 'Joan Collins' },
      { id: 1, label: 'Christina Applegate' },
    ]
    return users.filter(item => item.label.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
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

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}