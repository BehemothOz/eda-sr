import { useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { Message } from 'components/feedback/Message';

export const useMessage = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const toast = useCallback((msg, options) => {
        const { type, title } = options;

        enqueueSnackbar(msg, {
            content: (key, message) => (
                <Message type={type} title={title} content={message} onClose={() => closeSnackbar(key)} />
            ),
        });
    }, [enqueueSnackbar, closeSnackbar]);

    return useMemo(
        () => ({
            success: (msg, options = {}) => toast(msg, { type: 'success', ...options }),
            error: (msg, options = {}) => toast(msg, { type: 'error', ...options }),
            onClose: closeSnackbar,
        }),
        [toast, closeSnackbar]
    );
};
