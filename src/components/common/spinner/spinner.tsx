import React from 'react';
import style from './spinner.pcss';
import bem from 'bem-css-modules';

const b = bem(style);

export type ISpinnerSize = 'small' | 'medium' | 'large' | 'xlarge';

interface ISpinnerProps {
    size: ISpinnerSize;
}

export default function Spinner(props: ISpinnerProps): React.ReactElement {
    const {size} = props;

    return (
        <div
            className={b({size})}
        />
    );
}
