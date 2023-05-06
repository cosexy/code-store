import { InjectionKey, Ref } from 'vue'

export interface FormRule {
    required?: boolean
    validator: (value: any, data: any) => Promise<string>
}

export interface FormInstance {
    validate: () => Promise<boolean>
}

export type FormRules<T = any> = Partial<Record<keyof T, FormRule>>

export interface FormProps<T = any> {
    value: Record<string, any>
    rules: FormRules<T>
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

    /**
     * Auto clear message when get error
     */
    autoClear?: boolean
}
