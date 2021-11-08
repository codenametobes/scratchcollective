// METAMASK
import React from "react";

import { Link as Scroll } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Typography, Box, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import MetamaskLogo from "../../assets/metamask_logo.png";
import Metamask1 from "../../assets/metamask_1.PNG";
import Metamask2 from "../../assets/metamask_2.PNG";
import Metamask3 from "../../assets/metamask_3.PNG";
import MetamaskNotif from "../../assets/metamasknotif.PNG";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#eeeeee",
    display: "flex",
    justifyContent: "center",
  },
  question: {
    marginTop: 6,
  },
  questionTitle: {
    fontSize: "2.1rem",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#6d28b1",
  },
  underlineText: {
    fontStyle: "underline",
    fontSize: "1rem",
  },
  italicText: {
    fontStyle: "italic",
    fontSize: "1rem",
    fontWeight: 300,
  },
  bodyStructure: {
    display: "flex",
    paddingTop: "100px",
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
    marginTop: 10,
  },
  ethLink: {
    fontWeight: "bold",
    fontSize: "01rem",
    cursor: "pointer",
  },
  linkMargin: {
    marginTop: 40,
  },
  img: {
    display: "block",
    maxHeight: 300,
    maxWidth: 400,
    width: 280,
    height: "auto",
  },
  sideTitle: {
    justifyContent: "center",
    justifyItems: "center",
    display: "flex",
  },
  metamaskImage: {
    display: "inline",
    maxHeight: 400,
    maxWidth: 300,
    width: 280,
    height: "auto",
    margin: 10,
    borderStyle: "solid",
    borderWidth: 2,
  },
  notifImage: {
    display: "inline",
    maxHeight: 400,
    width: 600,
    height: "auto",
    margin: 10,
  },
  goDown: {
    color: "#C06699",
    fontSize: "2.5rem",
  },
}));

const AboutPage5 = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="about-page-5">
      <CssBaseline />
      <Box textAlign="center" className={classes.bodyStructure}>
        <Box>
          <Typography className={classes.questionTitle}>
            HOW METAMASK WORKS
          </Typography>
          <Box className={classes.sideTitle}>
            <img
              className={classes.img}
              src={MetamaskLogo}
              alt="Metamask Logo"
            />
          </Box>
        </Box>
        <Box textAlign="left" className={classes.bodyWidth}>
          <Box>
            <Typography className={classes.bodyText}>
              Metamask is a{" "}
              <span className={classes.boldText}>browser extension</span>{" "}
              (available on Chrome, Firefox, and Brave Browsers) that serves as
              an Ethereum wallet which you can use to interact with this and
              other decentralized applications.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              It allows users to easily access their wallet (or create one) and
              <span className={classes.boldText}>
                {" "}
                interact with decentralized web applications ("dapps")
              </span>{" "}
              through the browser. The wallet is used to hold Ether and ERC-20
              tokens that can be ued for transactions and payment.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              In the case of ScratchCollective, you will need the browser
              extension to send ether and mint NFTs.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}>
                Metmask is required for the app{" "}
              </span>
              , so make sure that it is installed and connected. If you Metamask
              is NOT installed or if your account is not connected, the
              ScratchCollective app will automatically prompt you to do so.
              Click on the buttons and follow the instructions to use
              ScratchCollective to the fullest!
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}></Typography>
          </Box>

          <img
            src={Metamask1}
            className={classes.metamaskImage}
            alt="metamask help 1"
          />
          <img
            src={Metamask2}
            className={classes.metamaskImage}
            alt="metamask help 2"
          />
          <img
            src={Metamask3}
            className={classes.metamaskImage}
            alt="metamask help 3"
          />

          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Your wallet should look like the image on the left. Every time you
              reload or get on the app, you will be prompted to login with a
              signature request like the image in the middle. Click "Sign" to
              sign in. You should be able to access your accounts and settings
              by clicking the avatar in the top right corner of the extension
              pop-up (3rd image).
            </Typography>
          </Box>

          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Anytime Metamask wants to interact with the app, you will see a
              little notification in the Metamask icon on your browser:
            </Typography>
          </Box>

          <Box>
            <img
              src={MetamaskNotif}
              className={classes.metamaskImage}
              alt="metmask notif"
            />
          </Box>

          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              In order to make transactions via Metamask,{" "}
              <span className={classes.boldText}>
                you'll need to fund your Metamask account(s) with Ethereum,
                either from an existing wallet or an exchange like Coinbase or
                Binance.
              </span>
            </Typography>
          </Box>

          <Scroll to="about-page-6" smooth={true} duration={1000}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </Box>
      </Box>
    </div>
  );
};

export default AboutPage5;
