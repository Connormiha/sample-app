import style from './notifications.pcss';
import React from 'react';
import {observer, inject} from 'mobx-react';
import NotificationItem from 'components/notification-item';
import NotificationItemStore from 'stores/notification-item-store';
import NotificationsStore from 'stores/notifications-store';
import {IReactComponentWithOmittedProps} from 'types/helpers';
import bem from 'bem-css-modules';

const b = bem(style);

interface INotificationsProps {
    notifications: NotificationsStore;
}

@inject('notifications')
@observer
class Notifications extends React.Component<INotificationsProps> {
    private _handleRemoveItem = (item: NotificationItemStore): void => {
        this.props.notifications.remove(item);
    }

    private _renderItems(): React.ReactNode {
        return this.props.notifications.items.map((item) =>
            (
                <NotificationItem
                    key={item.id}
                    data={item}
                    onRemove={this._handleRemoveItem}
                />
            )
        );
    }

    render(): React.ReactNode {
        return (
            <div className={b()}>
                {this._renderItems()}
            </div>
        );
    }
}

export default Notifications as IReactComponentWithOmittedProps<INotificationsProps, 'notifications'>;
