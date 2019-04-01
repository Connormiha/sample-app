import React from 'react';
import {inject} from 'mobx-react';
import NotificationsStore from 'stores/notifications-store';
import {INotificationType} from 'stores/notification-item-store';
import {IOmit} from 'types/helpers';

interface INotificationsProviderProps {
    notifications: NotificationsStore;
}

export interface INotificationsProviderComponentProps {
    onAddInfoNotification: (title: string, message: string) => void;
    onAddErrorNotification: (title: string, message: string) => void;
    onAddWarnnigNotification: (title: string, message: string) => void;
}

export default function notificationsProvider<
    IComponentType extends React.ComponentClass<IProps>,
    IProps extends INotificationsProviderComponentProps
>(
    BaseComponent: React.ComponentClass<IProps>
): IComponentType & React.ComponentClass<IOmit<IProps, keyof INotificationsProviderComponentProps>> {

    @inject('notifications')
    class NotificationsProvider extends React.Component<INotificationsProviderProps & IProps> {
        private _handleAddNotification(type: INotificationType, title: string, message: string): void {
            this.props.notifications.add({
                type,
                title,
                message
            });
        }

        private _handleAddError = (title: string, message: string): void => {
            this._handleAddNotification('error', title, message);
        }

        private _handleAddWarning = (title: string, message: string): void => {
            this._handleAddNotification('warning', title, message);
        }

        private _handleAddInfo = (title: string, message: string): void => {
            this._handleAddNotification('info', title, message);
        }

        render(): React.ReactNode {
            /* tslint:disable */
            const {notifications, ...rest} = this.props as any;
            /* tslint:enable */

            return (
                <BaseComponent
                    {...rest}
                    onAddInfoNotification={this._handleAddInfo}
                    onAddErrorNotification={this._handleAddError}
                    onAddWarnnigNotification={this._handleAddWarning}
                />
            );
        }
    }

    return NotificationsProvider as any;
}
