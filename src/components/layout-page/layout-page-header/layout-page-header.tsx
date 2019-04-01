import style from './layout-page-header.pcss';
import React from 'react';
import bem from 'bem-css-modules';

const b = bem(style);

export default class LayoutPageHeader extends React.PureComponent {
    private _renderUser(): React.ReactNode {
        return (
            <div className={b('right')}>
                .
            </div>
        );
    }

    render(): React.ReactNode {
        return (
            <div className={b()}>
                <div>
                    {this.props.children}
                </div>
                {this._renderUser()}
            </div>
        );
    }
}
