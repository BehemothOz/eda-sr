/*
    Для слабого связывания кода
*/
export const eventEmitter = () => {
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
