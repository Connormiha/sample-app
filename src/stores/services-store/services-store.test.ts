import ServicesStore from './services-store';
import {servicesResult} from 'mocks/services-mock';

describe('ServicesStore', () => {
    it('should change filter text', () => {
        const store = new ServicesStore();

        expect(store.filterText).toBe('');
        store.setFilterText('Foo');
        expect(store.filterText).toBe('Foo');
    });

    it('should addItems and clear', () => {
        const store = new ServicesStore();

        expect(store.items).toHaveLength(0);
        store.addItems(servicesResult);
        expect(store.items).toHaveLength(servicesResult.length);
        store.clear();
        expect(store.items).toHaveLength(0);
    });
});
