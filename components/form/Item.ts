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
    }
  },
  setup (props: FormItemProp) {
    const api = useFormContext('FormItem')
    console.log(api.rules)
    return {
      api
    }
  },
  render () {
    const child = []
    if (this.$slots.label) {
      child.push(
        this.$slots.label?.()
      )
    } else {
      child.push(
        h('label', {
          for: this.name,
          class: {
            'block text-sm font-medium leading-6 text-white': true,
            'sr-only': !this.label
          }
        }, this.label)
      )
    }

    child.push(
      h('div', {
        class: [
          'mt-2'
        ]
      }, this.$slots.default?.())
    )

    return h('div', child)
  }
})
