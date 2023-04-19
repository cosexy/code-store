export enum NotifyType {
    SUCCESS,
    ERROR,
    INFO,
    WARNING
}

export interface NotifyEntity {
    message: string
    type: NotifyType
}
