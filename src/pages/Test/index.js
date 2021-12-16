import { testRequest } from 'api';

export const TestPage = () => {
    const click = async () => {
        try {
            const result = await testRequest();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: 32 }}>
            <button onClick={click}>BUTTON</button>
        </div>
    );
};
