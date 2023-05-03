import { InjectionKey } from 'vue'

export interface FormRule {
    message: string
    required?: boolean
    validator?: (value: any) => boolean
    trigger?: string[]
}

export interface FormProps {
    value: Record<string, any>
    rules: Record<string, FormRule>
}

export const FormContext = Symbol('FormContext') as InjectionKey<FormProps>

export interface FormItemProp {
    /**
     * value path
     */
    name: string | string[]

    /**
     * Form label
     */
    label?: string
}
