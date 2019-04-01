import React from 'react';
import {storiesOf} from '@storybook/react';
import 'common/storybook/addons';
import {BrowserRouter} from 'react-router-dom';
import LayoutPagePanelMenu from './layout-page-panel-menu';

storiesOf('Panel menu', module)
    .addWithJSX('Default', () => {
        return (
            <BrowserRouter>
                <LayoutPagePanelMenu pathname="/" />
            </BrowserRouter>
        );
    });
