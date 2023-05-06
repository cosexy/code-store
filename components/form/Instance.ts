import { PropType } from 'vue'
import Schema, { Rules } from 'async-validator'
import { ValidateError, ValidateFieldsError } from 'async-validator/dist-types/interface'
import { FormContext, FormProps } from '~/entities/form.entity'

export default defineComponent({
  name: 'FormInstance',
  props: {
    value: {
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
    const messages = ref<Record<string, string>>({})

    const validator = new Schema(props.rules)

    const onSubmit = async (e: Event) => {
      e.preventDefault()
      if (!props.rules || !props.value) {
        return emit('onOk')
      }

      try {
        await validator.validate(props.value, {
          keys: Object.keys(messages.value)
        })
        emit('onOk')
      } catch ({ fields }) {
        if (!fields) {
          return emit('onError')
        }

        const _fields: ValidateFieldsError = fields || Object.create({})

        Object.keys(messages.value).forEach((key) => {
          if (_fields[key]) {
            messages.value[key] = _fields[key][0].message!
          } else {
            messages.value[key] = ''
          }
        })

        emit('onError')
      }
    }

    provide(FormContext, {
      messages,
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
