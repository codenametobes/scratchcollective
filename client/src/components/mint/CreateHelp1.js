import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link as Scroll } from "react-scroll";

import { CssBaseline, Box, Typography, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#d9d2e9",
    alignItems: "flex-start",
    paddingTop: "70px",
    display: "flex",
    justifyContent: "center",
  },
  questionTitle: {
    fontSize: "2.1rem",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  italicText: {
    fontStyle: "italic",
    fontSize: "1rem",
    fontWeight: 300,
  },
  bodyStructure: {
    display: "flex",
    paddingRight: "80px",
  },
  bodyWidth: {
    width: "75%",
    marginTop: 6,
    paddingLeft: "35px",
  },
  bodyText: {
    fontSize: "1rem",
  },
  bodySpacing: {
    marginTop: 35,
  },
  goDown: {
    color: "#C06699",
    fontSize: "2.5rem",
  },
  scrollText: {
    color: "#000000",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
  linkText: {
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const CreateHelp1 = () => {
  const classes = useStyles();

  const onMouseOver = (event) => {
    const el = event.target;
    el.style.color = "#0062D0";
  };

  const onMouseOut = (event) => {
    const el = event.target;
    let white = "#000000";
    el.style.color = white;
  };

  return (
    <div className={classes.root} id="createHelp">
      <CssBaseline />
      <Box textAlign="center" className={classes.bodyStructure}>
        <Box>
          <Typography className={classes.questionTitle}>
            WHAT YOU'LL NEED TO GET STARTED
          </Typography>
        </Box>
        <Box textAlign="left" className={classes.bodyWidth}>
          <Box>
            <Typography className={classes.boldText}>
              You'll need a few things to get started here:
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              ✅ You need to have Metamask installed and a wallet account
              connected. See the instructions on downloading and setting up
              Metamask in the{" "}
              <span
                className={classes.linkText}
                onMouseEnter={(event) => onMouseOver(event)}
                onMouseOut={(event) => onMouseOut(event)}
                onClick={() => window.open("/about#about-page-5", "_blank")}
              >
                {" "}
                FAQs{" "}
              </span>
              . You should have been promted automatically by the app if you did
              not have Metamask installed or connected. If you have not
              installed, you should also see a "Install Metamask" button on the
              Navigation bar at the top. Click the button to get started.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              ✅ You need to have some ETH in your Metamask wallet. There are a
              million ways to skin this cat. Ultimately, you need to either
              already be possession of ETH or buy it on the open market /
              exchange, and then transfer it to your active Metamask wallet
              address. If you aren't sure how to go about it,{" "}
              <span
                className={classes.linkText}
                onMouseEnter={(event) => onMouseOver(event)}
                onMouseOut={(event) => onMouseOut(event)}
                onClick={() =>
                  window.open(
                    "https://help.foundation.app/en/articles/4731452-a-complete-guide-to-getting-eth-and-a-wallet-with-metamask",
                    "_blank"
                  )
                }
              >
                {" "}
                this article is a good little primer{" "}
              </span>{" "}
              on getting started.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              ✅ Your wallet needs to be connected to the "Ethereum Mainnet" (if
              you want to be able to sell your NFT). In your Metamask Wallet,
              you should see a network dropdown menu at the top of the
              extension. Select "Ethereum Mainnet" to mint a a "real" NFT that
              you can sell.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              ✅ A little patience. Ethereum transactions take a while to
              propogate and make it into a block. This is part of what makes the
              network secure. At the time of this writing, the average
              transaction time is around ~5 mins, but it could take much longer
              (we've seen up to a few hours but it's not common 🤞). The
              transaction hash should pop up underneath the MINT button, and you
              can view the transaction status on Etherscan by clicking it. If
              the transaction fails or anything goes wrong, the appliation will
              display an alert notification. If the green loading bar at the top
              is still going, that means your transaction is still processing.
              DO NOT close the page. Open a new one if you have to. Watch some
              Netflix. Go grab your dehydrated self a glass of H20. But be
              patient and let the network do it's thing. 😌
            </Typography>
          </Box>
          <Box mt={4} textAlign="center">
            <Scroll to="createHelp2" smooth={true} duration={1000}>
              <Typography className={classes.scrollText}>
                How To Mint AI-Generated Art
              </Typography>
              <IconButton>
                <ExpandMoreIcon className={classes.goDown} />
              </IconButton>
            </Scroll>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateHelp1;
