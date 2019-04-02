import {observable, action} from 'mobx';
import api from 'lib/api';
import {asyncAction, IAsyncAction} from 'lib/utils';
import {IBalanceInfo, ICurrency} from 'types/api';

export default class BalanceStore {
    private _previousRequest: IAsyncAction | null = null;
    @observable isLoading = false;
    @observable balance!: number;
    @observable nextPayout!: number;
    @observable currency!: ICurrency;

    @action
    setLoadingStatus(): void {
        this.isLoading = true;
    }

    @action
    removeLoadingStatus(): void {
        this.isLoading = false;
    }

    @action
    addData(data: IBalanceInfo): void {
        this.balance = data.balance;
        this.nextPayout = data.next_payout;
        this.currency = data.currency;
    }

    fetch = (): Promise<void> => {
        this.setLoadingStatus();

        this.cancelFetch();

        const promise = api.getBalance();

        this._previousRequest = asyncAction(promise, {
            success: (result) => {
                this.addData(result);
            },

            always: () => {
                this.removeLoadingStatus();
            }
        });

        return this._previousRequest.promise;
    }

    cancelFetch(): void {
        if (this._previousRequest) {
            this._previousRequest.cancel();
        }
    }
}
