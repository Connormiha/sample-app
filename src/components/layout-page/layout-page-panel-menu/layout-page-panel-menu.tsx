import style from './layout-page-panel-menu.pcss';
import React from 'react';
import Menu, {IMenuItem} from 'components/menu';
import Icon from 'components/common/icon';
import {MENU_ITEMS_SECTION} from './menu-items';
import bem from 'bem-css-modules';

const b = bem(style);

interface ILayoutPagePanelMenuProps {
    pathname: string;
}

export default class LayoutPagePanelMenu extends React.PureComponent<ILayoutPagePanelMenuProps> {
    private _renderMenu(): React.ReactNode {
        const {pathname} = this.props;
        const items: IMenuItem[] = MENU_ITEMS_SECTION.map(({name, url}) => ({
            name,
            url,
            isActive: pathname.startsWith(url)
        }));

        return (
            <Menu items={items} />
        );
    }

    render(): React.ReactNode {
        return (
            <section className={b()}>
                <div className={b('logo')}>
                    <Icon
                        size="large"
                        view="logo"
                    />
                </div>
                <div className={b('menu')}>
                    {this._renderMenu()}
                </div>
            </section>
        );
    }
}
