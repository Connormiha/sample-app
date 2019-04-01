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

    fetchItems(): Promise<void> {
        this.setLoadingStatus();

        if (this._previousRequest) {
            this._previousRequest.cancel();
        }

        const promise = api.getServices(this.filterText);

        this._previousRequest = asyncAction(promise, {
            success: (result) => {
                this.addItems(result);
            },

            always: () => {
                this.removeLoadingStatus();
            }
        });

        return this._previousRequest.promise;
    }
}
