import style from './services.pcss';
import React from 'react';
import {observer, inject} from 'mobx-react';
import {IReactComponentWithOmittedProps} from 'types/helpers';
import notificationsProvider, {INotificationsProviderComponentProps} from 'components/providers/notifications-provider';
import ServicesStore from 'stores/services-store';
import ServiceItem from 'components/service-item';
import bem from 'bem-css-modules';

const b = bem(style);

interface IServicesProps extends INotificationsProviderComponentProps {
    services: ServicesStore;
}

@inject('services')
@observer
class Services extends React.Component<IServicesProps> {
    private _renderServices(): React.ReactNode {
        return this.props.services.items.map((item) =>
            (
                <ServiceItem
                    key={item.link}
                    item={item}
                />
            )
        );
    }

    render(): React.ReactNode {
        return (
            <div className={b()}>
                {this._renderServices()}
            </div>
        );
    }
}

export default notificationsProvider(Services) as IReactComponentWithOmittedProps<
    IServicesProps,
    'services' | keyof INotificationsProviderComponentProps
>;
