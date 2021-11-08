// WHY ARE PEOPLE PAYING SO MUCH FOR NFTs
import React from "react";

import { Link as Scroll } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Typography, Box, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import OpenSeaLogo from "../../assets/openseaLogo.png";
import SellInterface from "../../assets/sellinterface.PNG";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#eeeeee",
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
  bodyStructure: {
    display: "flex",
    paddingTop: "100px",
    paddingLeft: "60px",
  },
  bodyWidth: {
    width: "75%",
    marginTop: 6,
  },
  bodyText: {
    fontSize: "0.9rem",
  },
  bodySpacing: {
    marginTop: 10,
  },
  openSeaImage: {
    display: "inline",
    width: 360,
    height: "auto",
    margin: 10,
  },
  sellInterfaceImage: {
    width: 900,
    height: "auto",
    margin: 10,
  },
  linkText: {
    cursor: "pointer",
    fontWeight: "bold",
  },
  linkSpacing: {
    marginTop: 18,
  },
  goDown: {
    color: "#C06699",
    fontSize: "2.5rem",
  },
  scrollText: {
    color: "#000000",
    fontSize: "1.2rem",
  },
  mainBodySpacing: {
    marginTop: 45,
  },
  titleText: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#6d28b1",
  },
}));

const AboutPage9 = () => {
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
    <div className={classes.root} id="about-page-9">
      <CssBaseline />
      <Box textAlign="center" className={classes.bodyStructure}>
        <Box textAlign="left" className={classes.bodyWidth}>
          <Box>
            <Typography className={classes.titleText}>
              What is Opensea.io?
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              OpenSea is the first and largest peer-to-peer marketplace for
              cryptogoods (like an eBay for crypto assets), which include
              collectibles, gaming items, and other virtual goods backed by a
              blockchain. On OpenSea, anyone can buy or sell these items through
              a smart contract. It is currently one of the largest NFT
              marketplaces and boasts a large monthly transaction volume (which
              is good for you). Interacting with the marketplace may seem
              overwhelming at first, but is actually pretty simple in the end.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Follow the instructions below to sell an NFT you have minted on
              ScratchCollective.
            </Typography>
          </Box>
          <Box className={classes.mainBodySpacing}>
            <Typography className={classes.titleText}>
              How to sell your NFT on Opensea (one created from the
              ScratchCollective App):
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}> 1. </span>Visit the OpenSea.io
              website while logged into the same Metamask Wallet account that
              you used to mint your NFT. There is no need to transfer your NFT.
              Both ScratchCollective and Opensea are non-custodial sites,
              meaning you can use the interface to view and sell your NFTs, but
              neither of them hold or control your assets. Your NFTs and
              cryptocurrencies are controlled by you and your wallet interface.
              You can think of ScratchCollective and OpenSea as a window into an
              NFT safe that is controlled by you. Again, all you need to do is
              login with the SAME WALLET that you used to mint the NFT.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              *** "SELL ON OPENSEA" button is available for your NFTs on the
              View page, which will provide some initial instructions and take
              you directly to the OpenSea.io site
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}>2. </span>On the OpenSea
              website, you should be able to click the avatar/profile button at
              the top right corner of the homepage. The Profile interface should
              display the NFTs owned by you. Note that it may take a few minutes
              to render on OpenSea directly after minting your NFT as they use a
              blockchain crawler to grab and display the pertinent data from
              your ScratchCollective-generated NFT.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}>3. </span>Click on the NFT that
              you want to sell. It should open up a more detailed view page.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}>4. </span>At the top right
              corner of the page there should be a "Sell" button. Click the
              button to start the sale listing process.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}>5. </span>It should bring you
              to an interface similar to this one:
            </Typography>
          </Box>
          <Box>
            <img
              src={SellInterface}
              className={classes.sellInterfaceImage}
              alt="opensea sell interface"
            />
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}>6. </span>You have a few
              options for the sale of your NFT: namely a fixed price, a timed
              auction twhere the highest bidder wins in the end, or a timed
              auction where a price is set and the price declines until someone
              purchases.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}>7. </span>You can set a price
              (or an initial price in the case of the time auctions) and a
              duration of the sale.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}>8. </span>You can also set a
              reserve price, which is basically a minimum sale price for your
              NFT. If you don't receive any bids that are greater than or equal
              to
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}>9. </span>OpenSea charges a
              2.5% service fee to list on their marketplace.
            </Typography>
          </Box>
          <Box
            className={classes.linkSpacing}
            onMouseEnter={(event) => onMouseOver(event)}
            onMouseOut={(event) => onMouseOut(event)}
            onClick={() =>
              window.open(
                "https://support.opensea.io/hc/en-us/articles/360063498333-How-do-I-list-an-NFT-to-sell",
                "_blank"
              )
            }
          >
            <Typography className={classes.linkText}>
              Click here to find out more about selling your NFT on the OpenSea
              website.
            </Typography>
          </Box>
          <Scroll to="about-page-10" smooth={true} duration={1000}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </Box>
        <Box>
          <Typography className={classes.questionTitle}>
            HOW DO I SELL MY NFT ON OPENSEA.IO?
          </Typography>
          <Box>
            <img
              src={OpenSeaLogo}
              className={classes.openSeaImage}
              alt="opensea Logo"
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AboutPage9;
