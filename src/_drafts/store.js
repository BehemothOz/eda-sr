/*
    == Not used ==

    Different ideas.
*/

/*
    Create simple store
*/
const createStore = initialValue => {
    const listeners = new Set();
    const store = {
        value: initialValue,
        set(newValue) {
            store.value = newValue;
            store.notify();
        },
        get() {
            return store.value;
        },
        notify() {
            listeners.forEach(listener => listener());
        },
        subscribe(listener) {
            listeners.add(listener);
            listener(store.value); // execute immediately (?)

            return () => {
                listeners.delete(listener);
            }
        },
    };

    return store;
};

/*
    Some action
    const set = num => store.set(store.get() % num);
*/

/*
    Connect simple store with hook
*/
function useStore(store) {
    const [, forceRender] = useReducer(c => c + 1, 0); // or useState({}) -> setState({});

    useEffect(() => {
        const rerender = () => forceRender(); // re-render view
        const unsub = store.subscribe(rerender);
        return () => {
            unsub();
        };
    }, [store]);

    return store.get();
}