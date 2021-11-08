// WHAT IS AN NFT???

import React from "react";

import { Link as Scroll } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Typography, Box, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import BackGround from "../../assets/explanashun.PNG";

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
    color: "#6d28b1",
  },
  bodyStructure: {
    display: "flex",
    paddingTop: "65px",
    paddingRight: "80px",
  },
  bodyWidth: {
    width: "80%",
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
  midTitleText: {
    fontWeight: "bold",
    color: "#000000",
    fontSize: "1.2rem",
  },
  largerText: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  below: {
    cursor: "pointer",
    fontWeight: "bold",
  },
}));

const AboutPage2 = () => {
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
    <div className={classes.root} id="about-page-2">
      <CssBaseline />
      <Box textAlign="center" className={classes.bodyStructure}>
        <Box>
          <Typography className={classes.questionTitle}>
            WHAT IS AN "NFT" EXACTLY?
          </Typography>
        </Box>
        <Box textAlign="left" className={classes.bodyWidth}>
          <Box>
            <Typography className={classes.largerText}>
              "NFT" stands for{" "}
              <span className={classes.boldText}>Non-Fungible Token</span>.{" "}
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.largerText}>
              ... Ok, so what is "Fungible"?
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}>Fungibility </span>
              means you can swap the thing out for something functionally
              equivalent or identical. Currency is fungible. One dollar bill is
              the same as the next. Stocks are fungible. One share of Apple
              stock is worth the same as any other share of Apple.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              However the Mona Lisa, your identity, the copyright to "Bohemian
              Rhapsody", and Donald Trump's "covfefe" tweet are all
              <span className={classes.boldText}> non-fungible</span>. Sure you
              can make reproductions, use a fake ID, download on BitTorrent, or
              screenshot it into meme history but ultimately there is only one
              original, made at one instance in time, by one person or entity.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.midTitleText}>
              Imagine it like this:
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              You have a dollar bill that you can swap for another dollar bill,
              or 4 quarters, or rip it up and take another dollar bill from your
              piggy bank. That's a fungible dollar bill.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Now you have ANOTHER dollar bill that was passed down from your
              grandma to your mother to you. It was saved from your grandma's
              first paycheck and now it's your family's lucky dollar bill -
              framed and hung above the mantle next to an urn full of nana's
              ashes. You wouldn't trade that for another dollar bill, or 4
              quarters, or rip it up because replacing it with any old dollar
              bill isn't going to cut it. That's a non-fungible dollar bill.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              <span className={classes.boldText}>
                {" "}
                But how do you know what is original?
              </span>{" "}
              And more importantly, who has the power to say which one is the
              original and have everyone agree on this notion? This is where the
              power of blockchain, and more specifically Ethereum comes in.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              At a very high level, a{" "}
              <span className={classes.boldText}>blockchain</span> is a protocol
              that runs on many computers - with each one running the same
              software and storing the same data. The data specifies who has
              what, who owns what, and who did what (ok what the #$%* dude….?)
              In layman's terms, it's a giant list to keep track of where the
              money is and who owns what. The list is stored on a bunch of
              computers, and the list is the same on each computer.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              The beauty of NFTs is that instead of having a SINGLE government,
              company, or some form of oligarchy dictating who owns what - a
              bunch of computers, owned by a bunch of different people who are
              all incentivized to play nice (could even be you), say who owns
              what. Power to the people!
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Most NFTs are created/minted on the{" "}
              <span className={classes.boldText}>Ethereum</span> blockchain,
              which is what ScratchCollective uses. In short, it's a way of
              applying some of the limited edition value of physical objects to
              the digital marketplace by creating artificial scarcity.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography
              className={classes.below}
              onMouseEnter={(event) => onMouseOver(event)}
              onMouseOut={(event) => onMouseOut(event)}
            >
              <Scroll to="about-page-4" smooth={true} duration={1000}>
                You can learn more about Ethereum below.
              </Scroll>
            </Typography>
          </Box>{" "}
          <Box className={classes.bodySpacing}>
            <Typography className={classes.boldText}> Hmmm……</Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              {" "}
              But what about people copying it? Why would anyone pay for
              something you can just copy or take a picture of? Why are people
              <span className={classes.boldText}>
                {" "}
                paying thousands, or even millions
              </span>{" "}
              for what amounts to a jpeg file? We explain more below….
            </Typography>
          </Box>
          <Scroll to="about-page-3" smooth={true} duration={1000}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </Box>
      </Box>
    </div>
  );
};

export default AboutPage2;

//  (yes, we know
//               about common and preferrred stock but this isn't a CFA course).
