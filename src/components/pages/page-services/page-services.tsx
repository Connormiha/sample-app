import React from 'react';
import LayoutPageMain from 'components/layout-page/layout-page-main';
import Services from 'components/services';
import Balance from 'components/balance';

export default class PageServices extends React.Component {
    private _renderHeader(): React.ReactNode {
        return (
            <Balance />
        );
    }

    render(): React.ReactNode {
        return (
            <LayoutPageMain headerPanel={this._renderHeader()}>
                <Services />
            </LayoutPageMain>
        );
    }
}
