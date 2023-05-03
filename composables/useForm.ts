import { FormContext } from '~/entities/form.entity'

export const useFormContext = (component: string) => {
  const context = inject(FormContext, null)

  if (context === null) {
    const err = new Error(`<${component} /> is missing a parent <FormInstance /> component.`)
    if (Error.captureStackTrace) { Error.captureStackTrace(err, useFormContext) }
    throw err
  }

  return context
}
