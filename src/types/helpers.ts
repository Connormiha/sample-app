import {ComponentClass} from 'react';
export type IOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type IReactComponentWithOmittedProps<Props extends {}, E extends keyof Props, State = {}>
    = ComponentClass<IOmit<Props, E>, State>;

export interface IConstructor<T> extends Function {
    new (...args: any[]): T;
}
