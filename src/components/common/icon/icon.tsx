import style from './icon.pcss';
import React from 'react';
import bem from 'bem-css-modules';

const b = bem(style);

export type IIconSize = 'small' | 'medium' | 'large';
export type IIconView =
    'logo' |
    'copy';

interface IIconProps {
    view: IIconView;
    size: IIconSize;
}

export default React.memo((props: IIconProps) => {
    const {view, size} = props;

    return (
        <span className={b({name: view, size})} />
    );
});
