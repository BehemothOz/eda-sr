import { useState } from 'react';
import { CenterScreen } from 'components/layout/CenterScreen';
import { RestorePasswordForm } from './components/RestoreForm';
import { SecretPasswordForm } from './components/SecretForm';

export const PasswordPage = () => {
    const [restoreData, setRestoreData] = useState(null);

    const clearRestoreData = () => setRestoreData(null);

    return (
        <CenterScreen>
            {restoreData ? (
                <SecretPasswordForm data={restoreData} onBack={clearRestoreData} />
            ) : (
                <RestorePasswordForm callAfterSuccessSubmit={setRestoreData} />
            )}
        </CenterScreen>
    );
};
