let createStore = initialValue => {
    let listeners = [];
    let store = {
        value: initialValue,
        set(data) {
            console.log(`%c SET`, 'color: red');
            store.value = data;
            store.notify();
        },
        get() {
            return store.value;
        },
        notify() {
            console.log('notify', listeners);

            for (let listener of listeners) {
                listener();
            }
        },
        subscribe(listener) {
            console.log(`%c add listen`, 'color: orange');

            listeners.push(listener);
            listener(store.value);
        },
    };

    return store;
};

function useStore(store) {
    const [, forceRender] = useReducer(c => c + 1, 0);

    console.log(`%c store.get(): ${store.get()}`, 'color: green');

    React.useEffect(() => {
        console.log('useEffect from useStore');

        const rerender = () => forceRender();
        const unsub = store.subscribe(rerender);
        return () => {
            unsub();
        };
    }, [store]);

    return store.get();
}
