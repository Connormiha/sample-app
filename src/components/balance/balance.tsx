import style from './balance.pcss';
import React from 'react';
import {observer, inject} from 'mobx-react';
import BalanceStore from 'stores/balance-store';
import {toNumberFormat} from 'lib/numbers';
import notificationsProvider, {INotificationsProviderComponentProps} from 'components/providers/notifications-provider';
import {IReactComponentWithOmittedProps} from 'types/helpers';
import {ICurrency} from 'types/api';
import bem from 'bem-css-modules';

const b = bem(style);

const CURRENCY_MARKS: Record<ICurrency, string> = {
    rub: '₽',
    usd: '$',
    eur: '€'
};

interface IBalanceProps extends INotificationsProviderComponentProps {
    balance: BalanceStore;
}

@inject('balance')
@observer
class Balance extends React.Component<IBalanceProps> {
    componentDidMount(): void {
        this.props.balance.fetch().catch(() => {
            this.props.onAddErrorNotification('Ошибка', 'Не удалось загрузить баланс');
        });
    }

    componentWillUnmount(): void {
        this.props.balance.cancelFetch();
    }

    render(): React.ReactNode {
        const {balance} = this.props;

        if (!balance.currency) {
            return null;
        }

        const currencyMark = ` ${CURRENCY_MARKS[balance.currency]}`;

        return (
            <div className={b()}>
                <div className={b('item')}>
                    Баланс
                    <div className={b('amount')}>
                        {toNumberFormat(balance.balance)}
                        {currencyMark}
                    </div>
                </div>
                <div className={b('item')}>
                    К выплате
                    <div className={b('amount')}>
                        {toNumberFormat(balance.nextPayout)}
                        {currencyMark}
                    </div>
                </div>
            </div>
        );
    }
}

export default notificationsProvider(Balance) as IReactComponentWithOmittedProps<
    IBalanceProps,
    'balance' | keyof INotificationsProviderComponentProps
>;
