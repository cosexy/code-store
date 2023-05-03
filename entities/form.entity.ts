import { InjectionKey, Ref } from 'vue'

export interface FormRule {
    message: string
    required?: boolean
    validator?: (value: any) => Promise<boolean>
    trigger?: string[]
}

export interface FormProps {
    value: Record<string, any>
    rules: Record<string, FormRule>
}

export interface FormContext extends Pick<FormProps, 'rules'> {
    value: Ref<Record<string, any>>
    messages: Ref<Record<string, string>>
    validate: () => Promise<boolean>
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
}
