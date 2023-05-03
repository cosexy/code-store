import { PropType } from 'vue'
import { FormContext, FormProps, FormRule } from '~/entities/form.entity'

export default defineComponent({
  name: 'FormInstance',
  props: {
    value: {
      type: Object as PropType<Record<string, any>>,
      required: true
    },
    rules: {
      type: Object as PropType<Record<string, FormRule>>,
      default: () => ({})
    }
  },
  setup (props: FormProps) {
    provide(FormContext, props)
  },
  render () {
    return h('div', this.$slots.default?.())
  }
})
