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
