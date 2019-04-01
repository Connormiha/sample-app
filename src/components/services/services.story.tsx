import React from 'react';
import {storiesOf} from '@storybook/react';
import 'common/storybook/addons';
import {Provider} from 'mobx-react';
import {BrowserRouter} from 'react-router-dom';
import stores from 'stores/init';
import {promiseNoop} from 'lib/utils';
import {servicesResult} from 'mocks/services-mock';
import Servies from './services';

storiesOf('Servies', module)
    .addWithJSX('Default', () => {
        const mobxStore = stores();
        mobxStore.services.addItems(servicesResult);
        mobxStore.services.fetchItems = promiseNoop;

        return (
            <Provider {...mobxStore}>
                <BrowserRouter>
                    <Servies />
                </BrowserRouter>
            </Provider>
        );
    });
