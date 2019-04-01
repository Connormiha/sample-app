import style from './layout-page-main.pcss';
import React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import LayoutPagePanelMenu from 'components/layout-page/layout-page-panel-menu';
import LayoutPageHeader from 'components/layout-page/layout-page-header';
import bem from 'bem-css-modules';

const b = bem(style);

interface ILayoutPageProps extends RouteComponentProps {
    headerPanel?: React.ReactNode;
}

class LayoutPageMain extends React.PureComponent<ILayoutPageProps> {
    private _renderHeader(): React.ReactNode {
        return (
            <header>
                <LayoutPageHeader>
                    {this.props.headerPanel}
                </LayoutPageHeader>
            </header>
        );
    }

    private _renderMenu(): React.ReactNode {
        return (
            <section className={b('left')}>
                <LayoutPagePanelMenu pathname={this.props.location.pathname} />
            </section>
        );
    }

    render(): React.ReactNode {
        return (
            <div className={b()}>
                {this._renderMenu()}
                <section className={b('right')}>
                    {this._renderHeader()}
                    <main className={b('content')}>
                        {this.props.children}
                    </main>
                </section>
            </div>
        );
    }
}

export default withRouter(LayoutPageMain);
