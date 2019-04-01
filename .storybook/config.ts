import {configure} from '@storybook/react';

const requireStory = require.context('../src/components', true, /\.story\.tsx$/);

configure(() => {
    requireStory.keys().forEach(requireStory);
}, module);
