import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Box, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    borderRadius: "10%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
  },
}));

const SellOpenSeaModal = ({ showOSModal, setShowOSModal }) => {
  const classes = useStyles();

  const openSeaNewTab = async () => {
    window.open("https://opensea.io/", "_blank");
  };

  const handleClose = () => {
    setShowOSModal(false);
  };

  const body = (
    <div className={classes.paper}>
      <Box textAlign="center">
        <Typography className={classes.title}>
          Selling on Opensea: <br />
        </Typography>
        <Typography className={classes.body}>
          1. Stay signed in with this same Metamask account <br /> ( No need to
          transfer your NFT as it's already in your wallet 😊)
          <br />
          2. Click the button below.
          <br />
          3. On the Opensea.io page, click the profile circle at the top right
          corner of the page
          <br />
          4. You should be able to view your creations straight away (may take a
          few minutes for the images to render) <br />
          5. Click on the art, and it should bring you to a page with a "Sell"
          button towards top right corner <br />
          6. Voila! Follow the steps to send your masterpiece to market 💸
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" marginTop={5}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={openSeaNewTab}
        >
          SELL ON OPENSEA
        </Button>
      </Box>
    </div>
  );

  return (
    <div>
      <Modal
        open={showOSModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default SellOpenSeaModal;
