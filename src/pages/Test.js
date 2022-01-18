import { useContext, useMemo, useEffect, createContext, useState, useCallback, useReducer } from 'react';

const getPathFromPublic = path => `${process.env.PUBLIC_URL}/${path}`;

// const createAction = (type, value = '') => ({ type, value });

const serialize = action => {
    try {
        return JSON.stringify(action);
    } catch (error) {
        throw Error('Oops');
    }
};

const parse = data => {
    try {
        return JSON.parse(data);
    } catch (error) {
        throw Error('Oops');
    }
};

/*
    - initializing the worker (ex, 'init event')
    - handle errors
    - add default listener (as catch)
    - resolve deps
    - add listener -> remove listener
*/

let createStore = initialValue => {
    let listeners = new Set();
    let store = {
        value: initialValue,
        set(newValue) {
            console.log(`%c SET`, 'color: red');
            store.value = newValue;
            store.notify();
        },
        get() {
            return store.value;
        },
        notify() {
            console.log('notify', listeners);
            listeners.forEach(listener => listener());
        },
        subscribe(listener) {
            console.log(`%c add listen`, 'color: orange');

            listeners.add(listener);
            listener(store.value);

            return () => {
                listeners.delete(listener);
            }
        },
    };

    return store;
};

function createSharedWorker() {
    const worker = new SharedWorker(getPathFromPublic('shared.worker.js'));
    const listeners = new Map();

    const defaultListener = function() {};

    return {
        worker,
        postMessage(type, value) {
            const params = { type, value: value || {} };
            console.log('I send to worker: ', params);
            worker.port.postMessage(serialize(params));
        },
        addListener(type, listener) {
            console.log('I added listener by name', type);

            listeners.set(type, listener);
            // listeners[type] = listener;

            return () => {
                listener.delete(type)
            }
        },
        notify(type, data) {
            const listener = listeners.get(type);

            if (listener) listener(data);
            else defaultListener();
        },
    };
}

const SharedContext = createContext();

const SharedProvider = ({ value, children }) => {
    console.log('Value for provider - instance worker', value);

    const { worker, notify, addListener, postMessage } = value;

    useEffect(() => {
        worker.port.addEventListener(
            'message',
            event => {
                console.log('I got the data from the worker', event.data);
                const { type, value } = JSON.parse(event.data); // todo: improve

                notify(type, value);
            },
            false
        );

        worker.port.addEventListener(
            'messageerror',
            error => {
                console.log(error);
            },
            false
        );

        worker.onerror = function (err) {
            console.log(err);
        };

        worker.port.onerror = function (err) {
            console.log(err);
        };

        worker.port.start();

        return () => {
            // worker.terminate()
        };
    }, []);

    const actions = useMemo(
        () => ({
            postMessage,
            addListener,
        }),
        []
    );

    return <SharedContext.Provider value={actions}>{children}</SharedContext.Provider>;
};

const useShared = () => {
    return useContext(SharedContext);
};


function useStore(store) {
    const [, forceRender] = useReducer(c => c + 1, 0);
    const { postMessage } = useShared();

    console.log(`%c store.get(): ${store.get()}`, 'color: green');

    useEffect(() => {
        console.log('useEffect from useStore');

        const rerender = () => forceRender();
        const unsub = store.subscribe(rerender);
        return () => {
            // unsub();
        };
    }, [store]);

    const run = useCallback(data => {
        postMessage('GET_TASKS', data);
    }, []);

    return [store.get(), run];
}

const instance = createSharedWorker();

const state = createStore();
const set = data => state.set(data);

instance.addListener('GET_TASKS', set);

const RenderTest = ({ data, run }) => {
    useEffect(() => {
        console.log(`%c SET FROM USE EFFECT`, 'color: red');
        // run();
    }, []);

    return (
        <ul>
            {data.map((it, idx) => (
                <li key={idx}>
                    {it.info}::{it.count}
                </li>
            ))}
        </ul>
    );
};

const Test = () => {
    // const [tasks, getTasks] = useSharedResource('GET_TASKS', { initialState: [] });
    // const [_, createTask] = useSharedResource('CREATE_TASK');

    const [val, getTasks] = useStore(state);
    console.log(val)

    // useEffect(() => {
    //     console.log(`%c SET FROM USE EFFECT`, 'color: red');
    //     getTasks();
    // }, []);

    const onGetClick = () => getTasks();
    // const onCreateClick = () => createTask({ count: 1000, info: 'love playing with dog tail' });

    return (
        <div>
            <button onClick={onGetClick}>BTN FOR GET ALL</button>
            {/* <button onClick={onCreateClick}>BTN FOR CREATE ONE</button> */}
            {/* <RenderTest data={tasks} run={getTasks} /> */}
            asd
        </div>
    );
};

export const TestPage = () => {
    return (
        <SharedProvider value={instance}>
            <Test />
        </SharedProvider>
    );
};
