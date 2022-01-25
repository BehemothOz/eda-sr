import { useEffect, useRef } from 'react';

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

eventEmitter(); // bb

export const TestPage = () => {
    const ref = useRef();

    useEffect(() => {
        const worker = new SharedWorker(getPathFromPublic('shared.worker.js'));
        ref.current = worker;

        worker.port.addEventListener('message', event => {
            console.log('I got the data from the worker', event.data);
        });

        worker.addEventListener('error', onError, false);
        worker.port.addEventListener('error', onError, false);

        worker.port.start();

        return () => {
            worker.terminate();
        };
    }, []);

    const onGetClick = () => {
        ref.current?.port.postMessage('some');
    };

    return (
        <div>
            <button onClick={onGetClick}>BTN</button>
        </div>
    );
};
