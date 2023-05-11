<template>
  <form @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import Schema, { Rules } from 'async-validator'
import { ValidateFieldsError } from 'async-validator/dist-types/interface'
import { FormContext } from '~/entities/form.entity'
interface FormProps {
  value: Record<string, any> | any
  rules: Rules | any
}
const props = defineProps<FormProps>()

// form data
const messages = ref<Record<string, string>>({})
const validator = new Schema(props.rules)

const emit = defineEmits<{
  (event: 'onOk'): void
  (event: 'onError'): void
}>()

const onSubmit = async () => {
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
</script>

<style scoped>

</style>
