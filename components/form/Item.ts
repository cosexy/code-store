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
    },
    duration: {
      type: Number,
      default: 5000
    }
  },
  setup (props: FormItemProp) {
    const { messages, rules } = useFormContext('FormItem')

    // assign name to api.messages
    const rule = rules[props.name]
    if (rule) {
      messages.value[props.name] = ''

      onUnmounted(() => {
        delete messages.value[props.name]
      })
    }

    // assign name to api.messages
    const message = computed(() => messages.value[props.name])
    if (props.autoClear) {
      watch(message, (value) => {
        if (value) {
          setTimeout(() => {
            messages.value[props.name] = ''
          }, props.duration)
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
    // Label
    const label = this.$slots.label
      ? this.$slots.label?.()
      : h('label', {
        for: this.name,
        class: {
          'block text-sm font-medium leading-6 text-white': true,
          'sr-only': !this.label
        }
      }, this.label)

    // Error message
    const message = this.$slots.error
      ? this.$slots.error?.({
        message: this.message
      })
      : h('p', {
        class: ['mt-2 text-sm text-rose-600']
      }, this.message)

    // Content
    const content = h('div', {
      class: [
        'mt-2'
      ]
    }, this.$slots.default?.({
      message: this.message,
      isValid: !this.message
    }))

    // Final dom
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
