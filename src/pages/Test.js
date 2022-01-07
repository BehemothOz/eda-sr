import { useEffect, useRef, useState } from 'react';

const getPathFromPublic = path => `${process.env.PUBLIC_URL}/${path}`;

export const TestPage = () => {
    const [count, setCount] = useState(0);
    const workerRef = useRef();

    const [s, ss] = useState('');

    useEffect(() => {
        console.log(getPathFromPublic('shared.worker.js'));
        const worker = new SharedWorker(getPathFromPublic('shared.worker.js'));
        workerRef.current = worker;

        worker.port.addEventListener(
            'message',
            e => {
                console.log(e.data);
                ss(e.data);
            },
            false
        );

        worker.port.start();
        // worker.port.postMessage("start");

        return () => {
            // worker.terminate()
        };
    }, []);

    const sendToWorker = () => {
        workerRef.current.port.postMessage(count + 1);
    };

    return (
        <div>
            <button onClick={sendToWorker}>BTN FOR INC</button>
            <span style={{ margin: '0 16px' }}>Result: {s}</span>
        </div>
    );
};
