import style from './menu-item.pcss';
import React from 'react';
import {Link} from 'react-router-dom';
import bem from 'bem-css-modules';

const b = bem(style);

interface IMenuItemProps {
    url: string;
    isActive: boolean;
    title: string;
}

export default function MenuItem({url, title, isActive}: IMenuItemProps): React.ReactElement {
    return (
        <Link
            className={b({active: isActive})}
            title={title}
            to={url}
        />
    );
}
