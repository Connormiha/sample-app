import * as React from 'react';
import {storiesOf} from '@storybook/react';
import 'common/storybook/addons';
import StorybookItemDecorator from 'components/storybook/storybook-item-decorator/storybook-item-decorator';
import Spinner, {ISpinnerSize} from './spinner';

storiesOf('Spinner', module)
    .addDecorator(StorybookItemDecorator)
    .addWithJSX('Default', () => {
        return ['xlarge', 'large', 'medium', 'small'].map(
            (size: ISpinnerSize) => <Spinner size={size} key={size} />
        );
    });
