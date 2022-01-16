import { useContext, useMemo } from 'react';
import { createContext } from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';

const getPathFromPublic = path => `${process.env.PUBLIC_URL}/${path}`;

// const createAction = (type, value = '') => ({ type, value });
const serialize = action => {
    try {
        return JSON.stringify(action);
    } catch (error) {
        throw Error('Oops');
    }
};

// const addData = () => {
//     const action = createAction('ADD', { info: 'Item', count: Math.random() * 50 });
//     workerRef.current.port.postMessage(serialize(action));
// };

// function noop() {}

function createSharedWorker() {
    const worker = new SharedWorker(getPathFromPublic('shared.worker.js'));
    const listeners = {};

    // this.defaultListener = noop;

    // if (onError) {worker.onerror = onError;}

    return {
        worker,
        listeners,
        postMessage(type, value) {
            const params = {
                type,
                value: value || {}
            }
            worker.port.postMessage(serialize(params));
        },

        // terminate() {
        //     worker.terminate();
        // },

        addListener(name, listener) {
            console.log('addListener', name, listener)
            listeners[name] = listener;
        },

        removeListener(name) {
            delete listeners[name];
        },
    };
}

const SharedContext = createContext();

const SharedProvider = ({ value, children }) => {
    console.log('Value for provider - instance worker', value);

    const { worker, listeners, addListener, postMessage } = value;

    useEffect(() => {
        worker.port.addEventListener(
            'message',
            e => {
                console.log('onmessage event data: ', e.data);
                const { type, value } = JSON.parse(e.data);

                listeners[type](value);
            },
            false
        );

        worker.onerror = function (err) {
            console.dir(err);
        };

        worker.port.start();
        // worker.port.postMessage("start");

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

    const run = useCallback((data) => {
        postMessage(type, data);
    }, []);

    return [state, run];
};

const Test = () => {
    const [data, run] = useSharedResource('GET_TASKS', { initialState: [] });

    const onClick = () => run();

    useEffect(() => {
        run();
    }, [])

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
