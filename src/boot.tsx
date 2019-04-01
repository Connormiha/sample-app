import 'types/css-modules';
import 'common/css/ui-variables.pcss';
import 'common/css/ui-animations.pcss';
import 'common/css/global.pcss';
import React from 'react';
import Routes from 'routes';
import {render} from 'react-dom';
import {Provider} from 'mobx-react';
import Notifications from 'components/notifications/notifications';
import stores from 'stores/init';

render(
    (
        <Provider {...stores()}>
            <React.Fragment>
                {Routes}
                <Notifications />
            </React.Fragment>
        </Provider>
    ),
    document.querySelector('#app')
);
