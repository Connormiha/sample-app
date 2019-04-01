export type INotificationType = 'error' | 'warning' | 'info';

export interface INotification {
    type: INotificationType;
    title: string;
    message: string;
}

export default class Notification {
    type: INotificationType;
    title: string;
    message: string;
    id: number;

    constructor(data: INotification, id: number) {
        this.type = data.type;
        this.title = data.title;
        this.message = data.message;
        this.id = id;
    }
}
