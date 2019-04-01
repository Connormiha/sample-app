import mainWebpackConfig from '../webpack.config';

import {Configuration, Rule} from 'webpack';

export default ({config: storybookBaseConfig}: {config: Configuration}): Configuration => {
    if (
        !mainWebpackConfig || !mainWebpackConfig.module || !mainWebpackConfig.optimization ||
        !mainWebpackConfig.resolve || !mainWebpackConfig.resolve.modules || !mainWebpackConfig.plugins
    ) {
        return storybookBaseConfig;
    }

    storybookBaseConfig.module = storybookBaseConfig.module || {rules: []};
    storybookBaseConfig.resolve = storybookBaseConfig.resolve || {extensions: [], modules: []};
    storybookBaseConfig.plugins = storybookBaseConfig.plugins || [];
    storybookBaseConfig.optimization = storybookBaseConfig.optimization || {};

    storybookBaseConfig.devtool = false;
    storybookBaseConfig.optimization.minimizer = mainWebpackConfig.optimization.minimizer;
    storybookBaseConfig.mode = mainWebpackConfig.mode;
    // Issue https://github.com/storybooks/storybook/issues/5941
    storybookBaseConfig.module.rules = storybookBaseConfig.module.rules.filter((rule: Rule) => {
        return !rule.test.toString().includes('svg');
    });
    storybookBaseConfig.module.rules = [...storybookBaseConfig.module.rules, ...mainWebpackConfig.module.rules];
    storybookBaseConfig.resolve.extensions = mainWebpackConfig.resolve.extensions;
    storybookBaseConfig.resolve.modules = [...mainWebpackConfig.resolve.modules, 'src'];
    storybookBaseConfig.plugins = [...storybookBaseConfig.plugins, ...mainWebpackConfig.plugins];

    // Return the altered config
    return storybookBaseConfig;
};
