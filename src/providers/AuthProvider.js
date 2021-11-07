import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { sessionService } from 'api/services/session';
import { api } from 'api';

// async function bootstrapAppData() {
//     let user = null;

//     const token = await auth.getToken();
//     if (token) {
//         const data = await client('bootstrap', { token });
//         queryCache.setQueryData('list-items', data.listItems, {
//             staleTime: 5000,
//         });
//         for (const listItem of data.listItems) {
//             setQueryDataForBook(listItem.book);
//         }
//         user = data.user;
//     }
//     return user;
// }

const AuthStateContext = createContext();
const AuthActionsContext = createContext();

export const AuthProvider = props => {
    const { children } = props;

    const [userID, setUserID] = useState();
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = sessionService.getUserID();

        if (token) {
            const request = async () => {
                const us = await api.getUser(token);
                console.log(us);
            };

            request();
        }
    }, [userID]);

    const actions = useMemo(
        () => ({
            setUser,
            setUserID,
        }),
        []
    );

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
