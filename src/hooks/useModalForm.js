import { useState, useCallback } from 'react';

export const MODE_EDIT = 'edit';
export const MODE_CREATE = 'create';

const defaultState = {
    visible: false,
    mode: MODE_CREATE,
    payload: undefined,
};

export const useModalForm = () => {
    const [state, setState] = useState(defaultState);

    const onOpenEdit = payload => {
        setState({
            visible: true,
            mode: MODE_EDIT,
            payload,
        });
    };

    const onOpenCreate = () => {
        setState({
            visible: true,
            mode: MODE_CREATE,
            payload: undefined,
        });
    };

    const onClose = useCallback(() => {
        setState(defaultState);
    }, []);

    return {
        state,
        onOpenEdit,
        onOpenCreate,
        onClose,
    };
};
