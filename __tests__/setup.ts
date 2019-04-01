/* tslint:disable */

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
    adapter: new Adapter()
});

if (!Promise.prototype.finally) {
    Promise.prototype.finally = function (fn: any): Promise<any> {
        return this.then(
            (res) => Promise.resolve(fn()).then(() => res),
            (e) => Promise.resolve(fn()).then(() => {throw e})
        );
    }
}

(window as any).IntersectionObserver = class IntersectionObserver {
    observe(): void {
        // Pass
    }

    disconnect(): void {
        // Pass
    }
};
