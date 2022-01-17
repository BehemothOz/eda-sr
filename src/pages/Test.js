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
        postMessage(type, value) {
            const params = { type, value: value || {} };
            console.log('I send to worker: ', params);
            worker.port.postMessage(serialize(params));
        },
        addListener(type, listener) {
            console.log('I added listener by name', type);
            listeners[type] = listener;
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

const useSharedResource = (type, options = {}) => {
    const { initialState = null } = options;
    const { addListener, postMessage } = useShared();

    const [state, setState] = useState(initialState);

    useEffect(() => {
        console.log(`%c ADD LISTENER FROM USE EFFECT`, 'color: orange');
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

const RenderTest = ({ data, run }) => {
    useEffect(() => {
        console.log(`%c SET FROM USE EFFECT`, 'color: red');
        run();
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
    const [tasks, getTasks] = useSharedResource('GET_TASKS', { initialState: [] });
    const [_, createTask] = useSharedResource('CREATE_TASK');

    // useEffect(() => {
    //     console.log(`%c SET FROM USE EFFECT`, 'color: red');
    //     getTasks();
    // }, []);

    const onGetClick = () => getTasks();
    const onCreateClick = () => createTask({ count: 1000, info: 'love playing with dog tail' });

    return (
        <div>
            <button onClick={onGetClick}>BTN FOR GET ALL</button>
            <button onClick={onCreateClick}>BTN FOR CREATE ONE</button>
            <RenderTest data={tasks} run={getTasks} />
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
