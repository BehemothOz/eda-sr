import { useEffect, useRef } from 'react';

const getPathFromPublic = path => `${process.env.PUBLIC_URL}/${path}`;

function onError(e) {
    console.log('Line: ' + e.lineno);
    console.log('In: ' + e.filename);
    console.log('Message: ' + e.message);
}

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
