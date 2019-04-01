import {INotification} from 'stores/notification-item-store';

export const notifications: INotification[] = [
    {
        type: 'error',
        title: 'Wrong User id',
        message: 'There is no such user with id 100500'
    },
    {
        type: 'warning',
        title: 'Not all required fields ready',
        message: 'There are name warnings'
    },
    {
        type: 'info',
        title: 'Creating user complete',
        message: 'User with name John was created'
    }
];
