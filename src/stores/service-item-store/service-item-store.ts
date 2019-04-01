import {IServiceItem} from 'types/api';

export default class ServiceItemStore {
    id: string;
    title: string;
    link: string;
    promocode: string;
    description: string;

    constructor(data: IServiceItem) {
        this.id = data.id;
        this.title = data.title;
        this.link = data.link;
        this.promocode = data.promocode || '';
        this.description = data.description || '';
    }
}
