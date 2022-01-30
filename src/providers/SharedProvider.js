import { useState, useEffect, useLayoutEffect } from 'react';
import { createContext, useContext } from 'react';
import { createWorker } from '../worker';

const SharedStateContext = createContext();
const SharedActionsContext = createContext();

const worker = createWorker('shared.worker.js');

const updateBanana = data => previous => ({ ...previous, banana: data });
const updateApple = data => previous => ({ ...previous, apple: data });

/*
    Create worker from index.js
*/
export const SharedProvider = ({ children }) => {
    const shwr = worker;

    const [store, setStore] = useState({
        banana: 0,
        apple: 0,
    });

    useEffect(() => {
        shwr.port.addEventListener('message', shwr.onMessage);

        shwr.port.addEventListener('error', event => console.log(event));

        shwr.port.start();
    }, []);

    /*
        Register events for banana entity + listener
    */
    useLayoutEffect(() => {
        const events = ['GET_BANANA', 'ADD_BANANA'];
        const callback = payload => setStore(updateBanana(payload));

        events.forEach(event => shwr.register(event, callback));
    }, []);

    /*
        Register events for apple entity + listener
    */
    useLayoutEffect(() => {
        const events = ['GET_APPLE', 'ADD_APPLE'];
        const callback = payload => setStore(updateApple(payload));

        events.forEach(event => shwr.register(event, callback));
    }, []);

    useEffect(() => {
        const handler = () => shwr.postMessage('CLOSE');

        window.addEventListener('beforeunload', handler);

        return () => {
            window.removeEventListener('beforeunload', handler);
        };
    }, []);

    return (
        <SharedStateContext.Provider value={store}>
            <SharedActionsContext.Provider value={shwr.postMessage}>{children}</SharedActionsContext.Provider>
        </SharedStateContext.Provider>
    );
};

export const useStateShared = () => {
    return useContext(SharedStateContext);
};

export const usePostMessage = () => {
    return useContext(SharedActionsContext);
};
