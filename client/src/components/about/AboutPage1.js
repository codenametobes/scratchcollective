import React from "react";

import { Link as Scroll } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Typography, Box, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import BackGround from "../../assets/ethereumbackground12.PNG";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${BackGround})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  question: {
    marginTop: 15,
    cursor: "pointer",
  },
  title: {
    fontSize: "4rem",
  },
  firstQuestion: {
    marginTop: 40,
    cursor: "pointer",
  },
  helpQuestion: {
    marginTop: 30,
    color: "#2ACAEA",
  },
  questionTitle: {
    fontSize: "2rem",
    fontStyle: "italic",
    color: "#6d28b1",
  },
  questionSubtitle: {
    fontSize: "1.1rem",
    color: "#6d28b1",
  },
}));

const AboutPage1 = () => {
  const classes = useStyles();

  const onMouseOver = (event) => {
    const el = event.target;
    let colorhex = [
      "#7AF377",
      "#3498DB",
      "#F1C530",
      "#F29C29",
      "#8E44AD",
      "#4AA086",
      "#E74C3C",
      "#65CC71",
      "#D3541B",
      "#EB4367",
      "#74F7D9",
      "#DDA8FC",
    ];
    el.style.color = colorhex[Math.floor(Math.random() * 12)];
  };

  const onMouseOut = (event) => {
    const el = event.target;
    let white = "#000000";
    el.style.color = white;
  };

  return (
    <div className={classes.root} id="about-page-1">
      <CssBaseline />
      <Box textAlign="center">
        <Box>
          <Typography className={classes.title}>FAQs</Typography>
        </Box>
        <Box mt={5}>
          <Typography className={classes.questionTitle}>
            "I DON'T GET IT!"
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography className={classes.questionSubtitle}>
            -Literally everyone
          </Typography>
        </Box>
        <Box
          className={classes.firstQuestion}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
        >
          <Scroll to="about-page-2" smooth={true} duration={1000}>
            <Typography>WHAT THE HELL IS AN "NFT"??</Typography>
          </Scroll>
        </Box>

        <Box
          className={classes.question}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
        >
          <Scroll to="about-page-3" smooth={true} duration={1000}>
            <Typography>
              WHY DO PEOPLE PAY THOUSANDS, EVEN MILLIONS FOR AN "NFT"?
              <br /> (I.E. WHAT MAKES IT VALUABLE?)
            </Typography>
          </Scroll>
        </Box>
        <Box
          className={classes.question}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
        >
          <Scroll to="about-page-4" smooth={true} duration={1000}>
            <Typography>WHAT IS ETHEREUM?</Typography>
          </Scroll>
        </Box>
        <Box
          className={classes.question}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
        >
          <Scroll to="about-page-5" smooth={true} duration={1000}>
            <Typography>WHAT IS METAMASK?</Typography>
          </Scroll>
        </Box>
        <Box
          className={classes.question}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
        >
          <Scroll to="about-page-6" smooth={true} duration={1000}>
            <Typography>
              WHY DO I GET PROMPTED TO SIGN EVERY TIME I REFRESH?
              <br />
              OR WHEN A NEW PAGE OPENS UP?
            </Typography>
          </Scroll>
        </Box>
        <Box
          className={classes.question}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
          onClick={() => {
            window.open("/create#createHelp");
          }}
        >
          <Typography>
            HOW SCRATCHCOLLECTIVE WORKS
            <br />
            AND HOW TO MINT AN NFT ON THIS APP
          </Typography>
        </Box>
        <Box
          className={classes.question}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
        >
          <Scroll to="about-page-6" smooth={true} duration={2000}>
            <Typography>WHAT IS AI-GENERATIVE ART?</Typography>
          </Scroll>
        </Box>

        <Box
          className={classes.question}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
        >
          <Scroll to="about-page-9" smooth={true} duration={1000}>
            <Typography>HOW DO I SELL MY NFT ON OPENSEA?</Typography>
          </Scroll>
        </Box>
        {/* <Box
          className={classes.question}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
        >
          <Scroll to="about-page-10" smooth={true} duration={1000}>
            <Typography>HOW DO I SELL MY NFT ON RARIBLE?</Typography>
          </Scroll>
        </Box> */}
        <Box
          className={classes.question}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
        >
          <Scroll to="about-page-11" smooth={true} duration={1000}>
            <Typography>WHO DO I COMPLAIN TO IF THIS DOESN'T WORK?</Typography>
          </Scroll>
        </Box>

        <Scroll to="about-page-2" smooth={true} duration={1000}>
          <IconButton>
            <ExpandMoreIcon className={classes.goDown} />
          </IconButton>
        </Scroll>
      </Box>
    </div>
  );
};

export default AboutPage1;
