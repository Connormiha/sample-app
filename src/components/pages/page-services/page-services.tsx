import React from 'react';
import LayoutPageMain from 'components/layout-page/layout-page-main';
import Services from 'components/services';

export default class PageServices extends React.PureComponent {
    render(): React.ReactNode {
        return (
            <LayoutPageMain>
                <Services />
            </LayoutPageMain>
        );
    }
}
