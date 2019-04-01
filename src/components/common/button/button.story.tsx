import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import 'common/storybook/addons';
import Button, {IButtonStyle, IButtonSize} from './button';

const storyActionClick = action('button-click');
storyActionClick.toString = () => '[[Function]]';

const getStory = (style: IButtonStyle, isDisabled: boolean): React.ReactNode => {
    return (['small', 'medium', 'large'] as IButtonSize[]).map((size) => (
        <div
            key={size}
            style={{
                display: 'inline-block',
                margin: '0 0 10px 20px',
                verticalAlign: 'top'
            }}
        >
            <Button
                size={size}
                style={style}
                disabled={isDisabled}
                key={size}
                onClick={storyActionClick}
            >
                Hello Button!
            </Button>
        </div>
    ));
};

const createTotalStory = (style: IButtonStyle) => {
    return (
        <div key={style}>
            <h2>Default</h2>
            {getStory(style, false)}
            <h2>Disabled</h2>
            {getStory(style, true)}
        </div>
    );
};

storiesOf('Button', module)
    .addWithJSX('Color', () => {
        return createTotalStory('color');
    })
    .addWithJSX('Transparent', () => {
        return createTotalStory('transparent');
    });
