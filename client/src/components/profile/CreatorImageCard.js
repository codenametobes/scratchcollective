import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Card";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles({
  card: {
    display: "flex",
    maxWidth: 450,
    height: "auto",
    margin: "15px",
    alignContent: "center",
    overflow: "hidden",
    borderRadius: "50%",
    border: "0px",
  },
  media: {
    height: "40vh",
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: "45%",
    justifyContent: "center",
    backgroundColor: "#000000",
    boxSizing: "border-box",
    border: "0px",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#ffffff",
    zIndex: -1,
  },
  desc: {
    color: "#ffffff",
  },
  creator: {
    color: "#6a329f",
    fontWeight: "bold",
    textAlign: "center",
  },
  creatorLink: {
    color: "#555555",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    background: "none",
    boxShadow: "none",
  },
});

// can add description to art destructuring if you need
const ImageCard = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const { name, bio, profilePicUrl, publicAddress } = user;
  const [hoverOn, setHoverOn] = useState(false);

  console.log(user);

  const toggleHoverOn = () => {
    setHoverOn(true);
  };

  const toggleHoverOff = () => {
    setHoverOn(false);
  };

  return (
    <Card
      className={classes.card}
      onMouseOver={toggleHoverOn}
      onMouseLeave={toggleHoverOff}
      onClick={() => history.push(`/profile/${publicAddress}`)}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={!hoverOn && profilePicUrl}
          title={name}
        >
          <Box className={classes.content}>
            <Collapse timeout={1280} in={hoverOn}>
              <Box className={classes.content}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.title}
                >
                  {name}
                </Typography>
              </Box>
            </Collapse>

            <Collapse timeout={1280} in={hoverOn}>
              <Box className={classes.content}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.creator}
                >
                  {bio}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

export default ImageCard;
