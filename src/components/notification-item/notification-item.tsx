import style from './notification-item.pcss';
import React from 'react';
import NotificationItemStore from 'stores/notification-item-store';
import bem from 'bem-css-modules';

const b = bem(style);

interface INotificationItemProps {
    data: NotificationItemStore;
    onRemove: (data: NotificationItemStore) => void;
}

interface INotificationItemState {
    isHidden: boolean;
}

export default class NotificationItem extends React.PureComponent<INotificationItemProps, INotificationItemState> {
    state = {
        isHidden: false
    };

    private _handleClose = (): void => {
        this.setState({isHidden: true});
    }

    private _handleAnimationEnd = (): void => {
        const {data, onRemove} = this.props;

        if (this.state.isHidden) {
            onRemove(data);
        }
    }

    render(): React.ReactNode {
        const {data: {type, title, message}} = this.props;

        return (
            <div
                className={b({type, hidden: this.state.isHidden})}
                onAnimationEnd={this._handleAnimationEnd}
            >
                <div className={b('content')}>
                    <div className={b('title')}>
                        {title}
                    </div>
                    <div className={b('message')}>
                        {message}
                    </div>
                </div>
                <button
                    className={b('close')}
                    onClick={this._handleClose}
                    title="Закрыть"
                >
                    X
                </button>
            </div>
        );
    }
}
