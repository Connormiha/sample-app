import {IServiceItem, IBalanceInfo} from 'types/api';
import {delay} from 'lib/utils';
import {servicesResult} from 'mocks/services-mock';
import {balanceResult} from 'mocks/balance-mock';

export default {
    getServices(
        filterText: string
    ): Promise<IServiceItem[]> {
        // Тут у нас идет имитация запроса к API сервера
        return delay(2000).then(() => {
            if (filterText) {
                return servicesResult.filter((item) =>
                    item.title.toLowerCase().indexOf(filterText) !== -1 ||
                    (item.description && item.description.toLowerCase().indexOf(filterText) !== -1)
                );
            }

            return servicesResult;
        });
    },

    getBalance(): Promise<IBalanceInfo> {
        // Тут у нас идет имитация запроса к API сервера
        return delay(1000).then(() => balanceResult);
    }
};
