import React, { useState, useEffect } from "react";
import { provider } from "../../ethereum/web3";

import { useDispatch, useSelector } from "react-redux";
import { ethActions } from "../../store/eth-slice";
import { setSnackbar } from "../../store/alert-actions";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Box, Button, Typography } from "@material-ui/core";

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

const ConnectMetamaskModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const metamaskConnected = useSelector((state) => state.eth.isConnected);

  const [open, setOpen] = useState(false);

  const connectToMetamask = async () => {
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    if (accounts.length > 0) {
      dispatch(ethActions.setIsConnected());
      setOpen(false);
    } else {
      console.log(`connect metamask didn't work`);
      dispatch(
        setSnackbar(
          true,
          "warning",
          "Metamask not connected. Please try again."
        )
      );
    }
  };

  const handleClose = () => {
    if (metamaskConnected === false) {
      console.log(`handleclose: still not connected`);
    }
    dispatch(
      setSnackbar(
        true,
        "info",
        "You are still NOT connected. Click the Metamask extension to connect your account."
      )
    );
    dispatch(ethActions.setIsNotConnected());
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <Box textAlign="center">
        <Typography>
          Connect your account to Metamask to Continue. <br />
          Literally just click the button!
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={connectToMetamask}
        >
          Connect
        </Button>
      </Box>
    </div>
  );

  useEffect(() => {
    console.log(
      `metamaskmodal useEffect metamaskconnected: ${metamaskConnected}`
    );
    if (metamaskConnected === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [metamaskConnected]);

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

export default ConnectMetamaskModal;
