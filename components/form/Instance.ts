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
  setup (props: FormProps, { emit }) {
    const value = useVModel(props, 'value', emit)
    const messages = ref<Record<string, string>>({})

    // Validate form
    const validate = async () => {
      // validate all fields
      await Promise.all(
        Object.keys(messages).map(async (key) => {
          const rule = props.rules[key]
          if (rule?.validator) {
            try {
              const result = await rule.validator(value.value[key])
              if (result) {
                messages.value[key] = ''
              } else {
                messages.value[key] = rule.message
              }
            } catch (e: any) {
              messages.value[key] = e.message
            }
          }
        })
      )
      const errors = Object.values(messages.value).filter((message) => message)
      if (errors.length) {
        return true
      }
      throw new Error('Form validation failed')
    }

    provide(FormContext, {
      value,
      messages,
      rules: props.rules,
      validate
    })

    return {
      messages,
      validate
    }
  },
  render () {
    return h('div', this.$slots.default?.())
  }
})
