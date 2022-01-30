import { useStateShared, usePostMessage } from 'providers/SharedProvider';
import { useEffect } from 'react';

const useStore = prop => {
    const store = useStateShared();
    return store[prop];
};

const BananaPage = () => {
    const value = useStore('banana');
    const postMessage = usePostMessage();

    useEffect(() => {
        postMessage('GET_BANANA');
    }, [])

    const handleClick = () => {
        postMessage('ADD_BANANA');
    };

    return (
        <>
            <button onClick={handleClick}>ADD BTN</button> banana: {value}
        </>
    );
};

const ApplePage = () => {
    const value = useStore('apple');
    const postMessage = usePostMessage();

    useEffect(() => {
        postMessage('GET_APPLE');
    }, [])

    const handleClick = () => {
        postMessage('ADD_APPLE');
    };

    return (
        <>
            <button onClick={handleClick}>BTN</button> apple: {value}
        </>
    );
};

export const TestPage = () => {
    return (
        <div style={{ padding: 16 }}>
            <BananaPage />
            <div style={{ height: 16 }} />
            <ApplePage />
        </div>
    );
};
