import React from 'react';
import {Provider} from 'mobx-react';
import routes from 'routes/routes';
import stores from 'stores/init';
import {render, RenderResult} from 'react-testing-library';
import {servicesResult} from 'mocks/services-mock';
import {delay, promiseNoop} from 'lib/utils';

describe('Route', () => {
    const originalHref = location.href;
    const originalTitle = document.title;

    type IAction = (tree: RenderResult, stores: Record<string, any>) => void;

    async function matchRoute(
        url: string,
        action?: IAction
    ): Promise<void> {
        history.replaceState({}, originalTitle, url);
        const currentStores = stores();

        const tree = render(
            <Provider {...currentStores}>
                {routes}
            </Provider>
        );

        await delay(0);

        if (action) {
            action(tree, currentStores);
            await delay(0);
        }
        const fragment = tree.asFragment();
        tree.unmount();
        expect(fragment).toMatchSnapshot();
    }

    afterAll(() => {
        history.replaceState({}, originalTitle, originalHref);
    });

    type ICase = [string, string, IAction?];
    const CASES: ICase[] = [
        ['/foo', '<PageNotFound />'],
        ['/services', '<PageServices /> loading'],
        [
            '/services',
            '<PageServices /> loaded',
            (_, stores) => {
                stores.services.fetchItems = promiseNoop;
                stores.services.addItems(servicesResult);
                stores.services.removeLoadingStatus();
            }
        ]
    ];

    CASES.forEach(([url, pageName, action]) => {
        it(`should render ${pageName}`, async () => {
            await matchRoute(url, action);
        });
    });
});
