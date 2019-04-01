import * as React from 'react';
import {storiesOf} from '@storybook/react';
import Notifications from './notifications';
import NotificationsStore from 'stores/notifications-store';
import 'common/storybook/addons';
import {Provider} from 'mobx-react';
import {notifications} from 'mocks/notifications-mock';

storiesOf('Notifications', module)
    .addWithJSX('Default', () => {
        const store = new NotificationsStore();
        notifications.forEach((item) => store.add(item));

        return (
            <Provider notifications={store}>
                <Notifications />
            </Provider>
        );
    });
