const {writeFile} = require('fs');
const {resolve} = require('path');
const {execSync} = require('child_process');
const {createInterface} = require('readline');

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const getInput = async (message, isRequired = true) => {
    return new Promise((resolve) => {
        rl.question(message, (answer) => {
            if (isRequired && !answer) {
                throw Error('It is required value');
            }
            resolve(answer);
        });
    });
};

const toCamelCase = (str) => {
    return str.replace(/-[a-z\d]/ig, (str) => str.slice(1).toUpperCase());
};

const getIndex = (name) => {
    return [
        `export * from './${name}';`,
        `export {default} from './${name}';`,
        ''
    ].join('\n');
};

const getReactComponentTemplate = (name) => {
    const className = `${name[0].toUpperCase()}${toCamelCase(name).slice(1)}`;
    return [
        `import style from './${name}.pcss';`,
        'import React from \'react\';',
        'import bem from \'bem-css-modules\';',
        '',
        'const b = bem(style);',
        '',
        `interface I${className}Props {`,
        '    propName: string;',
        '}',
        '',
        `export default class ${className} extends React.PureComponent<I${className}Props> {`,
        '    render(): React.ReactNode {',
        '        return null;',
        '    }',
        '}',
        ''
    ].join('\n');
};

const getStorybookTemplate = (name) => {
    const className = `${name[0].toUpperCase()}${toCamelCase(name).slice(1)}`;
    const pathDecorator = 'components/storybook/storybook-item-decorator';
    return [
        'import React from \'react\';',
        'import {storiesOf} from \'@storybook/react\';',
        'import \'common/storybook/addons\';',
        `import StorybookItemDecorator from '${pathDecorator}';`,
        `import ${className} from './${name}';`,
        '',
        `storiesOf('${className}', module)`,
        '    .addDecorator(StorybookItemDecorator)',
        ''
    ].join('\n');
};

const getStyleComponentTemplate = (name) => {
    return [
        `.${name} {`,
        '',
        '}',
        ''
    ].join('\n');
};

const getUnitTestTemplate = () => {
    return [
        'import {requireSnapshot} from \'common/storybook/jest-storyshots\';',
        '',
        'requireSnapshot(__filename);',
        ''
    ].join('\n');
};

async function run() {
    const name = await getInput('Enter component name: ');
    const subfolder = await getInput('Enter subfolder(optional): ', false) || '';
    const isNeedStorybook = await getInput('Is need StoryBook? ', false) || '';

    rl.close();

    const componentFolder = resolve(__dirname, '../src/components', subfolder, name);

    execSync(`mkdir -p ${componentFolder}`);
    writeFile(resolve(componentFolder, 'index.ts'), getIndex(name), () => {});
    writeFile(resolve(componentFolder, `${name}.tsx`), getReactComponentTemplate(name), () => {});
    writeFile(resolve(componentFolder, `${name}.pcss`), getStyleComponentTemplate(name), () => {});

    if (isNeedStorybook[0] === 'y') {
        writeFile(resolve(componentFolder, `${name}.test.tsx`), getUnitTestTemplate(), () => {});
        writeFile(resolve(componentFolder, `${name}.story.tsx`), getStorybookTemplate(name), () => {});
    }
}

run();
