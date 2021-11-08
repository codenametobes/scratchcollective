import { alertActions } from "./alert-slice";

export const setSnackbar = (snackbarOpen, snackbarType, snackbarMessage) => {
  return (dispatch) => {
    dispatch(
      alertActions.setSnackbar({
        snackbarOpen: snackbarOpen,
        snackbarType: snackbarType,
        snackbarMessage: snackbarMessage,
      })
    );
  };
};
