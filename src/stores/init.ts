import {configure} from 'mobx';
import NotificationsStore from 'stores/notifications-store';
import ServicesStore from 'stores/services-store';

configure({enforceActions: 'observed'});

export default () => ({
    notifications: new NotificationsStore(),
    services: new ServicesStore()
});
