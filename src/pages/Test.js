import { useEffect } from 'react';

const BananaPage = () => {
    useEffect(() => {
        // get entity
    }, [])

    const handleClick = () => {
        // add entity
    };

    return (
        <>
            <button onClick={handleClick}>ADD BTN</button> banana: 0
        </>
    );
};

const ApplePage = () => {
    useEffect(() => {
        // get entity
    }, [])

    const handleClick = () => {
        // add entity
    };

    return (
        <>
            <button onClick={handleClick}>BTN</button> apple: 0
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
