export const promiseNoop = () => Promise.resolve();
export const noop = () => {};
export const delay = (time: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

export interface IAsyncAction {
    cancel: () => void;
    promise: Promise<void>;
}

export const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

export const lang = (function (): (key: string) => string {
    const translations = JSON.parse(document.querySelector('#translations')!.textContent!);

    return (key: string) => {
        const path = key.split('.');
        let result: any = translations;

        for (let i = 0; i < path.length; i++) {
            result = result[path[i]];

            if (result === undefined) {
                // Не переведенная часть
                return key.toUpperCase();
            }
        }

        return result;
    };
})();

export interface IAsyncCallbacks<T> {
    success?: (res: T) => void;
    fail?: (err: any) => void;
    always?: () => void;
}

export const asyncAction = <T>(
    promise: Promise<T>,
    {success, fail, always}: IAsyncCallbacks<T>
): IAsyncAction => {
    let isCanceled = false;

    const newPromise = promise.then(
        (res) => {
            if (!isCanceled) {
                if (success) {
                    success(res);
                }
                if (always) {
                    always();
                }
            }
        },
        (err) => {
            if (!isCanceled) {
                if (fail) {
                    fail(err);
                }
                if (always) {
                    always();
                }
            }
        }
    );

    return {
        cancel: () => isCanceled = true,
        promise: newPromise
    };
};
