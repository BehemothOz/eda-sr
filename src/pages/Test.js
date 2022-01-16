import { useContext, useMemo, useEffect, createContext, useState, useCallback } from 'react';

const getPathFromPublic = path => `${process.env.PUBLIC_URL}/${path}`;

// const createAction = (type, value = '') => ({ type, value });
const serialize = action => {
    try {
        return JSON.stringify(action);
    } catch (error) {
        throw Error('Oops');
    }
};

// function noop() {}

/*
    - initializing the worker (ex, 'init event')
    - handle errors
    - add default listener (as catch)
    - resolve deps
    - add listener -> remove listener
*/

function createSharedWorker() {
    const worker = new SharedWorker(getPathFromPublic('shared.worker.js'));
    const listeners = {};

    // defaultListener = noop;
    // if (onError) {worker.onerror = onError;}

    return {
        worker,
        listeners,
        postMessage(type, value) {
            const params = { type, value: value || {} };
            worker.port.postMessage(serialize(params));
        },
        addListener(name, listener) {
            listeners[name] = listener;
        },
        removeListener(name) {
            delete listeners[name];
        },
        notify(type, data) {
            listeners[type](data);
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

                notify(type, value)
            },
            false
        );

        worker.onerror = function (err) {
            console.dir(err);
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

const useSharedResource = (type, options = {}) => {
    const { initialState = null } = options;
    const { addListener, postMessage } = useShared();

    const [state, setState] = useState(initialState);

    useEffect(() => {
        addListener(type, data => {
            setState(data);
        });
        return () => {};
    }, []);

    const run = useCallback(data => {
        postMessage(type, data);
    }, []);

    return [state, run];
};

const Test = () => {
    const [data, run] = useSharedResource('GET_TASKS', { initialState: [] });

    const onClick = () => run();

    useEffect(() => {
        run();
    }, []);

    return (
        <div>
            <button onClick={onClick}>BTN FOR INC</button>
            <ul>
                {data.map((it, idx) => (
                    <li key={idx}>
                        {it.info}::{it.count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const instance = createSharedWorker();

export const TestPage = () => {
    return (
        <SharedProvider value={instance}>
            <Test />
        </SharedProvider>
    );
};
