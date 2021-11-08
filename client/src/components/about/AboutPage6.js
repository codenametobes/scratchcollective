import React from "react";

import { useHistory } from "react-router-dom";

import { Link as Scroll } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Typography, Box, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    fontSize: "1.9rem",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#6d28b1",
  },
  bodyStructure: {
    display: "flex",
    paddingTop: "100px",
    paddingRight: "80px",
    width: "50%",
  },
  bodyWidth: {
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
    //borderRadius: "5%",
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
    // maxWidth: 300,
    width: 600,
    height: "auto",
    margin: 10,
  },
  linkText: {
    fontWeight: "bold",
    cursor: "pointer",
    color: "#C06699",
  },
  goDown: {
    color: "#C06699",
    fontSize: "2.5rem",
  },
}));

const AboutPage6 = () => {
  const classes = useStyles();
  const history = useHistory();

  const onMouseOver = (event) => {
    const el = event.target;
    el.style.color = "#0062D0";
  };

  const onMouseOut = (event) => {
    const el = event.target;
    let white = "#C06699";
    el.style.color = white;
  };

  return (
    <div className={classes.root} id="about-page-6">
      <CssBaseline />
      <Box textAlign="center" className={classes.bodyStructure}>
        <Box textAlign="left" className={classes.bodyWidth}>
          <Box mt={25} textAlign="center">
            <Typography className={classes.questionTitle}>
              WHY DO I GET PROMTED TO SIGN
              <br /> EVERY TIME I REFRESH? OR WHEN <br /> A NEW PAGE OPENS UP?
              💻
            </Typography>
          </Box>
          <Box mt={4}>
            <Typography className={classes.bodyText}>
              This is normal. Every time you reload the page, open a new window,
              change Metamask accounts, or switch networks, the app will
              automatically prompt you to sign.
            </Typography>
          </Box>
          <Box mt={5}>
            <Typography className={classes.bodyText}>
              This is part of our automated login/regristration process that
              sidesteps the need for any email logins, passwords, and the normal
              gobbledy-gook that traditional applications use. Our app uses your
              Metamask account to authenticate you (or register account if
              you're a first-time user).
            </Typography>
          </Box>
          <Box mt={5}>
            <Typography className={classes.bodyText}>
              Our aim was to make signing-in as frictionless as possible so you
              can focus on minting your NFT and not on remembering another
              password.
            </Typography>
          </Box>

          <Scroll to="about-page-9" smooth={true} duration={1000}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </Box>
      </Box>
      <Box textAlign="center" className={classes.bodyStructure}>
        <Box textAlign="left" className={classes.bodyWidth}>
          <Box>
            <Typography className={classes.questionTitle}>
              WHAT IS AI-GENERATED ART? 👨‍💻
            </Typography>
          </Box>
          <Box mt={4}>
            <Typography className={classes.bodyText}>
              AI-Generated art refers to any artwork created with the assistance
              of artificial intelligence - and in ScratchCollective's case using
              Neural Style Transfer, a family of algorithms that are used to
              apply the style of one or more existing images to an input image.
              The operator of the algorithm has to choose an input image (i.e, a
              picture of the Eiffel tower) and a style image (i.e The Starry
              Night by Vincent van Gogh) and the output is the first image in
              the "style" of the second.{" "}
            </Typography>
          </Box>

          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Generative Adversarial Networks (or GAN for short) are another
              style of AI-Art, though not used in the ScratchCollective app.
              GANs function through the computer's ability to create composite
              visual forms after the absorption of "datasets" of imagery.{" "}
            </Typography>
          </Box>

          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              AI Art has been exploding in popularity in the NFT space, where
              essentially a machine learning AI holds the paintbrush (much like
              this app) while the resulting art pieces are sold on the open
              market. By giving you easy-to-use tools to express your creativity
              and a quick pipeline to the NFT market, ScratchCollective does
              just this. Tools like ours are making art generation increasingly
              accessible to you at the click of a few buttons.
            </Typography>
          </Box>

          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              You can view our{" "}
              <span
                className={classes.linkText}
                onMouseEnter={(event) => onMouseOver(event)}
                onMouseOut={(event) => onMouseOut(event)}
                onClick={() => history.push("/view/collection")}
                // onClick={() => window.open("/view/collection", "_blank")}
              >
                collection of generated art here.
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AboutPage6;
