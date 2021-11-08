import React, { useState, useEffect } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";

import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../../store/alert-actions";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Box, Button, Typography } from "@material-ui/core";

const onboarding = new MetaMaskOnboarding();

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
}));

const InstallMetamaskModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const metamaskInstalled = useSelector(
    (state) => state.eth.isMetaMaskInstalled
  );
  console.log(`installMetamask installed?: ${metamaskInstalled}`);

  const [open, setOpen] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  const installMetamask = async () => {
    setButtonDisable(true);
    onboarding.startOnboarding();
  };

  const handleClose = () => {
    if (metamaskInstalled === false) {
      console.log(`handleclose: metmask still not installed`);
      dispatch(
        setSnackbar(
          true,
          "warning",
          "Metamask still not installed. Click Install Button in NavBar to install."
        )
      );
    }
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <Box textAlign="center">
        <Typography>
          Please Install Metamask to Continue. <br />
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={installMetamask}
          disabled={buttonDisable}
        >
          Install
        </Button>
      </Box>
    </div>
  );

  useEffect(() => {
    console.log(
      `installMetamaskmodal useEffect isInstalled: ${metamaskInstalled}`
    );
    if (metamaskInstalled === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [metamaskInstalled]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default InstallMetamaskModal;
