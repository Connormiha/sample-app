import React from 'react';
import {storiesOf} from '@storybook/react';
import 'common/storybook/addons';
import Icon, {IIconSize, IIconView} from './icon';

const ALLOWED_ICONS: IIconView[] = [
    'copy',
    'logo'
];

const getIcons = (size: IIconSize): React.ReactNode => {
    return ALLOWED_ICONS.map((view: IIconView) =>
        (
            <span
                key={view}
                style={{margin: '4px'}}
            >
                <Icon
                    size={size}
                    view={view}
                />
            </span>
        )
    );
};

storiesOf('Icon', module)
    .addWithJSX('Small', () => {
        return getIcons('small');
    })
    .addWithJSX('Medium', () => {
        return getIcons('medium');
    })
    .addWithJSX('Large', () => {
        return getIcons('large');
    });
