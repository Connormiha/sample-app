import style from './service-item.pcss';
import React from 'react';
import Button from 'components/common/button';
import TextInput from 'components/common/text-input';
import bem from 'bem-css-modules';
import {copyToClipboard} from 'lib/utils';
import ServiceItemStore from 'stores/service-item-store';

const b = bem(style);

interface IServiceItemProps {
    item: ServiceItemStore;
}

export default class ServiceItem extends React.Component<IServiceItemProps> {
    private _handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        copyToClipboard((e.target as HTMLInputElement).value);
    }

    private _renderName(): React.ReactNode {
        const {item} = this.props;

        return (
            <div className={b('name')}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
        );
    }

    private _renderPromocode(): React.ReactNode {
        const {item} = this.props;

        return (
            <div className={b('promocode')}>
                <span>Промокод</span>
                <TextInput
                    value={item.promocode}
                    readOnly
                    size="large"
                    icon="copy"
                    onClick={this._handleClick}
                />
            </div>
        );
    }

    private _renderLink(): React.ReactNode {
        const {item} = this.props;

        return (
            <div className={b('link')}>
                <Button
                    href={item.link}
                    size="large"
                    style="color"
                >
                    Получить промокод
                </Button>
            </div>
        );
    }

    render(): React.ReactNode {
        return (
            <div className={b()}>
                {this._renderName()}
                {this._renderPromocode()}
                {this._renderLink()}
            </div>
        );
    }
}
