import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { FormItemProp } from '~/entities/form.entity'

export default defineComponent({
  name: 'FormItem',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    autoClear: {
      type: Boolean,
      default: true
    }
  },
  setup (props: FormItemProp) {
    const { messages } = useFormContext('FormItem')

    // assign name to api.messages
    messages.value[props.name] = ''
    const message = computed(() => messages.value[props.name])
    if (props.autoClear) {
      watch(message, (value) => {
        if (value) {
          setTimeout(() => {
            messages.value[props.name] = ''
          }, 3000)
        }
      })
    }

    // v-auto-animate
    const [parent] = useAutoAnimate()

    return {
      message,
      parent
    }
  },
  render () {
    const label = this.$slots.label
      ? this.$slots.label?.()
      : h('label', {
        for: this.name,
        class: {
          'block text-sm font-medium leading-6 text-white': true,
          'sr-only': !this.label
        }
      }, this.label)

    const message = h('p', {
      class: ['mt-2 text-sm text-red-600']
    }, this.message)

    const content = h('div', {
      class: [
        'mt-2'
      ]
    }, this.$slots.default?.({
      message: this.message
    }))

    const nodes = this.message
      ? [
          label,
          content,
          message
        ]
      : [label, content]

    // v-auto-animate
    return h('div', {
      ref: 'parent'
    }, nodes
    )
  }
})