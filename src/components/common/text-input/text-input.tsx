import style from './text-input.pcss';
import React from 'react';
import Icon, {IIconView} from 'components/common/icon';
import bem from 'bem-css-modules';

const b = bem(style);

export type ITextInputSize = 'small' | 'medium' | 'large';
export type ITextInputType = 'text' | 'password' | 'number' | 'tel' | 'email';

export interface ITextInputProps {
    invalid?: boolean;
    size: ITextInputSize;
    value: string;
    icon?: IIconView;
    type?: ITextInputType;
    maxLength?: number;
    autoComplete?: string;
    min?: number;
    pattern?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    onDoubleClick?: React.MouseEventHandler<HTMLInputElement>;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onFocusCapture?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onBlurCapture?: React.FocusEventHandler<HTMLInputElement>;
}

export default function TextInput(props: ITextInputProps): React.ReactElement {
    const {size, invalid, icon, ...rest} = props;

    return (
        <div className={b()}>
            <input
                className={b('input', {size, invalid})}
                {...rest}
            />
            {icon && (
                <div className={b('icon')}>
                    <Icon
                        size="small"
                        view={icon}
                    />
                </div>
            )
            }
        </div>
    );
}
