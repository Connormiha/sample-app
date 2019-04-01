import 'common/css/global.pcss';
import 'common/css/ui-variables.pcss';
import 'common/css/ui-animations.pcss';
import 'common/storybook/global.pcss';
import {addParameters, setAddon} from '@storybook/react';
import {backgrounds} from './backgrounds';
import JSXAddon from 'storybook-addon-jsx';

addParameters(backgrounds);
setAddon(JSXAddon);
