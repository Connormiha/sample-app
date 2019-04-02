import style from './service-item.pcss';
import React from 'react';
import Button from 'components/common/button';
import TextInput from 'components/common/text-input';
import bem from 'bem-css-modules';
import {copyToClipboard, lang} from 'lib/utils';
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
                <h3 className={b('title')}>
                    {item.title}
                </h3>
                <p className={b('description')}>
                    {item.description}
                </p>
            </div>
        );
    }

    private _renderPromocode(): React.ReactNode {
        const {item} = this.props;

        if (!item.promocode) {
            return null;
        }

        return (
            <div className={b('promocode')}>
                <span className={b('promocode-text')}>
                    {lang('promocode')}
                </span>
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
                    isExternal
                    fullWidth
                    size="large"
                    style="color"
                >
                    {lang('get_promocode')}
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
