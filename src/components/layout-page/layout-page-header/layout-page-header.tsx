import style from './layout-page-header.pcss';
import React from 'react';
import bem from 'bem-css-modules';

const b = bem(style);

interface ILayoutPageHeaderProps {
    children: React.ReactNode;
}

export default function LayoutPageHeader(props: ILayoutPageHeaderProps): React.ReactElement {
    return (
        <div className={b()}>
            {props.children}
        </div>
    );
}
