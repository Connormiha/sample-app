import React from 'react';
import style from './storybook-info-wrapper.pcss';
import bem from 'bem-css-modules';

const b = bem(style);

interface IStorybookInfoWrapperProps {
    title: string;
    children: React.ReactNode;
}

export default class StorybookInfoWrapper extends React.PureComponent<IStorybookInfoWrapperProps> {
    private _renderChildrens(): React.ReactNode {
        return React.Children.map(this.props.children, (child: React.ReactChild, i) => {
            return (
                <div className={b('item')} key={i}>
                    {child}
                </div>
            );
        });
    }

    render(): React.ReactNode {
        const {title} = this.props;

        return (
            <div
                className={b()}
            >
                <h3 className={b('title')}>{title}</h3>
                {this._renderChildrens()}
            </div>
        );
    }
}
