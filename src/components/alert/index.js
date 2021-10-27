import { useSnackbar } from 'notistack';

/*
    Snackbar outside components

    https://iamhosseindhv.com/notistack/demos#maximum-snackbars
    https://github.com/iamhosseindhv/notistack/issues/30
*/

let snackbarRef = null;
export const SnackbarUtilsConfigurator = () => {
    snackbarRef = useSnackbar();
    return null;
};

export default {
    success(msg, options = {}) {
        this.toast(msg, { ...options, variant: 'success' });
    },
    error(msg, options = {}) {
        this.toast(msg, { ...options, variant: 'error' });
    },
    toast(msg, options = {}) {
        snackbarRef.enqueueSnackbar(msg, options);
    },
};
