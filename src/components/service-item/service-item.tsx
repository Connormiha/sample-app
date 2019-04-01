import style from './service-item.pcss';
import React from 'react';
import bem from 'bem-css-modules';
import ServiceItemStore from 'stores/service-item-store';

const b = bem(style);

interface IServiceItemProps {
    item: ServiceItemStore;
}

export default class ServiceItem extends React.Component<IServiceItemProps> {
    render(): React.ReactNode {
        const {item} = this.props;

        return (
            <div className={b()}>
                {item.title}
                {item.link}
                {item.description}
            </div>
        );
    }
}
