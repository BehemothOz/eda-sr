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
const emitter = () => {
    const events = new Map(); // or new WeakMap?

    return {
        on: (name, listener) => {
            const event = events.get(name);

            if (event) event.push(listener);
            else events.set(name, [listener]);
        },
        once: () => {},
        emit: name => {
            if (!events.has(name)) return;
            events.get(name).forEach(listener => listener());
        },
        remove: (name, listener) => {
            const event = events.get(name);
            if (!event) return;

            const idx = event.indexOf(listener); // indexOf | findIndex
            if (idx !== -1) event.splice(idx, 1); // mutation
        },
        listeners: name => {
            const event = events.get(name); // copy
            if (event) return event.slice();
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
};

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
