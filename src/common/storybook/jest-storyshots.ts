import initStoryshots from '@storybook/addon-storyshots';

export const requireSnapshot = (path: string): void => {
    const config: any = {
        config: ({configure}: any): any => {
            configure(() => {
                require(path.replace('.test', '.story'));
            }, module);
        },
        framework: 'react'
    };

    initStoryshots(config);
};
