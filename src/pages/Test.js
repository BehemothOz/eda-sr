import { useEffect, useRef, useState, useCallback } from 'react';

const getPathFromPublic = path => `${process.env.PUBLIC_URL}/${path}`;

const createAction = (type, value = '') => ({ type, value });
const serialize = action => {
    try {
        return JSON.stringify(action);
    } catch (error) {
        throw Error('Oops');
    }
};

export const TestPage = () => {
    const [items, setItems] = useState([]);
    const workerRef = useRef();

    useEffect(() => {
        const worker = new SharedWorker(getPathFromPublic('shared.worker.js'));
        workerRef.current = worker;

        worker.port.addEventListener(
            'message',
            e => {
                console.log(e.data);
                setItems(JSON.parse(e.data));
            },
            false
        );

        worker.port.start();
        // worker.port.postMessage("start");

        return () => {
            // worker.terminate()
        };
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const getData = useCallback(() => {
        const action = createAction('GET');
        workerRef.current.port.postMessage(serialize(action));
    }, []);

    const addData = () => {
        const action = createAction('ADD', { info: 'Item', count: Math.random() * 50 });
        workerRef.current.port.postMessage(serialize(action));
    };

    return (
        <div>
            <button onClick={addData}>BTN FOR INC</button>
            <ul>
                {items.map((it, idx) => (
                    <li key={idx}>
                        {it.info}::{it.count}
                    </li>
                ))}
            </ul>
        </div>
    );
};
