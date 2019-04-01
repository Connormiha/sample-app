import {observable, action, IObservableArray} from 'mobx';
import ServiceItemStore from 'stores/service-item-store';
import api from 'lib/api';
import {asyncAction, IAsyncAction} from 'lib/utils';
import {IServiceItem} from 'types/api';

export default class ServicesStore {
    private _previousRequest: IAsyncAction | null = null;
    readonly items: IObservableArray<ServiceItemStore> = observable([]);
    @observable isLoading = false;
    @observable filterText = '';

    @action
    setLoadingStatus(): void {
        this.isLoading = true;
    }

    @action
    removeLoadingStatus(): void {
        this.isLoading = false;
    }

    @action
    setFilterText(filterText: string): void {
        this.filterText = filterText;
    }

    @action
    addItems(items: IServiceItem[]): void {
        items.forEach((item) =>
            this.items.push(new ServiceItemStore(item))
        );
    }

    @action
    clear(): void {
        this.items.clear();
    }

    fetchItems = (): Promise<void> => {
        this.setLoadingStatus();

        this.cancelFetch();

        const promise = api.getServices(this.filterText.toLowerCase());

        this._previousRequest = asyncAction(promise, {
            success: (result) => {
                this.clear();
                this.addItems(result);
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
