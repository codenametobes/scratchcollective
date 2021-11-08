import React from "react";

import { Link as Scroll } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Typography, Box, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import BackGround from "../../assets/wasTold1.PNG";
import EthLogo from "../../assets/ethLogo.png";

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
  whereToStart: {
    fontWeight: "bold",
    fontSize: "1.3rem",
  },
  italicText: {
    fontStyle: "italic",
    fontSize: "1rem",
    fontWeight: 300,
  },
  bodyStructure: {
    display: "flex",
    paddingTop: "70px",
    paddingRight: "80px",
  },
  bodyWidth: {
    width: "75%",
    marginTop: 0,
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
  goDown: {
    color: "#C06699",
    fontSize: "2.5rem",
  },
  sideTitle: {
    justifyContent: "center",
    justifyItems: "center",
    display: "flex",
  },
  img: {
    display: "block",
    maxHeight: 300,
    maxWidth: 400,
    width: 280,
    height: "auto",
  },
}));

const AboutPage4 = () => {
  const classes = useStyles();

  const onMouseOver = (event) => {
    const el = event.target;
    el.style.color = "#34c0ff";
  };

  const onMouseOut = (event) => {
    const el = event.target;
    let white = "#000000";
    el.style.color = white;
  };

  return (
    <div className={classes.root} id="about-page-4">
      <CssBaseline />
      <Box textAlign="center" className={classes.bodyStructure}>
        <Box>
          <Typography className={classes.questionTitle}>
            WHAT IS ETHEREUM?
          </Typography>
          <Box className={classes.sideTitle}>
            <img className={classes.img} src={EthLogo} alt="Ethereum Logo" />
          </Box>
        </Box>

        <Box textAlign="left" className={classes.bodyWidth}>
          <Box mt={1}>
            <Typography className={classes.whereToStart}>
              Where. To. Start.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              According to ethereum.org,{" "}
              <span className={classes.boldText}>
                "Ethereum is open access to digital money and data-friendly
                services for everyone – no matter your background or location.
              </span>{" "}
              It's a community-built technology behind the cryptocurrency ether
              (ETH) and thousands of applications you can use today". Great.
              Sweet.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              In more practical terms, it is a blockchain network that is used
              to secure a public ledger that verfies and records transactions.
              It uses a built-in cryptocurrency called "Ether" that people can
              use within blockchain applications, and to incentivize maintenance
              of the network. The real selling point of Ethereum is the "smart
              contract" which, in an overly simplisticly sense, move money and
              value around according to pre-defined parameters.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Ok ok…. ELI5 please: It is a world-wide computer that is formed by
              lots of computers talking to each other. The computers all agree
              on who owns what, and on the history of transactions (public
              ledger). If one of the computers gets destroyed, the data isn't
              lost because because all or most of the computers have it. To
              destroy or tamper with the ledger, you'd have to destroy or tamper
              with ALL the computers.
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              It's actually a pretty complex topic (if you haven't already
              guessed), and very worthy of at least one full day of nerding out
              so we've provided some references for you to get started:
            </Typography>
          </Box>
          <Box
            className={classes.linkMargin}
            onMouseEnter={(event) => onMouseOver(event)}
            onMouseOut={(event) => onMouseOut(event)}
            onClick={() =>
              window.open("https://ethereum.org/en/what-is-ethereum/", "_blank")
            }
          >
            <Typography className={classes.ethLink}>
              What is Ethereum - Ethereum.org
            </Typography>
          </Box>
          <Box
            className={classes.linkMargin}
            onMouseEnter={(event) => onMouseOver(event)}
            onMouseOut={(event) => onMouseOut(event)}
            onClick={() =>
              window.open(
                "https://www.youtube.com/watch?v=jxLkbJozKbY&t=512s",
                "_blank"
              )
            }
          >
            <Typography
              className={classes.ethLink}
              onMouseEnter={(event) => onMouseOver(event)}
              onMouseOut={(event) => onMouseOut(event)}
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=jxLkbJozKbY&t=512s",
                  "_blank"
                )
              }
            >
              A Beginner's Explanation in Plain English
            </Typography>
          </Box>
          <Box className={classes.linkMargin}>
            <Typography
              className={classes.ethLink}
              onMouseEnter={(event) => onMouseOver(event)}
              onMouseOut={(event) => onMouseOut(event)}
              onClick={() =>
                window.open(
                  "https://www.reddit.com/r/ethereum/comments/60hhjm/eli5_what_is_ethereum/",
                  "_blank"
                )
              }
            >
              Reddit: ELI5 (Explain Like I'm 5)
            </Typography>
          </Box>
          <Box className={classes.linkMargin}>
            <Typography
              className={classes.ethLink}
              onMouseEnter={(event) => onMouseOver(event)}
              onMouseOut={(event) => onMouseOut(event)}
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=TDGq4aeevgY",
                  "_blank"
                )
              }
            >
              Founder of Ethereum (Vitalik Buterin) Explains
              <br />
              <span className={classes.italicText}>
                *Don't judge a book by it's cover 🙃
              </span>
            </Typography>
          </Box>
          <Scroll to="about-page-5" smooth={true} duration={1000}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </Box>
      </Box>
    </div>
  );
};

export default AboutPage4;
