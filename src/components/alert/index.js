import { OptionsObject, useSnackbar, WithSnackbarProps } from "notistack"
import React from "react"

/*
    https://iamhosseindhv.com/notistack/demos#maximum-snackbars
    https://github.com/iamhosseindhv/notistack/issues/30
*/

// Must be imported at least once in the app to initialize the ref
let snackbarRef = null;
export const SnackbarUtilsConfigurator = () => {
  snackbarRef = useSnackbar()
  return null
}

// Export no-named default so consumer can name as desired/required
export default {
  success(msg,  options = {}) {
    this.toast(msg, { ...options, variant: "success" })
  },
  error(msg, options = {}) {
    this.toast(msg, { ...options, variant: "error" })
  },
  toast(msg, options = {}) {
    snackbarRef.enqueueSnackbar(msg, options)
  },
}