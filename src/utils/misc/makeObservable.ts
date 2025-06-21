"use client";

export default function makeObservable(target: unknown) {
    let listeners: Array<(value: unknown) => void> = [];
    let value = target;

    function get() {
        return value;
    }

    function set(newValue: unknown) {
        if (value === newValue) {
            return;
        }

        value = newValue;

        for (const l of listeners) {
            l(value);
        }
    }

    function subscribe(listenerFunction: (value: unknown) => void) {
        listeners.push(listenerFunction);

        // should be fired on the component unmount (when used in useEffect)
        return () => unsubscribe(listenerFunction);
    }

    function unsubscribe(listenerFunction: (value: unknown) => void) {
        listeners = listeners.filter(
            (l) => l !== listenerFunction,
        );
    }

    return {
        get,
        set,
        subscribe,
    };
}
