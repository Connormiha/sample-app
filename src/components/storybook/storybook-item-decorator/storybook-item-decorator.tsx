import React from 'react';
import StorybookInfoWrapper from 'components/storybook/storybook-info-wrapper/storybook-info-wrapper';
import {StoryDecorator, RenderFunction} from '@storybook/react';
import {BrowserRouter} from 'react-router-dom';

const StorybookItemDecorator: StoryDecorator = (storyFn: RenderFunction, {story}) => {
    return (
        <BrowserRouter>
            <StorybookInfoWrapper
                title={story}
            >
                {storyFn()}
            </StorybookInfoWrapper>
        </BrowserRouter>
    );
};

export default StorybookItemDecorator;
