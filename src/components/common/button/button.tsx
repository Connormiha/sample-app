import style from './button.pcss';
import React from 'react';
import {Link} from 'react-router-dom';
import bem from 'bem-css-modules';

const b = bem(style);

export type IButtonSize = 'small' | 'medium' | 'large';
export type IButtonType = 'button' | 'submit' | 'reset';
export type IButtonStyle = 'transparent' | 'color';

interface IButtonProps {
    size: IButtonSize;
    style?: IButtonStyle;
    disabled?: boolean;
    type?: IButtonType;
    tabIndex?: number;
    ariaLabel?: string;
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default class Button extends React.PureComponent<IButtonProps> {
    static defaultProps = {
        style: 'transparent'
    };

    render(): React.ReactNode {
        const {size, children, href, style, ...rest} = this.props;

        if (href) {
            return (
                <Link
                    to={href}
                    className={b({
                        size,
                        disabled: rest.disabled,
                        style
                    })}
                >
                    {children}
                </Link>
            );
        }

        return (
            <button
                {...rest}
                className={b({
                    size,
                    style
                })}
            >
                {children}
            </button>
        );
    }
}
