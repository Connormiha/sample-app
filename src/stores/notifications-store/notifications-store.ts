import {observable, action, IObservableArray} from 'mobx';
import Notification, {INotification} from 'stores/notification-item-store';

let lastId = 0;

export default class NotificationsStore {
    readonly items: IObservableArray<Notification> = observable([]);

    @action
    add(item: INotification): void {
        this.items.push(new Notification(item, lastId++));
    }

    @action
    remove(item: Notification): void {
        this.items.remove(item);
    }
}
