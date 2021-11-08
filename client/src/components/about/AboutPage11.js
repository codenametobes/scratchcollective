import React from "react";

import { Link as Scroll } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Typography, Box, IconButton } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import BackGround from "../../assets/landingPage2.PNG";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    // background: "#eeeeee",
    backgroundImage: `url(${BackGround})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  question: {
    marginTop: 6,
  },
  bodySpacing: {
    marginTop: 15,
  },
  contactSpacing: {
    marginTop: 25,
  },
  boldText: {
    fontWeight: "bold",
  },
  emailText: {
    color: "#6d28b1",
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
}));

const AboutPage9 = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="about-page-11">
      <CssBaseline />
      <Box textAlign="center">
        <Box className={classes.question}>
          <Box className={classes.bodySpacing}>
            <Typography>SOMETHING NOT WORKING?</Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography>GENERAL QUESTIONS?</Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography>
              SUPER STOKED ON THE APP AND FEEL THE NEED TO SHOWER SOMEONE WITH
              PRAISE?
            </Typography>
          </Box>
          <Box className={classes.contactSpacing}>
            <Typography className={classes.boldText}>
              Please contact{" "}
              <span className={classes.emailText}>
                {" "}
                8allyourspam@gmail.com{" "}
              </span>{" "}
              with any questions or feedback :)
            </Typography>
          </Box>
          <Box mt={10}>
            <Scroll to="about-page-1" smooth={true} duration={1000}>
              <Typography className={classes.scrollText}>
                Back To Top
              </Typography>
              <IconButton>
                <ExpandLessIcon className={classes.goDown} />
              </IconButton>
            </Scroll>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AboutPage9;
