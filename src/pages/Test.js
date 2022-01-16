import { useContext } from 'react';
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

function noop() {}

class SharedWorkerCustom {
    constructor() {
        this.worker = new SharedWorker(getPathFromPublic('shared.worker.js'));
        this.listeners = {};

        this.defaultListener = noop;
    }

    //   if (onError) {worker.onerror = onError;}

    postMessage(args) {
        this.worker.port.postMessage(serialize(args));
    }

    terminate() {
        this.worker.terminate();
    }

    addListener(name, listener) {
        console.log('addListener', name, listener)
        console.log(this)
        this.listeners[name] = listener;
    }

    removeListener(name) {
        delete this.listeners[name];
    }
}

const SharedContext = createContext();

const SharedProvider = ({ value, children }) => {
    console.log('Value for provider', value);

    const { worker, addListener, postMessage } = value;

    useEffect(() => {
        worker.port.addEventListener(
            'message',
            e => {
                console.log('onMEssage', e.data);
                // const { type, payload } = e.data;

                // listeners[type](payload);
                // setItems(JSON.parse(e.data));
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

    const send = (...args) => {

        console.log('Proveder', args)
        postMessage.call(value, ...args);
    };

    const addL = (...args) => {
        addListener.apply(value, args);
    };

    const actions = {
        send: send,
        addListener: addL,
    };

    console.log(actions);

    return <SharedContext.Provider value={actions}>{children}</SharedContext.Provider>;
};

const useShared = () => {
    return useContext(SharedContext);
};

const useSome = type => {
    const worker = useShared();
    console.log(worker);
    const [state, setState] = useState([]);

    useEffect(() => {
        worker.addListener(type, data => {
            setState(data);
        });

        return () => {
            // remove
        };
    }, []);

    const func = (data = {}) => {
        console.log('111', { type, data });
        worker.send({ type, value: data });
    };

    return {
        state,
        run: func,
    };
};

const Test = () => {
    const ss = useSome('GET');

    console.log(ss);

    // const [items, setItems] = useState([]);
    // const workerRef = useRef();

    useEffect(() => {
        ss.run();
    }, []);

    // const getData = useCallback(() => {
    //     const action = createAction('GET');
    //     workerRef.current.port.postMessage(serialize(action));
    // }, []);

    // const addData = () => {
    //     const action = createAction('ADD', { info: 'Item', count: Math.random() * 50 });
    //     workerRef.current.port.postMessage(serialize(action));
    // };

    return (
        <div>
            <button onClick={() => {}}>BTN FOR INC</button>
            <ul>
                {[].map((it, idx) => (
                    <li key={idx}>
                        {it.info}::{it.count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const instance = new SharedWorkerCustom(getPathFromPublic('shared.worker.js'));

export const TestPage = () => {
    return (
        <SharedProvider value={instance}>
            <Test />
        </SharedProvider>
    );
};
