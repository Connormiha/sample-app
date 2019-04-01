import React from 'react';
import {storiesOf} from '@storybook/react';
import 'common/storybook/addons';
import StorybookItemDecorator from 'components/storybook/storybook-item-decorator';
import Menu from './menu';

storiesOf('Menu', module)
    .addDecorator(StorybookItemDecorator)
    .addWithJSX('Default', () => {
        return (
            <Menu
                items={[
                    {
                        url: '/one',
                        isActive: false,
                        name: 'Доска'
                    },
                    {
                        url: '/one_1',
                        isActive: false,
                        name: 'Сценарии'
                    },
                    {
                        url: '/one_2',
                        isActive: true,
                        name: 'База скиллов'
                    }
                ]}
            />
        );
    });
