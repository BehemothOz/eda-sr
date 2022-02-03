import { useEffect, useState } from 'react';
import { addBanana } from '../__worker';

const BananaPage = () => {
    const [val, set] = useState(0)

    useEffect(() => {
        // get entity
    }, [])

    const handleClick = () => {
        addBanana('love').then(r => set(r));
    };

    return (
        <>
            <button onClick={handleClick}>ADD BTN</button> banana: {val}
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
