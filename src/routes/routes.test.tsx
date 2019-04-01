import React from 'react';
import {Provider} from 'mobx-react';
import routes from 'routes/routes';
import stores from 'stores/init';
import {render, RenderResult} from 'react-testing-library';
import {delay} from 'lib/utils';

describe('Route', () => {
    const originalHref = location.href;
    const originalTitle = document.title;

    async function matchRoute(url: string, action?: (tree: RenderResult) => void): Promise<void> {
        history.replaceState({}, originalTitle, url);

        const tree = render(
            <Provider {...stores()}>
                {routes}
            </Provider>
        );

        await delay(0);

        if (action) {
            action(tree);
            await delay(0);
        }
        const fragment = tree.asFragment();
        tree.unmount();
        expect(fragment).toMatchSnapshot();
    }

    afterAll(() => {
        history.replaceState({}, originalTitle, originalHref);
    });

    type ICase = [string, string, ((tree: RenderResult) => void)?];
    const CASES: ICase[] = [
        [
            '/foo', '<PageNotFound />'
        ]
    ];

    CASES.forEach(([url, pageName, action]) => {
        it(`should render ${pageName}`, async () => {
            await matchRoute(url, action);
        });
    });
});
