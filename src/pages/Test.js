import { useState, useEffect } from 'react';

const getPathFromPublic = path => `${process.env.PUBLIC_URL}/${path}`;

function onError(e) {
    console.log('Line: ' + e.lineno);
    console.log('In: ' + e.filename);
    console.log('Message: ' + e.message);
}

/*
    Для слабого связывания кода
*/
const eventEmitter = () => {
    const events = new Map(); // or new WeakMap?

    const emitter = {
        on: (name, listener) => {
            const event = events.get(name);

            if (event) event.add(listener);
            else events.set(name, new Set([listener]));
        },
        once: (name, listener) => {
            const onceListener = (...args) => {
                emitter.remove(name, onceListener);
                listener(...args);
            };

            emitter.on(name, onceListener);
        },
        emit: (name, ...args) => {
            const event = events.get(name);
            if (!event) return;

            Array.from(event).forEach(listener => {
                listener(...args);
            });
        },
        remove: (name, listener) => {
            const event = events.get(name);
            if (!event) return;
            if (event.has(listener)) event.delete(listener);
        },
        listeners: name => {
            const event = events.get(name);
            if (event) return Array.from(event);
        },
        /*
            Clear by name or all clear
        */
        clear: name => {
            if (name) events.delete(name);
            else events.clear();
        },
        names: () => {
            return Array.from(events.keys());
        },
        size: () => events.size,
    };

    return emitter;
};

const createWorker = link => {
    const emitter = eventEmitter();
    const worker = new SharedWorker(getPathFromPublic(link));

    const postMessage = (name, data) => {
        return new Promise(resolve => {
            emitter.once(name, res => {
                resolve(res);
            });

            worker.port.postMessage(name, data);
        });
    };

    const onMessage = evt => {
        const [name, data] = evt.data;
        emitter.emit(name, data);
    };

    return { port: worker.port, postMessage, onMessage };
};

const instance = createWorker('shared.worker.js');

export const TestPage = () => {
    const shwr = instance;

    const [state, setState] = useState(0);

    useEffect(() => {
        shwr.port.addEventListener('message', shwr.onMessage);

        shwr.port.addEventListener('error', onError);

        shwr.port.start();

        return () => {
            shwr.port.terminate();
        };
    }, []);

    const onGetClick = () => {
        shwr.postMessage('orbit').then(res => {
            console.log('then result', res);
            setState(prev => res + prev);
        });
    };

    return (
        <div>
            <button onClick={onGetClick}>BTN</button> | {state}
        </div>
    );
};
