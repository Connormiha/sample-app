import React from 'react';
import {storiesOf} from '@storybook/react';
import 'common/storybook/addons';
import {action} from '@storybook/addon-actions';
import TextInput, {ITextInputSize, ITextInputType} from './text-input';
import bem from 'bem-css-modules';
import styleTable from 'common/storybook/storybook-table.pcss';

const b = bem(styleTable);

const storyActionChange = action('input-change');

interface ITextInputContainerProps {
    value: string;
    placeholder?: string;
    invalid?: boolean;
    size: ITextInputSize;
    type?: ITextInputType;
}

class InputStorybookWrapper extends React.PureComponent<ITextInputContainerProps, {value: string}> {
    constructor(props: ITextInputContainerProps) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: e.target.value});
        storyActionChange(e);
    }

    render(): React.ReactNode {
        return (
            <TextInput
                {...this.props}
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
    }
}

interface ITextInputStorybookTableProps {
    name: string;
    invalid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    type?: ITextInputType;
}

class InputStorybookTable extends React.PureComponent<ITextInputStorybookTableProps> {
    render(): React.ReactNode {
        const {
            invalid = false,
            disabled = false,
            readOnly = false,
            type = 'text',
            name
        } = this.props;

        return (
            <div className={b()}>
                <h1 className={b('title')}>{name}</h1>
                <hr />
                <table className={b('table')}>
                   <tbody>
                        <tr>
                            <td className={b('td', {width: 'small'})}>
                                <InputStorybookWrapper
                                    {...{invalid, disabled, readOnly, type}}
                                    value="Hello input!"
                                    placeholder="Place holder input"
                                    size="small"
                                />
                            </td>
                            <td className={b('td', {width: 'medium'})}>
                                <InputStorybookWrapper
                                    {...{invalid, disabled, readOnly, type}}
                                    value="Hello input!"
                                    placeholder="Place holder input"
                                    size="medium"
                                />
                            </td>
                            <td className={b('td', {width: 'large'})}>
                                <InputStorybookWrapper
                                    {...{invalid, disabled, readOnly, type}}
                                    value=""
                                    placeholder="Enter your name"
                                    size="large"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

storiesOf('TextInput', module)
    // .addDecorator(backgrounds)
    .add('Default', () => {
        return (
            <div>
                <InputStorybookTable
                    name="Default"
                />
                <InputStorybookTable
                    name="Invalid"
                    invalid
                />
                <InputStorybookTable
                    name="Disabled"
                    disabled
                />
                <InputStorybookTable
                    name="Readonly"
                    readOnly
                />
                <InputStorybookTable
                    name="Type password"
                    type="password"
                />
                <InputStorybookTable
                    name="Type number"
                    type="number"
                />
            </div>
        );
    });
