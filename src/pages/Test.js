import { useEffect, useRef, useState } from 'react';

const getPathFromPublic = path => `${process.env.PUBLIC_URL}/${path}`;

export const TestPage = () => {
    const [count, setCount] = useState(0);
    const workerRef = useRef();

    useEffect(() => {
        console.log(getPathFromPublic('shared.worker.js'))
        const worker = new SharedWorker(getPathFromPublic('shared.worker.js'));
        console.dir(worker);
        workerRef.current = worker;

        worker.port.addEventListener(
            'message',
            e => {
                console.log(e.data);
            },
            false
        );

        worker.port.start();
    }, []);

    const sendToWorker = () => {
        workerRef.current.port.postMessage(count);
        setCount(p => p + 1);
    };

    return (
        <div>
            <button onClick={sendToWorker}>BTN FOR INC</button>
            <span style={{ margin: '0 16px' }}>Result: {count}</span>
        </div>
    );
};
