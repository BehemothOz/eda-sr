import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { sessionService } from 'api/services/session';
import { api } from 'api';

const AuthStateContext = createContext();
const AuthActionsContext = createContext();

export const AuthProvider = props => {
    const { children } = props;

    const [userID, setUserID] = useState();
    const [user, setUser] = useState({});

    useEffect(() => {
        const userIDFromStorage = sessionService.getUserID();

        if (userIDFromStorage) {
            const getUser = async () => {
                const result = await api.getUser(userIDFromStorage);
                setUser(result);
            };

            getUser();
        }
    }, [userID]);

    /*
        TODO: unstable_batchedupdates if async
    */
    const resetStateFromProvider = useCallback(() => {
        setUserID();
        setUser({});
    }, []);

    const logout = useCallback(() => {
        sessionService.reset();
        resetStateFromProvider();
    }, [resetStateFromProvider]);

    const actions = useMemo(
        () => ({
            setUser,
            setUserID,
            logout,
        }),
        [logout]
    );

    // if (isLoading || isIdle) return 'loading';

    return (
        <AuthStateContext.Provider value={user}>
            <AuthActionsContext.Provider value={actions}>{children}</AuthActionsContext.Provider>
        </AuthStateContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthStateContext);
};

export const useAuthActions = () => {
    return useContext(AuthActionsContext);
};
