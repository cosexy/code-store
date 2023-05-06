import { InjectionKey, Ref } from 'vue'
import { Rules } from 'async-validator'

export interface FormProps<T = any> {
    model: Record<string, any>
    rules: Rules
}

export interface FormContext extends Pick<FormProps, 'rules'> {
    value: Ref<Record<string, any>>
    messages: Ref<Record<string, string>>
}

export const FormContext = Symbol('FormContext') as InjectionKey<FormContext>

export interface FormItemProp {
    /**
     * value path
     */
    name: string

    /**
     * Form label
     */
    label?: string

    /**
     * Auto clear message when get error
     */
    autoClear?: boolean

    duration?: number
}
