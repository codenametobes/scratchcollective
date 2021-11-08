// WHY ARE PEOPLE PAYING SO MUCH FOR NFTs

import React from "react";

import { Link as Scroll } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Typography, Box, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import BackGround from "../../assets/ypay.PNG";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${BackGround})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
  },
  questionTitle: {
    fontSize: "2.1rem",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#6d28b1",
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
  goDown: {
    color: "#C06699",
    fontSize: "2.5rem",
  },
}));

const AboutPage3 = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="about-page-3">
      <CssBaseline />
      <Box textAlign="center" className={classes.bodyStructure}>
        <Box textAlign="left" className={classes.bodyWidth}>
          <Box>
            <Typography className={classes.bodyText}>
              You might have already heard about people paying seemingly
              outrageous sums of money for these new NFTs.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Maybe it's the reason you're here.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              These high-price NFTs include anything from art pieces to video
              game items/skins to avatars and digital trading cards.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Beeple's Everydays: The First 5000 Days sold for $69.2 million
              dollars at Christie's. Grimes sold $5.18 million worth of digital
              artwok in 48 hours. Even Logan Paul sold $1m worth of NFTs within
              30 mins of their release. Avatar projects like Bored Ape Yacht
              Club have exploded in popularity while OpenSea (the largest NFT
              marketplace) is seeing billions in transaction volume per month.
              The list goes on.
            </Typography>
          </Box>

          <Box className={classes.bodySpacing}>
            <Typography className={classes.boldText}>
              {" "}
              But what actually drives the value of NFTs?
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.boldText}>
              {" "}
              And why would (or should) you mint one here and put it on the
              market?
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.boldText}>
              How can it be valuable if people can just copy it, screenshot it,
              download it?{" "}
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              The simple answer is that the value isn't driven by the actual
              asset itself. It's driven by the ownership of it. Much like
              listening to a song on Spotify, or owning a book full of Banksy's
              artwork isn't nearly as valuable as owning the distribution rights
              to that song or actually owning a Banksy piece. Digital
              art/ownership is the same. Your ownership is forever etched into
              the Ethereum blockchain until you decide that changes, either
              through a transaction or simply by relinquishing ownership - so
              the value is in your hands, not the screenshot.{" "}
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Value comes from a few things - among them utility and scarcity.
              Just like in the "real world" people like to collect things,
              people like looking at and owning art, people like flexing on
              others. In some cases it's a signalling mechanism (e.g. rare video
              game skins means you either earned it or can afford it). NFTs
              allow for all of that.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              NFTs also carry with it varying levels of scarcity, which you
              control to your benefit. If you create an art piece or a trading
              card YOU get to determine how many to release or how similar they
              are. Essentially you control the supply.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              But let's be real here. A lot of people buy them because they
              think they can eventually sell it for more, or at least retain
              it's value. Like any other speculative asset, you buy it and hope
              that the value of it goes up so that one day you can sell it for
              profit. If that feels inherently like an ugly truth, it really
              doesn't need to feel that way. A spade is a spade and the game is
              the game (credit to The Wire on HBO).
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Value is what YOU and OTHERS make of it. NFTs are just another
              (super cool) mechanism for holding that value.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Our aim at ScratchCollective is to democratize access to the
              mechanisms required to mint NFTs and for AI-Art generation. You
              can use this app to create as many NFTs as you'd like and
              eventually sell them on the open market.
            </Typography>
          </Box>
          <Scroll to="about-page-4" smooth={true} duration={1000}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </Box>
        <Box>
          <Typography className={classes.questionTitle}>
            WHY ARE PEOPLE PAYING
            <br /> SO MUCH FOR NFTs?
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default AboutPage3;
