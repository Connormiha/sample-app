import React from 'react';
import MenuItem from 'components/menu-item';

export interface IMenuItem {
    url: string;
    name: string;
    isActive: boolean;
}

interface IMenuProps {
    items: IMenuItem[];
}

export default class Menu extends React.PureComponent<IMenuProps> {
    private _renderItems(): React.ReactNode {
        return this.props.items.map(({url, name, isActive}) => (
            <MenuItem
                key={url}
                isActive={isActive}
                url={url}
                title={name}
            />
        ));
    }

    render(): React.ReactNode {
        return (
            <nav>
                {this._renderItems()}
            </nav>
        );
    }
}
