import {configure} from '@storybook/react';
import {execSync} from 'child_process';

const files = execSync('find src/client/components/ -type f -name "*.story.tsx"', {encoding: 'utf8'});

configure(() => {
    files.trim().split(/\s/g).forEach((item: string) => {
        require(`../${item.replace('//', '/')}`);
    });
}, module);
