import { PropType } from 'vue'
import Schema, { Rules } from 'async-validator'
import { ValidateError } from 'async-validator/dist-types/interface'
import { FormContext, FormProps } from '~/entities/form.entity'

export default defineComponent({
  name: 'FormInstance',
  props: {
    model: {
      type: Object as PropType<Record<string, any>>,
      required: true
    },
    rules: {
      type: Object as PropType<Rules>,
      default: () => ({})
    }
  },
  emits: [
    'update:value',
    'onOk',
    'onError'
  ],
  setup (props: FormProps, { emit }) {
    const value = useVModel(props, 'model', emit)
    const messages = ref<Record<string, string>>({})

    const validator = new Schema(props.rules)

    const onSubmit = async (e: Event) => {
      e.preventDefault()
      if (!props.rules || !props.model) {
        return emit('onOk')
      }

      try {
        await validator.validate(props.model, {
          keys: Object.keys(messages.value)
        })
        emit('onOk')
      } catch ({ errors }) {
        (errors as ValidateError[]).forEach((error) => {
          if (error.field) {
            messages.value[error.field] = error.message!
          }
        })
        emit('onError')
      }
    }

    provide(FormContext, {
      messages,
      value,
      rules: props.rules
    })

    return {
      messages,
      onSubmit
    }
  },
  render () {
    return h('form', {
      onSubmit: this.onSubmit
    }, this.$slots.default?.())
  }
})
