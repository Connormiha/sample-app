import style from './services.pcss';
import React from 'react';
import {observer, inject} from 'mobx-react';
import {IReactComponentWithOmittedProps} from 'types/helpers';
import notificationsProvider, {INotificationsProviderComponentProps} from 'components/providers/notifications-provider';
import {lang} from 'lib/utils';
import debounce from 'lodash/debounce';
import ServicesStore from 'stores/services-store';
import ServiceItem from 'components/service-item';
import Spinner from 'components/common/spinner';
import TextInput from 'components/common/text-input';
import Button from 'components/common/button';
import bem from 'bem-css-modules';

const b = bem(style);

interface IServicesProps extends INotificationsProviderComponentProps {
    services: ServicesStore;
}

@inject('services')
@observer
class Services extends React.Component<IServicesProps> {
    private _requestDebounced: any;

    constructor(props: IServicesProps) {
        super(props);
        this._requestDebounced = debounce(this.props.services.fetchItems, 1000);
    }

    componentDidMount(): void {
        this.props.services.fetchItems()
            .catch(() => {
                this.props.onAddErrorNotification(lang('errors.common_title'), lang('errors.load_services'));
            });
    }

    componentWillUnmount(): void {
        this._requestDebounced.cancel();
        this.props.services.cancelFetch();
        this.props.services.clear();
    }

    private _handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        this._requestDebounced();
        this.props.services.setFilterText(e.target.value);
    }

    private _handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        this._requestDebounced();
        this.props.services.setFilterText('');
    }

    private _renderLoading(): React.ReactNode {
        if (this.props.services.isLoading) {
            return (
                <div className={b('spinner')}>
                    <Spinner size="large" />
                </div>
            );
        }

        return null;
    }

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

    private _renderFilter(): React.ReactNode {
        const {filterText, isLoading} = this.props.services;

        return (
            <form
                className={b('filter')}
                onSubmit={this._handleSubmit}
            >
                {lang('filters')}
                <div className={b('filter-controls')}>
                    <div className={b('input-filter')}>
                        <TextInput
                            onChange={this._handleChangeFilter}
                            disabled={isLoading}
                            value={filterText}
                            size="large"
                        />
                    </div>
                    <div className={b('button-reset')}>
                        <Button
                            size="large"
                            type="submit"
                            disabled={isLoading || !filterText}
                        >
                            {lang('reset')}
                        </Button>
                    </div>
                </div>
            </form>
        );
    }

    render(): React.ReactNode {
        return (
            <section className={b()}>
                <h1 className={b('title')}>{lang('services.title')}</h1>
                {this._renderFilter()}
                {this._renderServices()}
                {this._renderLoading()}
            </section>
        );
    }
}

export default notificationsProvider(Services) as IReactComponentWithOmittedProps<
    IServicesProps,
    'services' | keyof INotificationsProviderComponentProps
>;
