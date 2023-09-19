import { RefObject, useCallback, useRef } from 'react';

/**
 * Creates a ref that is always updated whenever the value changes, so it is
 * safe to use in async functions and event listeners that are set once and
 * such.
 * 
 * Note that this **WILL NOT** cause a re-render, so any references in the DOM
 * won't update, and passing `ref.current` as a prop to components will not
 * re-render them. You **can** pass the ref itself as a prop to provide the
 * up-to-date value, although this still will not cause a re-render.
 * 
 * @param value The value that the ref should be set to and stay up-to-date to.
 * @returns A ref containing the latest value.
 */
function useValueRef<T>(value: T): RefObject<T> {
    const ref = useRef(value);
    ref.current = value;

    return ref;
}

/**
 * Creates a wrapper function that does not change but always calls the latest
 * value of `func`.
 * 
 * Safe to use in event listeners and such.
 *
 * @param func The function to run.
 * @returns A wrapper function that always calls the latest value of func.
 */
function useFunctionRef<T extends (...args: any) => any>(func: T): T {
    const funcRef = useRef(func);
    funcRef.current = func;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const wrapperFunc: T = useCallback<T>(((
        (...args: Parameters<T>) => funcRef.current(args)
    ) as unknown) as T, []);

    return wrapperFunc;
}

export { useValueRef, useFunctionRef };
